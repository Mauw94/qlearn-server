import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { QuestionCreatedEvent } from "../impl/question-created.event";
import { Logger } from "@nestjs/common";

@EventsHandler(QuestionCreatedEvent)
export class QuestionCreatedHandler implements IEventHandler<QuestionCreatedEvent> {
    handle(event: QuestionCreatedEvent) {
        Logger.log(event, 'QuestionCreatedEvent');
    }
}