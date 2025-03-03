import { MongoClient } from 'mongodb';

import { mongoEnv, databaseEnv } from './dotenv.conf';



async function connectMongodb(connectMongo: (db: string) => MongoClient, db: string) {
    const connect = connectMongo(db);
    


}


