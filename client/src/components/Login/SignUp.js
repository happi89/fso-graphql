import { useState } from 'react';

const SignUp = ({ showSignUp, setShowSignUp }) => {
	const [username, setUsername] = useState('');
	const [favoriteGenre, setFavoriteGenre] = useState('');

	const signUpSubmit = (event) => {
		event.preventDefault();

		setUsername('');
		setFavoriteGenre('');
	};

	return (
		<div>
			<h2 className='text-2xl font-bold'>Sign Up</h2>
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
