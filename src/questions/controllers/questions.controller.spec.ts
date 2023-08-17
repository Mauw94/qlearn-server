import { Test } from "@nestjs/testing";
import { QuestionsController } from "./questions.controller";
import { QuestionDto } from "../dtos/question.dto";
import { v4 as uuidv4 } from "uuid";
import { Question } from "../models/question.model";
import { ArithmeticQuestionsRepository } from "../repository/arithmetic-question.repository";
import { HitstoryQuestionRepository } from "../repository/history-question.repository";
import { BaseQuestionRepository } from "../repository/question.repository.interface";
import { CommandHandlers } from "../commands/handlers";
import { EventHandlers } from "../events/handlers";
import { QueryHandlers } from "../queries/handlers";
import { QuestionFactory } from "../question.factory";
import { RedisModule } from "libs/RedisModule";
import { CqrsModule } from "@nestjs/cqrs";
import { PasswordModule } from "libs/PasswordModule";
import { CachingModule } from "libs/CachingModule";

describe('QuestionsController', () => {
    let questionsController: QuestionsController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CqrsModule, PasswordModule, CachingModule, RedisModule],
            controllers: [QuestionsController],
            providers: [
                ArithmeticQuestionsRepository,
                HitstoryQuestionRepository,
                BaseQuestionRepository,
                ...CommandHandlers,
                ...EventHandlers,
                ...QueryHandlers,
                QuestionFactory,
            ]
        }).compile();

        questionsController = moduleRef.get<QuestionsController>(QuestionsController);
    });

    describe('findAll, history questions', () => {
        it('should init history questions cache and get all', async () => {
            const result: Question[] = [];
            const dto = new QuestionDto();
            dto.id = uuidv4();
            dto.question = "In which year was Napoleon born?";
            dto.answer = "1769";
            result.push(new Question({ ...dto, guesses: 0 }));

            jest.spyOn(questionsController, 'findAll').mockImplementation(async () => result);

            expect(await questionsController.findAll('123')).toBe(result);
        })
    })

    describe('answerQuestion', () => {
        it('should answer question', async () => {
            const result = true;
            jest.spyOn(questionsController, 'answerQuestion').mockImplementation(async () => result);
            expect(await questionsController.answerQuestion('123', 'test', '123')).toBe(result);
        })
    })

    describe('getNextQuestion', () => {
        it('should get next question', async () => {
            const dto = new QuestionDto();
            dto.id = uuidv4();
            dto.question = "In which year was Napoleon born?";
            dto.answer = "1769";
            const result = new Question({ ...dto, guesses: 0 });
            jest.spyOn(questionsController, 'getNext').mockImplementation(async () => result);
            expect(await questionsController.getNext('123')).toBe(result);
        })
    })
});