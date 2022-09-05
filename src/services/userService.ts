// src/users/usersService.ts\
import {User} from "../models/users";
import {getRepository} from "typeorm";

// import { PostgresError } from "../../node/database/postgres/postgres-error";
// import { PostgresErrorCode } from "../../node/database/postgres/postgres-error-codes";
// import { HttpStatusCode } from "../common/http-status-code";
// import { OperationError } from "../common/operation-error";
// import { isValidEmail } from "../../common/validation/is-valid-email";
// import { UserRepository } from "../../node/database/repositories/user-repository";

export interface ICreateUserRequest {
    firstName: string;
    lastName: string;
    age?: number;
}

export interface IUpdateUserRequest {
    firstName?: string;
    lastName?: string;
    age?: number;
}

export class UserService {
    private userRepository = getRepository(User);

    public async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async getUserById(id: number): Promise<User> {
        return this.userRepository.findOneOrFail(id);
    }

    public async createUser(requestBody) {
        return this.userRepository.save(requestBody);
    }

    public async deleteUser(id: number): Promise<void> {
        let userToRemove = await this.userRepository.findOne(id);
        if (!userToRemove) throw new Error('Invalid Input');
        await this.userRepository.remove(userToRemove);
    }

    public async updateUser(id: number, requestBody): Promise<User> {          
        try {
            // await this.pick6Repository.findOneOrFail(request.params.id);
            await this.userRepository.update({id: id}, requestBody);
            let updatedUser = await this.userRepository.findOneOrFail(requestBody);
            return updatedUser;
        } catch (err) {
            console.log(err);
            throw new Error("Invalid Input");
        }
    }
    
}
