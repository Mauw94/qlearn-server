import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { HitstoryQuestionRepository } from "src/questions/repository/history-question.repository";
import { InitCacheHistoryQuestionsCommand } from "../impl/init-cache-history-questions.command";
import { Difficulty } from "src/questions/models/difficulty.enum";

@CommandHandler(InitCacheHistoryQuestionsCommand)
export class InitCacheHistoryQuestionsHandler implements ICommandHandler<InitCacheHistoryQuestionsCommand> {

    constructor(
        private readonly historyQuestionsRepo: HitstoryQuestionRepository
    ) { }

    async execute(command: InitCacheHistoryQuestionsCommand) {
        Logger.log("Async InitCacheHistoryQuestionsCommand...", "InitCacheHistoryQuestionsHandler");
        await this.historyQuestionsRepo.init(Difficulty.EASY, command.clientId);
    }
}