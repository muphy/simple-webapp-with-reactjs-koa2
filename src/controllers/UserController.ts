import { IRouterContext } from "koa-router";
import { Container, Inject, Singleton } from "typescript-ioc";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { PageQuery } from "../models/meta/Pagination";

@Singleton
export default class UserController {

    constructor(@Inject private userService: UserService) { }

    public async getUsers(ctx: IRouterContext) {
        try {
            const url = ctx.url;
            const currentPage = ctx.query.current_page;
            const limit = ctx.query.limit;
            const pageQuery = new PageQuery(currentPage, limit);
            const result = await this.userService.getUsers(pageQuery, url);
            ctx.status = 200;
            ctx.body = result;
        } catch (e) {
            ctx.status = 500;
            ctx.body = e.message;
        }
    }
}