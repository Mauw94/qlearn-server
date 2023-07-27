import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from 'cli-color';
import { GetQuestionsQuery } from "../impl/get-questions.query";
import { QuestionRepository } from "src/questions/repository/question.repository";

@QueryHandler(GetQuestionsQuery)
export class GetQuestionsHandler implements IQueryHandler<GetQuestionsQuery> {
    constructor(private readonly repository: QuestionRepository) { }

    async execute(query: GetQuestionsQuery) {
        console.log(clc.yellowBright('Async GetQuestionsQuery...'));
        return this.repository.findAll()
    }
}