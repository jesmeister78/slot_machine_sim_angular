export function spinResult() {
    return [
        [0, 2, 3, 4, 5],
        [8, 7, 6, 5, 4],
        [3, 2, 4, 0, 5],
        [5, 2, 7, 0, 2],
        [6, 8, 2, 7, 3]
    ];
}

export function getDefaults() {
    return {
        'betAmount': 5,
        'numRows': 5,
        'initialBalance': 100
    };
}

export function getSymbolNames() {
    return [
        'Chip',
        'Clover',
        'Crown',
        'Diamond',
        'Grapes',
        'Horseshoe',
        'Pear',
        'Star',
        'Strawberry'
    ];
}
