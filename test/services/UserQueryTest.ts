import { createConnection, getEntityManager, Repository } from "typeorm";
import * as assert from "assert";
// import UserService from "../../src/services/UserService";
import UserRepository from "../../src/repositories/UserRepository";

async function test() {
    await createConnection({
        name: "default",
        driver: {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "mydb",
        },
        entities: ["../../src/models/*"],
        logging: {
            logQueries: true
        }
    });
    const userRepository = new UserRepository();
    const result = await userRepository.getUsersByOffset(0,10);
    //result[0] is user list
    assert.equal(result[0].length,10);
    //result[1] is totall count
    assert.equal(result[1],100000);

    //test page
}

test();


// const rowUserRepository = getEntityManager().getRepository(User);
// const users: User[] = await getEntityManager().getRepository(User).createQueryBuilder("user")
//     .select().from(User, "user")
//     .setLimit(10)
//     .getMany();

// console.log(JSON.stringify(users));