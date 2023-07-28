import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetQuestionByIdQuery } from "../impl/get-question-by-id.query";
import { Question } from "src/questions/models/question.model";
import { QuestionRepository } from "src/questions/repository/question.repository";

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdHandler implements IQueryHandler<GetQuestionByIdQuery> {

    constructor(private readonly repository: QuestionRepository) { }

    async execute(query: GetQuestionByIdQuery): Promise<Question> {
        return this.repository.findById(query.id);
    }
}