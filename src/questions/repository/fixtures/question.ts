import { QuestionDto } from "src/questions/dtos/question.dto";
import { Question } from "src/questions/models/question.model";
import { v4 as uuidv4 } from "uuid";

function makeQuestions(): Question[] {
    var questions: Question[] = [];
    var dto = new QuestionDto()
    dto.id = uuidv4();
    dto.question = "4*9";
    dto.answer = "36";
    questions.push(new Question({ ...dto, guesses: 0 }));

    dto = new QuestionDto();
    dto.id = uuidv4();
    dto.question = "5*4";
    dto.answer = "20";
    questions.push(new Question({ ...dto, guesses: 0 }));

    dto = new QuestionDto();
    dto.id = uuidv4();
    dto.question = "1*7";
    dto.answer = "7";
    questions.push(new Question({ ...dto, guesses: 0 }));

    dto = new QuestionDto();
    dto.id = uuidv4();
    dto.question = "3*6";
    dto.answer = "18";
    questions.push(new Question({ ...dto, guesses: 0 }));

    dto = new QuestionDto();
    dto.id = uuidv4();
    dto.question = "7*6";
    dto.answer = "42";
    questions.push(new Question({ ...dto, guesses: 0 }));

    return questions;
}

export const questions = makeQuestions();