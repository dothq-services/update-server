import { Sequelize, DataTypes } from 'sequelize'

const {
    DB_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    DB_PORT
} = process.env

const db = new Sequelize(
	MYSQL_DATABASE,
	MYSQL_USER,
	MYSQL_PASSWORD,
	{
		host: DB_HOST,
        port: +DB_PORT,
		dialect: "mysql",
		logging: false
	}
);

export const Releases = db.define('releases', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target: {
        type: DataTypes.STRING,
        allowNull: false
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    displayversion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buildID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    whatsnewurl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releasenotesurl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseurl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseha512: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releasetype: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})

export const tryDBConnection = async () => {
    try {
        await db.authenticate();
    } catch (error) {
        return ('Unable to connect to database:' + error);
    }   
}