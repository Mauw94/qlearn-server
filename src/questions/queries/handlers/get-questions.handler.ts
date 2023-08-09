import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetQuestionsQuery } from "../impl/get-questions.query";
import { QuestionRepository } from "src/questions/repository/question.repository";
import { Logger } from "@nestjs/common";

@QueryHandler(GetQuestionsQuery)
export class GetQuestionsHandler implements IQueryHandler<GetQuestionsQuery> {
    constructor(private readonly repository: QuestionRepository) { }

    async execute(query: GetQuestionsQuery) {
        Logger.log("Async getting questions...", "GetQuestionsQuery");
        return await this.repository.findAll(query.clientId);
    }
}