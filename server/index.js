const { UserInputError } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');

const DATABASE_URL = process.env.DATABASE_URL;

console.log('connecting to mongodb');

mongoose
	.connect(DATABASE_URL)
	.then(() => {
		console.log('connected to mongodb');
	})
	.catch((err) => console.log('couldnt connect to mongodb', err.message));

const typeDefs = gql`
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
	}
	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
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
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name });
			const books = await Book.find({ author: author.id });
			return books.length;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const author = await Author.findOne({ name: args.author });

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
		editAuthor: async (root, args) => {
			const authorToUpdate = await Author.findOne({ name: args.name });
			authorToUpdate.born = args.setBornTo;

			try {
				await authorToUpdate.save();
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}

			return authorToUpdate;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
