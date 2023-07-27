import { IsString } from "class-validator";

export class QuestionDto {
    @IsString()
    id: string;
    @IsString()
    question: string;
    @IsString()
    answer: string;
}