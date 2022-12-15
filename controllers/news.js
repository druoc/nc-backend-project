const {
	selectTopics,
	selectArticlesById,
	selectArticleComments,
	addComment,
} = require('../models/news');

exports.getTopics = (req, res) => {
	selectTopics().then((returnedTopics) => {
		res.status(200).send(returnedTopics);
	});
};

exports.getArticles = (req, res) => {
	const { article_id } = req.params;
	selectArticlesById(article_id)
		.then((returnedArticle) => {
			res.status(200).send(returnedArticle);
		})
		.catch((err) => next(err));
};

exports.getArticleComments = (req, res, next) => {
	const { article_id } = req.params;
	selectArticleComments(article_id)
		.then((returnedComments) => {
			res.status(200).send(returnedComments);
		})
		.catch((err) => next(err));
};

exports.postComment = (req, res, next) => {
	const { article_id } = req.params;
	const comment = {
		...req.body,
		article_id,
	};
	addComment(comment)
		.then((returnedComment) => {
			res.status(201).send(returnedComment);
		})
		.catch((err) => next(err));
};
