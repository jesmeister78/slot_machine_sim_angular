export function spinResult() {
    return [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [9, 8, 7, 6, 5, 4, 3, 2, 1],
        [3, 2, 4, 1, 5, 9, 6, 8, 7],
        [5, 2, 7, 1, 2, 9, 6, 4, 8],
        [7, 9, 2, 8, 3, 6, 1, 5, 4]
    ];
}

export function getDefaults() {
    return {
        'betAmount': 5,
        'numRows': 5,
        'initialBalance': 100
    };
}

export function getSymbolMap() {
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
