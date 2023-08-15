import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetNextQuestionQuery } from "../impl/get-next-question.query";
import { Question } from "src/questions/models/question.model";
import { Logger } from "@nestjs/common";
import { BaseQuestionRepository } from "src/questions/repository/question.repository.interface";

@QueryHandler(GetNextQuestionQuery)
export class GetNextQuestionHandler implements IQueryHandler<GetNextQuestionQuery> {
    constructor(private readonly repository: BaseQuestionRepository) { }

    async execute(query: GetNextQuestionQuery): Promise<Question> {
        Logger.log("Async getting question...", "GetNextQuestionQuery");
        return await this.repository.fetchNextQuestion(query.clientId);
    }

}