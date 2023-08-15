import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { GetHistoryQuestionsQuery } from "../impl/get-history-questions.query";
import { HitstoryQuestionRepository } from "src/questions/repository/history-question.repository";

@QueryHandler(GetHistoryQuestionsQuery)
export class GetHistoryQuestionsHandler implements IQueryHandler<GetHistoryQuestionsQuery> {
    constructor(private readonly repository: HitstoryQuestionRepository) { }

    async execute(query: GetHistoryQuestionsQuery) {
        Logger.log("Async getting historyu questions...", "GetHistoryQuestionsQuery");
        // return await this.repository.findAll(query.clientId);
        return [];
    }
}