import { AnsweredQuestionHandler } from "./answered-question.handler";
import { QuestionCreatedHandler } from "./question-created.handler";

export const EventHandlers = [
    QuestionCreatedHandler,
    AnsweredQuestionHandler
    // TODO other events
]