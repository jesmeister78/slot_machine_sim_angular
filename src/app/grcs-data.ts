export function getGRCSQuestions(questionNumbers: number[]) {
    const questions = [
        'Gambling makes me happier.',
        'I cannot function without gambling.',
        'Praying helps me win.',
        'Losses when gambling, are bound to be followed by a series of wins',
        'Relating my winnings to my skill and ability makes me continue gambling.',
        'Gambling makes things seem better.',
        'It is difficult to stop gambling as I am so out of control.',
        'Specific numbers and colours can help increase my chances of winning.',
        'A series of losses will provide me with a learning experience that will help me win later.',
        'Relating my losses to bad luck and bad circumstances makes me continue gambling.',
        'Gambling makes the future brighter.',
        'My desire to gamble is so overpowering.',
        'I collect specific objects that help increase my chances of winning.',
        'When I have a win once, I will definitely win again.',
        'Relating my losses to probability makes me continue gambling.',
        'Having a gamble helps reduce tension and stress.',
        'I am not strong enough to stop gambling.',
        'I have specific rituals and behaviours that increase my chances of winning.',
        'There are times that I feel lucky and thus, gamble those times only.',
        'Remembering how much money I won last time makes me continue gambling.',
        'I will never be able to stop gambling.',
        'I have some control over predicting my gambling wins.',
        'If I keep changing my numbers, I have less chances of winning than if I keep the same numbers every time'
    ];

    const applicableQuestions = [];
    questionNumbers.forEach(q => applicableQuestions.push(questions[q]));
    return applicableQuestions;
}
