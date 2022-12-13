const { selectTopics, selectArticles } = require('../models/news');

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
