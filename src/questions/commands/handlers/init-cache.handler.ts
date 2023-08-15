import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InitCacheCommand } from "../impl/init-cache.command";
import { Logger } from "@nestjs/common";
import { ArithmeticQuestionsRepository } from "src/questions/repository/question.repository";
import { HitstoryQuestionRepository } from "src/questions/repository/history-question.repository";

@CommandHandler(InitCacheCommand)
export class InitCacheHandler implements ICommandHandler<InitCacheCommand> {

    constructor(
        private readonly arithmeticQuestionsRepo: ArithmeticQuestionsRepository,
        private readonly historyQuestionsRepo: HitstoryQuestionRepository
    ) { }

    async execute(command: InitCacheCommand) {
        Logger.log("Async InitCacheCommand...", "InitCacheHandler");

        await this.arithmeticQuestionsRepo.initCache(command.difficulty, command.clientId);
        await this.historyQuestionsRepo.init();
    }
}