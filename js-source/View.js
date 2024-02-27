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

    tile_helptexts: tile_helptexts,

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
    
    tile_colors: tile_colors,

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
        for (var i in grid_tiles) {
            let current_tile = tile_tds[i];
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
            let newtile = document.createElement("td");
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
