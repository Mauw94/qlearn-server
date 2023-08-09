import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Question } from "../models/question.model";
import { GetQuestionsQuery } from "../queries/impl/get-questions.query";
import { QuestionDto } from "../dtos/question.dto";
import { CreateQuestionCommand } from "../commands/impl/create-question.command";
import { AnswerQuestionCommand } from "../commands/impl/answer-question.command";
import { GetQuestionByIdQuery } from "../queries/impl/get-question-by-id.query";
import { InitCacheCommand } from "../commands/impl/init-cache.command";
import { GetNextQuestionQuery } from "../queries/impl/get-next-question.query";

@Controller('question')
export class QuestionsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post("create/:clientId")
    async createQuestion(@Param("clientId") clientId: string, @Body() dto: QuestionDto) {
        return this.commandBus.execute(new CreateQuestionCommand(clientId, dto));
    }

    @Get("all/:clientId")
    async findAll(@Param("clientId") clientId: string): Promise<Question[]> {
        return this.queryBus.execute(new GetQuestionsQuery(clientId));
    }

    @Get("by_id/:clientId/:id")
    async getById(@Param("clientId") clientId: string, @Param("id") id: string): Promise<Question> {
        return this.queryBus.execute(new GetQuestionByIdQuery(clientId, id));
    }

    @Get("get_next/:clientId")
    async getNext(@Param("clientId") clientId: string): Promise<Question> {
        return this.queryBus.execute(new GetNextQuestionQuery(clientId));
    }

    @Post("answer/:clientId/:answer/:id")
    async answerQuestion(@Param("clientId") clientId: string, @Param('answer') answer: string, @Param('id') id: string) {
        return this.commandBus.execute(new AnswerQuestionCommand(clientId, answer, id));
    }

    @Post("init/:clientId")
    async initQUestionsCache(@Param("clientId") clientId: string): Promise<void> {
        return this.commandBus.execute(new InitCacheCommand(clientId));
    }
}