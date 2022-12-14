const {
	selectTopics,
	selectArticles,
	selectArticlesById,
	selectArticleComments,
} = require('../models/news');

exports.getTopics = (req, res) => {
	selectTopics().then((returnedTopics) => {
		res.status(200).send(returnedTopics);
	});
};

exports.getArticles = (req, res) => {
	selectArticles().then((returnedArticles) => {
		res.status(200).send({ articles: returnedArticles });
	});
};

exports.getArticlesById = (req, res, next) => {
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
