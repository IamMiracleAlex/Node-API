module.exports = {
    "type": "mongodb",
    "url": "mongodb+srv://heckerbella:heckerbella@cluster0.plhjide.mongodb.net/?retryWrites=true&w=majority",
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