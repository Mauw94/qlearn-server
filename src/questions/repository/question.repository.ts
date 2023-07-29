import { Inject, Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionFactory } from "../question.factory";
import { question } from "./fixtures/question";
import { CACHING, Caching } from "libs/CachingModule";

@Injectable()
export class QuestionRepository {
    constructor(
        private readonly questionFactory: QuestionFactory) { }

    @Inject(CACHING)
    private readonly caching: Caching<Question>;

    async createQuestion(questionDto: QuestionDto) {
        const question = this.questionFactory.create(questionDto)
        this.caching.cache(question);

        return question;
    }

    async findAll(): Promise<Question[]> {
        var items = this.caching.getCache()
        console.log("CACHE");
        console.log(items);

        return [question];
    }

    async findById(id: string): Promise<Question> {
        var items = this.caching.getCache()
        console.log("CACHE");
        console.log(items);

        return question
    }
}