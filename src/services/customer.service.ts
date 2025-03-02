import { Collection, ObjectId } from "mongodb";
import { baseRepository } from "../repository/baseRepository";
import { Customer } from "../contracts/user.interface";
import { pipe } from 'fp-ts/function';
import { TaskEither } from 'fp-ts/TaskEither';
import { taskEither } from "fp-ts";

async function customerService(repository: typeof baseRepository<Customer>, customerCollection: Collection<Customer>) {
    // 1. Insert user
    // Check if the user is repeated before insert it
    // if the user is not repeated insert it.

    // 2. Insert addresses
    // when we're going to insert an address, we must check that this address is not preseent
    // in other users.
    // Also the address cannot be repeated in the user we're trying to add more than one address.
    const initBaseRepository = repository(customerCollection);

    async function createNewCustomer(name: string, lastname: string, address: string, id?: string,): TaskEither<Error, Customer>{
       const objectId = new ObjectId(id);
       return pipe(
            initBaseRepository.findOneItem(objectId),
            taskEither.chain((customer) => {
                if (customer) {
                    return taskEither.left({ 
                        type: "error",
                        message: "Customer already exists"
                    });
                }

                const newCustomer = { name, lastname, address };
                return initBaseRepository.create(newCustomer);
            })
       )
    
    }

    return {
        createNewCustomer
    }
}