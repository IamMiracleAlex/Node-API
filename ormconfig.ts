module.exports = {
    "type": "postgres",
    "host": process.env.NICKL_DB_HOST,
    "port": process.env.NICKL_DB_PORT,
    "username": process.env.NICKL_DB_USER,
    "password": process.env.NICKL_DB_PASSWORD,
    "database": process.env.NICKL_DB_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [
       "build/src/models/**/*.js"

    ],
    "migrations": [
       "src/migration/**/*.ts",
       "build/src/migration/**/*.js"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts",
       "build/src/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": "build/src/models",
        "migrationsDir": "build/src/migration",
        "subscribersDir": "build/src/subscriber"
     } 
 };