import { ICommand } from "@nestjs/cqrs";

export class AnswerQuestionCommand implements ICommand {
    constructor(
        readonly key: string,
        readonly answer: string,
        readonly questionId: string
    ) { }
}