const FilterBooks = ({ refetch, showDelete, setShowDelete, token }) => {
	const buttonStyle = 'btn btn-outline  m-2 text-lg';

	return (
		<div>
			<div class='font-bold mt-2 text-lg ml-2'>Filter By Genre</div>
			<div class='btn-group'>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: '',
						})
					}>
					All
				</button>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: 'refactoring',
						})
					}>
					Refactoring
				</button>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: 'agile',
						})
					}>
					Agile
				</button>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: 'patterns',
						})
					}>
					Patterns
				</button>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: 'design',
						})
					}>
					Design
				</button>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: 'crime',
						})
					}>
					Crime
				</button>
				<button
					class={buttonStyle}
					onClick={() =>
						refetch({
							genre: 'classic',
						})
					}>
					Classic
				</button>
			</div>
			{token ? (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<a className='link ml-2' onClick={() => setShowDelete(!showDelete)}>
					Delete a Book
				</a>
			) : null}
		</div>
	);
};

export default FilterBooks;
