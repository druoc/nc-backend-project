const {
	selectTopics,
	selectArticlesById,
	selectArticleComments,
} = require('../models/news');

exports.getTopics = (req, res) => {
	selectTopics().then((returnedTopics) => {
		res.status(200).send(returnedTopics);
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
