import { FILTER_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = ({ genre }) => {
	const { loading, error, data, refetch } = useQuery(FILTER_BOOKS, {
		variables: { genre: '' },
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	const filterBooks = () => {
		if (genre === '') {
			refetch();
			return data.allBooks.map((book) => {
				return (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>{book.author.name}</td>
						<td>{book.published}</td>
					</tr>
				);
			});
		}
		return data.allbooks.map((book) => {
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
				<button onClick={() => refetch({ genre: '' })}>All</button>
				<button onClick={() => refetch({ genre: 'refactoring' })}>
					Refactoring
				</button>
				<button onClick={() => refetch({ genre: 'agile' })}>Agile</button>
				<button onClick={() => refetch({ genre: 'patterns' })}>Patterns</button>
				<button onClick={() => refetch({ genre: 'design' })}>Design</button>
				<button onClick={() => refetch({ genre: 'crime' })}>Crime</button>
				<button onClick={() => refetch({ genre: 'classic' })}>Classic</button>
			</div>
		</div>
	);
};

export default Books;
