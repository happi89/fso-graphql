const { UserInputError, AuthenticationError } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const DATABASE_URL = process.env.DATABASE_URL;

console.log('connecting to mongodb');

mongoose
	.connect(DATABASE_URL)
	.then(() => {
		console.log('connected to mongodb');
	})
	.catch((err) => console.log('couldnt connect to mongodb', err.message));

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: String!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`;

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			// if (args.genre && args.author) {
			// 	return await Book.find({ author: [args.author] });
			// }

			// if (args.author) {
			// 	const author = await Author.findOne({ name: args.author });
			// 	return await Book.find({
			// 		author: author.id,
			// 	});
			// }

			// if (args.genre) {
			// 	return await Book.find({
			// 		genres: { $in: [args.genre] },
			// 	});
			// }
			return await Book.find({}).populate('author');
		},
		allAuthors: async () => await Author.find({}),
		me: (root, args, context) => context.user,
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name });
			const books = await Book.find({ author: author.id });
			return books.length;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const author = await Author.findOne({ name: args.author });
			const user = context.user;

			if (!user) {
				throw new AuthenticationError('not authenticated');
			}

			if (author === null) {
				const author = new Author({ name: args.author });
				try {
					await author.save();
				} catch (err) {
					throw new UserInputError(err.message, {
						invalidArgs: args,
					});
				}
			}

			const newBook = new Book({ ...args, author });
			try {
				await newBook.save();
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}
			return newBook.populate('author');
		},
		editAuthor: async (root, args, context) => {
			const authorToUpdate = await Author.findOne({ name: args.name });
			authorToUpdate.born = args.setBornTo;

			const user = context.user;

			if (!user) {
				throw new AuthenticationError('not authenticated');
			}

			try {
				await authorToUpdate.save();
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}

			return authorToUpdate;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});

			return user.save().catch((err) => {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'ahmad') {
				throw new UserInputError('wrong credentials');
			}

			const forToken = {
				username: user.username,
				id: user._id,
			};
			return { value: jwt.sign(forToken, process.env.SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;

		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
			const user = await User.findOne({ id: decodedToken.id });
			return { user };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
