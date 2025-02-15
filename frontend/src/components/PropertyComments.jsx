import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import axios from "axios";
import defaultProfilePic from '../assets/images/sorry.png';

const PropertyComments = ({ propertyId }) => {
    const { user, token } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch comments
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/comments/`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { property_id: propertyId }
            });
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError('Failed to load comments');
        }
    };

    useEffect(() => {
        if (propertyId) {
            fetchComments();
        }
    }, [propertyId]);

    // Add new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:8000/comments/add', null, {
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
            console.error('Error adding comment:', error.response?.data);
            const errorMessage = error.response?.data?.detail || 'Failed to add comment. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8000/comments/delete/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Failed to delete comment');
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
                                src={comment.user?.profile_pic || defaultProfilePic} 
                                alt="Profile" 
                                className="rounded-circle"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                                <div className="comment-content p-3 bg-light rounded">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <strong>{comment.user?.username}</strong>
                                        <small className="text-muted">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <p className="mb-2">{comment.content}</p>
                                    {user?.id === comment.user_id && (
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteComment(comment.id)}
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
        </div>
    );
};

export default PropertyComments;