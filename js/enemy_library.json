enemy_library = {

	t1: {
	
		id: "t1",
		next_enemy_id: "t2",
		name: "Cujo",
		height: "200px",
		full_hp: 40,
		attacks: [
			new Attack("Bite",0.4,2, { bleed: 2 }), 
			new Attack("Mangy breath",0.3,4,{ poison: 2, burn: 2 }),
			new Attack("Hearty growl",0.3,0,{ regenerate: 5, powerup: 2, powerdown: 2 })
		],
		flavortext: "This devil-dog from hell is the mangiest mangy-boi you'll ever meet. Guard your jugular. Plus... he has fire breath? WTF?!"
      	
	},
	
	t2: {
	
		id: "t2",
		next_enemy_id: "t1",
		name: "The Owl and the Pussy-Cat",
		height: "200px",
		full_hp: 30,
		attacks: [
			new Attack("Runcible spoon",0.4,1, { stun: 2 }), 
			new Attack("Cat scratch",0.3,2,{ bleed: 2 }),
			new Attack("Hoot hoot",0.3,0,{ powerup: 3, tilealter: 3 })
		],
		flavortext: "You elegant fowl! How charmingly sweet you sing! O let us be married! too long we have tarried: but what shall we do for a ring?"
	
	},
	
	j404: {
	
		id: "j404",
		next_enemy_id: "j404",
		name: "This enemy does not exist",
		height: "180px",
		width: "170px",
		full_hp: 404404,
		attacks: [
			new Attack("404 attack not found",1,404)
		],
		flavortext: "Hey, what do you think you're doing, trying to look at enemies that don't exist? Get outta here!"
	
	},

    e01: {

        id: "e01",
        next_enemy_id: "e02",
        name: "Sock Puppet",
        height: "160px",
        width: "130px",
        full_hp: 6,
        attacks: [
            new Attack("Elastic Snap",1,1)
        ],
        onapproach: function() {
            View.message_queue = [
                { message:"Spell words by selecting tiles from the four-by-four grid. Once you've made a word, click 'attack' to attack the enemy." },
                { message:"Longer words do more damage, so make your words as long as possible!" }
            ];
            setTimeout(() => { View.initialize_dialogue(); }, 2000);
        },
        flavortext: "Sock puppet has never been the same since he lost his partner in the washing machine.",
        quips: [
            "I oughtta sock you in the face!",
            "Get outta my way, heel!"
        ]

    },

    e02: {

        id: "e02",
        next_enemy_id: "e03",
        name: "Bedbug",
        height: "170px",
        width: "120px",
        full_hp: 8,
        attacks: [
            new Attack("Bite",1,2)
        ],
        onapproach: function() {
            Model.player.hp = 1;
            Model.player.potions.regenerate += 1;
            Model.player.potions.powerup += 1;
            Controller.make_potions_functional();
            View.refresh_player_health(Model.player, 15);
            View.message_queue = [
                { message:"Yikes, what happened? I don't feel so good...", speaker_img:"/img/speaker_lexsurprised.png", float:"left", color:"#ddff99" },
                { message:"Looks like your health is almost depleted. Don't let it reach zero, or you'll die and have to start over from the beginning of the level." },
                { message:"Click the red potion on the left to replenish some of your health. Then click the green potion to give your next word a damage boost and finish off the baddie with one word! By defeating enemies, you can win more potions." }
            ];
            setTimeout(() => { View.initialize_dialogue(); }, 2000);
        },
        flavortext: "Good night... sleep tight... don't let the - holy mother of god, what is that?!",
        quips: [
            "Screeeeee!"
        ]

    },

    e03: {

        id: "e03",
        next_enemy_id: "e04",
        name: "Itsy Bitsy Spider",
        height: "130px",
        width: "200px",
        full_hp: 10,
        attacks: [
            new Attack("Venomous Bite",1,1,{ poison: 2 })
        ],
        onapproach: function() {
            Model.tiles.grid_tiles[0].status = "amethyst";
            View.refresh_grid(Model.tiles.grid_tiles);
            View.message_queue = [
                { message:"Hey, what's that? It looks shiny. Shiny shiny shiny. I like shiny!", speaker_img:"/img/speaker_lexsurprised.png", float:"left", color:"#ddff99" },
                { message:"That's a gem tile. You can earn gem times by spelling long words with five or more letters, and each gem tile causes a certain special effect when you use it in a word. This purple amethyst, for instance, poisons the enemy." },
                { message:"But watch out - sometimes enemy attacks can have special effects as well. This spider enemy can deal extra poison damage." },
                { message:"Oooh, shiny shiny. Sparkling. Luminous. Lustrous. Resplendent!", speaker_img:"/img/speaker_lexhappy.png", float:"left", color:"#ddff99" }
            ];
            setTimeout(() => { View.initialize_dialogue(); }, 2000);
        },
        flavortext: "Favorite activities: sliding down water-spouts and scaring children off of tuffets.",
        quips: [
            "Hisssss!",
            "Hey, you got somethin' against arachnids?"
        ]

    },

    e04: {

        id: "e04",
        next_enemy_id: "e05",
        name: "Creepy Doll",
        height: "150px",
        width: "130px",
        full_hp: 12,
        attacks: [
            new Attack("Puffy Punch",0.5,1),
            new Attack("Creepy Gaze",0.5,1,{ tilealter: 6 })
        ],
        onapproach: function() {
            var badletters = ["X","J","Q","K","Z"];
            for (var i in Model.tiles.grid_tiles) { Model.tiles.grid_tiles[i].letter = badletters[Math.floor(5*Math.random())]; }
            View.refresh_grid(Model.tiles.grid_tiles);
            View.message_queue = [
                { message:"I can't spell anything with these crazy letters! Now I'm stuck! Preposterous!", speaker_img:"/img/speaker_lexsurprised.png", float:"left", color:"#ddff99" },
                { message:"If you don't see any words, try pressing the red 'scramble' button below the attack button. This will change up your tiles, but be warned - it also skips your turn." }
            ];
            setTimeout(() => { View.initialize_dialogue(); }, 2000);
        },
        flavortext: "He's not evil. Just misunderstood.",
        quips: [
            "Do these suspenders make me look fat?",
            "I've been meaning to get this arm checked out..."
        ]

    },

    e05: {

        id: "e05",
        next_enemy_id: "e01",
        finishpage: "endoftutorial",
        name: "Baby (Boss)",
        height: "195px",
        width: "240px",
        full_hp: 25,
        attacks: [
            new Attack("Teethe",0.8,2,{ bleed: 2 }),
            new Attack("Temper Tantrum",0.2,2,{ tilesmash: 3, stun: 2  })
        ],
        onapproach: function() {
            View.message_queue = [
                { message: "The final enemy in every chapter is called a 'boss' and is usually more difficult than other enemies. But by defeating the boss, you can earn a treasure that you can use in subsequent chapters to gain a special advantage." }
            ];
            setTimeout(() => { View.initialize_dialogue(); }, 2000);
        },
        ondeath: function() {
            if (!Savefile.complete_savefile.available_treasures.includes("t00")) { Savefile.complete_savefile.available_treasures.push("t00"); Savefile.save_changes(); }
            Savefile.save_changes();
        },
        flavortext: "This cranky toddler has impressive lexical abilities.",
        quips: [
            "Begone, noxious invertebrate!",
        ]

    },
	
	e11: {
	
		id: "e11",
		next_enemy_id: "e12",
		name: "Squirrel Nutkin",
		height: "150px",
		width: "110px",
		full_hp: 15,
		attacks: [
			new Attack("Scratch",0.6,1),
			new Attack("Nut toss",0.4,2)
		],
		flavortext: "The squirrels searched for nuts all over the island and filled their little sacks. But Nutkin gathered oak-apples - yellow and scarlet - and sat upon a beech-stump playing marbles...",
		quips: [
			"Riddle-me, riddle-me, rot-tot-tote!",
			"Hum-a-bum! Buzz! Buzz!",
			"Cuck-cuck-cuck-cur-r-r-cuck-k-k!"
		]
	
	},
	
	e12: {
	
		id: "e12",
		next_enemy_id: "e13",
		name: "Tom Kitten",
		height: "160px",
		width: "125px",
		full_hp: 20,
		attacks: [
			new Attack("Scratch",0.6,2),
			new Attack("Unbuttoned!",0.4,2,{ stun:2 })
		],
		flavortext: "Tom Kitten was very fat, and he had grown; several buttons burst off. His mother sewed them on again.",
		quips: [
			"Meow."
		]
	},
	
	e13: {
	
		id: "e13",
		next_enemy_id: "e14",
		name: "Peter Rabbit",
		height: "150px",
		width: "90px",
		full_hp: 20,
		attacks: [
			new Attack("Nibble",0.5,1),
			new Attack("Cabbage Chomp",0.5,1,{ regenerate:4 })
		],
		flavortext: "Flopsy, Mopsy, and Cotton-tail, who were good little bunnies, went down the lane to gather blackberries. But Peter, who was very naughty, ran straight away to Mr. McGregor's garden, and squeezed under the gate!",
		quips: [
			"Where'd ya get the classy bowtie, my dude?",
			"*Crunch* *crunch*",
			"Sweet shades, homie."
		]
	
	},
	
	e14: {
	
		id: "e14",
		next_enemy_id: "e15",
		name: "Mrs. Tiggy-Winkle",
		height: "150px",
		width: "140px",
		full_hp: 25,
		attacks: [
			new Attack("Prick",0.7,3),
			new Attack("Sweep away",0.3,2,{ stun: 2 })
		],
		flavortext: "Lily-white and clean, oh! / With little frills between, oh! / Smooth and hot - red rusty spot / never here be seen, oh!",
		quips: [
			"Lily-white and clean, oh!",
			"Now where did I leave that pocket-handkin?"
		]
	
	},
	
	e15: {
	
		id: "e15",
		next_enemy_id: "e21",
		name: "Mr. McGregor (Boss)",
		height: "150px",
		width: "210px",
		full_hp: 30,
		attacks: [
			new Attack("Boot Stomp",0.5,3),
			new Attack("Trowel",0.3,2,{ bleed: 2 }),
			new Attack("Stop thief!",0.2,2,{ stun: 2 })
		],
        ondeath: function() { 
            if (!Savefile.complete_savefile.available_treasures.includes("t10")) { Savefile.complete_savefile.available_treasures.push("t11"); Savefile.save_changes(); }
        },
		flavortext: "Mr. McGregor was on his hands and knees planting out young cabbages, but he jumped up and ran after Peter, waving a rake and calling out 'Stop thief!'",
		quips: [
			"Stop thief!",
			"A worm? In my cabbages?!"
		]
	
	},
	
	e21: {
	
		id: "e21",
		next_enemy_id: "e22",
		name: "Carnal Canine",
		height: "150px",
		width: "190px",
		full_hp: 25,
		attacks: [
			new Attack("Claw",0.5,3),
			new Attack ("Razor Bite",0.5,3,{ bleed: 2 })
		],
		flavortext: "This wandering wolf loves nothing in the world more than meat. Meat meat meat. Rabbit meat. Human meat. Worm meat?",
		quips: [
			"You're made of meat, right?",
			"Meat... must eat meat...",
			"Did I mention? I'm really craving meat right now."
		]
	
	},

    e22: {

        id: "e22",
        next_enemy_id: "e23",
        name: "Highway Bandit",
        height: "170px",
        width: "130px",
        full_hp: 30,
        attacks: [
            new Attack("Stab",0.4,3,{ bleed: 2 }),
            new Attack("Tile Steal",0.4,2,{ tilesteal: 1 }),
            new Attack("Cudgel Bludgeon",0.2,2, { stun: 2 })
        ],
        flavortext: "Protect your pockets. And your head.",
        quips: [
            "Look behind you - is that a flying pig?",
            "You don't have any pockets, do you?",
            "This knife? Oh, it's for cutting my fingernails."
        ]

    },

    e23: {

        id: "e23",
        next_enemy_id: "e24",
        name: "Friar Tuck",
        height: "185px",
        width: "110px",
        full_hp: 45,
        attacks: [
            new Attack("Fat Fist",0.5,3),
            new Attack("Hearty Ale",0.3,0,{ regenerate: 5, powerup: 2 }),
            new Attack("Tile Munch",0.2,1,{ regenerate: 5, tilesteal: 1 })
        ],
        flavortext: "All was quiet save only for the low voices of those that talked together... and saving, also, for the mellow snoring of Friar Tuck, who enjoyed his sleep with a noise as of one sawing soft wood very slowly.",
        quips: [
            "Play the music, dance the day, think not on tomorrow...",
            "Shall I bless you now or when you're dead?",
            "*Burp*"
        ]

    },

    e24: {
    
        id: "e24",
        next_enemy_id: "e25",
        name: "Robin Hood",
        height: "195px",
        width: "120px",
        full_hp: 40,
        attacks: [
            new Attack("Poison Arrow",0.4,2,{ poison: 2 }),
            new Attack("Flaming Arrow",0.3,2,{ burn: 2 }),
            new Attack("Pickpocket", 0.3, 2, { tilesteal: 2 })
        ],
        ondeath: function() {
            Model.player.full_hp += 5;
        },
        flavortext: "Fivescore or more good stout yeomen gathered about Robin Hood and chose him to be their leader... they swore never to harm a child nor to wrong a woman - but worms, of course, were fair game.",
        quips: [
            "How likest thou that shot, good fellow?",
            "Thou pratest like an ass!",
            "Rattle my bones, an thou canst."
        ]

    },

    e25: {

        id: "e25",
        next_enemy_id: "e31",
        name: "Sheriff of Nottingham (Boss)",
        height: "195px",
        width: "105px",
        full_hp: 50,
        attacks: [
            new Attack("Paper Cut",0.35,4,{ bleed: 3 }),
            new Attack("Tax Collection",0.35,3, { regenerate: 6, tilesteal: 2 }),
            new Attack("King's Orders",0.3,0,{ powerup: 2, powerdown: 2 })
        ],
        ondeath: function() {
            if (!Savefile.complete_savefile.available_treasures.includes("t11")) { Savefile.complete_savefile.available_treasures.available_treasures.push("t11"); Savefile.save_changes(); }
        },
        flavortext: "Now the Sheriff of Nottingham swore that he himself would bring this knave Robin Hood to justice, and for two reasons: first, because he wanted two hundred pounds, and next, because the forester that Robin Hood had killed was of kin to him.",
        quips: [
            "No undocumented worms allowed!",
            "Here's a worm that needs hanging as badly as any e'er I saw.",
            "I have a good part of a mind to have thee beaten for thine insolence!"
        ]

    },


    e31: {

        id: "e31",
        next_enemy_id: "e32",
        name: "The Merchant",
        height: "185px",
        width: "110px",
        full_hp: 45,
        attacks: [
            new Attack("Swindle",0.7,3,{ tilesteal: 1 }),
            new Attack("Boast",0.3,0,{ powerup: 2, powerdown: 2 })
        ],
        flavortext: "This worthy man ful wel his with bisette: / Ther wiste no wight that he was in dette, / so statly was he of his governaunce, / with his bargaines, and with his chevissaunce.",
        quips: [
            "See this hat? More expensive than your whole wardrobe!",
            "Have you no sense of style?"
        ]

    },

    e32: {

        id: "e32",
        next_enemy_id: "e33",
        name: "The Squire",
        height: "180px",
        width: "150px",
        full_hp: 45,
        attacks: [
            new Attack("Friendly Jab",0.4,3,{ bleed: 2 }),
            new Attack("Jubilant Whistle",0.4,0,{ regenerate: 5, powerup: 2 }),
            new Attack("Saucy Slap",0.2,4,{ stun: 2 })
        ],
        flavortext: "A lovere and a lusty bacheler, / with lokkes crulle as they were laid in presse. / ... / Singing he was, or floiting, al the day: / he was as fresh as is the month of May.",
        quips: [
            "♪♪♪❦❦",
            "♥♫♪♬♥♪",
            "🎶♥🎶🎶"
        ]

    },

    e33: {

        id: "e33",
        next_enemy_id: "e34",
        name: "The Clerk",
        height: "185px",
        width: "105px",
        full_hp: 40,
        attacks: [
            new Attack("Denounce",0.4,3),
            new Attack("Book Learning",0.3,0,{ tilealter: 2, tilesteal: 2 }),
            new Attack("Pedantic Prattle",0.3,2,{ tilealter: 2, tilesmash: 1 })
        ],
        flavortext: "But al be that he was a philosophre / yit hadde he but litel gold in cofre; / but al that he mighte of his freendes hente, / on bookes and on lerning he it spente...",
        quips: [
            "Ah, another man of letters, I see...",
            "So, even worms can get an education these days, eh?"
        ]

    },

    e34: {

        id: "e34",
        next_enemy_id: "e35",
        name: "The Knight",
        height: "190px",
        width: "130px",
        full_hp: 55,
        attacks: [
            new Attack("Slash",0.5,4,{ bleed: 3 }),
            new Attack("Shield Pummel",0.3,3,{ tilesmash: 3 }),
            new Attack("Charge",0.2,3,{ stun: 2 })
        ],
        flavortext: "At mortal batailes hadde he been fifteene, / and foughten for oure faith at Tramissene / in listes thries, and ay slain his fo.",
        quips: [
            "Care to step outside?",
            "Do we have a problem?",
            "You're really askin' for it..."
        ]

    },

    e35: {

        id: "e35",
        next_enemy_id: "e41",
        name: "The Wife of Bath (Boss)",
        height: "190px",
        width: "120px",
        full_hp: 60,
        attacks: [
            new Attack("Forehand Slap",0.35,5,{ tilesmash: 1 }),
            new Attack("Backhand Slap",0.35,3,{ tilesmash: 3 }),
            new Attack("Haughty Reprobation",0.3,2,{ powerdown: 3 })
        ],
        flavortext: "Bold was hir face and fair and reed of hewe. / She was a worthy womman al hir live: / housbondes at chirche dore she hadde five, / withouten other compaignye in youthe... / But therof needeth nought to speke as nouthe.",
        quips: [
            "I've had five husbands. You really don't think I can handle a worm?",
            "Look, I'm not afraid to smack a guy around.",
        ]

    },

    e41: {

        id: "e41",
        next_enemy_id: "e42",
        name: "Transformed Stag",
        height: "180px",
        width: "240px",
        full_hp: 45,
        attacks: [
            new Attack("Hoof Pound",0.75, 4, { tilesmash: 2 }),
            new Attack("Charge",0.25,4, { stun: 2 })
        ],
        flavortext: "There wasn't a bathroom in sight, so Ajax stepped off of the trail and urinated on the side of a tree. He didn't think anything of it, but as it turned out, that tree was actually Oberon's stepson's best friend. When he heard about this embarassment, Oberon got ticked off and turned Ajax into a stag.",
        quips: [
            "You know, I used to be a man once...",
            "When I was a human, I never used to like the taste of grass so much...",
            "I have to say, I've always wanted antlers."
        ]
    },

    e42: {

        id: "e42",
        next_enemy_id: "e43",
        name: "Bashful Fairy",
        height: "180px",
        width: "130px",
        full_hp: 40,
        attacks: [
            new Attack("Pinch",0.35,2),
            new Attack("Fairy Dust",0.35,2, { tilealter: 2, poison: 3 }),
            new Attack("Hypnotic Giggle",0.3,2, { stun: 2, regenerate: 6 })
        ],
        flavortext: "After she got caught transforming innocent travellers into frogs and squirrels, Oberon sentenced her to three hundred years of community service cleaning up animal scat.",
        quips: [
            "Tee hee!",
            "What shall I turn you into? Well, you're already a worm...",
        ]
    },

    e43: {

        id: "e43",
        next_enemy_id: "e44",
        name: "Mischevous Sprite",
        height: "185px",
        width: "140px",
        full_hp: 45,
        attacks: [
            new Attack("Shenanigans",0.4,3),
            new Attack("Floral Nectar",0.3,2, { poison: 3, powerup: 2 }),
            new Attack("Transmogrify",0.3,1, { tilealter: 4 })
        ],
        flavortext: "After partying all night, he woke up with a terrible hangover. Not only that, but when he looked in the mirror, he saw that some rascal had transformed him into a monkey! It took him all morning to change back to a sprite and shave all the fur off.",
        quips: [
            "Yo, have you heard? Oberon is in tha houuuse!",
            "Want a drink? I promise, I didn't put anything in it."
        ]

    },

    e44: {

        id: "e44",
        next_enemy_id: "e45",
        name: "Donkeyface",
        height: "195px",
        width: "100px",
        full_hp: 55,
        attacks: [
            new Attack("Ass Kick",0.4,3),
            new Attack("Charge",0.4,4, { tilesmash: 3, stun: 2 }),
            new Attack("Crazed Bray",0.2,0, { powerup: 2, tilealter: 3 })
        ],
        ondeath: function() {
            Model.player.full_hp = 25;
        },
        flavortext: "Have you heard? Everyone's saying that Oberon's wife... has fallen in love with this donkey-faced man! Scandalous!",
        quips: [
            "Oh god, I've made an ass of myself!",
            "Hee haw!",
        ]

    },

    e45: {

        id: "e45",
        next_enemy_id: "e51",
        name: "Oberon (Boss)",
        height: "220px",
        width: "180px",
        full_hp: 65,
        attacks: [
            new Attack("Impale",0.4,4, { bleed: 2 }),
            new Attack("Transmogrify",0.4,2, { tilealter: 6 }),
            new Attack("Fairy Lifeforce",0.2,0, { powerup: 3, regenerate: 8 })
        ],
        flavortext: "King of the fairies and master of the forest... but his wife has left him for donkeyface. That's gotta hurt. Although, to be fair, he's the one who made her fall in love with donkeyface in the first place.",
        quips: [
            "Remind me - why did I turn you into a worm again?",
            "Tell me, what's it like being a worm?",
            "Yeah, the antlers are real. I get that a lot.",
            "Looking for an autograph?"
        ]

    },

    e51: {

        id: "e51",
        next_enemy_id: "e52",
        name: "Ship Rats",
        height: "150px",
        width: "210px",
        full_hp: 45,
        attacks: [
            new Attack("Claw",0.5,2, { bleed: 2 }),
            new Attack("Pestilence",0.5,1, { poison: 2, tileplague: 1 })
        ],
        flavortext: "Mrs. Tittlemouse tends to avoid her unsavory seafaring relatives at all costs. Partly because they carry all kinds of nasty diseases, but mostly because of their horrible manners.",
        quips: [
            "Squeeeeee!",
            "*Skitter skitter*"
        ]

    },

    e52: {

        id: "e52",
        next_enemy_id: "e53",
        name: "Pirate Sharpshooter",
        height: "195px",
        width: "120px",
        full_hp: 55,
        attacks: [
            new Attack("Skewer",0.4,3, { bleed: 3 }),
            new Attack("Flintlock Blast",0.4,4, { burn: 3 }),
            new Attack("Pillage",0.2,0, { tilesteal: 2, tilesmash: 4 })
        ],
        flavortext: "He spent all his life doing everything possible to become a true badass: he learned to spit, to shoot, to cuss and to fight. But now there's just one thing standing in his way: he's deathly afraid of spiders.",
        quips: [
            "Arrrgh!",
            "I eat nails for breakfast!",
            "See these boots? Made of human leather! Aargh!"
        ]

    },

    e53: {

        id: "e53",
        next_enemy_id: "e54",
        name: "Ticking Crocodile",
        height: "120px",
        width: "370px",
        full_hp: 45,
        attacks: [
            new Attack("Crushing Jaws",0.5,6),
            new Attack("Tail Swing",0.5,3, { tilesmash: 5 })
        ],
        flavortext: "It can be pretty difficult to catch prey when you're constantly emitting a ticking noise. Never should have swallowed that alarm clock.",
        quips: [
            "Rawr!",
            "Tick - tock - tick - tock"
        ]

    },

    e54: {

        id: "e54",
        next_enemy_id: "e55",
        name: "Peter Pan",
        height: "185px",
        width: "110px",
        full_hp: 50,
        attacks: [
            new Attack("Swordplay",0.35,3, { bleed: 3 }),
            new Attack("Childish Trickery",0.35,2, { tilesteal: 3, tilealter: 3 }),
            new Attack("Eternal Youth",0.3,0, { powerup: 2, regenerate: 10 })
        ],
        flavortext: "He breathed intentionally quick short breaths at the rate of about five to a second... there is a saying in the Neverland, that everytime you breathe, a grown-up dies; and Peter was killing them off vindictively as fast as possible.",
        quips: [
            "Oh, the cleverness of me!",
            "I'm youth! I'm joy!",
            "Have at thee!"
        ]

    },

    e55: {

        id: "e55",
        next_enemy_id: "e11",
        name: "Captain Hook (Boss)",
        finishpage: "endofdemo",
        height: "210px",
        width: "130px",
        full_hp: 60,
        attacks: [
            new Attack("Hooked!",0.4,5, { bleed: 3 }),
            new Attack("Plunder",0.4,3, { tilesteal: 3, tilesmash: 3 }),
            new Attack("Potent Grog",0.2,0, { powerup: 3, regenerate: 7 })
        ],
        flavortext: "The man is not wholly evil - he has a Thesaurus in his cabin.",
        quips: [
            "Proud and insolent youth, prepare to meet thy doom!",
            "Have you seen a ticking crocodile anywhere hereabouts?",
            "Who and what art thou?"
        ]

    },

    e61: {

        id: "e61",
        next_enemy_id: "e62",
        name: "Lilliputian Mob",
        height: "120px",
        width: "250px",
        full_hp: 55,
        attacks: [
            new Attack("Pitchfork",0.35,3, { bleed: 2 }),
            new Attack("Torch",0.35,4, { burn: 2, tilesmash: 1 }),
            new Attack("Tie Down",0.3,2, { stun: 2 })
        ],
        flavortext: "Undoubtedly, philosophers are in the right when they tell us that nothing is great or little otherwise than by comparison.",
        quips: [
            "Identify yourself!",
        ]

    },

    e62: {

        id: "e62",
        next_enemy_id: "e63",
        name: "Mangy Yahoo",
        height: "165px",
        width: "90px",
        full_hp: 50,
        attacks: [
            new Attack("Grapple",0.6,4),
            new Attack("Infectious Bite",0.4,4, { poison: 2, tileplague: 2 })
        ],
        flavortext: "I never beheld in all my travels so disagreeable an animal.",
        quips: [
            "*Grunt*",
            "Ooga ooga!"
        ]

    },

    e63: {

        id: "e63",
        next_enemy_id: "e64",
        name: "Irate Laputan",
        height: "185px",
        width: "160px",
        full_hp: 60,
        attacks: [
            new Attack("Stone Throw",0.4,4, { tilesmash: 2 }),
            new Attack("Condescension",0.3,3, { powerdown: 3 }),
            new Attack("Esoteric Dalliance",0.3,2, { tilealter: 4, powerup: 2 })
        ],
        flavortext: "A man of meagre aspect... had been for eight years upon a project for extracting sun-beams out of cucumbers, which were to be put into vials, hermetically sealed, and let out to warm the air in raw inclement summers.",
        quips: [
            "Begone, uncultured swine!"
        ]

    },

    e64: {

        id: "e64",
        next_enemy_id: "e65",
        name: "Aristotle's Ghost",
        height: "210px",
        width: "90px",
        full_hp: 65,
        attacks: [
            new Attack("Sophistry",0.5,3, { tilealter: 5, tilesteal: 1 }),
            new Attack("Eudaimonia",0.5,0, { regenerate: 7, powerup: 2 })
        ],
        flavortext: "Death is the most terrible of all things, for it is the end, and nothing is thought to be either good or bad for the dead."

    },

    e65: {

        id: "e65",
        next_enemy_id: "e11",
        finishpage: "endofdemo",
        name: "Majestic Houyhnhnm",
        height: "220px",
        width: "150px",
        full_hp: 75,
        attacks: [
            new Attack("Trample",0.35,4,{ tilesmash: 3 }),
            new Attack("Equine Superiority",0.35,0, { powerup: 3, powerdown: 3 }),
            new Attack("Stampede!",0.3,5, { stun: 2 })
        ],
        flavortext: "The behaviour of these animals was... orderly and rational... acute and judicious."

    }


}
