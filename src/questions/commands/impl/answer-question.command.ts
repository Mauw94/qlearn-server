import { ICommand } from "@nestjs/cqrs";

export class AnswerQuestionCommand implements ICommand {
    constructor(
        public readonly answer: string,
        public readonly questionId: string
    ) { }
}