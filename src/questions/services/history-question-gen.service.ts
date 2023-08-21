import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionGenerator } from "./question-generator.interface";
import { v4 as uuidv4 } from "uuid";
import * as fs from 'fs';
import { ParserResult, QUESTIONS_KEY } from "libs/json-parse/parser-result";
import 'libs/extensions/extensions';

export class HistoryQuestionGeneratorService implements QuestionGenerator {
    public generateSpecificAmountOfQuestions(amount: number): Question[] {
        throw new Error("Method not implemented.");
    }
    public generateQuestion(): Question {
        throw new Error("Method not implemented.");
    }

    public async generateQuestions(): Promise<Question[]> {
        return await this.generateHistoryQuestions();
    }

    private async generateHistoryQuestions() {
        let questions = await this.readFromJson();
        return questions.shuffle();
    }

    private async readFromJson(): Promise<Question[]> {
        let questions: Question[] = [];
        try {
            const data = fs.readFileSync("./src/questions/services/history-questions.json", 'utf-8');
            const parsedResult: ParserResult[] = JSON.parse(data)[QUESTIONS_KEY];
            parsedResult.forEach(result => {
                let dto = new QuestionDto();
                dto.id = uuidv4();
                dto.question = result.question;
                dto.answer = result.answer;
                questions.push(new Question({ ...dto, guesses: 0 }));
            })

            return questions;
        } catch (err) {
            console.error(err);
        }

        return questions;
    }
}