import Authors from './components/Authors';
import Books from './components/Books';
import Navigation from './components/Navigation';
import BookForm from './components/BookForm';
import { useState } from 'react';
import Login from './components/Login';
import { useApolloClient } from '@apollo/client';
import Recommendation from './components/Recommendation';
import { ALL_BOOKS } from './queries';
import { useQuery } from '@apollo/client';

function App() {
	const [view, setView] = useState('login');
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const result = useQuery(ALL_BOOKS);

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
				return <Books genre='' />;
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
