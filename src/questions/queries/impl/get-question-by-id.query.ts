import { IQuery } from "@nestjs/cqrs";

export class GetQuestionByIdQuery implements IQuery {
    constructor(readonly id: string) { }
}