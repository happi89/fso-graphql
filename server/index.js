const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./src/models/user');
const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

console.log('connecting to mongodb');

mongoose
	.connect(DATABASE_URL)
	.then(() => {
		console.log('connected to mongodb');
	})
	.catch((err) => console.log('couldnt connect to mongodb', err.message));

const start = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
		},
		{
			server: httpServer,
			path: '',
		}
	);

	const server = new ApolloServer({
		schema,
		cors: {
			origin: true,
		},
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null;

			if (auth && auth.toLowerCase().startsWith('bearer ')) {
				const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
				const user = await User.findOne({ id: decodedToken.id });
				return { user };
			}
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	});

	await server.start();

	server.applyMiddleware({
		app,
		path: '/',
	});

	const PORT = 4000;

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	);
};

start();
