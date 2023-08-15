import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { QuestionsController } from "./controllers/questions.controller";
import { ArithmeticQuestionsRepository } from "./repository/arithmetic-question.repository";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { QuestionFactory } from "./question.factory";
import { PasswordModule } from "libs/PasswordModule";
import { CachingModule } from "libs/CachingModule";
import { HitstoryQuestionRepository } from "./repository/history-question.repository";
import { RedisModule } from "libs/RedisModule";
import { BaseQuestionRepository } from "./repository/question.repository.interface";

@Module({
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
        // QuestionsSagas add sagas later
    ]
})
export class QuestionsModule { }