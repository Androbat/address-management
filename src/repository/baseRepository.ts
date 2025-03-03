import {  BaseEntity } from "../contracts/baseEntity";
import { Collection, ObjectId, WithId } from 'mongodb';

// Following open close priciples:
// * Open for extention
// * Closed for modification
export abstract class BaseRepository<T extends BaseEntity>  {
    private collection: Collection<T>;

    constructor(_collection: Collection<T>){
        this.collection = _collection;
    }

    async create(item: T): Promise<T> {
        const result = await this.collection.insertOne(item as any);
        return {...item, _id: result.insertedId }
    }

    async update(id: string, item: Partial<T>): Promise<boolean>{
        const result = await this.collection.updateOne(
               { _id: new ObjectId(id) as any } ,
                { $set: item }     
        );
        return result.modifiedCount > 0;
    }

    async findOne(id: string): Promise<WithId<T> | null> {
        return this.collection.findOne({ _id: new ObjectId(id) } as any);
    }

}