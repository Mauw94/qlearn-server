import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../impl/create-user.command";
import { UserRespository } from "src/users/repository/user.repository";
import { Inject, Logger } from "@nestjs/common";
import { PasswordGenerator } from "lib/PasswordModule";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: UserRespository) { }
    
    @Inject()
    private readonly passwordGenerator: PasswordGenerator;

    async execute(command: CreateUserCommand) {
        Logger.log('Async CreateUserHandler...' , 'CreateUserCommand');

        const { userDto } = command;
        userDto.password = this.passwordGenerator.generateKey('key');
        // mail the password? 
        const user = this.publisher.mergeObjectContext(
            await this.repository.createUser(userDto)
        );

        user.commit();
    }
}