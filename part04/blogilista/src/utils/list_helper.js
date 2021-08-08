const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
}

const totalLikes = (blogs) => {
	let count = 0;
	blogs.map((blog) => {
		count = count + blog.likes;
	});
	return count;
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((accumulator, currentValue) => {
		if (accumulator.likes > currentValue.likes) {
			return accumulator
		} else {
			return currentValue
		}
	});
}

const mostBlogs = (blogs) => {

	let authors = [];
	blogs.map((blog) => authors.push(blog.author));

	let counts = {};
	authors.forEach((x) => { counts[x] = (counts[x] || 0)+1; });

	let sortedValues = _.values(counts);
	let mostBlogPostsCount = _.max(sortedValues);
	let mostBlogPostsAuthor = _.findKey(counts, (o) => {return o === mostBlogPostsCount});

	return {
		author: mostBlogPostsAuthor,
		blogs: mostBlogPostsCount,
	};
}

const mostLikes = (blogs) => {

	let authors = [];
	blogs.map((blog) => authors.push({
		author: blog.author,
		likes: blog.likes,
	}));

	let likes = {};
	authors.forEach((x) => { likes[x.author] = (likes[x.author] || 0) + x.likes; });

	let sortedValues = _.values(likes);
	let mostBlogPostsCount = _.max(sortedValues);
	let mostBlogPostsAuthor = _.findKey(likes, (o) => {return o === mostBlogPostsCount});

	return {
		author: mostBlogPostsAuthor,
		likes: mostBlogPostsCount,
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
