const express = require('express');
const {
	getTopics,
	getArticles,
	getArticlesById,
} = require('./controllers/news');

const app = express();

app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticlesById);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route not found' });
});

module.exports = app;
