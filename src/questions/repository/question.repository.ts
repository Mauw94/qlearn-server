import { Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionFactory } from "../question.factory";
import { question } from "./fixtures/question";

@Injectable()
export class QuestionRepository {
    constructor(
        private readonly questionFactory: QuestionFactory) { }

    async createQuestion(questionDto: QuestionDto) {
        const question = this.questionFactory.create(questionDto)
        return question;
    }

    async findAll(): Promise<Question[]> {
        return [question];
    }

    async findById(id: string): Promise<Question> {
        return question
    }
}