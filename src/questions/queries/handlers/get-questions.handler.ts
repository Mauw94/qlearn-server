import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetQuestionsQuery } from "../impl/get-questions.query";
import { Logger } from "@nestjs/common";
import { BaseQuestionRepository } from "src/questions/repository/question.repository.interface";

@QueryHandler(GetQuestionsQuery)
export class GetQuestionsHandler implements IQueryHandler<GetQuestionsQuery> {
    constructor(private readonly repository: BaseQuestionRepository) { }

    async execute(query: GetQuestionsQuery) {
        Logger.log("Async getting questions...", "GetQuestionsQuery");
        return await this.repository.findAll(query.clientId);
    }
}