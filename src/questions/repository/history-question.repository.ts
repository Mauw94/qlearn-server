import { Inject, Injectable } from "@nestjs/common";
import { REDIS, Redis } from "libs/RedisModule";
import { HISTORY_QUESTIONS } from "libs/redis/consts";
import { HistoryQuestionGeneratorService } from "../services/history-question-gen.service";
import { Question } from "../models/question.model";
import { CACHING, Caching } from "libs/CachingModule";

@Injectable()
export class HitstoryQuestionRepository {
    constructor() { }

    @Inject(REDIS)
    private readonly redis: Redis<Question[]>;

    @Inject(CACHING)
    private readonly cache: Caching<Question>;

    // TODO init needs to be called when switching from subject so the cache gets reset
    // and loaded with new questions specific to the subject.
    async init(clientId: string) {
        const questions = await this.generateAndUploadQuestionsToRedis();
        this.initCache(clientId, questions);

        const result = await this.redis.get(HISTORY_QUESTIONS);

        console.log(result)
    }

    async set(key: string, value: any) {
        await this.redis.set(key, value)
    }

    private async initCache(clientId: string, questions: Question[]) {
        this.cache.initCache(clientId);
        questions.forEach(question => {
            this.cache.cacheItem(clientId, question);
        });
    }

    private async generateAndUploadQuestionsToRedis(): Promise<Question[]> {
        const questionGenerator = new HistoryQuestionGeneratorService();
        const questions = questionGenerator.generateQuestions();
        await this.redis.set(HISTORY_QUESTIONS, questions);

        return questions;
    }
}