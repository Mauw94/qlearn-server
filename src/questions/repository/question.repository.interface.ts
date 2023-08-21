import { Inject, Injectable } from "@nestjs/common";
import { CACHING, Caching } from "libs/CachingModule";
import { REDIS, Redis } from "libs/RedisModule";
import { Question } from "../models/question.model";
import { QuestionDto } from "../dtos/question.dto";
import { Difficulty } from "../models/difficulty.enum";

export interface QuestionRepositoryInterface {
    init(difficulty: Difficulty, clientId: string): Promise<void>;
}

@Injectable()
export class BaseQuestionRepository implements QuestionRepositoryInterface {

    constructor() { }

    @Inject(REDIS)
    public readonly redis: Redis<Question[]>;

    @Inject(CACHING)
    public readonly cache: Caching<Question>;

    async init(difficulty: Difficulty, clientId: string): Promise<void> {

    }

    async createQuestion(clientId: string, questionDto: QuestionDto) {
        const question = new Question({ ...questionDto, guesses: 0 })
        this.cache.cacheItem(clientId, question);

        return question;
    }

    async findAll(clientId: string): Promise<Question[]> {
        return this.cache.getCache(clientId);
    }

    async findById(clientId: string, id: string): Promise<Question> {
        return this.cache.getItem(clientId, id);
    }

    async fetchNextQuestion(clientId: string): Promise<Question> {
        const item = this.cache.getNextItemFromCache(clientId);
        this.cache.addLockedItem(clientId, item);

        return item;
    }

    initCache(clientId: string, questions: Question[]) {
        this.cache.initCache(clientId);
        questions.forEach(item => {
            this.cache.cacheItem(clientId, item);
        });
    }
}