import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AnswerQuestionCommand } from "../impl/answer-question.command";
import { QuestionRepository } from "src/questions/repository/question.repository";
import * as clc from 'cli-color';

@CommandHandler(AnswerQuestionCommand)
export class AnswerQuestionHandler implements ICommandHandler<AnswerQuestionCommand> {
    constructor(
        private readonly repository: QuestionRepository,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: AnswerQuestionCommand): Promise<any> {
        const { answer, questionId } = command;

        const question = this.publisher.mergeObjectContext(
            await this.repository.findById(questionId)
        );

        question.answerQuestion(answer);
        question.commit();
    }
}