import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InitCacheCommand } from "../impl/init-cache.command";
import { Logger } from "@nestjs/common";
import { QuestionRepository } from "src/questions/repository/question.repository";

@CommandHandler(InitCacheCommand)
export class InitCacheHandler implements ICommandHandler<InitCacheCommand> {

    constructor(
        private readonly repository: QuestionRepository
    ) { }

    async execute(command: InitCacheCommand) {
        Logger.log("Async InitCacheCommand...", "InitCacheHandler");

        await this.repository.initCache(command.clientId);
    }
}