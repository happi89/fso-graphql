import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';

const Books = () => {
	const result = useQuery(ALL_BOOKS);
	const [genre, setGenre] = useState('all');

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data.allBooks;

	const filterBooks = () => {
		if (genre === 'all') {
			return books.map((book) => {
				return (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>{book.author.name}</td>
						<td>{book.published}</td>
					</tr>
				);
			});
		}
		const filterdbooks = books.filter((book) => book.genres.includes(genre));
		return filterdbooks.map((book) => {
			return (
				<tr key={book.id}>
					<td>{book.title}</td>
					<td>{book.author.name}</td>
					<td>{book.published}</td>
				</tr>
			);
		});
	};

	return (
		<div>
			<h2>Books</h2>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Published</th>
					</tr>
				</thead>
				<tbody>{filterBooks()}</tbody>
			</table>
			<div>
				<button onClick={() => setGenre('all')}>All</button>
				<button onClick={() => setGenre('refactoring')}>Refactoring</button>
				<button onClick={() => setGenre('agile')}>Agile</button>
				<button onClick={() => setGenre('patterns')}>Patterns</button>
				<button onClick={() => setGenre('design')}>Design</button>
				<button onClick={() => setGenre('crime')}>Crime</button>
				<button onClick={() => setGenre('classic')}>Classic</button>
			</div>
		</div>
	);
};

export default Books;
