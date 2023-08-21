import { Question } from "../models/question.model";

export interface QuestionGenerator {
    generateQuestion(): Question;
    generateQuestions(): Promise<Question[]>;
    generateSpecificAmountOfQuestions(amount: number): Question[];
}