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
			return articleData[0];
		});
};
