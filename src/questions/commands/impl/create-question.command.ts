import { ICommand } from "@nestjs/cqrs";
import { QuestionDto } from "src/questions/dtos/question.dto";

export class CreateQuestionCommand implements ICommand {
    constructor(
        public readonly questionDto: QuestionDto
    ) { }
}