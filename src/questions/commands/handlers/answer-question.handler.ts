import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AnswerQuestionCommand } from "../impl/answer-question.command";
import { ArithmeticQuestionsRepository } from "src/questions/repository/question.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(AnswerQuestionCommand)
export class AnswerQuestionHandler implements ICommandHandler<AnswerQuestionCommand> {
    constructor(
        private readonly repository: ArithmeticQuestionsRepository,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: AnswerQuestionCommand): Promise<boolean> {
        Logger.log('Async AnswerQuestionHandler..', 'AnswerQuestionCommand');

        const { clientId, answer, questionId } = command;

        const question = this.publisher.mergeObjectContext(
            await this.repository.findById(clientId, questionId)
        );

        var result = question.answerQuestion(answer);
        question.commit();

        return result;
    }
}