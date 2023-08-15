import { Difficulty } from 'src/questions/models/difficulty.enum';
import { ArithmeticQuestionGeneratorService } from 'src/questions/services/arithmetic-question-gen-service';

describe('ArithmeticQuestionGeneratorService', () => {
    let service: ArithmeticQuestionGeneratorService;

    beforeEach(async () => {
        service = new ArithmeticQuestionGeneratorService(Difficulty.EASY);
    });

    describe('generateQuestion', () => {
        it('should return newly generated question', () => {
            const question = service.generateQuestion();
            console.log(question);
            expect(question).toBeDefined();
        })
    });

    describe('generateQuestions', () => {
        it('should return newly generated list of questions', () => {
            const amount = 10;
            const questions = service.generateQuestions(amount);
            expect(questions).toBeDefined();
            expect(questions.length).toBe(amount)
        })
    });
})