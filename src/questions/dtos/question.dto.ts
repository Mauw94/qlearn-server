import { IsString } from "class-validator";

export class QuestionDto {
    @IsString()
    readonly id: string;
    @IsString()
    question: string;
    @IsString()
    answer: string;
}