const Navigation = ({ viewChange, token, logout }) => {
	return (
		<header>
			<h1>Library</h1>
			<button onClick={() => viewChange('authors')}>Authors</button>
			<button onClick={() => viewChange('books')}>Books</button>

			{token != null ? (
				<>
					<button onClick={() => viewChange('recommendation')}>
						Recommendation
					</button>
					<button onClick={() => viewChange('book form')}>Add Book</button>
					<button onClick={logout}>Logout</button>
				</>
			) : (
				<button onClick={() => viewChange('login')}>Login</button>
			)}
		</header>
	);
};

export default Navigation;
