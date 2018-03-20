import { Singleton } from "typescript-ioc";

import IRepository from "./IRepository";
import { User } from "../models/User";

@Singleton
export default class UserRepository extends IRepository {

    public async getUsersByOffset(offset:number, limit: number): Promise<[User[], number]> {
        return this.getUserRepository().createQueryBuilder("user")
        .setLimit(limit).setOffset(offset).getManyAndCount();
    }
}