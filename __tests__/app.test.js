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

describe.only('GET/api/topics', () => {
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

describe('GET/api/articles:/article_id', () => {
	test('responds with a 200 status code, and an article object matching the article id requested', () => {
		const ID = 3;
		return request(app)
			.get(`/api/articles/${ID}`)
			.expect(200)
			.then(({ body }) => {
				expect(body).toEqual(
					expect.objectContaining({
						article_id: expect.any(Number),
						title: expect.any(String),
						topic: expect.any(String),
						author: expect.any(String),
						body: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
					})
				);
			});
	});
	test('responds with a 400 status code an an error object when passed an invalid article id', () => {
		const ID = 2000;
		return request(app)
			.get(`/api/articles/${ID}`)
			.expect(400)
			.then(({ body }) => {
				expect(body).toBeInstanceOf(Object);
				expect(body).toEqual(
					expect.objectContaining({
						msg: 'Article does not exist',
					})
				);
			});
	});
});

describe('GET/api/articles/:article_id/comments', () => {
	test('responds with a 200 status code and returns an array of comments with the relevant article_id', () => {
		const ID = 1;
		return request(app)
			.get(`/api/articles/${ID}/comments`)
			.expect(200)
			.then(({ body }) => {
				expect(body).toBeInstanceOf(Array);
				body.forEach((comment) => {
					expect(comment).toEqual(
						expect.objectContaining({
							comment_id: expect.any(Number),
							body: expect.any(String),
							article_id: expect.any(Number),
							author: expect.any(String),
							votes: expect.any(Number),
							created_at: expect.any(String),
						})
					);
				});
			});
	});
	test('responds with a 400 status code if passed an invalid article_id', () => {
		const ID = 2456;
		return request(app)
			.get(`/api/articles/${ID}/comments`)
			.expect(400)
			.then(({ body }) => {
				expect(body).toBeInstanceOf(Object);
				expect(body).toEqual(
					expect.objectContaining({
						msg: 'Article ID does not exist',
					})
				);
			});
	});
});

describe('POST/api/articles/:article_id/comments', () => {
	test('responds with a 201 status code and returns the comment posted by the user', () => {
		const ID = 3;
		const comment = {
			username: 'butter_bridge',
			body: 'I agree dude',
		};
		return request(app)
			.post(`/api/articles/${ID}/comments`)
			.send(comment)
			.expect(201)
			.then(({ body }) => {
				expect(body[0]).toBeInstanceOf(Object);
				expect(body[0]).toEqual(
					expect.objectContaining({
						comment_id: expect.any(Number),
						body: expect.any(String),
						article_id: expect.any(Number),
						author: expect.any(String),
						votes: expect.any(Number),
						created_at: expect.any(String),
					})
				);
			});
	});
	test('responds with a 400 status code and an error message if no username or body is passed', () => {
		const ID = 3;
		return request(app)
			.post(`/api/articles/${ID}/comments`)
			.send()
			.expect(400)
			.then(({ body }) => {
				expect(body).toBeInstanceOf(Object);
				expect(body).toEqual(
					expect.objectContaining({
						msg: 'Incomplete request',
					})
				);
			});
	});
});
