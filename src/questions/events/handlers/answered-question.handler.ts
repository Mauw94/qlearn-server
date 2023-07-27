import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AnsweredQuestionEvent } from "../impl/answered-question.event";
import { Logger } from "@nestjs/common";

@EventsHandler(AnsweredQuestionEvent)
export class AnsweredQuestionHandler implements IEventHandler<AnsweredQuestionEvent> {
    handle(event: AnsweredQuestionEvent) {
        Logger.log(event, "answered correctly");
    }
}