import { IRouterContext } from "koa-router";
import { Inject } from "typescript-ioc";
import UserController from "../controllers/UserController";
import Route from "./Route";
import IRoutes from "./IRoutes";

export default class UserRoutes extends IRoutes {

    constructor(@Inject private userController: UserController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/api/public/users", "get", (ctx: IRouterContext) => this.userController.getUsers(ctx))
        ];
    }
}
