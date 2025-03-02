import { TaskEither } from "fp-ts/lib/TaskEither";
import { Db } from "mongodb";

export type MongoConfig = Promise<TaskEither<string, Db>>;

