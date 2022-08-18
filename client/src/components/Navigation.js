const Navigation = ({ viewChange, token, logout }) => {
	const buttonStyle = 'btn btn-ghost normal-case text-xl';
	return (
		<nav class='navbar bg-base-100 justify-center shadow-md'>
			<h1 class='mr-auto font-bold text-2xl'>Library</h1>
			<button class={buttonStyle} onClick={() => viewChange('authors')}>
				Authors
			</button>
			<button class={buttonStyle} onClick={() => viewChange('books')}>
				Books
			</button>

			{token != null ? (
				<>
					<button
						class={buttonStyle}
						onClick={() => viewChange('recommendation')}>
						Recommendation
					</button>
					<button class={buttonStyle} onClick={() => viewChange('book form')}>
						Add Book
					</button>
					<button class={buttonStyle} onClick={logout}>
						Logout
					</button>
				</>
			) : (
				<button class={buttonStyle} onClick={() => viewChange('login')}>
					Login
				</button>
			)}
			<p class='ml-auto font-bold'></p>
		</nav>
	);
};

export default Navigation;
