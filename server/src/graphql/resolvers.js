const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
require('dotenv').config();

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

			if (args.genre) {
				return await Book.find({
					genres: { $in: [args.genre] },
				}).populate('author');
			}

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
			const user = context.user;
			if (!user) {
				throw new AuthenticationError('not authenticated');
			}
			console.log(args);
			const authorExists = await Author.findOne({ name: args.author });

			if (!authorExists) {
				const author = new Author({ name: args.author });
				try {
					await author.save();
				} catch (err) {
					throw new UserInputError(err.message, {
						invalidArgs: args,
					});
				}
			}

			const newBook = new Book({
				...args,
				author: await Author.findOne({ name: args.author }),
			});
			try {
				await newBook.save();
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

			return newBook.populate('author');
		},
		deleteBook: async (root, args, context) => {
			const bookToDelete = await Book.findOne({ title: args.title });
			const user = context.user;

			if (!user) {
				throw new AuthenticationError('not authenticated');
			}

			try {
				await Book.deleteOne(bookToDelete);
				return bookToDelete;
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}
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
			const password = args.password;
			const saltRounds = 10;
			const passwordHash = await bcrypt.hash(password, saltRounds);

			if (args.username.length < 3 || password.length < 3) {
				return res.status(400).json({
					error: 'username and password have to be atleast 3 characters long',
				});
			}

			const user = new User({
				username: args.username,
				passwordHash: passwordHash,
				favoriteGenre: args.favoriteGenre,
			});

			return await user.save().catch((err) => {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			});
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			const passwordTrue = !user
				? false
				: await bcrypt.compare(args.password, user.passwordHash);

			if (!(user && passwordTrue)) {
				throw new UserInputError('wrong credentials');
			}

			const forToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(forToken, process.env.SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
		},
	},
};

module.exports = resolvers;
