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
		<>
			<h2>Sign Up</h2>
			<form onSubmit={signUpSubmit}>
				Username
				<input
					type='text'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
				favoriteGenre
				<input
					type='text'
					value={favoriteGenre}
					onChange={({ target }) => setFavoriteGenre(target.value)}
				/>
				<button style={{ background: 'dodgerblue', color: 'white' }}>
					Sign Up
				</button>
				<div>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a onClick={() => setShowSignUp(!showSignUp)}>Log In</a>
				</div>
			</form>
		</>
	);
};

export default SignUp;
