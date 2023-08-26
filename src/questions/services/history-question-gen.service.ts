import { ReadFromJson } from "libs/json-parse/from-json";
import { Question } from "../models/question.model";
import { QuestionGenerator } from "./question-generator.interface";
import 'libs/extensions/extensions';

export class HistoryQuestionGeneratorService implements QuestionGenerator {
    public generateSpecificAmountOfQuestions(amount: number): Question[] {
        throw new Error("Method not implemented.");
    }

    public generateQuestion(): Question {
        throw new Error("Method not implemented.");
    }

    public async generateQuestions(): Promise<Question[]> {
        return (await ReadFromJson()).shuffle();
    }
}