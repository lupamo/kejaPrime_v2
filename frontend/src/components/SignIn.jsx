import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Validation from '../LoginValidation.jsx';
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

    // const validationErrors = Validation(values);
    // setErrors(validationErrors);

    // if (Object.keys(validationErrors).length === 0) {
      try {
        await login(values.email, values.password);
        navigate('/home'); // Redirect to home page after successful login
      } catch (error) {
        console.error('There was an error signing in:', error);
        setErrors({ login: 'Login failed. Please check your credentials.' });
      }
    // }

    setIsLoading(false);
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
          />
          {errors.password && <span className='text-danger'>{errors.password}</span>}
        </div>
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