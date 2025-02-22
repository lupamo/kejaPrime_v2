import React, {useState} from 'react'
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post ('http://localhost:8000/users/auth/password-reset', { email });
            setMessage(response.data.detail || 'Check your email for the reset link.');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to send reset email.');
        }
    };
  return (
    <div className='container mt-5'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label> Email:</label>
                <input 
                type="email"
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Enter your email'
                />
            </div>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-success">Send Reset Link</button>
        </form>
    </div>
  )
}

export default ForgotPassword
