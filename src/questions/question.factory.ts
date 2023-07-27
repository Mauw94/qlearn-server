import { Question } from "./models/question.model";

type CreateQuestionOptions = Readonly<{
    id: string;
    question: string;
    answer: string;
}>;

export class QuestionFactory {
    create(options: CreateQuestionOptions): Question {
        return new Question({ ...options, guesses: 0 })
    }
}