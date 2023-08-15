import { GetNextQuestionHandler } from "./get-next-question.handler";
import { GetQuestionByIdHandler } from "./get-question-by-id.handler";
import { GetQuestionsHandler } from "./get-questions.handler";

export const QueryHandlers = [
    GetQuestionsHandler,
    GetQuestionByIdHandler,
    GetNextQuestionHandler,
]