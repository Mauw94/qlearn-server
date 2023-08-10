import { Inject, Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionFactory } from "../question.factory";
import { CACHING, Caching } from "libs/CachingModule";
import { Difficulty } from "../models/difficulty.enum";
import { QuestionGeneratorService } from "./fixtures/question.generator.service";

@Injectable()
export class QuestionRepository {
    constructor(
        private readonly questionFactory: QuestionFactory) { }

    @Inject(CACHING)
    private readonly caching: Caching<Question>;

    async initCache(difficulty: Difficulty, clientId: string): Promise<void> {
        this.caching.initCache(clientId);
        const questionGenerator = new QuestionGeneratorService(difficulty);
        const result = questionGenerator.generateQuestions(10);
        result.forEach(q => {
            this.caching.cacheItem(clientId, q);
        });
    }

    async createQuestion(clientId: string, questionDto: QuestionDto) {
        const question = this.questionFactory.create(questionDto)
        this.caching.cacheItem(clientId, question);

        return question;
    }

    async findAll(clientId: string): Promise<Question[]> {
        return this.caching.getCache(clientId);
    }

    async findById(clientId: string, id: string): Promise<Question> {
        return this.caching.getItem(clientId, id);
    }

    async fetchNextQuestion(clientId: string): Promise<Question> {
        const item = this.caching.getNextItemFromCache(clientId);
        this.caching.addLockedItem(clientId, item);

        return item;
    }
}