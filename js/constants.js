game_stats = {

    letter_freqs: {
        'A':8.50,
        'B':2.07,
        'C':4.54,
        'D':3.38,
        'E':11.16,
        'F':1.81,
        'G':2.47,
        'H':3.00,
        'I':7.58,
        'J':0.20,
        'K':1.10,
        'L':5.49,
        'M':3.01,
        'N':6.65,
        'O':7.16,
        'P':3.17,
        'Q':0.20,
        'R':7.58,
        'S':5.74,
        'T':6.95,
        'U':3.63,
        'V':1.01,
        'W': 1.29,
        'X':0.29,
        'Y':1.78,
        'Z':0.27
    },

    letter_strengths: {
        'A':1,
        'B':2,
        'C':2,
        'D':2,
        'E':1,
        'F':2,
        'G':2,
        'H':2,
        'I':1,
        'J':3,
        'K':2,
        'L':2,
        'M':2,
        'N':1,
        'O':1,
        'P':2,
        'Q':3,
        'R':1,
        'S':1,
        'T':1,
        'U':2,
        'V':2,
        'W':2,
        'X':3,
        'Y':2,
        'Z':3
    },

    gem_awards: {
        3:"normal",
        4:"normal",
        5:"amethyst",
        6:"emerald",
        7:"garnet",
        8:"sapphire",
        9:"ruby",
        10:"crystal",
        11:"diamond",
        12:"diamond",
        13:"diamond",
        14:"diamond",
        15:"diamond",
        16:"diamond"
    },

    word_messages: {
        3:"Meh.",
        4:"Good!",
        5:"Nice!",
        6:"Great!",
        7:"Fantastic!",
        8:"Awesome!",
        9:"Incredible!",
        10:"Astonishing!",
        16:"You're trying too hard..."
    },

    overkill_awards: {
        4:"amethyst",
        7:"emerald",
        10:"garnet",
        13:"sapphire",
        16:"ruby",
        19:"crystal" 
    },

    overkill_messages: {
        4:"Wasted!",
        7:"Demolished!",
        10:"Exterminated!",
        13:"Pulverized!",
        16:"Obliterated!",
        19:"Annihilated!" 
    },

    normal_potion_probs: { 
        regenerate:0.4, 
        powerup:0.2, 
        purify:0.1 
    },

    boss_potion_probs: { 
        regenerate:0.7, 
        powerup:0.5, 
        purify:0.3 
    }
 
}

tile_helptexts = {
    normal: "",
    amethyst: "Amethyst tile: poisons enemy.",
    emerald: "Emerald tile: regenerates 5 hp.",
    garnet: "Garnet tile: powers enemy down.",
    sapphire: "Sapphire tile: freezes enemy.",
    ruby: "Ruby tile: burns enemy.",
    crystal: "Crystal tile: purifies and shields Lex.",
    diamond: "Diamond tile: restores full health and awards potions.",
    smashed: "Smashed tile: deals no damage.",
    plague: "Plagued tile: deals no damage and spreads."
}

tile_colors = {
    normal: "linear-gradient(to bottom right, #ffd9b3, #ffd9b3)",
    smashed: "linear-gradient(to bottom right, #cccccc, #cccccc)",
    plague: "repeating-linear-gradient(45deg, #ffd9b3, #ffd9b3 7px, #86b300 7px, #86b300 14px)",
    amethyst: "linear-gradient(to bottom right, #cc00cc, #ffccff)",
    emerald: "linear-gradient(to bottom right, #b3ffb3, #33cc00)",
    garnet: "linear-gradient(to bottom right, #ffcc66, #ff6600)",
    sapphire: "linear-gradient(to bottom right, #b3e6ff, #0077b3)",
    ruby: "linear-gradient(to bottom right, #ff9980, #ff3300)",
    crystal: "linear-gradient(to bottom right, #ffccff, #ff6699)",
    diamond: "linear-gradient(to bottom right, #66ffff, #a6a6a6)"    
}
