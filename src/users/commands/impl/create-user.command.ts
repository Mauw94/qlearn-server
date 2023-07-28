import { ICommand } from "@nestjs/cqrs";
import { CreateUserDto } from "src/users/dtos/create-user.dto";

export class CreateUserCommand implements ICommand {
    constructor(public readonly userDto: CreateUserDto) { }
}