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

	const buttonStyle = 'btn btn-outline  m-2 text-lg';

	return (
		<div class='artboard artboard-horizontal phone-4 card-body my-0 mx-auto'>
			<h2 class='text-2xl font-bold text-center mb-2'>Books</h2>
			<table class='table table-compact table-zebra w-full'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Published</th>
					</tr>
				</thead>
				<tbody>{filterBooks()}</tbody>
			</table>
			<h1 class='text-center font-bold m-1 text-lg'>Filter By Genre</h1>
			<div class='flex justify-center btn-group'>
				<button class={buttonStyle} onClick={() => refetch({ genre: '' })}>
					All
				</button>
				<button
					class={buttonStyle}
					onClick={() => refetch({ genre: 'refactoring' })}>
					Refactoring
				</button>
				<button class={buttonStyle} onClick={() => refetch({ genre: 'agile' })}>
					Agile
				</button>
				<button
					class={buttonStyle}
					onClick={() => refetch({ genre: 'patterns' })}>
					Patterns
				</button>
				<button
					class={buttonStyle}
					onClick={() => refetch({ genre: 'design' })}>
					Design
				</button>
				<button class={buttonStyle} onClick={() => refetch({ genre: 'crime' })}>
					Crime
				</button>
				<button
					class={buttonStyle}
					onClick={() => refetch({ genre: 'classic' })}>
					Classic
				</button>
			</div>
		</div>
	);
};

export default Books;
