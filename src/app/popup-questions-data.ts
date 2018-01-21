export function getGRCSQuestions(questionNumbers: number[]) {
    const questions = [
        'Gambling makes me happier.', // 0
        'I cannot function without gambling.', // 1
        'Praying helps me win.', // 2
        'Losses when gambling, are bound to be followed by a series of wins', // 3
        'Relating my winnings to my skill and ability makes me continue gambling.', // 4
        'Gambling makes things seem better.', // 5
        'It is difficult to stop gambling as I am so out of control.', // 6
        'Specific numbers and colours can help increase my chances of winning.', // 7
        'A series of losses will provide me with a learning experience that will help me win later.', // 8
        'Relating my losses to bad luck and bad circumstances makes me continue gambling.', // 9
        'Gambling makes the future brighter.', // 10
        'My desire to gamble is so overpowering.', // 11
        'I collect specific objects that help increase my chances of winning.', // 12
        'When I have a win once, I will definitely win again.', // 13
        'Relating my losses to probability makes me continue gambling.', // 14
        'Having a gamble helps reduce tension and stress.', // 15
        'I am not strong enough to stop gambling.', // 16
        'I have specific rituals and behaviours that increase my chances of winning.', // 17
        'There are times that I feel lucky and thus, gamble those times only.', // 18
        'Remembering how much money I won last time makes me continue gambling.', // 19
        'I will never be able to stop gambling.', // 20
        'I have some control over predicting my gambling wins.', // 21
        'If I keep changing my numbers, I have less chances of winning than if I keep the same numbers every time', // 22
        // mandatory question comes up every time
        'I have a strong urge to continue gambling right now' // 23
    ];
    const MANDATORY_QUESTION_INDEX = 23;
    const applicableQuestions = [];
    applicableQuestions.push(questions[MANDATORY_QUESTION_INDEX]);
    questionNumbers.forEach(q => applicableQuestions.push(questions[q]));
    return applicableQuestions;
}

export function getBiPolarQuestions() {
    const poleArrays = [
        ['Unpleasant', 'Pleasant'],
        ['Melancholic', 'Contented'],
        ['Sleepy', 'Awake'],
        ['Quiet', 'Stimulated']
    ];

    const poles = [];
    poleArrays.forEach(p => {
        poles.push({'negative': p[0], 'positive': p[1]});
    });
    return poles;
}
