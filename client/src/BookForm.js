import { useState } from 'react';
import { ADD_BOOK } from './queries';
import { useMutation } from '@apollo/client';

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');

	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [addBook] = useMutation(ADD_BOOK);

	const submit = (event) => {
		event.preventDefault();

		addBook({ variables: { title, author, published, genres } });

		setTitle('');
		setAuthor('');
		setPublished('');
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
					/>
				</div>
				<div>
					author
					<input
						type='text'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					Published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					Genre
					<input
						type='text'
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button type='button' onClick={() => addGenres(genre)}>
						add genre
					</button>
					<div>{genres.map((genre) => genre).join(' ')}</div>
				</div>
				<button type='submit'>Add Book</button>
			</form>
		</>
	);
};

export default BookForm;
