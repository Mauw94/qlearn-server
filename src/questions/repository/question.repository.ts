import { Inject, Injectable } from "@nestjs/common";
import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionFactory } from "../question.factory";
import { CACHING, Caching } from "libs/CachingModule";
import { Difficulty } from "../models/difficulty.enum";
import { ArithmeticQuestionGeneratorService } from "../services/arithmetic-question-gen-service";

@Injectable()
export class ArithmeticQuestionsRepository {
    constructor(
        private readonly questionFactory: QuestionFactory) { }

    @Inject(CACHING)
    private readonly cache: Caching<Question>;

    async init(difficulty: Difficulty, clientId: string): Promise<void> {
        const questionGenerator = new ArithmeticQuestionGeneratorService(difficulty as number);
        const questions = questionGenerator.generateSpecificAmountOfQuestions(100);
        this.initCache(clientId, questions);
    }

    async createQuestion(clientId: string, questionDto: QuestionDto) {
        const question = this.questionFactory.create(questionDto)
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

    private initCache(clientId: string, questions: Question[]) {
        this.cache.initCache(clientId);
        questions.forEach(item => {
            this.cache.cacheItem(clientId, item);
        });
    }
}