import { Injectable } from "@nestjs/common";
import { HISTORY_QUESTIONS } from "libs/redis/consts";
import { HistoryQuestionGeneratorService } from "../services/history-question-gen.service";
import { Question } from "../models/question.model";
import { BaseQuestionRepository } from "./question.repository.interface";
import { Difficulty } from "../models/difficulty.enum";

@Injectable()
export class HitstoryQuestionRepository extends BaseQuestionRepository {
    constructor() {
        super();
    }

    override async init(difficulty: Difficulty, clientId: string) {
        const questions = await this.generateAndUploadQuestionsToRedis();
        this.initCache(clientId, questions);

        const result = await this.redis.get(HISTORY_QUESTIONS);

        console.log(result)
    }

    private async generateAndUploadQuestionsToRedis(): Promise<Question[]> {
        const questionGenerator = new HistoryQuestionGeneratorService();
        const questions = questionGenerator.generateQuestions();
        await this.redis.set(HISTORY_QUESTIONS, questions);

        return questions;
    }
}