import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from './queries';

const Books = () => {
	const result = useQuery(ALL_BOOKS);

	if (result.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>Books</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
				</thead>
				<tbody>
					{result.data.allBooks.map((book) => {
						return (
							<tr key={book.id}>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>{book.published}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
