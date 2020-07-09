# Browser-based Bookworm Adventures

Bookworm Adventures is a word-forming combat-based RPG videogame, created originally by PopCap games. During my childhood, I spent a lot of time playing Bookworm Adventures, obsessing over its quirky characters, and wishing I could add my own characters, levels, and mechanics to the game. Unfortunately, BWA was never a *very* popular game. It eventually fell out of support, and there never was a version of the game playable on Mac or iOS. The only way I've been able to play BWA in the past few years has been through a glitchy, ad-ridden online version that didn't save progress. Yuck.

Since Bookworm Adventures was such a big part of my childhood, I decided to try rebuilding a playable version of it in the browser. You can play a Beta version of the game at [this link](https://bwa.franklin.dyer.me). 

I've done my best to reconstruct the original game's playful vibes through the artwork, dialogue and flavor text. It currently has no *plot* - it's just just RPG-style combat for its own sake, without any princesses to save or big baddies to hunt down. It happens that as I've gotten older, my appetite for inventing fantasy storylines has been greatly diminished, and I now find the back-end code and game mechanics more interesting than the superficial decoration. Feel free to suggest any plotline ideas you may come up with, but in my opinion, the game does not urgently need a plot.

[I want to play BWA!](https://bwa.franklin.dyer.me)  
[I want to read about BWA!](#how-to-play)  
[I want to customize BWA!](#customizing-bwa)  
[I want to significantly change BWA!](#adding-mechanics)  
[I want to contribute to BWA!](#contributing-to-bwa)  
[Who has contributed to BWA?](#credits)  

## How to Play

By the way, if you don't want to read all of the instructions below, just play the tutorial.

### The Battle Screen

Here's a picture of the original Bookworm Adventures:

![original bookworm](/img/24B672FD-F3EE-4349-AD45-4D0F542C7A72.jpeg)

And here's a picture of my browser-based version:

![my bookworm](/img/34AC4589-6D2D-481C-8227-32E624848FAF.jpeg)

This is the "battle screen," where most of the game's action takes place. Your character (Lex, the green bookworm on the left) and the enemy (on the right) take turns attacking each other, and the winner is whoever depletes the other player's health bar first. If you defeat the enemy, you'll progress to the next enemy or the next chapter, but if you're defeated, you have to restart at the beginning of the chapter.

During your turn, you must spell a word by clicking on letter tiles in the 4 by 4 grid. To deselect selected tiles, click on the word you've spelled and all of its tiles will be returned to the grid below. When you're satisfied with your word, click "attack" to attack the enemy. Longer words deal more damage, as do words containing "difficult" letters like Q, X, and Z. Abbreviations, acronyms, proper nouns, and other "pseudo-words" are not valid words, and if you try to press "attack" after spelling a non-word, nothing will happen.

The enemy has a set of predetermined attacks, among which it chooses randomly with certain weighted probabilities. Look at the space below where the enemy is standing to see a list of attacks (as well as flavor text). Enemy attacks can also inflict certain special effects upon the player, such as *poison* (which continues to inflict damage periodically over the course of many turns) or *stun* (which makes the player skip a turn). Some special effects also affect your tile grid, such as *tile smash* (which "smashes" tiles, so that they contribute no damage to words they are used in). These effects are indicated by colored symbols (e.g. a skull-and-crossbones means "poison", and yellow stars means "stun", and a cracked tile means "tile smash").

### Special Effects

The following is a classification of all special effects currently implemented:

- One-time effects
  - Damage: deals damage. Represented by a dagger icon.
  - Regenerate: regenerates some health. Represented by a heart icon.
- Enduring effects
  - Bleed: deals a small amount of damage each turn for a certain number of turns. Represented by a blood-droplets icon.
  - Poison: deals a moderate amount of damage each turn for a certain number of turns. Represented by a skull-and-crossbones icon.
  - Burn: deals a large amount of damage each turn for a certain number of turns. Represented by a flame icon.
  - Power Up: strengthens the next few outgoing attacks. Represented by an upward-arrow icon.
  - Power Down: weakens the next few incoming attacks. Represented by a downward-arrow icon.
  - Stun: forces opponent to skip some number of turns. Represented by a star icon.
  - Freeze: forces opponent to skip some number of turns. Represented by a snowflake icon.
  - Shield: negates all incoming damage and negative effects for a certain number of turns. Represented by a pink shield icon.
- Tile effects
  - Tile Smash: "smashes" a few tiles, so that they do not contribute to the damage dealt by any word in which they are used. Represented by a cracked tile icon.
  - Tile Plague: "infects" a few tiles, rendering them damageless like smashed tiles. However, plagued tiles can infect other tiles in the grid if left unused. Represented by a green striped tile icon.
  - Tile Steal: steals a few tiles, removing them from the grid. Represented by a hand-grabbing-tile icon.
  - Tile Alter: changes a few tiles to difficult-to-use letters like Q, X, J, and Z.
  
If you have suggestions of special effects you'd like to see, raise an issue!

### Gem Tiles

![gem tiles](/img/EAB63A78-FF4F-45D3-9005-1BF4AB132A9B.jpeg)

*Gem tiles* are special colored tiles that inflict extra damage upon the enemy, as well as carry out some special effect. For example, purple amethyst tiles poison the enemy and green emerald tiles regenerate some of the player's health. You can earn gem tiles by spelling long words or dealing "overkill" damage to enemies (that is, by dealing more damage than is required to finish off the enemy). The longer your word or more overkill damage it deals, the more rare and powerful the gem tile awarded.

Here's a list of all gem tiles currently implemented:

- Amethyst: poisons the enemy.
- Emerald: regenerates some health.
- Garnet: powers the enemy down.
- Sapphire: freezes the enemy.
- Ruby: burns the enemy.
- Crystal: purifies and shields the player for one turn.
- Diamond: restores the player to full health and awards one of each potion type.

### Potions

![potions](/img/7D749C54-20D6-4254-BB86-D02540BA3599.jpeg)

After defeating an enemy, there's a chance that you will earn one or more *potions*. Potions appear in the area below your player, and you can click on a potion at any time (even outside of your turn) to use it. There are three types of potions:

- Regenerate: restores some of your health.
- Power Up: increases the amount of damage dealt by your next attack.
- Purify: removes all negative effects and tile ailments.

### Structure of the Game

The entirety of the game is divided into *chapters*, each of which consists of five enemies. Every chapter is themed (usually drawing from a particular book or subgenre of fiction) and ends with a "boss battle" against a particularly difficult "boss" enemy. After defeating a chapter's boss, the player is awarded a special treasure that can be used to gain advantages in later chapters. Between chapters, the player is transported to the map page, showing the player's progress on a map, displaying a description of the next chapter, and allowing the player to choose which treasures to bring to the next chapter (a maximum of 3 treasures can be used at once).

![map screen](/img/7D124320-1841-46BC-A92F-8F46006D3CEC.jpeg)

A *book* consists of ten chapters which adhere to a particular genre. The three book themes used in the original Bookworm Adventures were "Greek Mythology", "Arabian Nights", and "Gothic Horror". The theme used in the demo book in the Beta version is "British Fantasy."

I've tried to make it as easy as possible to add new enemies, chapters, and books, while preserving enough flexibility to allow fans from non-technical backgrounds to add enemies with special or unusual abilities. Although a chapter usually consists of 5 enemies and a book of 10 chapters, this format isn't hard-coded, and it's entirely possible to implement variable-length chapters or books.

If you finish an entire book, you have the option to play through again in "hardcore mode." In this gamemode, you start off with a bonus cache of potions, but your health bar is not replenished automatically between enemies, and you are transported all the way back to the beginning of the book upon death (rather than the beginning of the chapter). The point of hardcore mode is to see how far you can get without healing or dying (emerald tiles and health potions, of course, are still valid ways of healing).

### Savefiles

The browser automatically saves your progress using localStorage. This method of progress-saving was very easy to implement, but it has a few caveats. First of all, since save data is stored locally, it's possible to cheat by editing your localStorage savefile to artificially progress to later chapters, give yourself extra potions or gem tiles, insta-kill enemies, etc. As far as I'm concerned, this isn't a huge problem, and I don't care much if people cheat if they find it more entertaining that way. 

Here's a more serious potential problem with localStorage: you can't resume your game on another device or even in another browser. At least, your progress won't be automatically transferred - if you're console-savvy, you can extract your savefile from localStorage and paste it into the console of another browser to transfer your progress. If enough people complain about this, I'll update it.

## Customizing BWA

Want to design your own bookworm enemies or levels, or change the attacks or stats of existing baddies? Do you want to design a custom chapter (or even an entire book) with a theme of your choice? So did I, when I was younger! The original Bookworm Adventures was frustratingly uncustomizable, but I've tried to make this open-source spin-off as easy to tweak as possible, including for non-programmers.

### Designing Enemies

All of the enemy stats are stored in the file /js/enemy_library.json. The file consists of a single javascript object called "enemy_library," inside of which each enemy is stored under a unique ID number. I've adopted the convention of assigning each enemy an ID equal to the letter "e", followed by the number of the chapter in which that enemy is found, followed by the number indicating which position the enemy occupies in that chapter. For instance, the third baddie in chapter 5 has ID "e53", and the first baddie in chapter 27 would have ID "e271" (if there were 27 chapters).

I recommend following this convention, because the code uses it to do things like dynamically set the backgrounds for different chapters. For example, when you fight enemy "e271", the code knows that you're on chapter 27, so it sets the background to /img/background_27.png. Also, if the next enemy is "e51", the code realizes that, since the next enemy is the first enemy of chapter 5, you need to be sent to the map page before engaging (because chapters are punctuated by visits to the map and treasure-selection screen). Failing to adhere to this naming convention could mess up some game mechanics that would be annoying to fix if you don't want to get into the weeds.

Note that this also means you can't have more than nine enemies in a chapter. The ID for the eleventh enemy in chapter 2 would be "e211", but the code would interpret that as the first enemy in chapter 21. Not good.

Here's an example of an entry in /js/enemy_library.json:

```
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
     flavortext: "Have you heard? Everyone's saying that Oberon's wife... has fallen in love with this donkey-faced man!
     quips: [                                                                                                           
       "Oh god, I've made an ass of myself!",                                                                         
       "Hee haw!",                                                                                                    
     ]
 
    },
```

Here's a description of what each of these attributes means, one by one:

- *id*: the enemy's ID.
- *next_enemy_id*: the next enemy's ID, which will be used to automatically summon the next enemy after this enemy is defeated.
- *name*: the display name for the enemy. This unfortunate character is named "Donkeyface."
- *height*: the height of the image displayed, in pixels.
- *width*: the width of the image displayed, in pixels.
- *full_hp*: the initial number of health points the enemy has.
- *attacks*: an array of Attack objects separated by commas, each of which encodes one of the enemy's attacks. The syntax used to define an attack is <code>new Attack(name,prob,damage,effects)</code>, where
  - *name* is a quote-enclosed string with the name of the attack, e.g. <code>"Ass Kick"</code>.
  - *prob* is the probability with which the enemy uses that attack, e.g. <code>0.1</code> for a rare attack or <code>0.5</code> for a common attack.
  - *damage* is the amount of damage the attack deals, e.g. <code>1</code> for a weak attack or <code>6</code> for a very strong attack.
  - *effects* is an optional argument containing an object that lists the attack's special effects. For example, <code>{ poison: 3, tilesmash: 2 }</code> poisons the player for 3 turns and smashes 2 tiles.
- *ondeath*: an optional parameter containing a function to be executed when the enemy is defeated. In the above example, the player is "leveled up" to 25 health after defeating Donkeyface.
- *onapproach*: an optional parameter similar to "ondeath" that executes a function when the enemy approaches (before combat begins). This doesn't appear in the case of Donkeyface, because Donkeyface doesn't do anything special at the start of combat.
- *flavortext*: the enemy's flavor text. Something silly.
- *quips*: an array of strings for the enemy to randomly blurt out during battle. More silliness here.

By the way, watch out for the syntax, especially if you're a non-programmer. All of the enemies in the enemy_library object *must* be separated by commas, and failing to do so will raise an error. Each of the enemy attributes (*id*, *next_enemy_id*, *name*, etc.) must also be comma-separated.

That's all there is to it!

### Adding Art

To add character and background art, just plop it in the /img folder. Enemy images should be named according to the format "enemy_" followed by the enemy ID and ".png". For example, Donkeyface's marvelous image is named "enemy_e44.png". Background images should be named according to the format "background_" followed by the number of the chapter and ".png". The background image behind Donkeyface is "background_4.png".

Before adding enemy art, you should make sure to crop out all of the whitespace surrounding the silhouette of your enemy. This can be done using the lasso tool in various image editors. I recomment using [Photopea](https://www.photopea.com).

You can also reskin any part of the game you want by replacing images in the /img folder with identically-named images. For example, if you want to change how the regenerate potion looks, delete /img/regenerate_potion.png and replace it with a picture of your own making named "regenerate_potion.png". If you want to change things like the color or shape of the health bars, the grid tiles, the attack button, or the various compartments on the lower half of the battle screen, you'll have to modify the css code in /css/style.css instead of the images.

### Tweaking Stats

You can even change some of the game's basic mechanics without having to dig deep into the code. Around line 60 in /js/battle.js you'll find an object named "stats" that looks like this:

```   
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
 ```

Here's what each of these objects does:

- *letter_freqs*: all letters do not occur equally often when your grid is refilled (obviously, you'll need more As and Es than Qs and Zs). This array stores the frequencies with which each letter appears. I would not recommend tampering with this, except as a joke.
- *letter_strengths*: the amount of damage that each letter contributes do a word, based on how common/rare the letters are in English words. If you want, you can replace <code>'Q':3</code> with <code>'Q':1000000</code>, so that using a Q essentially insta-kills any enemy.
- *gem_awards*: determines the types of gems awarded for words of different lengths.
- *word_messages*: Lex's silly comments on the quality of the word you've spelled. (This feature isn't actually implemented yet.)
- *overkill_awards*: determines the types of gems awarded for different amounts of overkill damage. For example, overkilling an enemy by 13, 14, or 15 damage will get you a sapphire.
- *overkill_messages*: the messages displayed for different amounts of overkill damage. More silly stuff.
- *normal_potion_probs*: the probability that defeating a regular enemy will award each type of potion. For example, about 1 in 10 regular enemies will award a purify potion when defeated.
- *boss_potion_probs*: potion-dropping probabilities for boss enemies. Slightly higher than the regular probabilities, because the player should be awarded more for defeating a difficult boss.

### Adding a New Book

If you're designing an entirely new book and you want it to be listed on BWA's homepage, you need to modify the file /templates/home.html. Around line 165, you should see the following tags encoding the selection box displayed on the homepage:

```
<select id="select_game">
	<option value="e01">Tutorial</option>
	<option value="e11">British Fantasy</option>
</select>
```

Just add an option to this list with a value equal to the ID of the first enemy in your book. For example, if you've added a Steampunk-themed book whose first chapter is chapter 11 (coming after chapter 10 of the British Fantasy book), modify the above code to look like this:

```
<select id="select_game">
	<option value="e01">Tutorial</option>
	<option value="e11">British Fantasy</option>
	<option value="e111">Steampunk</option>
</select>
```

## Adding Mechanics

If you want to make more significant changes to the BWA's game mechanics, you'll have to learn more about the structure of the code. First of all, you need to know some HTML and Javascript (or at least be able to pick it up on the fly) in order to do this.

Most of the action takes place in /js/battle.js, which determines how combat works. The bulk of this code resides in four large Javascript objects:
- *Model*: contains all of the static game-state information, such as the letters in the grid and their status, information about the player and enemy, etc.
- *View*: contains information and functions needed to make the game beautiful. The View object is in charge of making gem tiles shiny, dynamically rendering the background and enemy images, showing speech bubbles and dialogue boxes, etc.
- *Controller*: all of the game's action is coordinated by the Controller object. Every function in the Controller corresponds to a game event such as the player attacking or an enemy being defeated, and it makes sure that View updates the GUI to reflect the current information in the Model object.
- *Savefile*: a small object that contains information about your savefile and helps load it into localStorage.

It would be overkill for me to list and describe every function in each of these objects. Instead, I'll try to anticipate a few ways in which someone *might want* to alter the game mechanics and describe how to do so in each case, including all of the functions and objects involved. If the modification you want to make isn't listed here, hopefully these examples provide enough information to allow you to figure it out on your own.

### Adding a New Special Effect

Let's say you want to add a special effect of your own design in addition to poison, bleed, burn, stun, freeze, etc. I'll show you how to add two of the three different types of effects we describe earlier: one-time effects and enduring effects. Maybe I'll eventually get around to writing up an example for tile effects as well.

#### One-time Effects

As an example of a one-time effect, suppose you want to make a special attack called "potion steal" that allows a baddie to take away some of your potions. First things first, have a look at the function ```enemy_special_effects``` under the Controller object. This function is in charge of implementing all of the special effects associated with an enemy attack. It's a pretty long function, so let's just look at how it handles regeneration, which is another example of a one-time effect:

```
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
```

Here's a step-by-step description of what this function is doing:

- In the first line, it checks whether the "effects" object of the enemy's attack (which is passed as an argument to the function) has a regenerate value of zero. If so, this whole chunk of code is skipped. Otherwise, regeneration takes place.
- In the following 6 lines, the code increases the enemy's health by the amount specified in the ```attack.effects``` object. However, makes sure not to increase the enemy's health past its maximum health ```full_hp```.
- In the second-to-last line, the function ```View.refresh_enemy_health``` is called, which updates the enemy's health bar and produces a "blinking "effect to show that a change in health has taken place.

So here's an example of how we might implement a "potion steal" effect:

```
// potion steal                                                                                                            
	for (var i = 0; i < attack.effects.potionsteal; i++) {
	    var potiontype = ["regenerate","powerup","purify"][Math.floor(3*Math.random())]
	    if (Model.player.potions[potiontype] != 0){ Model.player.potions[potiontype] += -1 }
	}
	this.make_potions_functional()
```

Basically, this just picks a random type of potion (regenerate, powerup, or purify) and deducts one of that potion type, if there are any left. It repeats this process a number of times equal to the "intensity" of the effect listed in ```attack.effects``` object before finally calling ```Controller.make_potions_functional``` to re-render the potions on the screen.

There's one last thing you must do: scroll to the top of /js/battle.js and alter the Attack class to accomodate the "potion steal" effect. Here's what the Attack class currently looks like:

```
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
```

All you have to do now is add an extra line in the middle saying ```potionsteal: 0```, so that all attacks steal zero potions by default, but can be specified to steal a certain number of potions in /js/enemy_library.json.

#### Enduring Effects

Suppose you want to implement an enduring effect called "curse" that repeatedly deals damage like poison, bleed, and burn, but does so at a decreasing rate. For example, a 3-turn curse deals 3 damage on the first turn, 2 damage on the second turn, and 1 damage on the last turn before finally disappearing. Let's use the "poison" effect as an illustrative example of this type of effect. As with the previous example, we must first look at the ```enemy_special_effects``` function to see how an enemy implements poison.

```
// poison                                                                                                      
	Model.player.special.poison += attack.effects.poison;
```

All this does is increase the player's "poison counter" by the given number of turns. As it turns out, when it comes to implementing enduring effects, the heavy lifting occurs in a different function called ```special_effect_phase```. The special effect phase occurs at the end of each attack cycle following the enemy's attack. At this time, all of the enduring-special-effect-counters of the player and enemy are decremented and the corresponding effects are carried out. Here's how this function handles poison:

```
// poison                                                                                                                  
        if (Model.player.special.poison > 0 && Model.player.special.shielded == 0) { Model.player.smart_health_decrement(2) }
        if (Model.enemy.special.poison > 0) { Model.enemy.smart_health_decrement(2); } 
```

What does this do? If the player is poisoned and not shielded, the player's health is decremented by two, and the enemy (which, at the moment, does not have the ability to shield itself) is also docked two health points if its poison counter is greater than zero. Near the end of the ```enemy_special_effects``` function, after it has dealt with all of the other enduring effects, we have the following code:

```
Model.decrement_effects(); 
```

This just tells the Model to decrement all of enduring-special-effect counters belonging to the player and enemy, so that they don't last forever.

Implementing the "curse" effect would be pretty straightforward. Add a line to ```enemy_special_effects``` that looks like this:

```
// curse                                                                                                      
	Model.player.special.curse += attack.effects.curse;
```

and you'll also have to add a few lines to the ```special_effect_phase``` function to make the "curse" effect behave as desired:

```
// curse                                                                                                                  
        if (Model.player.special.curse > 0 && Model.player.special.shielded == 0) { Model.player.smart_health_decrement(Model.player.special.curse) }
        if (Model.enemy.special.curse > 0) { Model.enemy.smart_health_decrement(Model.enemy.special.curse); } 
```

Also, remember what I said earlier about modifying the Attack class to accomodate new special effects? You'll have to add another line to that class instantiation at the beginning of /js/battle.js that says ```curse: 0```.

There's one more thing that needs to be done for enduring effects. In the player object within the Model, you'll find an attribute called "special" that looks like this:

```
special: {                                                                                                         
            poison: 0,                                                                                                     
            bleed: 0,                                                                                                      
            burn: 0,                                                                                                       
            powerup: 0,                                                                                                    
            powerdown: 0,                                                                                                  
            stun: 0,                                                                                                       
            shielded: 0                                                                                                    
        },
```

You have to add a line here for "curse" as well, since the player doesn't yet have the ability to be "cursed". If you want to be able to curse the enemy as well, you'll have to modify ```Model.enemy.special``` as well.

### Adding a New Treasure

If you're already more-or-less familiar with how the game works and some of the essential functions, writing a new treasure should be a piece of cake. Information about particular treasures and their specific functionality is stored in /js/treasure_library.json. Let's dissect an example of a treasure to see how it works:

```
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
```

Here's a list of what each of these attributes means:

- *name*: the displayed name of the treasure.
- *id*: the treasure's ID. As a convention, since you earn treasures by defeating bosses at the end of chapters, the ID of each treasure is equal to "t", followed by the number of the book it occurs in, followed by the number of the chapter it occurs in. Chapter numbers start at zero, so that the ID "t10" corresponds to the first treasure of book 1.
- *description*: the description of the treasure that appears on the map-and-treasure-selection-screen.
- *triggertype*: describes when the treasure's special power is triggered. This particular example has a triggertype of "submitword", meaning that its power comes into play whenever you submit a word to attack. Another example of a triggertype is "scramble", which triggers the treasure when you press the scramble button.
- *whentriggered*: a function executing the treasure's special power. This function is called whenever an event of the correct triggertype occurs. 

There are currently only two different triggertypes - "submitword" and "scramble". If you want to add a different triggertype, you need to go digging through /js/battle.js. Controller contains a function called ```activate_treasures``` that takes a triggertype as an argument and activates all treasures with that triggertype, but this function must be called in the appropriate location of the code in order to activate treasures appropriately. For example, suppose you want to create a treasure that activates whenever you defeat an enemy. Create a new triggertype called "enemydefeated" and find the function in Controller that is called when the enemy is defeated. In this case, the function is ```enemy_defeated```. Near the end of that function, add a line that reads

```
this.activate_treasures("enemydefeated");
```

This is enough to trigger all of the relevant treasures upon enemy defeat.

## Contributing to BWA

Here's how you can contribute to BWA:

- Play the game and find lots of bugs. I'm not interested in knowing how you can cheat using the console - that doesn't bother me. I would like to hear about what goes wrong when you play the game without cheating. If you find something, file an issue.
- Can you think of a way that this game could be improved? If so, please file an issue and I'll address it as soon as I can. Or, if you want, you can try to implement a new feature yourself, and file a pull request.
- Have a look at the current list of issues and see if you can resolve any of them.
- Design new enemies and add new art! This project has really sapped my creative energies, and I don't know if I can bring myself to write another single line of corny flavor text. Please design your own chapter or book and make a pull request! If it's high-quality, I'll merge it with the original.
- If you're good with audio, please make me some sound effects! I'd love to use them.

Much obliged!

## Credits

So far (as of July 8, 2002), I have been the sole programmer of BWA. I've also drawn all of the background illustrations and some of the character art. My sister Ada drew most of the character art.
