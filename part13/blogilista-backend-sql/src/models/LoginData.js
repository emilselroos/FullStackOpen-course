const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../util/db');

class LoginData extends Model {}

LoginData.init({

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

	}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'login_data',
	freezeTableName: false,
});

module.exports = LoginData;