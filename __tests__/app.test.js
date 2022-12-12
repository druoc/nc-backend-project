const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => {
	return seed(testData);
});

afterAll(() => {
	if (db.end) db.end();
});

describe('GET/api/topics', () => {
	test('responds with a 200 status code and an array of topic objects', () => {
		return request(app)
			.get('/api/topics')
			.expect(200)
			.then(({ body }) => {
				expect(body).toBeInstanceOf(Array);
				body.forEach((topic) => {
					expect(topic).toEqual(
						expect.objectContaining({
							slug: expect.any(String),
							description: expect.any(String),
						})
					);
				});
			});
	});
	test('responds with a 404 status code and a msg object containing an error message if an incorrect path is accessed', () => {
		return request(app)
			.get('/api/topic')
			.expect(404)
			.then(({ body }) => {
				expect(body).toBeInstanceOf(Object);
				expect(body).toEqual(
					expect.objectContaining({
						msg: 'Route not found',
					})
				);
			});
	});
});
