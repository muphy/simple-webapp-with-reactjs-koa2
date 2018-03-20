import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as Router from "koa-router";
import * as jwt from "koa-jwt";

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";

import UserRoutes from "./routes/UserRoutes";
import { User } from "./models/User";

export default class App {

    constructor(
        @Inject private userRoutes: UserRoutes) {

    }
    private async createApp() {

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
            entities: [User],
            logging: {
                logQueries: true
            }
        });

        const app: Koa = new Koa();
        const router: Router = new Router();

        this.userRoutes.register(router);

        // Middleware below this line is only reached if JWT token is valid
        // unless the URL starts with '/public'
        //ctx.state.user
        app.use(logger());
        app.use(bodyParser());
        app.use(router.allowedMethods());
        // app.use(jwt({ secret: "secret" }).unless({ path: [/^\/api\/public/, /^\/public/] }));
        app.use(router.routes());

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.createApp();
        console.log("Started listening on port 4000...");
        const server = app.listen(4000);
        return Promise.resolve(server);
    }

}
