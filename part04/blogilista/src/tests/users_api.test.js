const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/users.js');

const initialUsers = [
	{
		username: 'emilselroos',
		name: 'Emil Selroos',
		password: 'salasana',
		blogs: []
	},
	{
		username: 'onnilunden',
		name: 'Emil Selroos',
		password: 'salasana',
		blogs: []
	},
];

beforeEach(async () => {
	/*
	// Delete all rows on Blog collection
	await User.deleteMany({});
	// Create new "demo" rows to test against
	const userObjects = initialUsers.map(user => new User(user));
	const promiseArray = userObjects.map(user => user.save());
	await Promise.all(promiseArray)
	*/
});

describe('Users API', () => {

	test('Users are returned as JSON', async () => {
		const response = await api.get('/api/users');
		expect(response.body).toHaveLength(2);
	});

	test('Username needs to be more than 3 chars long', async () => {
		const newUser = {
			username: 'a',
			name: 'Emil Selroos',
			password: 'password',
		}
		const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);;
		expect(response.status).toEqual(400);
	});

	test('Password needs to be more than 3 chars long', async () => {
		const newUser = {
			username: 'a',
			name: 'Emil Selroos',
			password: 'pa',
		}
		const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);;
		expect(response.status).toEqual(400);
	});

});

// Close the connection after all API tests
afterAll(() => {
	mongoose.connection.close()
});
