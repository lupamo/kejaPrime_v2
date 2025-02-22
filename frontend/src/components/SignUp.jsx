import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'; // Import axios
// import Validation from '../LoginValidation.jsx';


const SignUp = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		contact: ''
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	
	const navigate =useNavigate(); //hook to navigate to another route

	//handle input change
	const handleInput = (event) => {
			setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
	};
	//submit form; handle it as async
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setErrors({});
		try {
				console.log("Submitting form");
				const response = await axios.post('https://kejaprime-v2.onrender.com/users/register', values); // Post to backend
				console.log('Signup successful:', response.data);
				navigate('/sign-in'); // Redirect to sign-in page
		} catch (error) {
				console.error('There was an error registering the user:', error);
				setErrors({ submit: error.response?.data?.detail || 'Error signing up. Please try again.' });
		} finally {
			setLoading(false);
		}
	}
  return (
	<div className='sign-up-container container mt-5 mb-3 addUser'>
		<h2> Sign Up</h2>
		<form action='' onSubmit={handleSubmit} className='addUserform'>
			<div className=' form-group mb-3 inputGroup'>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					className='form-control'
					name='username'
					autoComplete='off'
					placeholder='Enter your username'
					onChange={handleInput}
					required
				/>
				{errors.name && <span className='text-danger'> {errors.name} </span>}
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="email"> Email:</label>
				<input
					type="text"
					name='email'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your email'
					onChange={handleInput}
					required
				/>
				{errors.email && <span className='text-danger'> {errors.email} </span>}
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="contact"> Contact:</label>
				<input
					type="text"
					name='contact'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your contact'
					onChange={handleInput}
					required
				/>
				{errors.contact && <span className='text-danger'> {errors.contact} </span>}
			</div>
			<div className='form-group mb-3'>
				<label htmlFor="password"> Password:</label>
				<input
					type="password"
					name='password'
					className='form-control'
					autoComplete='off'
					placeholder='Enter your password'
					onChange={handleInput}
					required
				/>
				{errors.password && <span className='text-danger'> {errors.password} </span>}
			</div>
			{errors.submit && <div className='text-danger mb-3'>{errors.submit}</div>}
			<button type='submit' className='btn btn-primary'> 
				{loading ? 'Signing Up...' : 'Sign Up'}
			</button>
		</form>
		<div className='login mt-3'>
			<p>Already have an account ?</p>
			<Link to='/Sign-in' type='submit' className='btn btn-success w-50'> Sign In</Link>
		</div>
	</div>
  )
}

export default SignUp