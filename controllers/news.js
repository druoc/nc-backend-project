const {
	selectTopics,
	selectArticles,
	selectArticlesById,
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

exports.getArticlesById = (req, res) => {
	const { article_id } = req.params;
	selectArticlesById(article_id).then((returnedArticle) => {
		returnedArticle === undefined
			? res.status(404).send({ msg: 'Route not found' })
			: res.status(200).send(returnedArticle);
	});
};
