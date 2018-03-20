import { Singleton, Inject } from "typescript-ioc";
import UserRepository from "../repositories/UserRepository";

@Singleton
export class UserService {

    constructor(@Inject private userRepository: UserRepository) {

    }

    // public async getUsers()
}