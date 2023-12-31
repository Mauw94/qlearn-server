import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateQuestionCommand } from "../impl/create-question.command";
import { Logger } from "@nestjs/common";
import { BaseQuestionRepository } from "src/questions/repository/question.repository.interface";

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand>
{
    constructor(
        private readonly repository: BaseQuestionRepository,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: CreateQuestionCommand) {
        Logger.log('Async CreateQuestionHandler..', 'CreateQuestionCommand');

        const { clientId: clientId, questionDto } = command;
        const question = this.publisher.mergeObjectContext(
            await this.repository.createQuestion(clientId, questionDto)
        );

        question.createQuestion();
        question.commit();
    }
}