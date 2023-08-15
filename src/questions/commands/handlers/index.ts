import { AnswerQuestionHandler } from "./answer-question.handler";
import { CreateQuestionHandler } from "./create-question.handler";
import { InitCacheHistoryQuestionsHandler } from "./init-cache-history-questions.handler";
import { InitCacheMathArithmeticQuestionsHandler } from "./init-cache-math-arithmetic-questions.handler.ts";

export const CommandHandlers = [
    CreateQuestionHandler,
    AnswerQuestionHandler,
    InitCacheMathArithmeticQuestionsHandler,
    InitCacheHistoryQuestionsHandler
]