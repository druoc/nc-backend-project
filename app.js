const express = require('express');


const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticlesById);
app.get('/api/articles/:article_id/comments', getArticleComments);
app.post('/api/articles/:article_id/comments', postComment);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route not found' });
});

//error handlers
app.use((err, req, res, next) => {
	res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
