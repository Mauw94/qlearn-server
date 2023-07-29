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

    // TODO: this on startup
    // TODO get questions from actual db later on
    private async initCache(): Promise<void> {
        const result = questions;
        result.forEach(q => {
            this.caching.cacheItem(q);
        });
    }

    async createQuestion(questionDto: QuestionDto) {
        const question = this.questionFactory.create(questionDto)
        this.caching.cacheItem(question);

        return question;
    }

    async findAll(): Promise<Question[]> {
        this.initCache();

        return this.caching.getCache();
    }

    async findById(id: string): Promise<Question> {
        return this.caching.getItem(id);
    }

    async fetchNextQuestion(): Promise<Question> {
        var cached_items = this.caching.getCache();

        return cached_items[0]
    }
}