import { AnswerQuestionHandler } from "./answer-question.handler";
import { CreateQuestionHandler } from "./create-question.handler";
import { InitCacheHandler } from "./init-cache.handler";

export const CommandHandlers = [
    CreateQuestionHandler,
    AnswerQuestionHandler,
    InitCacheHandler
]