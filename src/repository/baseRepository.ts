import { pipe } from "fp-ts/lib/function";
import { Collection, ObjectId } from "mongodb";
import TaskEither from 'fp-ts/TaskEither';
import { errorRespositoryResponse } from "../common/helpers";


// TaskEither is lazy and is optimised to handle async operations.
// Therefore, there's no need to us Async in the inner functions.
// In other situation, will need to use async/await to handle database operation.

export function baseRepository<T extends Document>(collection: Collection<T>) {
    const create = (data: T) => {
        return pipe(
            TaskEither.tryCatch(() => collection.insertOne(data as any),
            (error) => errorRespositoryResponse(error))
        ),
        TaskEither.chainNullableK((doc: T) => doc || null)
    }

    const findOneItem = (id: ObjectId) => {
        return pipe(
            TaskEither.tryCatch(
                () => collection.findOne({ _id: new Object(id) }),
                (error) => errorRespositoryResponse(error))
        )
    }

    // Take special importance
    const findItems = (data: T) => {
        return pipe(
            TaskEither.tryCatch(
                () => collection.find(data as any).toArray(),
                (error) => errorRespositoryResponse(error))
        )
    }

    const deleteOneItem = (id: ObjectId) => {
        return pipe(
            TaskEither.tryCatch(
                () => collection.deleteOne({ _id: id } as any), // Not pretty sure about this solution
                (error) => errorRespositoryResponse(error)
            )
        )

    }



    return {
        create,
        findOneItem,
        findItems,
        deleteOneItem
    }
}

