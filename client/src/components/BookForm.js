import { useState } from 'react';
import { ADD_BOOK, ALL_BOOKS, FAVORITE_GENRE } from '../queries';
import { useMutation } from '@apollo/client';

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');

	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [createBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: FAVORITE_GENRE }],
		update: (cache, response) => {
			cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
				return {
					allBooks: allBooks.concat(response.data.addBook),
				};
			});
		},
	});

	const submit = (event) => {
		event.preventDefault();

		createBook({ variables: { title, author, published, genres } });
		console.log(title, author, published, genres);

		setTitle('');
		setAuthor('');
		setPublished('');
		setGenres([]);
	};

	const addGenres = (genre) => {
		setGenres(genres.concat(genre));
		setGenre('');
	};

	return (
		<>
			<h2>Add Book</h2>
			<form onSubmit={submit}>
				<div>
					Title
					<input
						type='text'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
						style={{ background: 'lightgray' }}
					/>
				</div>
				<div>
					author
					<input
						type='text'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
						style={{ background: 'lightgray' }}
					/>
				</div>
				<div>
					Published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(+target.value)}
						style={{ background: 'lightgray' }}
					/>
				</div>
				Genre
				<div style={{ display: 'flex' }}>
					<input
						type='text'
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
						style={{ background: 'lightgray' }}
					/>
					<input
						value='Add genre'
						type='button'
						onClick={() => addGenres(genre)}
						style={{ background: 'dodgerblue', color: 'white' }}
					/>
				</div>
				<div>{genres.map((genre) => genre).join(' ')}</div>
				<button
					type='submit'
					style={{ backgroundColor: 'dodgerblue', color: 'white' }}>
					Add Book
				</button>
			</form>
		</>
	);
};

export default BookForm;
