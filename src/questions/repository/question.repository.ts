import { Inject, Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionFactory } from "../question.factory";
import { questions } from "./fixtures/question";
import { CACHING, Caching } from "libs/CachingModule";

@Injectable()
export class QuestionRepository {
    constructor(
        private readonly questionFactory: QuestionFactory) { }

    @Inject(CACHING)
    private readonly caching: Caching<Question>;

    async initCache(key: string): Promise<void> {
        this.caching.initCache(key);
        const result = questions;
        result.forEach(q => {
            this.caching.cacheItem(key, q);
        });
    }

    async createQuestion(key: string, questionDto: QuestionDto) {
        const question = this.questionFactory.create(questionDto)
        this.caching.cacheItem(key, question);

        return question;
    }

    async findAll(key: string): Promise<Question[]> {
        return this.caching.getCache(key);
    }

    async findById(key: string, id: string): Promise<Question> {
        return this.caching.getItem(key, id);
    }

    async fetchNextQuestion(key: string): Promise<Question> {
        const item = this.caching.getNextItemFromCache(key);
        this.caching.addLockedItem(key, item);

        return item;
    }
}