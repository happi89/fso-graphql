import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import SignUp from './SignUp';
import '../index.css';

const Login = ({ setToken, viewChange }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showSignUp, setShowSignUp] = useState(false);

	const [login, result] = useMutation(LOGIN);

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem('user-token', token);
			viewChange('books');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result.data]);

	const submitLogin = async (event) => {
		event.preventDefault();

		login({ variables: { username, password } });

		setUsername('');
		setPassword('');
	};

	return (
		<div class='card shadow-xl w-96 bg-base-100 my-0 mx-auto mt-3'>
			<div class='card-body'>
				{showSignUp || (
					<>
						<h1 className='text-2xl font-bold'>Login</h1>
						<p>demo user is happi89 password is ahmad</p>
						<form onSubmit={submitLogin}>
							<label className='label'>
								<span className='label-text'>Username</span>
							</label>
							<input
								class='input input-bordered w-full max-w-xs'
								type='text'
								value={username}
								onChange={({ target }) => setUsername(target.value)}
							/>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								class='input input-bordered w-full max-w-xs'
								type='password'
								value={password}
								onChange={({ target }) => setPassword(target.value)}
							/>
							<button type='submit' className='btn btn-primary w-full mt-2 '>
								Login
							</button>
						</form>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a class='link' onClick={() => setShowSignUp(!showSignUp)}>
							Sign Up
						</a>
					</>
				)}
				{showSignUp && (
					<SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
				)}
			</div>
		</div>
	);
};

export default Login;
