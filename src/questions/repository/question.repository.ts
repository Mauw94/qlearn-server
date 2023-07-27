import { Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { question } from "./fixtures/question";

@Injectable()
export class QuestionRepository {
    async createQuestion(questionDto: QuestionDto) {
        const question = new Question(undefined);
        question.setData(questionDto);
        question.createQuestion();
        return question;
    }

    async findAll(): Promise<Question[]> {
        return [question];
    }
}