const db = require('../db/connection');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then(({ rows: topicsData }) => {
		return topicsData;
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

exports.addComment = (comment) => {
	const { username, body, article_id } = comment;
	if (!username || !body) {
		return Promise.reject({
			status: 400,
			msg: 'Incomplete request',
		});
	}
	return db
		.query(
			'INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;',
			[username, body, article_id]
		)
		.then(({ rows }) => {
			return rows;
		});
};
