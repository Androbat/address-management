import { MongoClient } from 'mongodb';
import { tryCatch } from 'fp-ts/lib/TaskEither';
import { MongoConfig } from '../contracts/db.config';
import { mongoEnv, databaseEnv } from './dotenv.conf';



async function connectMongodb(client: MongoClient, db: string): MongoConfig {
    return tryCatch(
        async () => {
            const connected = await client.connect();
            if (!connected){
                console.error(`Unable to connect to mongodb`);
            } else {
                console.log(`Successfully connected to database`);
            }
            return client.db(db);
        },
        (error: unknown) => `Error connecting to MongoDB: ${error}`);
}



connectMongodb(new MongoClient(mongoEnv), databaseEnv).catch((error) => console.log(error));

