require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const { v1: uuid } = require('uuid');

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

const User = require('./models/User');
const Author = require('./models/Author');
const Book = require('./models/Book');

console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI, {
}).then(() => {
	console.log('Connected to MongoDB.');
}).catch(error => {
	console.log('Error when connceting to MongoDB: ', error);
});

/*
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

	type User {
		username: String!
		favoriteGenre: String
		id: ID!
	}
	
	type Token {
		value: String!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
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
			published: Int!
			author: String!
			genres: [String]!
		): Book

		editAuthor(
			name: String!
			setBornTo: Int!
		): Author

		createUser(
			username: String!
			favoriteGenre: String
		): User

		login(
			username: String!
			password: String!
		): Token

	}

	type Subscription {
		bookAdded: Book!
	}
	
`

const resolvers = {

	Author: {
		name: (root) => root.name,
		id: (root) => root.id,
		born: (root) => root.born,
		bookCount: async (root, args) => {
			const bookset = await Book.find({ author: root.id });
			return bookset.length;
		},
	},

	Query: {

		bookCount: async () => await Book.count({}),

		authorCount: async () => await Author.count({}),

		allBooks: async (root, args) => {
			if (args.author) {
				return books.filter(book => book.author === args.author);
			}
			else if (args.genre) {
				// return books.filter(book => book.genres.includes(args.genre));
				return await Book.find({ genres: { $in: [args.genre] }}).populate('author');
			}
			else return await Book.find({}).populate('author');
		},

		allAuthors: async () => await Author.find({}),

		me: (root, args, context) => {
			console.log(context.currentUser);
			return context.currentUser
		},

	},

	Mutation: {

		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('Not authenticated!');
			}

			var author = await Author.findOne({ name: args.author });
			// console.log(author);

			if (!author) {
				const newAuthor = new Author({
					name: args.author,
					born: null,
				});

				await newAuthor.save()
					.catch(error => {
						throw new UserInputError(error.message, {
							invalidArgs: args,
						});						
					});

				author = newAuthor;

			}

			const newBook = new Book({
				...args,
				author: author,
			});
			await newBook.save()

			pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
			return newBook;
		},

		editAuthor: async (root, args, { currentUser }) => {
			
			if (!currentUser) {
				throw new AuthenticationError('Not authenticated!');
			}

			const author = await Author.findOne({ name: args.name });
			console.log(author);

			if (!author) {
				return null;
			}

			author.born = args.setBornTo;
			return await author.save()
				.catch(error => {
					console.log(error);
				});
		},

		createUser: (root, args) => {
			const user = new User({ username: args.username });
			return user.save()
				.catch(error => {
					throw new UserInputError(error.message, { invalidArgs: args });
				});
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new UserInputError('Wrong credentials!')
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET ) };
		},

	},

	Subscription: {

		bookAdded: {
			subscribe: () => pubsub.asyncIterator([ 'BOOK_ADDED' ])
		}

	}

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {

	  const auth = req ? req.headers.authorization : null;

	  if (auth && auth.toLowerCase().startsWith('bearer ')) {
		  const decodedToken = jwt.verify(
			  auth.substring(7), JWT_SECRET
		  )
		  const currentUser = await User.findById(decodedToken.id);
		  return { currentUser };
	  }

  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  	console.log(`Server ready at ${url}`);
 	console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
