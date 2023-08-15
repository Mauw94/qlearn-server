import { Injectable } from "@nestjs/common";
import { Difficulty } from "../models/difficulty.enum";
import { ArithmeticQuestionGeneratorService } from "../services/arithmetic-question-gen-service";
import { BaseQuestionRepository } from "./question.repository.interface";


@Injectable()
export class ArithmeticQuestionsRepository extends BaseQuestionRepository {
    constructor() {
        super()
    }

    override async init(difficulty: Difficulty, clientId: string): Promise<void> {
        const questionGenerator = new ArithmeticQuestionGeneratorService(difficulty as number);
        const questions = questionGenerator.generateSpecificAmountOfQuestions(100);
        this.initCache(clientId, questions);
    }
}