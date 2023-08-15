import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InitCacheMathArithmeticQuestionsCommand } from "../impl/init-cache-math-arithmetic-questions.command";
import { Logger } from "@nestjs/common";
import { HitstoryQuestionRepository } from "src/questions/repository/history-question.repository";
import { InitCacheHistoryQuestionsCommand } from "../impl/init-cache-history-questions.command";

@CommandHandler(InitCacheHistoryQuestionsCommand)
export class InitCacheHistoryQuestionsHandler implements ICommandHandler<InitCacheHistoryQuestionsCommand> {

    constructor(
        private readonly historyQuestionsRepo: HitstoryQuestionRepository
    ) { }

    async execute(command: InitCacheMathArithmeticQuestionsCommand) {
        Logger.log("Async InitCacheHistoryQuestionsCommand...", "InitCacheMathArithmeticQuestionsHandler");
        await this.historyQuestionsRepo.init(command.clientId);
    }
}