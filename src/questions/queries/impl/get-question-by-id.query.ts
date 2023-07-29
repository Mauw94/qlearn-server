import { IQuery } from "@nestjs/cqrs";

export class GetQuestionByIdQuery implements IQuery {
    constructor(readonly key: string, readonly id: string) { }
}