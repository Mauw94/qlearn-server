import * as fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import { Question } from 'src/questions/models/question.model';
import { ParserResult, QUESTIONS_KEY } from './parser-result';
import { QuestionDto } from 'src/questions/dtos/question.dto';

export const ReadFromJson = async (): Promise<Question[]> => {
    let questions: Question[] = [];

    try {
        const data = fs.readFileSync("libs\\json-parse\\history-questions.json", "utf-8");
        const parsedResult: ParserResult[] = JSON.parse(data)[QUESTIONS_KEY];
        parsedResult.forEach(result => {
            let dto = new QuestionDto();
            dto.id = uuidv4();
            dto.question = result.question;
            dto.answer = result.answer;
            questions.push(new Question({ ...dto, guesses: 0 }));
        });

        return questions;
    } catch (error) {
        console.error(error);
    }

    return questions;
}