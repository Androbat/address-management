import { ObjectId } from "mongodb";



export interface Customer extends Document {
  id?: string;
  name: string;
  lastname: string;
  address: Array<string>;

}

// // (parameter) repository: Promise<{
//     create: (data: Document) => Promise<(<A, B>(f: (a: A) => B | null | undefined) => (ma: TaskEither<(doc: Document) => Document, A>) => TaskEither<...>)>;
//     findOneItem: (id: ObjectId) => Promise<...>;
//     findItems: (data: Document) => Promise<...>;
//     deleteOneItem: (id: ObjectId) => Promise<...>;