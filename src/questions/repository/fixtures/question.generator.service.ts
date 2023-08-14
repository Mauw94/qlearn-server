import { QuestionDto } from "src/questions/dtos/question.dto";
import { Difficulty } from "src/questions/models/difficulty.enum";
import { EasyOperator, HardOperator, VeryHardOperator } from "src/questions/models/operator.enum";
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
                return this.generateEasyQuestion(1, 10);
            case Difficulty.MEDIUM:
                return this.generateEasyQuestion(1, 20);
            case Difficulty.HARD:
                return this.generateHardQuestion(1, 10, false);
            case Difficulty.VERY_HARD:
                return this.generateHardQuestion(1, 20, true);
            case Difficulty.EINSTEIN:
                return this.generateHardQuestion(1, 50, true);
        }
    }

    private generateEasyQuestion(min: number, max: number,) {
        const number1 = this.getRandomNumber(min, max);
        const number2 = this.getRandomNumber(min, max);
        const operator = this.getRandomOperator(EasyOperator);
        const answer = this.solveForEasy(operator, number1, number2);

        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = number1 + operator + number2;
        dto.answer = answer.toString();

        return new Question({ ...dto, guesses: 0 });
    }

    private generateHardQuestion(min: number, max: number, veryHard: boolean): Question {
        let number1 = this.getRandomNumber(min, max);
        let number2 = this.getRandomNumber(min, max);
        const operator = veryHard
            ? this.getRandomOperator(VeryHardOperator)
            : this.getRandomOperator(HardOperator);
        const reversed = this.reverseBiggestNumber(operator, number1, number2);
        number1 = reversed[0];
        number2 = reversed[1];
        const answer = this.solveForHard(operator, number1, number2);

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

    private reverseBiggestNumber(operator: HardOperator | VeryHardOperator, number1: number, number2: number): [number, number] {
        if (operator === HardOperator.DIVISION
            || VeryHardOperator.DIVISION
            || VeryHardOperator.MODULUS) {
            let temp = 0;
            if (number2 > number1) {
                temp = number1;
                number1 = number2;
                number2 = temp;
            }
        }

        return [number1, number2];
    }

    private solveForEasy(operator: EasyOperator | HardOperator | VeryHardOperator, x: number, y: number): number {
        switch (operator) {
            case EasyOperator.ADDITION:
                return x + y;
            case EasyOperator.SUBTRACTION:
                return x - y;
        }
    }

    private solveForHard(operator: HardOperator | VeryHardOperator, x: number, y: number): number {
        switch (operator) {
            // hard operators
            case HardOperator.MULTIPLICATION:
                return x * y;
            case HardOperator.DIVISION:
                return x / y;

            // very hard operators
            case VeryHardOperator.MULTIPLICATION:
                return x * y;
            case VeryHardOperator.DIVISION:
                return x / y;
            case VeryHardOperator.MODULUS:
                return x % y;
        }
    }
}
