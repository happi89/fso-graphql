const Filter = ({ viewChange }) => {
	return (
		<>
			<button onClick={() => viewChange('authors')}>Authors</button>
			<button onClick={() => viewChange('books')}>Books</button>
			<button onClick={() => viewChange('book form')}>Add Book</button>
		</>
	);
};

export default Filter;
