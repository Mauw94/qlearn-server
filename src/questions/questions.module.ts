import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { QuestionsController } from "./controllers/questions.controller";
import { QuestionRepository } from "./repository/question.repository";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { QuestionsSagas } from "./sagas/questions.sagas";

@Module({
    imports: [CqrsModule],
    controllers: [QuestionsController],
    providers:[
        QuestionRepository,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        // QuestionsSagas
    ]
})
export class QuestionsModule { }