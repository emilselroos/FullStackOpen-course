const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogs.js');

const initialNotes = [
	{
	  title: 'Blog Post 01',
	  author: 'Emil Selroos',
	  url: 'https://',
	  likes: 0,
	  user: null
	},
	{
	  title: 'Blog Post 02',
	  author: 'Emil Selroos',
	  url: 'https://',
	  likes: 0,
	  user: null
	},
];

beforeEach(async () => {
	// Delete all rows on Blog collection
	await Blog.deleteMany({});
	// Create new "demo" rows to test against
	const blogObjects = initialNotes.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray)
	/*
	initialNotes.forEach(async (blog) => {
		let blogObject = new Blog(blog);
		await blogObject.save();
	});
	*/
});

describe('Blogs API', () => {

	test('Blogs are returned as JSON', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body).toHaveLength(2);
	});

	test('id is found', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0].id).toBeDefined();
	});

	test('Blogs can be created', async () => {
		const newBlog = {
			title: 'Blog Post New',
			author: 'Emil Selroos',
			url: 'http://',
			likes: 0,
		}

		await api
			.post('/api/blogs')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxzZWxyb29zIiwiaWQiOiI2MTBmM2FiN2E3OWMwNzJhYTQ1NTRjNGQiLCJpYXQiOjE2MjgzODgwNDN9.1YcI5O1yluKFnQeXGDS_WJdTlBjezOq3PCSiWwyD5Rk')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');
		const contents = response.body.map(r => r.title);

		expect(response.body).toHaveLength(initialNotes.length + 1);
		expect(contents).toContain('Blog Post New');
	});

	test('Likes will be set to 0 if number is not given', async () => {
		const newBlog = {
			title: 'Zero Likes',
			author: 'Emil Selroos',
			url: 'http://',
		}

		await api
			.post('/api/blogs')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxzZWxyb29zIiwiaWQiOiI2MTBmM2FiN2E3OWMwNzJhYTQ1NTRjNGQiLCJpYXQiOjE2MjgzODgwNDN9.1YcI5O1yluKFnQeXGDS_WJdTlBjezOq3PCSiWwyD5Rk')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');
		const result = response.body.filter(r => r.title === 'Zero Likes');
		expect(result[0].likes).toEqual(0);
	});

	test('New blog needs to have title', async () => {
		const newBlog = {
			title: '',
			author: 'Emil Selroos',
			url: 'http',
		}

		const response = await api
			.post('/api/blogs')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxzZWxyb29zIiwiaWQiOiI2MTBmM2FiN2E3OWMwNzJhYTQ1NTRjNGQiLCJpYXQiOjE2MjgzODgwNDN9.1YcI5O1yluKFnQeXGDS_WJdTlBjezOq3PCSiWwyD5Rk')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/);;
		expect(response.status).toEqual(400);
	});

	test('New blog needs to have url', async () => {
		const newBlog = {
			title: 'Zero Likes',
			author: 'Emil Selroos',
			url: '',
		}

		const response = await api
			.post('/api/blogs')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxzZWxyb29zIiwiaWQiOiI2MTBmM2FiN2E3OWMwNzJhYTQ1NTRjNGQiLCJpYXQiOjE2MjgzODgwNDN9.1YcI5O1yluKFnQeXGDS_WJdTlBjezOq3PCSiWwyD5Rk')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/);;
		expect(response.status).toEqual(400);

	});

	test('Authorization bearer is needed when creating a new post', async () => {
		const response = await api
		.post('/api/blogs')
		.send({})
		.expect(401)
		.expect('Content-Type', /application\/json/);
		expect(response.status).toEqual(401);

	});

});

// Close the connection after all API tests
afterAll(() => {
	mongoose.connection.close()
});
