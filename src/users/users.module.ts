import { Module } from "@nestjs/common";
import { CommandHandler, CqrsModule } from "@nestjs/cqrs";
import { PasswordModule } from "lib/PasswordModule";
import { UsersController } from "./controllers/users.controller";
import { UserRespository } from "./repository/user.repository";
import { CommandHandlers } from "./commands/handlers";

@Module({
    imports: [CqrsModule, PasswordModule],
    controllers: [UsersController],
    providers: [
        UserRespository,
        ...CommandHandlers,
    ]
})
export class UsersModule { } 