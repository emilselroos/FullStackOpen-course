const { DataTypes } = require('sequelize')

module.exports = {

  up: async (queryInterface) => {

		await queryInterface.addColumn('blogs', 'year', {
			type: DataTypes.INTEGER,
			allowNull: false,
		})

  	},

	down: async (queryInterface) => {

		// await queryInterface.dropTable('blogs');
		// await queryInterface.dropTable('users');

	},
}