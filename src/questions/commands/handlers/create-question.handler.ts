import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateQuestionCommand } from "../impl/create-question.command";
import { QuestionRepository } from "src/questions/repository/question.repository";
import { Inject, Logger } from "@nestjs/common";
import { PASSWORD_GENERATOR, PasswordGenerator } from "lib/PasswordModule";

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand>
{
    constructor(
        private readonly repository: QuestionRepository,
        private readonly publisher: EventPublisher
    ) { }

    @Inject(PASSWORD_GENERATOR)
    private readonly passwordGenerator: PasswordGenerator;

    async execute(command: CreateQuestionCommand) {
        Logger.log('Async CreateQuestionHandler..', 'CreateQuestionCommand');

        const { questionDto } = command;
        const question = this.publisher.mergeObjectContext(
            await this.repository.createQuestion(questionDto)
        );

        // var key = this.passwordGenerator.generateKey("test");
        // Logger.log(key, "PasswordGenerator");
        // move to account creation

        question.createQuestion();
        question.commit();
    }
}