import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import SignUp from './SignUp';

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
		<>
			{showSignUp || (
				<>
					<h2>Login</h2>
					<p>demo user is happi89 password is ahmad</p>
					<form onSubmit={submitLogin}>
						Username
						<input
							type='text'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
						Password
						<input
							type='password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							type='submit'
							style={{ background: 'dodgerblue', color: 'white' }}>
							Login
						</button>
					</form>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a onClick={() => setShowSignUp(!showSignUp)}>Sign Up</a>
				</>
			)}
			{showSignUp && (
				<SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
			)}
		</>
	);
};

export default Login;
