import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionGenerator } from "./question-generator.interface";
import { v4 as uuidv4 } from "uuid";
import * as fs from 'fs';
import { ParserResult, QUESTIONS_KEY } from "libs/json-parse/parser-result";

export class HistoryQuestionGeneratorService implements QuestionGenerator {
    public generateSpecificAmountOfQuestions(amount: number): Question[] {
        throw new Error("Method not implemented.");
    }
    public generateQuestion(): Question {
        throw new Error("Method not implemented.");
    }

    public generateQuestions(): Question[] {
        return this.generateHistoryQuestions();
    }

    private generateHistoryQuestions() {
        return this.readFromJson();
    }

    private readFromJson(): Question[] {
        let questions: Question[] = [];
        fs.readFile("./src/questions/services/history-questions.json", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
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
        });
        return questions;
    }
}