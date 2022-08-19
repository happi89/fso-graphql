import FilterBooks from './FilterBooks';
import { FILTER_BOOKS } from '../../queries';
import { useQuery } from '@apollo/client';
import DeleteBook from './DeleteBook';
import { useState } from 'react';

const Books = ({ genre, token }) => {
	const [showDelete, setShowDelete] = useState(false);

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
			{showDelete && token ? (
				<DeleteBook
					books={data}
					showDelete={showDelete}
					setShowDelete={setShowDelete}
				/>
			) : (
				<FilterBooks
					refetch={refetch}
					showDelete={showDelete}
					setShowDelete={setShowDelete}
					token={token}
				/>
			)}
		</div>
	);
};

export default Books;
