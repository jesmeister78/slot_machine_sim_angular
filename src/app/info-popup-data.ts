export function getInfoMessages(msgNumber: number) {
    const messages = [
        ['FICTION: If you play long enough you will eventually win.',
        `FACT: Pokies are random so the odds of you winning don\'t change.
         Each spin is a separate game, so winning one game won\'t mean you\'re more likely to win on the next.`],
        ['FICTION: If I\'m a skilled enough gambler, I can beat the odds',
         `FACT: Skill has no bearing on the outcome of playing the pokies.
          Your chance of winning when you sit down are the same as the person next to you.`],
        ['FICTION: You can make up for past losses by continuing to gamble.',
        `FACT: The result of your last game has no bearing on the result of your next game.
         It is illegal for poker machines in Victoria to base outcomes of games on previous outcomes.
          Poker machines cannot react to the frequency of wins or losses.
           The games operate randomly at all times no matter how many wins or losses have occurred in the past.`],
        ['FICTION: You can influence the outcome of a game through concentration or positive thought.',
           `FACT: The machine will always remain random, it cannot be convinced otherwise.
            The machine responds only to you pushing the button and nothing else.`],
        ['FICTION: A "close miss" is an indication of an upcoming win.',
        'FACT: Every event or "spin" is random and a separate event. A near miss means as much as any other loss.'],
        ['FICTION: You can influence the outcome of a game by touching the machine or pushing buttons in a particular way.',
        `FACT: The machine\'s buttons have only two states, on or off. No difference in approach
         to the pushing of the buttons will yield different results.`],
         ['FICTION: You can confuse poker machines into paying out by altering play patterns.',
         `FACT: No matter what you do, the computer program determining the result does not change.
          The machine responds only to you pushing the button.`],
        ['FICTION: Poker machines are more likely to pay out at particular times of the day.',
       `FACT: The result of each game is entirely random and is not affected by anything going
        on around you. The game has no way of knowing the amount of money the machine contains.`],
        ['FICTION: Certain machines are "hotter" or "luckier" than others.',
        `FACT: Poker machines are simply computers programmed to randomly select outcomes.
         While the odds may change depending on the game being played, individual machines are never "hot" or "lucky".`]
    ];

    const messageIndex = msgNumber % messages.length;
    return messages[messageIndex];
}
