import ReactDOM from 'react-dom';
import App from './App';

import {
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	ApolloClient,
} from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:4000',
	}),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
