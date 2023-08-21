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
        const questions = await this.generateQuestions();
        await this.tryUploadToRedis(questions);
        this.initCache(clientId, questions);
    }

    private async generateQuestions(): Promise<Question[]> {
        const questionGenerator = new HistoryQuestionGeneratorService();
        const questions = questionGenerator.generateQuestions();

        return questions;
    }

    private async tryUploadToRedis(questions: Question[]): Promise<void> {
        if (await this.redis.tryConnection()) {
            await this.redis.set(HISTORY_QUESTIONS, questions);
        } else {
            console.info("Did not connect to Redis..");
            return;
        }
    }
}