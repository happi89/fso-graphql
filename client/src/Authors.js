import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from './queries';

const Authors = () => {
	const result = useQuery(ALL_AUTHORS);

	if (result.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>Authors</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Born</th>
						<th>Books</th>
					</tr>
				</thead>
				<tbody>
					{result.data.allAuthors.map((author) => {
						return (
							<tr key={author.id}>
								<td>{author.name}</td>
								<td>{author.born}</td>
								<td>{author.bookCount}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Authors;
