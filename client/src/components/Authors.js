import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, AUTHOR_NAMES } from '../queries';
import AuthorForm from './AuthorForm';

const Authors = ({ token }) => {
	const result = useQuery(ALL_AUTHORS);
	const names = useQuery(AUTHOR_NAMES);

	if (result.loading || names.loading) {
		return <div>loading...</div>;
	}

	return (
		<div class='artboard artboard-horizontal phone-4 card-body my-0 mx-auto'>
			<h2 class='font-bold text-2xl text-center mb-1'>Authors</h2>
			<table class='table table-zebra table-compact w-full'>
				<thead>
					<tr>
						<th>Name</th>
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
			{token != null ? <AuthorForm names={names} /> : null}
		</div>
	);
};

export default Authors;
