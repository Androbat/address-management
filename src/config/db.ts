import { MongoClient, MongoError } from 'mongodb';

import { mongoEnv, databaseEnv } from './dotenv.conf';



async function connectMongodb(connectMongo: (db: string) => MongoClient, db: string) {
    const initMongoConnect = connectMongo(db);
    const connect = initMongoConnect.connect();
    return connect.then(() => {
        return connect;
    }).catch((error: MongoError) => {
        switch (error.name) {
            case "MongoNetworkError":
                console.log(`Connection failed for network error`);
                break;
            case "MongoAuthenticationError":
                console.log(`Mongo Authentication Error while connecting...`);
                break;
            case "MongoTimeoutError":
                console.log(`Mongo timeout error took much to connect`);
                break;
            case "MongoServerSelectionError":
                console.log(`No server available to connect: check your port`);
            default:
                console.log(`Connection failed`)
        }
    })
}

connectMongodb((db) => new MongoClient(mongoEnv), databaseEnv)
    .then(() => console.log(`Connected to mongo`))
    .catch((error) => console.log(`${error.message}`));


