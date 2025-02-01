import React, { useState } from 'react';
// import bookmark from '../assets/images/bookmark.svg';
import './BookmarkButton.css';	

const BookmarkButton = ({ isBookmarked, onClick }) => {
	return (
		<div
            onClick={onClick}
            className="bookmark-button"
            style={{
                backgroundColor: isBookmarked ? '#fd8b21' : '#474545',
            }}
        >
            <div 
                className="bookmark-icon" 
                alt="bookmark"
            />
        </div>
	)
};

export default BookmarkButton;