import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserFactory } from "../user.factory";

@Injectable()
export class UserRespository {
    constructor(
        private readonly userFactory: UserFactory) {}

    async createUser(userDto: CreateUserDto) {
        const user = this.userFactory.create(userDto);
        return user;
    }
}