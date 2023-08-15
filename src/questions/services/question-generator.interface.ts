import { Question } from "../models/question.model";

export interface QuestionGenerator {
    generateQuestion(): Question;
    generateQuestions(): Question[];
    generateSpecificAmountOfQuestions(amount: number): Question[];
}