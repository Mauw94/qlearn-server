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

    @Post("create/:key")
    async createQuestion(@Param("key") key: string, @Body() dto: QuestionDto) {
        return this.commandBus.execute(new CreateQuestionCommand(key, dto));
    }

    @Get("all/:key")
    async findAll(@Param("key") key: string): Promise<Question[]> {
        return this.queryBus.execute(new GetQuestionsQuery(key));
    }

    @Get("by_id/:key/:id")
    async getById(@Param("key") key: string, @Param("id") id: string): Promise<Question> {
        return this.queryBus.execute(new GetQuestionByIdQuery(key, id));
    }

    @Get("get_next/:key")
    async getNext(@Param("key") key: string): Promise<Question> {
        return this.queryBus.execute(new GetNextQuestionQuery(key));
    }

    @Post("answer/:key/:answer/:id")
    async answerQuestion(@Param("key") key: string, @Param('answer') answer: string, @Param('id') id: string) {
        return this.commandBus.execute(new AnswerQuestionCommand(key, answer, id));
    }

    @Post("init/:key")
    async initQUestionsCache(@Param("key") key: string): Promise<void> {
        return this.commandBus.execute(new InitCacheCommand(key));
    }
}