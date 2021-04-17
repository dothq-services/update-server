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
    channel: {
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
    displayVersion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buildID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    whatsNewURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseNotesURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseFileURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseFileChecksum: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseFileSize: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    releaseType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

export const Targets = db.define('targets', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    displayname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

export const TargetAliases = db.define('target-aliases', {
    target: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false
    }
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