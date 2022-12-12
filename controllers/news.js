const { selectTopics } = require('../models/news');

exports.getTopics = (req, res) => {
	selectTopics().then((returnedTopics) => {
		res.status(200).send(returnedTopics);
		console.log({ topics: returnedTopics });
	});
};
