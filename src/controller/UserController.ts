import {User} from "../models/users";

import { 
    Body, 
    Delete, 
    Get, 
    Patch, 
    Path, 
    Post, 
    Query, 
    Route, 
    Tags, 
    Controller,
    SuccessResponse, 
} from "tsoa";
import {
  ICreateUserRequest,
  IUpdateUserRequest,
  UserService,
} from "../services/userService";

@Route("users")
export class UserController extends Controller {
    @Get()
    public async getUsers(): Promise<User[]> {
        return this.service.getUsers();
    }

    /**
     * @isInt id id must be a positive integer
     * @minimum id 1
    */
    @Get("{id}")
    public async GetUserById(@Path() id: number): Promise<User> {
        return this.service.getUserById(id);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async CreateUser(@Body() requestBody): Promise<User> {
        console.log(requestBody)
        return this.service.createUser(requestBody);
    }

    /**
    * @isInt id id must be a positive integer
    * @minimum id 1
    */
    @Delete("{id}")
    public async DeleteUser(@Path() id: number) {
        return this.service.deleteUser(id);
    }

    @Patch("{id}")
    public async UpdateUser(
        @Path() id: number,
        @Body() requestBody): Promise<User> {
        return this.service.updateUser(id, requestBody);
    }

    private get service() {
        return new UserService();
    }
    
}