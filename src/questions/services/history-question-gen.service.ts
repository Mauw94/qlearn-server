import { QuestionDto } from "../dtos/question.dto";
import { Question } from "../models/question.model";
import { QuestionGenerator } from "./question-generator.interface";
import { v4 as uuidv4 } from "uuid";

export class HistoryQuestionGeneratorService implements QuestionGenerator {
    public generateSpecificAmountOfQuestions(amount: number): Question[] {
        throw new Error("Method not implemented.");
    }
    public generateQuestion(): Question {
        throw new Error("Method not implemented.");
    }

    public generateQuestions(): Question[] {
        return this.generateHistoryQuestions();
    }

    private generateHistoryQuestions() {
        let questions: Question[] = [];
        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = "In which year was Napoleon born?";
        dto.answer = "1769";
        questions.push(new Question({ ...dto, guesses: 0 }));

        dto.id = uuidv4();
        dto.question = "In which did Napoleon die?";
        dto.answer = "1821";
        questions.push(new Question({ ...dto, guesses: 0 }));

        return questions;
    }
}