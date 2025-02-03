import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

      try {
        const response = await axios.post('http://localhost:8000/users/login',
          { email: values.email, password: values.password },
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        if (response.status === 200) {
          // Call the login function from AuthContext to store the token
          login(response.data.access_token) // recieving access token from backend
          // login(values.email, values.password); // Assuming the backend returns a JWT token
          navigate('/'); // Redirect to home page after successful login
        }
      } catch (error) {
        console.error('Error signing in:', error.response?.data || error.message);
        setErrors({
          login: error.response?.data?.detail || 'Login failed. Please check your credentials.',
        });
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className='sign-in-container container mt-5 addUser'>
      <h2> Sign In</h2>
      <form onSubmit={handleSubmit} className='addUserform'>
        <div className='form-group mb-3 mt-1'>
          <label htmlFor="email"> Email:</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            autoComplete="off"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span className='text-danger'>{errors.email}</span>}
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            autoComplete="off"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <span className='text-danger'>{errors.password}</span>}
        </div>
        {errors.login && <div className='text-danger mb-3'>{errors.login}</div>}
        <button type='submit' className='btn btn-primary' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      <div className='login mt-3'>
        <p>Don't have an account ?</p>
        <Link to='/Sign-up' className='btn btn-success w-50'> Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;