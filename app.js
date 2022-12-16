const express = require('express');
const {
	getTopics,
	getArticles,
	getArticlesById,
	getArticleComments,
	postComment,
	patchArticleVote,
	getUsers,
	deleteCommentById,
} = require('./controllers/news');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticlesById);
app.get('/api/articles/:article_id/comments', getArticleComments);
app.get('/api/users', getUsers);
app.post('/api/articles/:article_id/comments', postComment);
app.put('/api/articles/:article_id', patchArticleVote);
app.delete('/api/comments/:comment_id', deleteCommentById);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route not found' });
});

//error handlers
app.use((err, req, res, next) => {
	if (err.code === '22P02') {
		res.status(400).send({ msg: 'Please enter a valid comment id' });
	} else {
		res.status(err.status).send({ msg: err.msg });
	}
});

module.exports = app;
