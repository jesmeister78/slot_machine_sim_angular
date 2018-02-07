import { AnalogScaleQuestion } from './analog-scale-question';
import { BiPolarQuestion } from './bi-polar-question';

export function getGRCSQuestions(applicableIndices: number[]): AnalogScaleQuestion[] {
    const statements = [
        'My knowledge and skill in gambling contribute to the likelihood that I will make money.', // 0
        'My choices or actions affect the game on which I am betting.', // 1
        'Praying helps me win.', // 2
        'Losses when gambling, are bound to be followed by a series of wins.', // 3
        'Relating my winnings to my skill and ability makes me continue gambling.', // 4
        'If I am gambling and losing, I should continue because I don’t want to miss a win.', // 5
        'I should keep track of previous winning bets so that I can figure out how I should bet in the future.', // 6
        'When I am gambling, “near misses” or times when I almost win remind me that if I keep playing I will win.', // 7
        'A series of losses will provide me with a learning experience that will help me win later.', // 8
        'Gambling is more than just luck.', // 9
        'My gambling wins are evidence that I have skill and knowledge related to gambling.', // 10
        'I am pretty accurate at predicting when a “win” will occur.', // 11
        'If I continue to gamble, it will eventually pay off and I will make money.', // 12
        'When I have a win once, I will definitely win again.', // 13
        'Relating my losses to probability makes me continue gambling.', // 14
        'If I lose money gambling, I should try to win it back.', // 15
        `Even though I may be losing with my gambling strategy or plan, I must maintain that strategy or plan
         because I know it will eventually come through for me.`, // 16
        'I have specific rituals and behaviours that increase my chances of winning.', // 17
        `There are certain things I do when I am betting (for example, tapping a certain number of times,
         holding a lucky coin in my hand, crossing my fingers, etc.) which increase the chances that I will win.`, // 18
        'I am pretty accurate at predicting when a “win” will occur.', // 19
        'If I continue to gamble, it will eventually pay off and I will make money.', // 20
        'I have some control over predicting my gambling wins.'
    ];

    const mandatoryStatements = [
        // mandatory question comes up every time
        'All I want to do now is to gamble',
        'I would find it difficult to resist gambling right now' // 23
    ];


    const questions = [];
    mandatoryStatements.forEach((q, idx) => {
        const question = new AnalogScaleQuestion();
        // mandatory question indices start at 100
        question.questionId = idx + 100;
        question.questionText = q;
        questions.push(question);
    });
    applicableIndices.forEach((q, idx) => {
        const question = new AnalogScaleQuestion();
        question.questionId = idx;
        question.questionText = statements[q];
        questions.push(question);
    });
    return questions;
}

export function getBiPolarQuestions(): BiPolarQuestion[] {
    const poleArrays = [
        ['Unpleasant', 'Pleasant'],
        ['Melancholic', 'Contented'],
        ['Sleepy', 'Awake'],
        ['Quiet', 'Stimulated']
    ];

    const poles = [];
    poleArrays.forEach((q, idx) => {
        const question = new BiPolarQuestion();
        question.negativePole = q[0];
        question.positivePole = q[1];
        question.questionId = idx;
        question.questionText = `${q[0]} vs ${q[1]}`;
        poles.push(question);
    });
    return poles;
}
