import Authors from './components/Authors/Authors';
import Books from './components/Books/Books';
import Navigation from './components/Navigation';
import BookForm from './components/BookForm/BookForm';
import { useState } from 'react';
import Login from './components/Login/Login';
import { gql, useApolloClient, useSubscription } from '@apollo/client';
import Recommendation from './components/Recommendation';
import { ALL_BOOKS } from './graphql';
import { useQuery } from '@apollo/client';
import './index.css';

export const BOOK_ADDED = gql`
	subscription bookAdded {
		bookAdded {
			title
			published
			author {
				name
			}
			genres
			id
		}
	}
`;

export const updateCache = (cache, query, addedBook) => {
	const uniqueByTitle = (a) => {
		let seen = new Set();
		return a.filter((book) => {
			let k = book.title;
			return seen.has(k) ? false : seen.add(k);
		});
	};
	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqueByTitle(allBooks.concat(addedBook)),
		};
	});
};

function App() {
	const [view, setView] = useState('login');
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const result = useQuery(ALL_BOOKS);

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded;
			alert(`${addedBook.title} added`);

			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
		},
	});

	if (result.loading) {
		return <div>loading...</div>;
	}

	const viewChange = (view) => {
		setView(view);
	};

	const logout = () => {
		viewChange('login');
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	const display = () => {
		switch (view) {
			case 'authors':
				return <Authors token={token} />;
			case 'books':
				return <Books genre='' token={token} />;
			case 'book form':
				return <BookForm />;
			case 'recommendation':
				return <Recommendation books={result.data.allBooks} />;
			default:
				return <Login setToken={setToken} viewChange={viewChange} />;
		}
	};

	return (
		<div>
			{/* {view === 'login' || view === 'sign up' ? null : ( */}
			<Navigation viewChange={viewChange} token={token} logout={logout} />
			{/* // )} */}
			{display()}
		</div>
	);
}

export default App;
