const User = require('./User');
const Blog = require('./Blog');
const Readinglist = require('./Readinglist');
const LoginData = require('./LoginData');

User.hasMany(Blog);
Blog.belongsTo(User);
User.hasOne(LoginData);

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' });
Blog.belongsToMany(User, { through: Readinglist });
//User.hasMany(Readinglist);
//Readinglist.belongsTo(User);
//Blog.hasMany(Readinglist);
//Readinglist.belongsTo(Blog);



// User.sync({ alter: true });
// Blog.sync({ alter: true });

module.exports = {
	User,
	Blog,
	Readinglist,
	LoginData,
};
