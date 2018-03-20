import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import "sinon-chai";
import { instance, mock, verify, when } from "ts-mockito";

import { createConnection, getEntityManager, Repository } from "typeorm";

import { UserService } from "../../src/services/UserService";
import UserRepository from "../../src/repositories/UserRepository";
import { PageQuery } from "../../src/models/meta/Pagination";

import { User } from "../../src/models/User";

describe("UserService", () => {
    
    beforeEach(() => {
    });

    describe("getUsers", () => {
        it("should return user list with pageinfo", async () => {
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
                // entities: ["../../src/models/*"],
                entities: [User],
                logging: {
                    logQueries: true
                }
            });
            let userService = new UserService(new UserRepository());
            const pageQuery = new PageQuery();
            const result = await userService.getUsers(pageQuery,"defaulturl");
            expect(result.current_page).to.equal(1);
            expect(result.data.length).to.equal(10);
            expect(result.data[0].id).to.equal("e53f1c8d-7109-47b7-b3ae-fb9a6605ecb3");
        });
    });
});
