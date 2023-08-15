import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InitCacheMathArithmeticQuestionsCommand } from "../impl/init-cache-math-arithmetic-questions.command";
import { Logger } from "@nestjs/common";
import { ArithmeticQuestionsRepository } from "src/questions/repository/question.repository";

@CommandHandler(InitCacheMathArithmeticQuestionsCommand)
export class InitCacheMathArithmeticQuestionsHandler implements ICommandHandler<InitCacheMathArithmeticQuestionsCommand> {

    constructor(
        private readonly arithmeticQuestionsRepo: ArithmeticQuestionsRepository,
    ) { }

    async execute(command: InitCacheMathArithmeticQuestionsCommand) {
        Logger.log("Async InitCacheMathArithmeticQuestionsCommand...", "InitCacheMathArithmeticQuestionsHandler");
        await this.arithmeticQuestionsRepo.init(command.difficulty, command.clientId);
    }
}