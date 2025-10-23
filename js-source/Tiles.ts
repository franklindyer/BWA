enum TileStatus {
    Normal,
    Smashed,
    Plagued,
    Amethyst,
    Emerald,
    Garnet,
    Sapphire,
    Ruby,
    Crystal,
    Diamond
}

class Tile {
    
    constructor(letter: string, status: Tilestatus = Normal) {
        this.letter = letter;
        this.status = status;
    }
}
