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
                return this.generateEasyQuestion();
            case Difficulty.MEDIUM:
                return this.generateMediumQuestion();
            case Difficulty.HARD:
                return this.generateHardQuestion();
            case Difficulty.VERY_HARD:
                return this.generateVeryHardQuestion();
            case Difficulty.EINSTEIN:
                return this.generateEinsteinQuestion();
        }
    }

    private generateEasyQuestion(): Question {
        const number1 = this.getRandomNumber(1, 10);
        const number2 = this.getRandomNumber(1, 10);
        const operator = this.getRandomOperator(EasyOperator);
        const answer = this.solveForEasy(operator, number1, number2);

        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = number1 + operator + number2;
        dto.answer = answer.toString();

        return new Question({ ...dto, guesses: 0 });
    }

    private generateMediumQuestion(): Question {
        const number1 = this.getRandomNumber(1, 20);
        const number2 = this.getRandomNumber(1, 20);
        const operator = this.getRandomOperator(EasyOperator);
        const answer = this.solveForEasy(operator, number1, number2);

        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = number1 + operator + number2;
        dto.answer = answer.toString();

        return new Question({ ...dto, guesses: 0 });
    }

    private generateHardQuestion(): Question {
        const number1 = this.getRandomNumber(1, 10);
        const number2 = this.getRandomNumber(1, 10);
        const operator = this.getRandomOperator(HardOperator);
        const answer = this.solveForHard(operator, number1, number2);

        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = number1 + operator + number2;
        dto.answer = answer.toString();

        return new Question({ ...dto, guesses: 0 });
    }

    private generateVeryHardQuestion(): Question {
        const number1 = this.getRandomNumber(1, 20);
        const number2 = this.getRandomNumber(1, 20);
        const operator = this.getRandomOperator(HardOperator);
        const answer = this.solveForHard(operator, number1, number2);

        var dto = new QuestionDto();
        dto.id = uuidv4();
        dto.question = number1 + operator + number2;
        dto.answer = answer.toString();

        return new Question({ ...dto, guesses: 0 });
    }

    private generateEinsteinQuestion(): Question {
        const number1 = this.getRandomNumber(1, 100);
        const number2 = this.getRandomNumber(1, 100);
        const operator = this.getRandomOperator(VeryHardOperator);
        const answer = this.solveForVeryHard(operator, number1, number2);

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

    private solveForHard(operator: HardOperator, x: number, y: number): number {
        switch (operator) {
            case HardOperator.MULTIPLICATION:
                return x * y;
            case HardOperator.DIVISION:
                return x / y;
        }
    }

    private solveForVeryHard(operator: VeryHardOperator, x: number, y: number): number {
        switch (operator) {
            case VeryHardOperator.MULTIPLICATION:
                return x * y;
            case VeryHardOperator.DIVISION:
                return x / y;
            case VeryHardOperator.MODULUS:
                return x % y;
        }
    }
}
