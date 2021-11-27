const { DataTypes } = require('sequelize');

module.exports = {

  up: async (queryInterface) => {

	await queryInterface.addColumn('users', 'disabled', {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		});

	await queryInterface.createTable('login_data', {
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
		token: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

	});

  	},

	down: async (queryInterface) => {

		

	},
}