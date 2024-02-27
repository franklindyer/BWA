var Controller = {

    respond_to_tile_click: function() {
        if (this.innerHTML != "" && Model.whoseturn == "player") {
            let tile_id = event.srcElement.id.substring(4);
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
            let word = "";
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
        let _this = this;
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
            let attacks = Model.enemy.attacks;
            let attack_weights = [];
            for (var i in attacks) {
                attack_weights.push(attacks[i].probability);
            }
            let attack_num = weightedRandom(attack_weights);
            let chosen_attack = attacks[attack_num];
            View.select_attack(attack_num);
            setTimeout(() => { View.deselect_attack(attack_num); }, 3000);
            let old_player_hp = Model.player.hp;
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
        let num_plagued = 0;
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
        let next_enemy_id = Model.enemy.next_enemy_id;
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
        let sf_updates = {
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
