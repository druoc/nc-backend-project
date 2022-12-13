const express = require('express');
const { getTopics, getArticles } = require('./controllers/news');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route not found' });
});

module.exports = app;
