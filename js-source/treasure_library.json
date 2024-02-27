treasure_library = {

    t00: {
        name: "Alphabet Blocks",
        id: "t00",
        description: "Three- and four-letter words deal one extra point of damage.",
        triggertype: "submitword",
        whentriggered: function(loc) {
            if (Model.tiles.selected_tiles.length <= 4) { Model.enemy.hp += -1; View.highlight_treasure(loc); }
        }
    },

    t10: {
        name: "Succulent Cabbage",
        id: "t10",
        description: "Spell 'veggie' words to earn a health potion.",
        triggertype: "submitword",
        whentriggered: function(loc) {
            _this = this;
            var word = "";
            for (var i in Model.tiles.selected_tiles) { word += Model.tiles.selected_tiles[i].letter; }
            Controller.special_checkword(word,"veggies",() => { Model.player.potions.regenerate += 1; Controller.make_potions_functional(); View.highlight_treasure(loc); });
        }
    },

    t11: {
        name: "Tax Papers",
        id: "t11",
        description: "Scrambling replenishes stolen tiles.",
        triggertype: "scramble",
        whentriggered: function(loc) {
            for (var i in Model.tiles.grid_tiles) { if (Model.tiles.grid_tiles[i] == "stolen") { Model.tiles.grid_tiles[i]=new Tile("","normal"); } View.highlight_treasure(loc); }
        }
    },

    t12: {
        name: "Free Dinner",
        id: "t12",
        description: "Chance of winning bonus gem tiles.",
        triggertype: "submitword",
        whentriggered: function(loc) {
            gem_prize = "normal";
            if (Math.random() < 0.1) {
                gem_prize = "amethyst";
            } else if (Math.random() < 0.06) {
                gem_prize = "emerald";
            } else if (Math.random() < 0.03) {
                gem_prize = "garnet";
            }
            if (gem_prize != "normal") {
                for (var i = 0; i < Model.tiles.grid_tiles.length; i++) {
                    if (Model.tiles.grid_tiles[i].status == "normal") { Model.tiles.grid_tiles[i].status = gem_prize; break; }
                }
                View.highlight_treasure(loc);
            }
        }
    },

    t13: {
        name: "Floral Draught",
        id: "t13",
        description: "Chance to power down enemy.",
        triggertype: "submitword",
        whentriggered: function(loc) {
            if (Math.random() < 0.15) { Model.enemy.special.powerdown += 1; View.highlight_treasure(loc); }
        }
    }

}
