import { Singleton, Inject } from "typescript-ioc";
import UserRepository from "../repositories/UserRepository";
import { PageQuery, PageResult, IPageResult } from "../models/meta/Pagination";
import { User } from "../models/User";
@Singleton
export class UserService {

    constructor(@Inject private userRepository: UserRepository) {
    }

    public async getUsers(pageQuery: PageQuery, url: string): Promise<IPageResult<User>> {
        const offset = pageQuery.getOffset();
        const limit = pageQuery.getLimit();
        const userResult = await this.userRepository.getUsersByOffset(offset, limit);
        const users: User[] = userResult[0];
        const total = userResult[1];

        const pageResult = new PageResult<User>(pageQuery, total, users, url);
        return pageResult.paginate();
    }
}