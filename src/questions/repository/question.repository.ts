import { Inject, Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionFactory } from "../question.factory";
import { questions } from "./fixtures/question";
import { CACHING, Caching } from "libs/CachingModule";

@Injectable()
export class QuestionRepository {
    private readonly questions: Question[];

    constructor(
        private readonly questionFactory: QuestionFactory) { }

    @Inject(CACHING)
    private readonly caching: Caching<Question>;

    async initCache(key: string): Promise<void> {
        this.caching.clearCache(key);
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

    // TODO: fix
    async fetchNextQuestion(key: string): Promise<Question> {
        var cached_items = this.caching.getCache(key);

        return cached_items[0]
    }
}