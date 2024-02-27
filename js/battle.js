class Tile {
    constructor(letter, status="normal") {
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
        }
        for (var i in effect_obj) {
            this.effects[i] = effect_obj[i];
        }
    }
}

deepClone = function(object) {
    return JSON.parse(JSON.stringify(object));
}

weightedRandom = function(weights) {
    let i, sum=0, cumsum=0, r;
    for (i in weights) {sum += weights[i]}
    r = sum*Math.random();
    for (i in weights) {
        cumsum += weights[i];
        if (r <= cumsum) return String(i);
    }
}

largestUnder = function(obj, num) {
    var current_val = 0;
    var current_num = 0;
    for (i in obj) {
        if (Number(i) > Number(current_num) && Number(i) <= num) {
            current_num = i;
            current_val = obj[i];
        }
    }
    return current_val;
}

var Model = {

    stats: {
    
        letter_freqs: {'A':8.50, 'B':2.07, 'C':4.54, 'D':3.38, 'E':11.16, 'F':1.81, 'G':2.47, 'H':3.00, 'I':7.58, 'J':0.20, 'K':1.10, 'L':5.49, 'M':3.01, 'N':6.65, 'O':7.16, 'P':3.17, 'Q':0.20, 'R':7.58, 'S':5.74, 'T':6.95, 'U':3.63, 'V':1.01, 'W': 1.29, 'X':0.29, 'Y':1.78, 'Z':0.27},
    
        letter_strengths: {'A':1, 'B':2, 'C':2, 'D':2, 'E':1, 'F':2, 'G':2, 'H':2, 'I':1, 'J':3, 'K':2, 'L':2, 'M':2, 'N':1, 'O':1, 'P':2, 'Q':3, 'R':1, 'S':1, 'T':1, 'U':2, 'V':2, 'W':2, 'X':3, 'Y':2, 'Z':3},
    
        gem_awards: { 3:"normal", 4:"normal", 5:"amethyst", 6:"emerald", 7:"garnet", 8:"sapphire", 9:"ruby", 10:"crystal", 11:"diamond", 12:"diamond", 13:"diamond", 14:"diamond", 15:"diamond", 16:"diamond" },

        word_messages: { 3:"Meh.", 4:"Good!", 5:"Nice!", 6:"Great!", 7:"Fantastic!", 8:"Awesome!", 9:"Incredible!", 10:"Astonishing!", 16:"You're trying too hard..." },

        overkill_awards: { 4:"amethyst", 7:"emerald", 10:"garnet", 13:"sapphire", 16:"ruby", 19:"crystal" },

        overkill_messages: { 4:"Wasted!", 7:"Demolished!", 10:"Exterminated!", 13:"Pulverized!", 16:"Obliterated!", 19:"Annihilated!" },

        normal_potion_probs: { regenerate:0.4, powerup:0.2, purify:0.1 },

        boss_potion_probs: { regenerate:0.7, powerup:0.5, purify:0.3 }
    
    },
    
    tiles: {
    
        grid_tiles: new Array(16).fill(0),
        
        selected_tiles: [],
        
        fill_tiles: function(gem="normal") {
            gem_tile = gem;
            for (i in this.grid_tiles) {
                if (this.grid_tiles[i] == 0) {
                    this.grid_tiles[i] = new Tile(weightedRandom(Model.stats.letter_freqs), gem_tile);
                    gem_tile = "normal";
                }
            }
            return this.grid_tiles;
        },

        purify_tiles: function() {
            for (i in this.grid_tiles) {
                if (this.grid_tiles[i] == "stolen") { this.grid_tiles[i]= new Tile(weightedRandom(Model.stats.letter_freqs, "normal")) }
                if (["smashed","plague"].includes(this.grid_tiles[i].status)) { this.grid_tiles[i].status="normal" }
            }
        },
        
        select_tile: function(index) {
            this.selected_tiles.push(this.grid_tiles[index]);
            this.grid_tiles[index] = 0;
        },
        
        deselect_all_tiles: function() {
            for (i in this.grid_tiles) {
                if (this.grid_tiles[i] == 0) {
                    this.grid_tiles[i] = this.selected_tiles.pop();
                }
            }
        },
        
        afflict_tile: function(affliction, force=0) {
            if (affliction=="tilesteal") {
                this.grid_tiles[Math.floor(Math.random()*this.grid_tiles.length)]="stolen";
            } else {
                var which_tile = Math.floor(Math.random() * this.grid_tiles.length);
                var rand_tile = this.grid_tiles[which_tile];
                if (rand_tile.status == "normal" || force != 0) {
                    rand_tile.status = affliction;
                    return which_tile;
                }
            }
        },
        
        alter_tile: function() {
            bad_tiles = ["J","Q","X","Z"];
            var which_tile = Math.floor(Math.random() * this.grid_tiles.length);
            var rand_tile = this.grid_tiles[which_tile];
            if (rand_tile.letter) {
                var new_letter = bad_tiles[Math.floor(Math.random() * 4)];
                rand_tile.letter = new_letter;
                return which_tile
            }
        },
        
        scramble_tiles: function() {
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
        
        smart_health_decrement: function(damage) {
            if (this.hp > damage) {
                this.hp += -damage;
            } else {
                this.hp = 0;
            }
        },

        get_random_potion: function(potion_probs) {
            for (var i in potion_probs) {
                if (Math.random()<potion_probs[i]) { this.potions[i] += 1 }
            } 
        },

        reset_player_effects: function() {
            for (var i in this.special) { this.special[i] = 0; }
        },

        purify_player_effects: function() {
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
        
        smart_health_decrement: function(damage) {
            if (this.hp > damage) {
                this.hp += -damage;
            } else {
                this.overkill = damage - this.hp;
                this.hp = 0;
            }
        },

        reset_enemy_effects: function() {
            for (var i in this.special) { this.special[i] = 0; }
            this.overkill = 0;
        },

        updateme: function(new_enemy) {
            delete this.ondeath;
            for (var i in new_enemy) { this[i] = new_enemy[i] }
        }
    
    },
    
    decrement_effects: function() {
        var p_spesh = this.player.special;
        var e_spesh = this.enemy.special;
        for (var i in p_spesh) { if (p_spesh[i] != 0) { this.player.special[i] += -1 } }
        for (var i in e_spesh) { if (e_spesh[i] != 0) { this.enemy.special[i] += -1 } }
    },
    
    word_power: function(word_tiles) {
            power = 0;
            for (i in word_tiles) {
                if (!["smashed","plague"].includes(word_tiles[i].status)) { 
                    power += this.stats.letter_strengths[word_tiles[i]['letter']]; 
                }
                if (word_tiles[i].status != "normal") {
                    if (word_tiles[i].status == "amethyst") {
                        this.enemy.special.poison += 2;
                        power += 1;
                    } else if (word_tiles[i].status == "emerald") {
                        if (this.player.full_hp - this.player.hp > 5) { this.player.hp += 5 } else { this.player.hp = this.player.full_hp }
                        power += 1;
                    } else if (word_tiles[i].status == "garnet") {
                        this.enemy.special.powerdown += 1;
                        this.enemy.special.powerup = 0;
                        power += 2;
                    } else if (word_tiles[i].status == "sapphire") {
                        this.enemy.special.freeze += 1;
                        power += 2;
                    } else if (word_tiles[i].status == "ruby") {
                        this.enemy.special.burn += 3;
                        power += 3;
                    } else if (word_tiles[i].status == "crystal") {
                        this.player.purify_player_effects();
                        this.player.special.shielded += 1;
                        this.tiles.purify_tiles();
                        power += 4;
                    } else if (word_tiles[i].status == "diamond") {
                        this.player.hp = this.player.full_hp;
                        for (var i in this.player.potions) { this.player.potions[i]++; }
                        power += 5;
                    }
                }
            }
            return power;
    },
    
    initialize: function() {
        this.tiles.fill_tiles();
        if (this.player.hardcore == 0) { this.player.hp = this.player.full_hp };
        this.enemy.hp = this.enemy.full_hp;
        this.whoseturn = "player"; 
    }
    
}

var View = {

    message_queue: [],

    dialogue_clickable: 0,

    display_message: function(dialogue_obj) {
        this.dialogue_clickable = 0;
        var blackout = document.getElementById("blackout");
        var messageboard = document.getElementById("messageboard");
        var message = document.getElementById("speaker_message");
        message.innerHTML = "";
        var speaker_img = document.getElementById("current_speaker");
        speaker_img.style.display = "none";
        blackout.style.display = "inline-block";
        if (dialogue_obj.color) { messageboard.style.backgroundColor = dialogue_obj.color; } else { messageboard.style.backgroundColor = "white"; }
        if (dialogue_obj.float) { speaker_img.style.float = dialogue_obj.float; }
        if (dialogue_obj.speaker_img) { speaker_img.style.display = "block"; speaker_img.src = dialogue_obj.speaker_img; }
        for (var i = 0; i < dialogue_obj.message.length; i++) {
            setTimeout(function(i) {
                message.innerHTML = dialogue_obj.message.substring(0, i+1);
            }.bind(this,i),20*i);
        }
        setTimeout(() => { this.dialogue_clickable = 1; }, 20*dialogue_obj.message.length);
    },

    initialize_dialogue: function() {
        if (this.message_queue.length != 0) { this.display_message(this.message_queue.shift()); }
    },

    make_dialogue_functional: function() {
        document.getElementById("messageboard").addEventListener('click', () => {
            if (this.dialogue_clickable) {
                if (this.message_queue == 0) {
                    document.getElementById("blackout").style.display = "none";
                } else {
                    this.display_message(this.message_queue.shift());
                }
            }
        });
    },

    display_helptext: function(helptext) {
        var help_div = document.getElementById("help_text");
        help_div.innerHTML = helptext;
    },

    tile_helptexts: {
        normal: "",
// gem tiles
        amethyst: "Amethyst tile: poisons enemy.",
        emerald: "Emerald tile: regenerates 5 hp.",
        garnet: "Garnet tile: powers enemy down.",
        sapphire: "Sapphire tile: freezes enemy.",
        ruby: "Ruby tile: burns enemy.",
        crystal: "Crystal tile: purifies and shields Lex.",
        diamond: "Diamond tile: restores full health and awards potions.",
// tile ailments
        smashed: "Smashed tile: deals no damage.",
        plague: "Plagued tile: deals no damage and spreads."
    },

    set_name_tags: function(pname, ename) {
        var player_tag = document.getElementById("player_name");
        var enemy_tag = document.getElementById("enemy_name");
        player_tag.innerHTML = pname;
        enemy_tag.innerHTML = ename;
    },
    
    set_enemy_image: function(enemy) {
        var enemy_img = document.getElementById("enemy_img");
        var enemy_display = document.getElementById("enemy_display");
        enemy_img.src = "/img/enemy_"+enemy.id+".png";
        enemy_display.style.height = enemy.height;
        enemy_img.style.width = enemy.width;
        enemy_img.style.display = "block";
    },
    
    set_background_image: function(enemy) {
        var battlefield = document.getElementById("battlefield");
        var img_url = "url(/img/background_"+String(enemy.id).substring(1, enemy.id.length-1)+".png)";
        battlefield.style.backgroundImage = img_url;
    },
    
    display_enemy_quips: function(enemy) {
        if (enemy.quips) {
            var quip_interval_id = setInterval(() => {
                var random_quip = enemy.quips[Math.floor(Math.random() * enemy.quips.length)];
                var speechbubble = document.getElementById("enemy_speechbubble");
                speechbubble.innerHTML = random_quip;
                speechbubble.style.display = "inline-block";
                setTimeout(() => {
                    speechbubble.style.display = "none";
                },20000)
            }, 80000)
            return quip_interval_id;
        }
    },

    display_overkill_msg: function(message, gemtype) {
        var message_box = document.getElementById("overkill_box");
        var prize_preview = document.getElementById("overkill_prize");
        var overkill_message = document.getElementById("overkill_msg");
        prize_preview.style.backgroundImage = this.tile_colors[gemtype];
        overkill_message.innerHTML = message;
        message_box.style.animation = "fadein 0.3s";
        message_box.style.display = "block";
        setTimeout(() => { message_box.style.animation = "fadeout 0.3s"; }, 2400)
        setTimeout(() => { message_box.style.display = "none"; }, 2700)
    },

    render_potions: function(player) {
        var needs_new_event_listener = {};
        for (var i in player.potions) {
            var preex_potion_count = document.getElementById(String(i)+"_potion_count");
            needs_new_event_listener[i] = false;
            if (preex_potion_count && player.potions[i] != 0) {
                preex_potion_count.innerHTML = String(player.potions[i]);
            } else {
                var potion_section = document.getElementById(String(i)+"_potions");
                potion_section.innerHTML = "";
                if (player.potions[i] != 0) {
                    var img_url = "/img/"+String(i)+"_potion.png";
                    var potion_img = document.createElement("img");
                    var potion_count = document.createElement("t1");
                    potion_img.src = img_url;
                    potion_count.innerHTML = String(player.potions[i]);
                    potion_count.id = String(i) + "_potion_count";
                    potion_section.appendChild(potion_count);
                    potion_section.appendChild(potion_img);
                    potion_img.style.width = "100%";
                    potion_img.id = String(i)+"_potion_clicker";
                    needs_new_event_listener[i] = true;
                }
            }
        }
        return needs_new_event_listener;
    },

    render_treasures: function(player) {
        for (var i in player.treasures) {
            var treasure_section = document.getElementById("treasure"+String(Number(i)+1));
            treasure_section.innerHTML = "";
            var img_url = "/img/treasure_"+String(player.treasures[i].id)+".png";
            var treasure_img = document.createElement("img");
            var treasure_name = document.createElement("t1");
            var treasure_desc = document.createElement("p");
            treasure_img.src = img_url;
            treasure_name.innerHTML = player.treasures[i].name;
        //    treasure_desc.innerHTML = player.treasures[i].description;
        //    treasure_desc.style.fontSize = "8px";
        //    treasure_desc.style.lineHeight = "8px";
            treasure_section.appendChild(treasure_img);
            treasure_section.appendChild(treasure_name);
        //    treasure_section.appendChild(treasure_desc);
            treasure_img.style.width = "85%";
        }
    },

    highlight_treasure: function(whichtreasure) {
        var treasure_box = document.getElementById("treasure"+String(whichtreasure));
        treasure_box.style.borderColor = "#ff9900";
        setTimeout(() => { treasure_box.style.borderColor = "#804000"; }, 2000);
    },
    
    tile_colors: {
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
    },

    refresh_grid: function(grid_tiles, selected_tiles) {
        var tile_style = this.tile_colors;
// tiles still in grid (not selected)
        var tile_tds = document.getElementsByClassName("grid");
        for (var i = 0; i < tile_tds.length; i++) {
            tile_tds[i].innerHTML = "";
            tile_tds[i].style.backgroundColor = "#663300";
            tile_tds[i].style.backgroundImage = "";
            tile_tds[i].style.animation = "";
        }
        for (i in grid_tiles) {
            current_tile = tile_tds[i];
            if (grid_tiles[i] != 0 && grid_tiles[i] != "stolen") {
                var type = grid_tiles[i].status;
                current_tile.style.backgroundImage = tile_style[type];
                tile_tds[i].innerHTML = grid_tiles[i].letter;
                if (grid_tiles[i].one_time_animation) { current_tile.style.animation = grid_tiles[i].one_time_animation; grid_tiles[i].one_time_animation = ""; }
                if (["amethyst","emerald","garnet","sapphire","ruby","crystal","diamond"].includes(type)) { current_tile.style.animation = "glimmer 2s infinite"; }
            }
        }
// selected tiles
        var sel_tile_table = document.getElementById("selected_tiles");
        if (selected_tiles) {
            var num_sel = selected_tiles.length;
            var sel_size = 50 - 5 * Math.floor(num_sel/3);
            sel_tile_table.style.height = String(sel_size)+"px";
        }
        sel_tile_table.innerHTML = "";
        for (var i in selected_tiles) {
            newtile = document.createElement("td");
            newtile.classList.add("grid_selected");
            newtile.innerHTML = selected_tiles[i].letter;
            var type = selected_tiles[i].status;
            newtile.style.backgroundImage = tile_style[type];
            if (["amethyst","emerald","garnet","sapphire","ruby","crystal","diamond"].includes(type)) { newtile.style.animation = "glimmer 2s infinite"; }
            if (selected_tiles) {
                newtile.style.width = String(sel_size)+"px";
                newtile.style.height = String(sel_size)+"px";
            }

            sel_tile_table.appendChild(newtile);
        }
    },

    tile_animation: function(whichtile, animation, grid) {
        var tile = document.getElementById("grid"+String(whichtile));
        if (tile) {
            tile.style.animation = animation;
            if (grid) {
                grid[whichtile].one_time_animation = animation;
            }
        }
    },
    
    refresh_enemy_health: function(enemy, old_health) {
        var enemy_bar = document.getElementById("enemy_health");
        var old_width = 20 + 180*old_health/enemy.full_hp;
        var new_width = 20 + 180*enemy.hp/enemy.full_hp;
        function set_old() {
            enemy_bar.setAttribute("style","width:"+String(old_width)+"px")
        }
        function set_new() {
            enemy_bar.setAttribute("style","width:"+String(new_width)+"px")
        }
        for (var i = 0; i < 5; i++) {
            setTimeout(set_old, 300*i);
            setTimeout(set_new, 300*i+150);
        }
//        enemy_bar.setAttribute("style","width:"+String(new_width)+"px");
        enemy_bar.innerHTML = Math.ceil(enemy.hp);
    },
    
    refresh_player_health: function(player, old_health) {
        var player_bar = document.getElementById("player_health");
        var old_width = 20 + 180*old_health/player.full_hp;
        var new_width = 20 + 180*player.hp/player.full_hp;
        function set_old() {
            player_bar.setAttribute("style","width:"+String(old_width)+"px")
        }
        function set_new () {
            player_bar.setAttribute("style","width:"+String(new_width)+"px")
        }
        for (var i = 0; i < 5; i++) {
            setTimeout(set_old, 300*i);
            setTimeout(set_new, 300*i+150);
        }
        player_bar.innerHTML = Math.ceil(player.hp);
        var player_img = document.getElementById("player_img");
        if (player.hp <= 3 && player.hardcore == 0) {
            player_img.src = "/img/lex_lowhealth.png";
            player_img.style["animation"] = player_img.style["-webkit-animation"] = player_img.style["-o-animation"] = "playerbreathe 1.0s infinite";
        } else if (player.hardcore == 0) {
            player_img.src = "/img/lex.png";
            player_img.style["animation"] = player_img.style["-webkit-animation"] = player_img.style["-o-animation"] = "playerbreathe 1.7s infinite";
        }
    },
    
    refresh_player_effects: function(player) {
        var player_effects = document.getElementById("player_effects");
        player_effects.innerHTML = "";
        for (var i in player.special) {
            if (player.special[i] != 0) {
                var chunk = document.createElement("td")
                var icon = document.createElement("img");
                icon.src = "/img/"+String(i)+"_icon.png";
                icon.classList.add("attackicon");
                var coeff = document.createElement("a");
                coeff.innerHTML=String(player.special[i]);
                chunk.appendChild(icon);
                chunk.appendChild(coeff);
                player_effects.appendChild(chunk);
            }
        }
    },

    enemy_fade: function() {
        enemy_img = document.getElementById("enemy_img");
        enemy_img.style.animation = "fadeout 2s";
        setTimeout(() => { enemy_img.style.display = "none"; enemy_img.style.animation = ""; },2000)
    },
    
    refresh_enemy_effects: function(enemy) {
        var enemy_effects = document.getElementById("enemy_effects");
        enemy_effects.innerHTML = "";
        for (var i in enemy.special) {
            if (enemy.special[i] != 0) {
                var chunk = document.createElement("td")
                var icon = document.createElement("img");
                icon.src = "/img/"+String(i)+"_icon.png";
                icon.classList.add("attackicon");
                var coeff = document.createElement("a");
                coeff.innerHTML=String(enemy.special[i]);
                chunk.appendChild(icon);
                chunk.appendChild(coeff);
                enemy_effects.appendChild(chunk);
            }
        }
    },
    
    show_grid_blocker: function(color, text) {
        var grid_blocker = document.getElementById("block_grid");
        if (color) {
            grid_blocker.style.display = "block";
            grid_blocker.style.backgroundColor = color;
        } else {
            grid_blocker.style.display = "none";
        }
        if (text) { document.getElementById("block_grid_text").innerHTML = text; }
    },

    render_enemy_info: function(enemy) {
        document.getElementById("enemy_info").innerHTML = "";
        for (var i in enemy.attacks) {
            var row = document.createElement("tr");
            var entry = document.createElement("td");
            entry.classList.add("attacktext")
            entry.id = "attack"+String(i);
            var node = document.createTextNode(enemy.attacks[i].name);
            entry.appendChild(node);
            row.appendChild(entry);
            var show_sword = 1;
            for (var j in enemy.attacks[i].effects) {
                if (enemy.attacks[i].effects[j] != 0) {
                    var icon = document.createElement("img");
                    icon.src = "/img/"+String(j)+"_icon.png";
                    icon.classList.add("attackicon")
                    entry.appendChild(icon);
                    show_sword = 0;
                }
            }
            if (enemy.attacks[i].damage != 0 && show_sword == 1) {
                var icon = document.createElement("img");
                icon.src = "/img/damage_icon.png";
                icon.classList.add("attackicon")
                entry.appendChild(icon);
            }
            document.getElementById("enemy_info").appendChild(row)
        }
        var row = document.createElement("tr");
        var entry = document.createElement("td");
        entry.id = "flavortext";
        var node = document.createTextNode(enemy.flavortext);
        entry.appendChild(node);
        row.appendChild(entry);
        document.getElementById("enemy_info").appendChild(row);
    },
    
    select_attack: function(attack_num) {
        var attack_info = document.getElementById("attack"+String(attack_num));
        attack_info.style.borderColor = "#ff8080";
    },
    
    deselect_attack: function(attack_num) {
        var attack_info = document.getElementById("attack"+String(attack_num));
        attack_info.style.borderColor = "#e60000";
    }

}

var Savefile = {

    retrieve_savefile: function() {
        this.complete_savefile = JSON.parse(localStorage.getItem("savefile"));
        this.this_savefile = deepClone(this.complete_savefile.games[this.complete_savefile.current_game]);
    },

    save_changes: function() {
        this.complete_savefile.games[this.complete_savefile.current_game] = deepClone(this.this_savefile);
        localStorage.setItem("savefile",JSON.stringify(this.complete_savefile));
    },

    set_death_checkpoint: function() {
        for (var i in this.this_savefile) {
            if (i != "death_checkpoint") { this.this_savefile.death_checkpoint[i] = deepClone(this.this_savefile)[i]; }
        }
    },

    death_overwrite: function() {
        for (var i in this.this_savefile.death_checkpoint) {
            this.this_savefile[i] = this.this_savefile.death_checkpoint[i];
        }
    },

    change_this_savefile: function(updates) {
        for (var i in updates) { this.this_savefile[i] = deepClone(updates)[i]; }
    },

}

var Controller = {

    respond_to_tile_click: function() {
        if (this.innerHTML != "" && Model.whoseturn == "player") {
            tile_id = event.srcElement.id.substring(4);
            View.display_helptext(View.tile_helptexts[Model.tiles.grid_tiles[Number(tile_id)].status]);
            Model.tiles.select_tile(tile_id);
            View.refresh_grid(Model.tiles.grid_tiles, Model.tiles.selected_tiles);
        }
    },
    
    respond_to_deselect: function() {
        Model.tiles.deselect_all_tiles();
        View.refresh_grid(Model.tiles.grid_tiles, Model.tiles.selected_tiles);
        View.display_helptext("");
    },
    
    respond_to_word_submit: function() {
        if (Model.whoseturn == "player") {
            word = "";
            for (var i in Model.tiles.selected_tiles) {
                word += Model.tiles.selected_tiles[i].letter;
            }
            if (word.length > 2) { Controller.checkword(word); }
        }
        View.display_helptext("");
    },
    
    respond_to_scramble: function() {
        if (Model.whoseturn == "player") {
            Controller.activate_treasures("scramble");
            Model.whoseturn = "enemy";
            Model.tiles.deselect_all_tiles();
            View.refresh_grid(Model.tiles.scramble_tiles());
            setTimeout(() => { Controller.enemy_attack_sequence(); }, 1000);
        }
    },
    
    respond_to_skipturn: function() {
        if (Model.whoseturn == "player") {
            Model.whoseturn = "enemy";
            View.show_grid_blocker();
            setTimeout(() => { Controller.enemy_attack_sequence(); }, 1000);
        }
    },

    respond_to_drinkpotion: function(potion) {
        if (Model.whoseturn=="player") {
            if (potion=="regenerate") {
                old_player_health = Model.player.hp;
                if (Model.player.full_hp-Model.player.hp > 5) { Model.player.hp += 5; } else { Model.player.hp = Model.player.full_hp; }
                View.refresh_player_health(Model.player, old_player_health);
            }
            if (potion=="powerup") {
                Model.player.special.powerup += 1;
                Model.player.special.powerdown = 0;
                View.refresh_player_effects(Model.player);
            }
            if (potion=="purify") {
                Model.tiles.purify_tiles();
                var sp = Model.player.special;
                Model.purify_player_effects();
                View.show_grid_blocker();
                View.refresh_player_effects(Model.player);
                View.refresh_grid(Model.tiles.grid_tiles);
            }
            Model.player.potions[potion] += -1;
            this.make_potions_functional();
        }
    },

    make_potions_functional: function() {
        var nnel = View.render_potions(Model.player);
        var reg = document.getElementById("regenerate_potion_clicker");
        var pwu = document.getElementById("powerup_potion_clicker");
        var pur = document.getElementById("purify_potion_clicker");
        if (nnel.regenerate) { reg.addEventListener("click",() => this.respond_to_drinkpotion("regenerate")); }
        if (nnel.powerup) { pwu.addEventListener("click",() => this.respond_to_drinkpotion("powerup")); }
        if (nnel.purify) { pur.addEventListener("click",() => this.respond_to_drinkpotion("purify")); }
    },

    make_grid_functional: function() {
        var clickable_tiles = document.getElementsByClassName("grid");
        for (var i = 0; i < clickable_tiles.length; i++) {
            clickable_tiles[i].addEventListener('click', this.respond_to_tile_click);
        }
        document.getElementById("selected_grid").addEventListener('click', this.respond_to_deselect);
        document.getElementById("submit_word").addEventListener('click', this.respond_to_word_submit);
        document.getElementById("scramble").addEventListener('click', this.respond_to_scramble);
        document.getElementById("block_grid").addEventListener('click', this.respond_to_skipturn);
    },
    
    checkword: function(word) {
        const xhr = new XMLHttpRequest(), method = "GET", url = "/checkword/"+word;
        xhr.open(method, url, true);
        _this = this;
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    if (xhr.responseText == 't') {
                        _this.player_attack_sequence();
                    }
                }
            }
        };
        xhr.send();
    },

    special_checkword: function(word, category, executeme) {
        const xhr = new XMLHttpRequest(), method = "GET", url = "/specialword/"+category+"/"+word;
        xhr.open(method, url, true);
        _this = this;
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    if (xhr.responseText == 't' && executeme) { executeme(); }
                }
            }
        };
        xhr.send();
    },

    activate_treasures: function(triggertype) {
        for (var i in Model.player.treasures) { 
            if (Model.player.treasures[i].triggertype==triggertype) { treasure_library[Model.player.treasures[i].id].whentriggered(Number(i)+1) }
        }
    },

    player_attack_sequence: function() {
        Model.whoseturn = "enemy";
        var word_tiles = Model.tiles.selected_tiles;
        var old_enemy_hp = Model.enemy.hp;
        var old_player_hp = Model.player.hp;
        this.activate_treasures("submitword");
        var word_power = Model.word_power(word_tiles)
        if (Model.player.special.powerup != 0 && Model.player.special.powerdown == 0) {
            Model.enemy.smart_health_decrement(1.5*word_power);
        } else if (Model.player.special.powerup == 0 && Model.player.special.powerdown != 0) {
            Model.enemy.smart_health_decrement(word_power/2);
        } else {
            Model.enemy.smart_health_decrement(word_power)
        }
        View.refresh_enemy_health(Model.enemy, old_enemy_hp);
        View.refresh_enemy_effects(Model.enemy);
        Model.tiles.selected_tiles = [];
        View.refresh_grid(Model.tiles.fill_tiles(Model.stats.gem_awards[word_tiles.length]), []);
        View.refresh_player_health(Model.player, old_player_hp);
        View.refresh_player_effects(Model.player);
        View.refresh_grid(Model.tiles.grid_tiles);
        View.render_potions(Model.player);
        if (Model.enemy.hp == 0) { 
            this.enemy_defeated(); 
        } else {
            setTimeout(() => { this.enemy_attack_sequence(); }, 4000);
        }    
    // note to self: setTimeout changes the referent of "this" to the global object, unless you do it in this funny way with () => smth
    },
    
    enemy_special_effects: function(attack) {
// regeneration    
        if (attack.effects.regenerate != 0) {
            old_hp = Model.enemy.hp;
            if (Model.enemy.full_hp - Model.enemy.hp > attack.effects.regenerate) {
                Model.enemy.hp += attack.effects.regenerate;
            } else {
                Model.enemy.hp = Model.enemy.full_hp;
            }
            View.refresh_enemy_health(Model.enemy, old_hp);
        }
// powerup
        if (Model.enemy.special.powerup != 0) { Model.enemy.special.powerdown = 0; }
        Model.enemy.special.powerup += attack.effects.powerup;
// negative player effects        
        if (Model.player.special.shielded == 0) {
            // powerdown
                if (Model.enemy.special.powerdown != 0) { Model.player.special.powerup = 0; }
                Model.player.special.powerdown += attack.effects.powerdown;
            // poison
                Model.player.special.poison += attack.effects.poison;
            // bleed
                Model.player.special.bleed += attack.effects.bleed;
            //burn
                Model.player.special.burn += attack.effects.burn;
            // tilesmash
                for (var i = 0; i < attack.effects.tilesmash; i++) {
                    Model.tiles.afflict_tile("smashed");
                }
            // tileplague
                for (var i = 0; i < attack.effects.tileplague; i++) {
                    Model.tiles.afflict_tile("plague");
                }
            // tilealter
                for (var i = 0; i < attack.effects.tilealter; i++) {
                    var whichtile = Model.tiles.alter_tile();
                    View.tile_animation(whichtile, "tileblur 2s", Model.tiles.grid_tiles)
                }
            // tilesteal
                for (var i = 0; i < attack.effects.tilesteal; i++) {
                    Model.tiles.afflict_tile("tilesteal");
                }
            // stun
                if (Model.player.special.stun > 0) { Model.player.special.stun += -1 }
                Model.player.special.stun += attack.effects.stun;
        }       

        View.refresh_player_effects(Model.player);
        View.refresh_enemy_effects(Model.enemy);
        View.refresh_grid(Model.tiles.grid_tiles);
    },
    
    enemy_attack_sequence: function() {
        if (Model.enemy.special.freeze == 0) {
            attacks = Model.enemy.attacks;
            attack_weights = [];
            for (var i in attacks) {
                attack_weights.push(attacks[i].probability);
            }
            attack_num = weightedRandom(attack_weights);
            chosen_attack = attacks[attack_num];
            View.select_attack(attack_num);
            setTimeout(() => { View.deselect_attack(attack_num); }, 3000);
            old_player_hp = Model.player.hp;
            if (Model.player.special.shielded == 0) {
                if (Model.enemy.special.powerup != 0 && Model.enemy.special.powerdown == 0) {
                    Model.player.smart_health_decrement(1.5*chosen_attack.damage);
                } else if (Model.enemy.special.powerup == 0 && Model.enemy.special.powerdown != 0) {
                    Model.player.smart_health_decrement(chosen_attack.damage/2);
                } else {
                    Model.player.smart_health_decrement(chosen_attack.damage)
                }
                this.enemy_special_effects(chosen_attack);
            }
// this line (below) can interfere with enemy regeneration, if not handled carefully
            View.refresh_player_health(Model.player, old_player_hp);
            if (Model.player.hp == 0) {
                this.player_death();
            }
        }
        setTimeout(() => { this.special_effect_phase(); }, 2700);
    },
    
    special_effect_phase: function() {
        var p_old_health = Model.player.hp;
        var e_old_health = Model.enemy.hp;
// tileplague spread
        num_plagued = 0;
        for (var i in Model.tiles.grid_tiles) {
            if (Model.tiles.grid_tiles[i].status == "plague") { num_plagued++; }
        }
        for (var i = 0; i < num_plagued; i++) {
            Model.tiles.afflict_tile("plague");
        }
// poison
        if (Model.player.special.poison > 0 && Model.player.special.shielded == 0) { Model.player.smart_health_decrement(2); }
        if (Model.enemy.special.poison > 0) { Model.enemy.smart_health_decrement(2); }
// bleed
        if (Model.player.special.bleed > 0 && Model.player.special.shielded == 0) { Model.player.smart_health_decrement(1); }
        if (Model.enemy.special.bleed > 0) { Model.enemy.smart_health_decrement(1); }
//burn
        if (Model.player.special.burn > 0 && Model.player.special.shielded == 0) { Model.player.smart_health_decrement(3); }
        if (Model.enemy.special.burn > 0) { Model.enemy.smart_health_decrement(3); }
//stun
        if (Model.player.special.stun > 0) { View.show_grid_blocker("#ffff99","STUNNED! Click to continue."); }
        
        Model.decrement_effects();
        View.refresh_grid(Model.tiles.grid_tiles);
        View.refresh_player_effects(Model.player);
        View.refresh_enemy_effects(Model.enemy);
        View.refresh_player_health(Model.player, p_old_health);
        View.refresh_enemy_health(Model.enemy, e_old_health);
        if (p_old_health == Model.player.hp && e_old_health == Model.enemy.hp) {
            Model.whoseturn = "player";
        } else {
            if (Model.enemy.hp == 0) { this.enemy_defeated(); }
            if (Model.player.hp == 0) { this.player_death(); }
            setTimeout(() => { Model.whoseturn = "player"; }, 2700);
        }
    },

    player_death: function() {
        Savefile.death_overwrite();
        Savefile.save_changes();
        setTimeout(() => { window.location.replace("/page/youdied"); }, 2700)
    },
    
    enemy_defeated: function() {
        var waittime = 2700;
        clearInterval(Model.enemy.quip_interval_id);
        document.getElementById("enemy_speechbubble").style.display = "none";
        if (Model.enemy.ondeath) { Model.enemy.ondeath(); }
        var ptn_probs = "";
        if (Model.enemy.id.slice(-1)=="5") { ptn_probs=Model.stats.boss_potion_probs; } else { ptn_probs=Model.stats.normal_potion_probs; }
        Model.player.get_random_potion(ptn_probs);
        View.enemy_fade();
        var overkill_msg = largestUnder(Model.stats.overkill_messages, Model.enemy.overkill);
        var overkill_prize = largestUnder(Model.stats.overkill_awards, Model.enemy.overkill);
        if (overkill_prize != 0) {
            Model.tiles.afflict_tile(overkill_prize, 1);
            setTimeout(() => { View.display_overkill_msg(overkill_msg, overkill_prize); }, 1000);
            waittime += 2700;
            View.refresh_grid(Model.tiles.grid_tiles, Model.tiles.selected_tiles);
        }
        var finishpage = Model.enemy.finishpage;
        if (finishpage == "endofdemo") {
            Model.player.hp = Model.player.full_hp;
            Model.player.potions.regenerate += 6;
            Model.player.potions.powerup += 3;
            Model.player.potions.purify += 2;
        }
        next_enemy_id = Model.enemy.next_enemy_id;
        Model.enemy.updateme(enemy_library[next_enemy_id]);
        Model.enemy.reset_enemy_effects();
        this.pack_savefile();
        if (finishpage) {
            if (finishpage == "endofdemo") { 
                Savefile.change_this_savefile({hardcore:1}); 
                Savefile.set_death_checkpoint();
                Savefile.save_changes(); 
            }
            setTimeout(() => { window.location.replace("/page/"+finishpage); }, waittime);
        } else if (Model.enemy.id.slice(-1) == "1") {
            setTimeout(() => { window.location.replace("/page/map"); }, waittime);
        }    else {
            setTimeout(() => { this.next_enemy(); }, waittime);

        }

    },

    next_enemy: function() {
        Model.initialize();
        if (Model.player.hardcore == 0) { Model.player.reset_player_effects(); }
        Model.tiles.purify_tiles();
        this.pack_savefile();
        View.refresh_enemy_effects(Model.enemy);
        this.make_potions_functional();
        View.set_enemy_image(Model.enemy);
        // make enemy quips only run when there is an actual enemy
        Model.enemy.quip_interval_id = View.display_enemy_quips(Model.enemy);
        View.render_enemy_info(Model.enemy);
        View.refresh_grid(Model.tiles.grid_tiles);
        View.show_grid_blocker();
        View.set_name_tags(Model.player.name, Model.enemy.name);
        View.refresh_enemy_health(Model.enemy, Model.enemy.full_hp);
        if (Model.player.hardcore == 0) { View.refresh_player_health(Model.player, Model.player.full_hp); }
        if (Model.enemy.onapproach) { setTimeout(() => { Model.enemy.onapproach(); }, 1000); }
    },

    unpack_savefile: function() {
        Savefile.retrieve_savefile();
        var svf = Savefile.this_savefile;
        if (svf.grid_tiles) { Model.tiles.grid_tiles = svf.grid_tiles; }
        if (svf.potions) { Model.player.potions = svf.potions; }
        if (svf.hp) { Model.player.full_hp = svf.hp; }
        if (svf.next_enemy) { for (var i in enemy_library[svf.next_enemy]) { Model.enemy[i] = enemy_library[svf.next_enemy][i]; } }
        if (svf.treasures) { Model.player.treasures = svf.treasures; }
        if (svf.hardcore) { Model.player.hardcore = 1; Model.player.hp = svf.hardcore_hp; }
    },

    pack_savefile: function() {
        sf_updates = {
            grid_tiles: Model.tiles.grid_tiles,
            potions: Model.player.potions,
            hp: Model.player.full_hp,
            next_enemy: Model.enemy.id,
            treasures: Model.player.treasures,
            hardcore: Model.player.hardcore,
            hardcore_hp: Model.player.hp
        }
        Savefile.change_this_savefile(deepClone(sf_updates));
        Savefile.save_changes();
    },
    
    initialize: function() {
        this.unpack_savefile();
        if (Model.enemy.id.slice(-1) == "1" && Model.player.hardcore == 0) { Savefile.set_death_checkpoint(); Savefile.save_changes(); } 
        Model.initialize();
        this.make_potions_functional();
        Model.tiles.purify_tiles();
        if (Model.player.hardcore == 1) { document.getElementById("player_img").src="/img/lex_badass.png"; }
        View.render_treasures(Model.player);
        View.set_enemy_image(Model.enemy);
        Model.enemy.quip_interval_id = View.display_enemy_quips(Model.enemy);
        View.set_background_image(Model.enemy);
        View.render_enemy_info(Model.enemy);
        View.refresh_grid(Model.tiles.grid_tiles);
        View.show_grid_blocker();
        View.set_name_tags(Model.player.name, Model.enemy.name);
        View.refresh_player_health(Model.player, Model.player.hp);
        View.refresh_enemy_health(Model.enemy, Model.enemy.hp);
        View.make_dialogue_functional();
        this.make_grid_functional();
        if (Model.enemy.onapproach) { setTimeout(() => { Model.enemy.onapproach(); }, 1000); }
    }

}
