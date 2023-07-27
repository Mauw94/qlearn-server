import { QuestionDto } from "src/questions/dtos/question.dto";
import { Question } from "src/questions/models/question.model";

const dto = new QuestionDto()
dto.question = "4*9";
dto.answer = "36";

export const question = new Question('1234')
question.setData(dto);