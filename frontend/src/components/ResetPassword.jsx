import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL
  const token = new URLSearchParams(location.search).get('token');

  // Redirect user if token is missing
  useEffect(() => {
    if (!token) {
      setError('Invalid or expired reset link.');
      setTimeout(() => navigate('/sign-in'), 3000);
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://kejaprime-v2.onrender.com/users/reset-password', {
        token,
        new_password: newPassword,
      });

      setMessage(response.data.message || 'Password reset successfully!');
      setTimeout(() => navigate('/sign-in'), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reset password.');
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Reset Password</h2>
      {error && <p className='text-danger'>{error}</p>}
      {!error && (
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>New Password:</label>
            <input
              type='password'
              className='form-control'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-group mt-3'>
            <label>Confirm New Password:</label>
            <input
              type='password'
              className='form-control'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary mt-3'>Reset Password</button>
        </form>
      )}
      {message && <p className='text-success mt-3'>{message}</p>}
    </div>
  );
};

export default ResetPassword;
