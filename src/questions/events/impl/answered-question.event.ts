import { IEvent } from "@nestjs/cqrs";

export class AnsweredQuestionEvent implements IEvent {
    constructor(public readonly answerCorrect: boolean) { }
}