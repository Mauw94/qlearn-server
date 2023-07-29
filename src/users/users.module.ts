import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PasswordModule } from "libs/PasswordModule";
import { UsersController } from "./controllers/users.controller";
import { UserRespository } from "./repository/user.repository";
import { CommandHandlers } from "./commands/handlers";
import { UserFactory } from "./user.factory";

@Module({
    imports: [CqrsModule, PasswordModule],
    controllers: [UsersController],
    providers: [
        UserRespository,
        UserFactory,
        ...CommandHandlers,
    ]
})
export class UsersModule { } 