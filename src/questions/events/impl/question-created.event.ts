import { IEvent } from "@nestjs/cqrs";
import { QuestionDto } from "src/questions/dtos/question.dto";

export class QuestionCreatedEvent implements IEvent {
    constructor(
        public readonly questionDto: QuestionDto) { }
}