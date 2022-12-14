const db = require('../db/connection');
const { commentData } = require('../db/data/test-data');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then(({ rows: topicsData }) => {
		return topicsData;
	});
};

exports.selectArticles = () => {
	return db
		.query(
			`SELECT articles.*,
		COUNT(comment_id):: INT AS comment_count 
		FROM articles 
		LEFT JOIN comments 
		ON articles.article_id = comments.article_id
		GROUP BY articles.article_id
		ORDER BY articles.created_at DESC;`
		)
		.then(({ rows: articlesData }) => {
			return articlesData;
		});
};

exports.selectArticlesById = (article_id) => {
	return db
		.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
		.then(({ rows: articleData }) => {
			if (articleData[0] === undefined) {
				return Promise.reject({ status: 400, msg: 'Article does not exist' });
			}
			return articleData[0];
		});
};

exports.selectArticleComments = (article_id) => {
	return db
		.query('SELECT * FROM comments WHERE article_id = $1', [article_id])
		.then(({ rows: commentData }) => {
			if (commentData.length === 0) {
				return Promise.reject({
					status: 400,
					msg: 'Article ID does not exist',
				});
			}
			return commentData;
		});
};
