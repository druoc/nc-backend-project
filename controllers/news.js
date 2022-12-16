const {
	selectTopics,
	selectArticles,
	selectArticlesById,
	selectArticleComments,
	addComment,
	updateArticleVote,
	fetchUsers,
} = require('../models/news');

exports.getTopics = (req, res) => {
	selectTopics()
		.then((returnedTopics) => {
			res.status(200).send(returnedTopics);
		})
		.catch((err) => next(err));
};

exports.getArticles = (req, res) => {
	selectArticles()
		.then((returnedArticles) => {
			res.status(200).send({ articles: returnedArticles });
		})
		.catch((err) => next(err));
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

exports.patchArticleVote = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;
	return inc_votes
		? updateArticleVote(inc_votes, article_id)
				.then((returnedArticle) => {
					res.status(200).send(returnedArticle);
				})
				.catch((err) => next(err))
		: res.status(400).send({ msg: 'Please provide a votes value' });
};

exports.getUsers = (req, res, next) => {
	fetchUsers().then((returnedUsers) => {
		res.status(200).send({ users: returnedUsers });
	});
};
