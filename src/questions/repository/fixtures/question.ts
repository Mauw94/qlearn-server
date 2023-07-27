import { QuestionDto } from "src/questions/dtos/question.dto";
import { Question } from "src/questions/models/question.model";

const dto = new QuestionDto()
dto.id = "123";
dto.question = "4*9";
dto.answer = "36";

export const question = new Question({ ...dto, guesses: 0 });