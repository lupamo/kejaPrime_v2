import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import axios from "axios";
import defaultProfilePic from '../assets/images/sorry.png';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PropertyComments = ({ propertyId }) => {
    const { user, token } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replies, setReplies] = useState({});
    const [newReply, setNewReply] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedComments, setExpandedComments] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);

    console.log(user);
    // Fetch comments
    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://kejaprime-v2.onrender.com/comments/`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { property_id: propertyId }
            });
            setComments(response.data);
            
            // Fetch replies for each comment
            response.data.forEach(comment => {
                fetchReplies(comment.id);
            });
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError('Failed to load comments');
        }
    };

    // Fetch replies for a specific comment
    const fetchReplies = async (commentId) => {
        try {
            const response = await axios.get(`https://kejaprime-v2.onrender.com/comments/replies`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { comment_id: commentId }
            });
            setReplies(prev => ({
                ...prev,
                [commentId]: response.data
            }));
            if (response.data.length > 0) {
                setExpandedComments(prev => ({
                    ...prev,
                    [commentId]: true
                }));
            }
        } catch (error) {
            if (error.response?.status !== 404) {
                console.error('Error fetching replies:', error);
            }
        }
    };

    useEffect(() => {
        if (propertyId) {
            fetchComments();
        }
    }, [propertyId]);

    const toggleReplies = (commentId) => {
        setExpandedComments(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const getReplyCount = (commentId) => {
        return replies[commentId]?.length || 0;
    };

    // Add new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        setLoading(true);
        setError('');

        try {
            await axios.post('https://kejaprime-v2.onrender.com/comments/add', null, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    property_id: propertyId,
                    content: newComment.trim()
                }
            });
            
            setNewComment('');
            await fetchComments();
        } catch (error) {
            setError('Please login to comment');
        } finally {
            setLoading(false);
        }
    };

    // Add reply to comment
    const handleAddReply = async (commentId) => {
        if (!newReply[commentId]?.trim()) return;
        
        setLoading(true);
        setError('');

        try {
            await axios.post('https://kejaprime-v2.onrender.com/comments/reply', null, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    comment_id: commentId,
                    content: newReply[commentId].trim()
                }
            });
            
            setNewReply(prev => ({ ...prev, [commentId]: '' }));
            setReplyingTo(null);
            await fetchReplies(commentId);
        } catch (error) {
            console.error('Error adding reply:', error);
            setError('Failed to add reply');
        } finally {
            setLoading(false);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`https://kejaprime-v2.onrender.com/comments/delete/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Failed to delete comment');
        }
    };

    // Delete reply
    const handleDeleteReply = async (replyId, commentId) => {
        try {
            await axios.delete(`https://kejaprime-v2.onrender.com/comments/reply/${replyId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchReplies(commentId);
        } catch (error) {
            console.error('Error deleting reply:', error);
            setError('Failed to delete reply');
        }
    };

    return (
        <div className="comments-section mt-4">
            <h3 className="mb-4" style={{ color: '#203856' }}>Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-4">
                <div className="d-flex gap-3">
                    <img 
                        src={user?.profile_pic || defaultProfilePic} 
                        alt="Profile" 
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                        <p className="mb-2">{user?.username || 'Anonymous'}</p>
                        <textarea
                            className="form-control"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            rows="2"
                        />
                        <button 
                            type="submit" 
                            className="btn btn-primary mt-2"
                            disabled={!newComment.trim() || loading}
                        >
                            {loading ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Comments List */}
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item mb-4">
                        <div className="d-flex gap-3">
                            <img 
                                src={comment.profile_pic || defaultProfilePic} 
                                alt="Profile" 
                                className="rounded-circle"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                                <div className="comment-content p-3 bg-light rounded">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <strong>{comment.username || 'Anonymous'}</strong>
                                        <small className="text-muted">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <p className="mb-2">{comment.content}</p>
                                    <div className="d-flex gap-2">
                                        <button 
                                            className="btn btn-sm btn-link text-primary"
                                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        >
                                            Reply
                                        </button>
                                        {user?.id === comment.user_id && (
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteComment(comment.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                        {getReplyCount(comment.id) > 0 && (
                                            <button 
                                                className="btn btn-sm btn-link text-primary"
                                                onClick={() => toggleReplies(comment.id)}
                                            >
                                                {getReplyCount(comment.id)} {getReplyCount(comment.id) === 1 ? 'reply' : 'replies'}
                                                {expandedComments[comment.id] ? (
                                                    <ChevronUp className="ms-1" size={16} />
                                                ) : (
                                                    <ChevronDown className="ms-1" size={16} />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Replies */}
                                {expandedComments[comment.id] && (
                                    <div className="replies-section ms-4 mt-2">
                                        {replies[comment.id]?.map((reply) => (
                                            <div key={reply.id} className="reply-item mb-2">
                                                <div className="d-flex gap-3">
                                                    <img 
                                                        src={reply.profile_pic || defaultProfilePic} 
                                                        alt="Profile" 
                                                        className="rounded-circle"
                                                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <div className="reply-content p-2 bg-light rounded">
                                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                                <strong className="small">{reply.username || 'Anonymous'}</strong>
                                                                <small className="text-muted">
                                                                    {new Date(reply.created_at).toLocaleDateString()}
                                                                </small>
                                                            </div>
                                                            <p className="mb-1 small">{reply.content}</p>
                                                            {user?.id === reply.user_id && (
                                                                <button 
                                                                    className="btn btn-sm btn-link text-danger p-0"
                                                                    onClick={() => handleDeleteReply(reply.id, comment.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Reply Form */}
                                {replyingTo === comment.id && (
                                    <div className="reply-form ms-4 mt-2">
                                        <div className="d-flex gap-3">
                                            <img 
                                                src={user?.profile_pic || defaultProfilePic} 
                                                alt="Profile" 
                                                className="rounded-circle"
                                                style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                            />
                                            <div className="flex-grow-1">
                                                <p className="mb-2">{user?.username || 'Anonymous'}</p>
                                                <textarea
                                                    className="form-control form-control-sm"
                                                    value={newReply[comment.id] || ''}
                                                    onChange={(e) => setNewReply(prev => ({
                                                        ...prev,
                                                        [comment.id]: e.target.value
                                                    }))}
                                                    placeholder="Write a reply..."
                                                    rows="1"
                                                />
                                                <button 
                                                    className="btn btn-sm btn-primary mt-1"
                                                    onClick={() => handleAddReply(comment.id)}
                                                    disabled={!newReply[comment.id]?.trim() || loading}
                                                >
                                                    {loading ? 'Posting...' : 'Reply'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyComments;