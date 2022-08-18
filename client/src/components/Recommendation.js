import { useQuery } from '@apollo/client';
import { FAVORITE_GENRE } from '../queries';

const Recommendation = ({ books }) => {
	const result = useQuery(FAVORITE_GENRE);

	if (result.loading) {
		return <div>loading...</div>;
	}

	const favoriteGenre = result.data.me.favoriteGenre;

	const recommendedBooks = books.filter((book) =>
		book.genres.includes(favoriteGenre)
	);

	console.log(recommendedBooks);

	return (
		<>
			<h2>Recommendations</h2>
			<p>
				Based on your favorite genre <strong>{favoriteGenre}</strong>
			</p>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Published</th>
					</tr>
				</thead>
				<tbody>
					{recommendedBooks.map((book) => {
						return (
							<tr key={book.id}>
								<td>{book.title}</td>
								<td>{book.author.name}</td>
								<td>{book.published}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Recommendation;
