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
			tilealter: 0,
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

weightedRandom = function(weights) {
	let i, sum=0, cumsum=0, r;
	for (i in weights) {sum += weights[i]}
	r = sum*Math.random();
	for (i in weights) {
		cumsum += weights[i];
		if (r <= cumsum) return String(i);
	}
}

var Model = {

	stats: {
	
		letter_freqs: {'A':8.50, 'B':2.07, 'C':4.54, 'D':3.38, 'E':11.16, 'F':1.81, 'G':2.47, 'H':3.00, 'I':7.58, 'J':0.20, 'K':1.10, 'L':5.49, 'M':3.01, 'N':6.65, 'O':7.16, 'P':3.17, 'Q':0.20, 'R':7.58, 'S':5.74, 'T':6.95, 'U':3.63, 'V':1.01, 'W': 1.29, 'X':0.29, 'Y':1.78, 'Z':0.27},
	
		letter_strengths: {'A':1, 'B':2, 'C':2, 'D':2, 'E':1, 'F':2, 'G':2, 'H':2, 'I':1, 'J':3, 'K':2, 'L':2, 'M':2, 'N':1, 'O':1, 'P':2, 'Q':3, 'R':1, 'S':1, 'T':1, 'U':2, 'V':2, 'W':2, 'X':3, 'Y':2, 'Z':3},
		
		gem_awards: { 3:"normal", 4:"normal", 5:"amethyst", 6:"emerald", 7:"garnet", 8:"amethyst", 9:"amethyst", 10:"amethyst", 11:"amethyst", 12:"amethyst", 13:"amethyst", 14:"amethyst", 15:"amethyst", 16:"amethyst" }
	
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
		
		afflict_tile: function(affliction) {
			var rand_tile = this.grid_tiles[Math.floor(Math.random() * this.grid_tiles.length)];
			rand_tile.status = affliction;
		},
		
		alter_tile: function() {
			bad_tiles = ["J","Q","X","Z"];
			var rand_tile = this.grid_tiles[Math.floor(Math.random() * this.grid_tiles.length)];
			var new_letter = bad_tiles[Math.floor(Math.random() * 4)];
			rand_tile.letter = new_letter;
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
			stun: 0
		},
		
		smart_health_decrement: function(damage) {
			if (this.hp > damage) {
				this.hp += -damage;
			} else {
				this.hp = 0;
			}
		}
		
	},
	
	enemy: {
	
		name: "",
		
		id: "",
	
		full_hp: 0,
		hp: 0,
		
		attacks: [],
		
		flavortext: "",
		
		special: {		
			poison: 0,
			bleed: 0,
			burn: 0,
			powerup: 0,
			powerdown: 0
		},
		
		smart_health_decrement: function(damage) {
			if (this.hp > damage) {
				this.hp += -damage;
			} else {
				this.hp = 0;
			}
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
				if (word_tiles[i].status != "smashed") { 
					power += this.stats.letter_strengths[word_tiles[i]['letter']] 
				}
				if (word_tiles[i].status == "amethyst") {
					this.enemy.special.poison += 2;
					power += 1;
				}
				if (word_tiles[i].status == "emerald") {
					if (this.player.full_hp - this.player.hp > 5) { this.player.hp += 5 } else { this.player.hp = this.player.full_hp }
					power += 1;
				}
				if (word_tiles[i].status == "garnet") {
					this.enemy.special.powerdown += 1;
					this.enemy.special.powerup = 0;
					power += 1;
				}
			}
			return power;
	},
	
	initialize: function() {
		this.tiles.fill_tiles();
		this.enemy.hp = this.enemy.full_hp;
	}
	
}

