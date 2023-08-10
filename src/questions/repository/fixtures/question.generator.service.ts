import { QuestionDto } from "src/questions/dtos/question.dto";
import { Difficulty } from "src/questions/models/difficulty.enum";
import { EasyOperator } from "src/questions/models/operator.enum";
import { Question } from "src/questions/models/question.model"
import { v4 as uuidv4 } from "uuid";

export class QuestionGeneratorService {

    difficulty: number;

    constructor(difficulty: number) {
        this.difficulty = difficulty;
    }

    public generateQuestions(amount: number): Question[] {
        const result: Question[] = [];
        for (let i = 0; i < amount; i++) {
            result.push(this.generateQuestion());
        }

        return result;
    }

    public generateQuestion(): Question {
        switch (+this.difficulty) {
            case Difficulty.EASY:
                return this.generateEasyQuestion();
            case Difficulty.MEDIUM:
            case Difficulty.HARD:
            case Difficulty.VERY_HARD:
            case Difficulty.EINSTEIN:
        }
    }

    private generateEasyQuestion(): Question {
        const number1 = this.getRandomNumber(1, 9);
        const number2 = this.getRandomNumber(1, 9);
        const operator = this.getRandomOperator(EasyOperator);
        const answer = this.solveForEasy(operator, number1, number2);

        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = number1 + operator + number2;
        dto.answer = answer.toString();

        return new Question({ ...dto, guesses: 0 });
    }

    // (min inclusive, max exclusive)
    private getRandomNumber(min: number, max: number): number {
        const randomFraction = Math.random();

        const randomInRange = randomFraction * (max - min) + min;

        return Math.floor(randomInRange);
    }

    private getRandomOperator<E>(enumeration: E): E[keyof E] {
        const values = Object.values(enumeration);
        const randomIndex = Math.floor(Math.random() * values.length)

        return values[randomIndex];
    }

    private solveForEasy(operator: EasyOperator, x: number, y: number): number {
        switch (operator) {
            case EasyOperator.ADDITION:
                return x + y;
            case EasyOperator.SUBTRACTION:
                return x - y;
        }
    }
}
