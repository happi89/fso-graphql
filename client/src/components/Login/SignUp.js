import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql';
import Success from '../Notifications/Success';
import Error from '../Notifications/Error';

const SignUp = ({ showSignUp, setShowSignUp }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [favoriteGenre, setFavoriteGenre] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	let timeout;

	const [createUser] = useMutation(CREATE_USER);

	const signUpSubmit = async (event) => {
		event.preventDefault();
		clearTimeout(timeout);
		console.log(username, password, favoriteGenre);

		try {
			await createUser({ variables: { username, password, favoriteGenre } });
			timeout = setTimeout(() => {
				setSuccess(false);
			}, 5000);
			setSuccess(true);
		} catch (error) {
			timeout = setTimeout(() => {
				setError(false);
			}, 5000);
			setError(true);
		}

		setUsername('');
		setPassword('');
		setFavoriteGenre('');
	};

	return (
		<div>
			{error ? (
				<Error error='missing or invalid fields' />
			) : success ? (
				<Success success='User has been Created!' />
			) : null}
			<h2 className='text-2xl font-bold mt-3'>Sign Up</h2>
			<form onSubmit={signUpSubmit}>
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
				<label className='label'>
					<span className='label-text'>Favorite Genre</span>
				</label>
				<input
					class='input input-bordered w-full max-w-xs'
					type='text'
					value={favoriteGenre}
					onChange={({ target }) => setFavoriteGenre(target.value)}
				/>
				<button class='btn btn-primary mt-2 w-full'>Sign Up</button>
				<div>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a className='link' onClick={() => setShowSignUp(!showSignUp)}>
						Log In
					</a>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