var View = {

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
	},
	
	set_background_image: function(enemy) {
		var battlefield = document.getElementById("battlefield");
		img_url = "url(/img/background_"+String(enemy.id).substring(1, enemy.id.length-1)+".png)";
		battlefield.style.backgroundImage = img_url;
	},
	
	display_enemy_quips: function(enemy) {
		if (enemy.quips) {
			setInterval(() => {
				var random_quip = enemy.quips[Math.floor(Math.random() * enemy.quips.length)];
				var speechbubble = document.getElementById("enemy_speechbubble");
				speechbubble.innerHTML = random_quip;
				speechbubble.style.display = "inline-block";
				setTimeout(() => {
					speechbubble.style.display = "none";
				},20000)
			}, 80000)
		}
	},
	
	tile_colors: {
		normal: ["#ffd9b3", "#ffd9b3", "to bottom right"],
		smashed: ["#cccccc", "#cccccc", "to bottom right"],
		amethyst: ["#cc00cc", "#ffccff", "to bottom right"],
		emerald: ["#b3ffb3", "#00cc00", "to bottom right"],
		garnet: ["#ffcc66", "#ff6600", "to bottom right"]	
	},

	refresh_grid: function(grid_tiles, selected_tiles) {
		var tile_style = this.tile_colors;
// tiles still in grid (not selected)
		var tile_tds = document.getElementsByClassName("grid");
		for (var i = 0; i < tile_tds.length; i++) {
			tile_tds[i].innerHTML = "";
			tile_tds[i].style.backgroundColor = "#663300";
			tile_tds[i].style.backgroundImage = "";
		}
		for (i in grid_tiles) {
			current_tile = tile_tds[i];
			if (grid_tiles[i] != 0) {
				var type = grid_tiles[i].status;
				current_tile.style.backgroundImage = "linear-gradient( "+tile_style[type][2]+", "+tile_style[type][0]+", "+tile_style[type][1]+")";
				tile_tds[i].innerHTML = grid_tiles[i].letter;
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
			newtile.style.backgroundImage = "linear-gradient( "+tile_style[type][2]+", "+tile_style[type][0]+", "+tile_style[type][1]+")";
			if (selected_tiles) {
				newtile.style.width = String(sel_size)+"px";
				newtile.style.height = String(sel_size)+"px";
			}

			sel_tile_table.appendChild(newtile);
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
//		enemy_bar.setAttribute("style","width:"+String(new_width)+"px");
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
		for (var i in enemy.attacks) {
			var row = document.createElement("tr");
			var entry = document.createElement("td");
			entry.classList.add("attacktext")
			entry.id = "attack"+String(i);
			var node = document.createTextNode(enemy.attacks[i].name);
			entry.appendChild(node);
			row.appendChild(entry);
			if (enemy.attacks[i].damage != 0) {
				var icon = document.createElement("img");
				icon.src = "/img/damage_icon.png";
				icon.classList.add("attackicon")
				entry.appendChild(icon);
			}
			for (var j in enemy.attacks[i].effects) {
				if (enemy.attacks[i].effects[j] != 0) {
					var icon = document.createElement("img");
					icon.src = "/img/"+String(j)+"_icon.png";
					icon.classList.add("attackicon")
					entry.appendChild(icon);
				}
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

var Controller = {

	respond_to_tile_click: function() {
		if (this.innerHTML != "" && Model.whoseturn == "player" && Model.player.special.stun == 0) {
			tile_id = event.srcElement.id.substring(4);
			Model.tiles.select_tile(tile_id);
			View.refresh_grid(Model.tiles.grid_tiles, Model.tiles.selected_tiles);
		}
	},
	
	respond_to_deselect: function() {
		Model.tiles.deselect_all_tiles();
		View.refresh_grid(Model.tiles.grid_tiles, Model.tiles.selected_tiles);
	},
	
	respond_to_word_submit: function() {
		if (Model.whoseturn == "player") {
			word = "";
			for (var i in Model.tiles.selected_tiles) {
				word += Model.tiles.selected_tiles[i].letter;
			}
			if (word.length > 2) { Controller.checkword(word); }
		}
	},
	
	respond_to_scramble: function() {
		if (Model.whoseturn == "player") {
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
	
	player_attack_sequence: function() {
		Model.whoseturn = "enemy";
		var word_tiles = Model.tiles.selected_tiles;
		var old_enemy_hp = Model.enemy.hp;
		var old_player_hp = Model.player.hp;
		var word_power = Model.word_power(word_tiles)
		if (Model.player.special.powerup != 0 && Model.player.special.powerdown == 0) {
			Model.enemy.smart_health_decrement(1.5*word_power);
		} else if (Model.player.special.powerup == 0 && Model.player.special.powerdown != 0) {
			Model.enemy.smart_health_decrement(word_power/1.5);
		} else {
			Model.enemy.smart_health_decrement(word_power)
		}
		View.refresh_enemy_health(Model.enemy, old_enemy_hp);
		View.refresh_enemy_effects(Model.enemy);
		Model.tiles.selected_tiles = [];
		View.refresh_grid(Model.tiles.fill_tiles(Model.stats.gem_awards[word_tiles.length]), []);
		View.refresh_player_health(Model.player, old_player_hp);
		if (Model.enemy.hp == 0) { this.enemy_defeated(); }
		setTimeout(() => { this.enemy_attack_sequence(); }, 4000);
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
		Model.enemy.special.powerdown = 0;
		Model.enemy.special.powerup += attack.effects.powerup;
// powerdown
		Model.player.special.powerup = 0;
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
// tilealter
		for (var i = 0; i < attack.effects.tilealter; i++) {
			Model.tiles.alter_tile();
		}
		View.refresh_player_effects(Model.player);
		View.refresh_enemy_effects(Model.enemy);
		View.refresh_grid(Model.tiles.grid_tiles);
// stun
		if (Model.player.special.stun > 0) { Model.player.special.stun += -1 }
		Model.player.special.stun += attack.effects.stun;
	},
	
	enemy_attack_sequence: function() {
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
		if (Model.enemy.special.powerup != 0 && Model.enemy.special.powerdown == 0) {
			Model.player.smart_health_decrement(1.5*chosen_attack.damage);
		} else if (Model.enemy.special.powerup == 0 && Model.enemy.special.powerdown != 0) {
			Model.player.smart_health_decrement(chosen_attack.damage/1.5);
		} else {
			Model.player.smart_health_decrement(chosen_attack.damage)
		}
		this.enemy_special_effects(chosen_attack);
// this line (below) can interfere with enemy regeneration, if not handled carefully
		View.refresh_player_health(Model.player, old_player_hp);
		if (Model.player.hp == 0) {
			setTimeout(() => { window.location.replace("/page/youdied") }, 2700)
		}
		setTimeout(this.special_effect_phase, 2700);
	},
	
	special_effect_phase: function() {
		var p_old_health = Model.player.hp;
		var e_old_health = Model.enemy.hp;
// poison
		if (Model.player.special.poison > 0) { Model.player.smart_health_decrement(2); }
		if (Model.enemy.special.poison > 0) { Model.enemy.smart_health_decrement(2); }
// bleed
		if (Model.player.special.bleed > 0) { Model.player.smart_health_decrement(1); }
		if (Model.enemy.special.bleed > 0) { Model.enemy.smart_health_decrement(1); }
//burn
		if (Model.player.special.burn > 0) { Model.player.smart_health_decrement(3); }
		if (Model.enemy.special.burn > 0) { Model.enemy.smart_health_decrement(3); }
//stun
		if (Model.player.special.stun > 0) { View.show_grid_blocker("#ffff99","STUNNED! Click to continue."); }
		
		Model.decrement_effects();
		View.refresh_player_effects(Model.player);
		View.refresh_enemy_effects(Model.enemy);
		View.refresh_player_health(Model.player, p_old_health);
		View.refresh_enemy_health(Model.enemy, e_old_health);
		if (p_old_health == Model.player.hp && e_old_health == Model.enemy.hp) {
			Model.whoseturn = "player";
		} else {
			if (Model.enemy.hp == 0) { this.enemy_defeated(); }
			setTimeout(() => { Model.whoseturn = "player"; }, 2700);
		}
	},
	
	unpack_player_savefile: function() {
		var player_savefile = JSON.parse(localStorage.getItem("savefile"));
		if (player_savefile) {
			Model.tiles.grid_tiles = player_savefile.grid_tiles;
			Model.player.max_hp = player_savefile.hp;
			Model.player.hp = player_savefile.hp;
		}
	},
	
	pack_player_savefile: function() {
		Model.tiles.deselect_all_tiles();
		var player_savefile = { 
			grid_tiles: Model.tiles.grid_tiles, 
			hp: Model.player.full_hp,
			current_enemy: Model.enemy.next_enemy_id
		}
		localStorage.setItem("bwa_chapter", Model.enemy.next_enemy_id.slice(1,-1));
		localStorage.setItem("savefile", JSON.stringify(player_savefile));
	},
	
	enemy_defeated: function() {
		this.pack_player_savefile();
		if (Model.enemy.next_enemy_id == "endofdemo") {
			setTimeout(() => { window.location.replace("/page/endofdemo"); }, 2700);
		} else if (Model.enemy.id.slice(-1) == "5") {
			setTimeout(() => { window.location.replace("/page/map"); }, 2700);
			localStorage.setItem("next_enemy_id", String(Model.enemy.next_enemy_id));
		}	else {
			setTimeout(() => { window.location.replace("/enemy/"+Model.enemy.next_enemy_id); }, 2700);
		}

	},
	
	initialize: function() {
		Model.initialize();
		this.unpack_player_savefile();
		View.set_enemy_image(Model.enemy);
		View.display_enemy_quips(Model.enemy);
		View.set_background_image(Model.enemy);
		View.render_enemy_info(Model.enemy);
		View.refresh_grid(Model.tiles.grid_tiles);
		View.show_grid_blocker();
		View.set_name_tags(Model.player.name, Model.enemy.name);
		View.refresh_player_health(Model.player, Model.player.full_hp);
		View.refresh_enemy_health(Model.enemy, Model.enemy.full_hp);
		this.make_grid_functional();
	}

}


//var Controller = {
//
//} 

//document.getElementById("btn").addEventListener('click', (ev) => {
//	txt = document.getElementById("txtfld").value;
//	alert(weightedRandom(letter_freqs));
//});

//var clickables = document.getElementsByClassName("tile");
//for (var i = 0; i < clickables.length; i++) {
//		clickables[i].addEventListener('click', reply_id);
//	clickables[i].addEventListener('click', (ev) => {
//		selected_tiles.push(tiles[reply_id()]);
//		tiles.splice(reply_id(),1);
//		refresh_grid();
//	});
//}

//fill_tiles(tiles);
//refresh_grid(tiles);
