import { Question } from "../models/question.model";

export interface QuestionGenerator {
    generateQuestion(): Question;
    generateQuestions(amount: number): Question[];
}