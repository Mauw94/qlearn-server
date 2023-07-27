import { IEvent } from "@nestjs/cqrs";

export class QuestionCreatedEvent implements IEvent {
    constructor() { }
}