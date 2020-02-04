export const TETROMINOS = {
    0: {
        shape: [
            [0]
        ],
        color: "0,0,0"
    }, //ILKIN BASLAYANDA
    I: {
        shape: [
            [0, "I", 0, 0],
            [0, "I", 0, 0],
            [0, "I", 0, 0],
            [0, "I", 0, 0]
        ],
        color: "220,22,201"
    },
    J: {
        shape: [
            [0, "J", 0],
            [0, "J", 0],
            ["J", "J", 0]
        ],
        color: "255, 203, 22"
    },
    L: {
        shape: [
            [0, "L", 0],
            [0, "L", 0],
            [0, "L", "L"]
        ],
        color: "108,237,185"
    },
    O: {
        shape: [
            ["O", "O"],
            ["O", "O"]
        ],
        color: "46,78,188"
    },
    S: {
        shape: [
            [0, "S", "S"],
            [0, "S", 0],
            ["S", "S", 0]
        ],
        color: "222,22,22"
    },
    T: {
        shape: [
            [0, 0, 0],
            ["T", "T", "T"],
            [0, "T", 0]
        ],
        color: "36,211,32"
    },
    Z: {
        shape: [
            ["Z", "Z", 0],
            [0, "Z", "Z"],
            [0, 0, 0]
        ],
        color: "102, 45, 90"
    }
};
export const randomTetro = () => {
    const tetrominos = "ZLIOJST";
    const randTetro = tetrominos[Math.floor(Math.random() * tetrominos.length)]; //random istediyini cixarda bilsiz her defe
    return TETROMINOS[randTetro];
};