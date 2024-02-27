"use strict";
class Tile {
    constructor(letter, status = "normal") {
        this.letter = letter;
        this.status = status;
    }
}
class Attack {
    constructor(name, prob, damage, effect_obj) {
        this.name = name;
        this.probability = prob;
        this.damage = damage;
        this.effects = {
            tilesmash: 0,
            tileplague: 0,
            tilealter: 0,
            tilesteal: 0,
            powerup: 0,
            powerdown: 0,
            regenerate: 0,
            poison: 0,
            bleed: 0,
            burn: 0,
            stun: 0
        };
        for (var i in effect_obj) {
            this.effects[i] = effect_obj[i];
        }
    }
}
let deepClone = function (object) {
    return JSON.parse(JSON.stringify(object));
};
let weightedRandom = function (weights) {
    let sum = 0, cumsum = 0;
    for (var i in weights) {
        sum += weights[i];
    }
    let r = sum * Math.random();
    for (var i in weights) {
        cumsum += weights[i];
        if (r <= cumsum)
            return String(i);
    }
};
let largestUnder = function (obj, num) {
    var current_val = 0;
    var current_num = 0;
    for (var i in obj) {
        if (Number(i) > Number(current_num) && Number(i) <= num) {
            current_num = i;
            current_val = obj[i];
        }
    }
    return current_val;
};
var Model = {
    stats: game_stats,
    tiles: {
        grid_tiles: new Array(16).fill(0),
        selected_tiles: [],
        fill_tiles: function (gem = "normal") {
            let gem_tile = gem;
            for (var i in this.grid_tiles) {
                if (this.grid_tiles[i] == 0) {
                    this.grid_tiles[i] = new Tile(weightedRandom(Model.stats.letter_freqs), gem_tile);
                    gem_tile = "normal";
                }
            }
            return this.grid_tiles;
        },
        purify_tiles: function () {
            for (var i in this.grid_tiles) {
                if (this.grid_tiles[i] == "stolen") {
                    this.grid_tiles[i] = new Tile(weightedRandom(Model.stats.letter_freqs, "normal"));
                }
                if (["smashed", "plague"].includes(this.grid_tiles[i].status)) {
                    this.grid_tiles[i].status = "normal";
                }
            }
        },
        select_tile: function (index) {
            this.selected_tiles.push(this.grid_tiles[index]);
            this.grid_tiles[index] = 0;
        },
        deselect_all_tiles: function () {
            for (var i in this.grid_tiles) {
                if (this.grid_tiles[i] == 0) {
                    this.grid_tiles[i] = this.selected_tiles.pop();
                }
            }
        },
        afflict_tile: function (affliction, force = 0) {
            if (affliction == "tilesteal") {
                this.grid_tiles[Math.floor(Math.random() * this.grid_tiles.length)] = "stolen";
            }
            else {
                var which_tile = Math.floor(Math.random() * this.grid_tiles.length);
                var rand_tile = this.grid_tiles[which_tile];
                if (rand_tile.status == "normal" || force != 0) {
                    rand_tile.status = affliction;
                    return which_tile;
                }
            }
        },
        alter_tile: function () {
            bad_tiles = ["J", "Q", "X", "Z"];
            var which_tile = Math.floor(Math.random() * this.grid_tiles.length);
            var rand_tile = this.grid_tiles[which_tile];
            if (rand_tile.letter) {
                var new_letter = bad_tiles[Math.floor(Math.random() * 4)];
                rand_tile.letter = new_letter;
                return which_tile;
            }
        },
        scramble_tiles: function () {
            for (var i in this.grid_tiles) {
                this.grid_tiles[i].letter = weightedRandom(Model.stats.letter_freqs);
            }
            return this.grid_tiles;
        }
    },
    whoseturn: "player",
    player: {
        name: "Lex",
        full_hp: 15,
        hp: 15,
        special: {
            poison: 0,
            bleed: 0,
            burn: 0,
            powerup: 0,
            powerdown: 0,
            stun: 0,
            shielded: 0
        },
        potions: {
            regenerate: 0,
            powerup: 0,
            purify: 0
        },
        treasures: [],
        hardcore: 0,
        smart_health_decrement: function (damage) {
            if (this.hp > damage) {
                this.hp += -damage;
            }
            else {
                this.hp = 0;
            }
        },
        get_random_potion: function (potion_probs) {
            for (var i in potion_probs) {
                if (Math.random() < potion_probs[i]) {
                    this.potions[i] += 1;
                }
            }
        },
        reset_player_effects: function () {
            for (var i in this.special) {
                this.special[i] = 0;
            }
        },
        purify_player_effects: function () {
            var sp = this.special;
            sp.poison = sp.bleed = sp.burn = sp.powerdown = sp.stun = 0;
        }
    },
    enemy: {
        name: "",
        id: "",
        full_hp: 0,
        hp: 0,
        overkill: 0,
        attacks: [],
        flavortext: "",
        special: {
            poison: 0,
            bleed: 0,
            burn: 0,
            powerup: 0,
            powerdown: 0,
            freeze: 0
        },
        smart_health_decrement: function (damage) {
            if (this.hp > damage) {
                this.hp += -damage;
            }
            else {
                this.overkill = damage - this.hp;
                this.hp = 0;
            }
        },
        reset_enemy_effects: function () {
            for (var i in this.special) {
                this.special[i] = 0;
            }
            this.overkill = 0;
        },
        updateme: function (new_enemy) {
            delete this.ondeath;
            for (var i in new_enemy) {
                this[i] = new_enemy[i];
            }
        }
    },
    decrement_effects: function () {
        var p_spesh = this.player.special;
        var e_spesh = this.enemy.special;
        for (var i in p_spesh) {
            if (p_spesh[i] != 0) {
                this.player.special[i] += -1;
            }
        }
        for (var i in e_spesh) {
            if (e_spesh[i] != 0) {
                this.enemy.special[i] += -1;
            }
        }
    },
    word_power: function (word_tiles) {
        let power = 0;
        for (i in word_tiles) {
            if (!["smashed", "plague"].includes(word_tiles[i].status)) {
                power += this.stats.letter_strengths[word_tiles[i]['letter']];
            }
            if (word_tiles[i].status != "normal") {
                if (word_tiles[i].status == "amethyst") {
                    this.enemy.special.poison += 2;
                    power += 1;
                }
                else if (word_tiles[i].status == "emerald") {
                    if (this.player.full_hp - this.player.hp > 5) {
                        this.player.hp += 5;
                    }
                    else {
                        this.player.hp = this.player.full_hp;
                    }
                    power += 1;
                }
                else if (word_tiles[i].status == "garnet") {
                    this.enemy.special.powerdown += 1;
                    this.enemy.special.powerup = 0;
                    power += 2;
                }
                else if (word_tiles[i].status == "sapphire") {
                    this.enemy.special.freeze += 1;
                    power += 2;
                }
                else if (word_tiles[i].status == "ruby") {
                    this.enemy.special.burn += 3;
                    power += 3;
                }
                else if (word_tiles[i].status == "crystal") {
                    this.player.purify_player_effects();
                    this.player.special.shielded += 1;
                    this.tiles.purify_tiles();
                    power += 4;
                }
                else if (word_tiles[i].status == "diamond") {
                    this.player.hp = this.player.full_hp;
                    for (var i in this.player.potions) {
                        this.player.potions[i]++;
                    }
                    power += 5;
                }
            }
        }
        return power;
    },
    initialize: function () {
        this.tiles.fill_tiles();
        if (this.player.hardcore == 0) {
            this.player.hp = this.player.full_hp;
        }
        ;
        this.enemy.hp = this.enemy.full_hp;
        this.whoseturn = "player";
    }
};
//# sourceMappingURL=Model.js.map