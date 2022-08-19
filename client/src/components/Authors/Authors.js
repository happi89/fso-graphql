import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, AUTHOR_NAMES } from '../../queries';
import AuthorForm from './AuthorForm';
import Success from '../Notifications/Success';
import { useState } from 'react';

const Authors = ({ token }) => {
	const [notification, setNotification] = useState(false);
	let timeout;

	const result = useQuery(ALL_AUTHORS);
	const names = useQuery(AUTHOR_NAMES);

	if (result.loading || names.loading) {
		return <div>loading...</div>;
	}

	return (
		<div class='artboard artboard-horizontal phone-4 card-body my-0 mx-auto'>
			{notification ? <Success success='Author has been changed' /> : null}
			<h2 class='font-bold text-2xl mb-1'>Authors</h2>
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
			{token != null ? (
				<AuthorForm
					names={names}
					setNotification={setNotification}
					timeout={timeout}
				/>
			) : null}
		</div>
	);
};

export default Authors;
