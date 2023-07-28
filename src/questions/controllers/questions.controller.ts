import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Question } from "../models/question.model";
import { GetQuestionsQuery } from "../queries/impl/get-questions.query";
import { QuestionDto } from "../dtos/question.dto";
import { CreateQuestionCommand } from "../commands/impl/create-question.command";
import { AnswerQuestionCommand } from "../commands/impl/answer-question.command";
import { GetQuestionByIdQuery } from "../queries/impl/get-question-by-id.query";

@Controller('question')
export class QuestionsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post("create")
    async createQuestion(@Body() dto: QuestionDto) {
        return this.commandBus.execute(new CreateQuestionCommand(dto));
    }

    @Get()
    async findAll(): Promise<Question[]> {
        return this.queryBus.execute(new GetQuestionsQuery());
    }

    @Get(":id")
    async getById(@Param("id") id: string): Promise<Question> {
        return this.queryBus.execute(new GetQuestionByIdQuery(id));
    }

    @Post("answer/:answer/:id")
    async answerQuestion(@Param('answer') answer: string, @Param('id') id: string) {
        return this.commandBus.execute(new AnswerQuestionCommand(answer, id));
    }
}