import Authors from './Authors';
import Books from './Books';
import Filter from './Filter';
import BookForm from './BookForm';
import { useState } from 'react';

function App() {
	const [view, setView] = useState('authors');

	const viewChange = (view) => {
		setView(view);
	};

	const display = () => {
		switch (view) {
			case 'authors':
				return <Authors />;
			case 'books':
				return <Books />;
			case 'book form':
				return <BookForm />;
			default:
				return <Authors />;
		}
	};

	return (
		<div>
			<Filter viewChange={viewChange} />
			{display()}
		</div>
	);
}

export default App;
