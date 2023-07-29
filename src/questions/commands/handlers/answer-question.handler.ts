import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AnswerQuestionCommand } from "../impl/answer-question.command";
import { QuestionRepository } from "src/questions/repository/question.repository";

@CommandHandler(AnswerQuestionCommand)
export class AnswerQuestionHandler implements ICommandHandler<AnswerQuestionCommand> {
    constructor(
        private readonly repository: QuestionRepository,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: AnswerQuestionCommand): Promise<boolean> {
        const { answer, questionId } = command;

        const question = this.publisher.mergeObjectContext(
            await this.repository.findById(questionId)
        );

        var result = question.answerQuestion(answer);
        question.commit();

        return result;
    }
}