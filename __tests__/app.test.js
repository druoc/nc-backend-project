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

describe('GET/api/articles', () => {
	test('returns with a 200 response code and an articles array of article objects', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then(({ body }) => {
				expect(body.articles).toBeInstanceOf(Array);
				body.articles.forEach((article) => {
					expect(article).toEqual(
						expect.objectContaining({
							article_id: expect.any(Number),
							title: expect.any(String),
							topic: expect.any(String),
							author: expect.any(String),
							body: expect.any(String),
							created_at: expect.any(String),
							votes: expect.any(Number),
							comment_count: expect.any(Number),
						})
					);
				});
			});
	});
	test('responds with a 404 status code and a msg object containing an error message if an incorrect path is accessed', () => {
		return request(app)
			.get('/api/article')
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

describe.only('GET/api/articles:/article_id', () => {
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
	test('responds with a 404 status code an an error object when passed an invalid article id', () => {
		const ID = 2000;
		return request(app)
			.get(`/api/articles/${ID}`)
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
