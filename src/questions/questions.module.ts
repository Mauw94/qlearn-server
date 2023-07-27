import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { QuestionsController } from "./controllers/questions.controller";
import { QuestionRepository } from "./repository/question.repository";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { QuestionFactory } from "./question.factory";

@Module({
    imports: [CqrsModule],
    controllers: [QuestionsController],
    providers: [
        QuestionRepository,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        QuestionFactory,
        // QuestionsSagas add sagas later
    ]
})
export class QuestionsModule { }