import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetQuestionByIdQuery } from "../impl/get-question-by-id.query";
import { Question } from "src/questions/models/question.model";
import { ArithmeticQuestionsRepository } from "src/questions/repository/question.repository";
import { Logger } from "@nestjs/common";

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdHandler implements IQueryHandler<GetQuestionByIdQuery> {

    constructor(private readonly repository: ArithmeticQuestionsRepository) { }

    async execute(query: GetQuestionByIdQuery): Promise<Question> {
        Logger.log("Async getting question...", "GetQuestionByIdQuery");
        return this.repository.findById(query.clientId, query.id);
    }
}