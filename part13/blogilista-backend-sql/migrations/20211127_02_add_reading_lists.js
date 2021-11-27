const { DataTypes } = require('sequelize');

module.exports = {

  up: async (queryInterface) => {

		await queryInterface.createTable('readinglist', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'users', key: 'id' },
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'blogs', key: 'id' },
			},
			is_read: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		});

  	},

	down: async (queryInterface) => {

		await queryInterface.dropTable('readinglist');

	},
}