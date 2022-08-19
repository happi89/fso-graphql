import { useState } from 'react';
import { ADD_BOOK, ALL_BOOKS, FAVORITE_GENRE } from '../../queries';
import { useMutation } from '@apollo/client';
import Info from '../Notifications/Info';
import Success from '../Notifications/Success';

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [notification, setNotification] = useState(false);
	let timeout;

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
		clearTimeout(timeout);

		createBook({ variables: { title, author, published, genres } });
		console.log(title, author, published, genres);

		timeout = setTimeout(() => {
			setNotification(false);
			setTitle('');
			setAuthor('');
			setPublished('');
			setGenres([]);
		}, 5000);
		setNotification(true);
	};

	const addGenres = (genre) => {
		setGenres(genres.concat(genre));
		setGenre('');
	};

	return (
		<div class='card shadow-xl w-96 bg-base-100 my-0 mx-auto mt-2'>
			{notification ? (
				<Success success={`${title} by ${author} has been added`} />
			) : (
				<Info info='New Authors will be added!' />
			)}
			<div class='card-body'>
				<h2 class='text-2xl font-bold'>Add Book</h2>
				<form onSubmit={submit}>
					<div>
						<label class='label'>
							<span class='label-text'>Title</span>
						</label>
						<input
							type='text'
							value={title}
							onChange={({ target }) => setTitle(target.value)}
							class='input input-bordered w-full max-w-xs'
						/>
					</div>
					<div>
						<label class='label'>
							<span class='label-text'>Author</span>
						</label>
						<input
							type='text'
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
							class='input input-bordered  w-full max-w-xs'
						/>
					</div>
					<div>
						<label class='label'>
							<span class='label-text'>Published</span>
						</label>
						<input
							type='number'
							value={published}
							onChange={({ target }) => setPublished(+target.value)}
							class='input input-bordered  w-full max-w-xs'
						/>
					</div>
					<label class='label'>
						<span class='label-text'>Genre</span>
					</label>
					<div style={{ display: 'flex' }}>
						<input
							type='text'
							value={genre}
							onChange={({ target }) => setGenre(target.value)}
							class='input input-bordered'
						/>
						<input
							value='Add genre'
							type='button'
							onClick={() => addGenres(genre)}
							class='btn btn-outline ml-2 max-w-xs'
						/>
					</div>
					<div>{genres.map((genre) => genre).join(' ')}</div>
					<button class='btn btn-primary w-full mt-2' type='submit'>
						Add Book
					</button>
				</form>
			</div>
		</div>
	);
};

export default BookForm;
