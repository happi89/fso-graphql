import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, AUTHOR_NAMES } from '../queries';
import AuthorForm from './AuthorForm';

const Authors = () => {
	const result = useQuery(ALL_AUTHORS);
	const names = useQuery(AUTHOR_NAMES);

	if (result.loading || names.loading) {
		return <div>loading...</div>;
	}

	return (
		<>
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
			<AuthorForm names={names} />
		</>
	);
};

export default Authors;
