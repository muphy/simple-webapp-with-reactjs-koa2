import { getEntityManager } from "typeorm";
import { User} from "../models/User";

export default abstract class IRepository {

    protected getUserRepository() {
        return getEntityManager().getRepository(User);
    }

}
