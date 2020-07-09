# Browser-based Bookworm Adventures

Bookworm Adventures is a word-forming combat-based RPG videogame, created originally by PopCap games. During my childhood, I spent a lot of time playing Bookworm Adventures, obsessing over its quirky characters, and wishing I could add my own characters, levels, and mechanics to the game. Unfortunately, BWA was never a *very* popular game. It eventually fell out of support, and there never was a version of the game playable on Mac or iOS. The only way I've been able to play BWA in the past few years has been through a glitchy, ad-ridden online version that didn't save progress. Yuck.

Since Bookworm Adventures was such a big part of my childhood, I decided to try rebuilding a playable version of it in the browser. You can play a Beta version of the game at [this link](https://bwa.franklin.dyer.me). 

I've done my best to reconstruct the original game's playful vibes through the artwork, dialogue and flavor text. It currently has no *plot* - it's just just RPG-style combat for its own sake, without any princesses to save or big baddies to hunt down. It happens that as I've gotten older, my appetite for inventing fantasy storylines has been greatly diminished, and I now find the back-end code and game mechanics more interesting than the superficial decoration. Feel free to suggest any plotline ideas you may come up with, but in my opinion, the game does not urgently need a plot.

## How to Play

### Tutorial

If you don't want to read the instructions, just play the tutorial.

### The Battle Screen

Here's a picture of the original Bookworm Adventures:

[INSERT IMAGE HERE]

And here's a picture of my browser-based version:

[INSERT IMAGE HERE]

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
  
If you have suggestions of special effects you'd like to see, raise an issue!

### Gem Tiles

[INSERT IMAGE OF GEM TILES]

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

[INSERT PICTURE OF POTIONS]

After defeating an enemy, there's a chance that you will earn one or more *potions*. Potions appear in the area below your player, and you can click on a potion at any time (even outside of your turn) to use it. There are three types of potions:

- Regenerate: restores some of your health.
- Power Up: increases the amount of damage dealt by your next attack.
- Purify: removes all negative effects and tile ailments.

### Structure of the Game

The entirety of the game is divided into *chapters*, each of which consists of five enemies. Every chapter is themed (usually drawing from a particular book or subgenre of fiction) and ends with a "boss battle" against a particularly difficult "boss" enemy. After defeating a chapter's boss, the player is awarded a special treasure that can be used to gain advantages in later chapters. Between chapters, the player is transported to the map page, showing the player's progress on a map, displaying a description of the next chapter, and allowing the player to choose which treasures to bring to the next chapter (a maximum of 3 treasures can be used at once).

[INSERT IMAGE OF MAP SCREEN]

A *book* consists of ten chapters which adhere to a particular genre. The three book themes used in the original Bookworm Adventures were "Greek Mythology", "Arabian Nights", and "Gothic Horror". The theme used in the demo book in the Beta version is "British Fantasy."

I've tried to make it as easy as possible to add new enemies, chapters, and books, while preserving enough flexibility to allow fans from non-technical backgrounds to add enemies with special or unusual abilities. Although a chapter usually consists of 5 enemies and a book of 10 chapters, this format isn't hard-coded, and it's entirely possible to implement variable-length chapters or books.

If you finish an entire book, you have the option to play through again in "hardcore mode." In this gamemode, you start off with a bonus cache of potions, but your health bar is not replenished automatically between enemies, and you are transported all the way back to the beginning of the book upon death (rather than the beginning of the chapter). The point of hardcore mode is to see how far you can get without healing or dying (emerald tiles and health potions, of course, are still valid ways of healing).

### Savefiles

The browser automatically saves your progress using localStorage. This method of progress-saving was very easy to implement, but it has a few caveats. First of all, since save data is stored locally, it's possible to cheat by editing your localStorage savefile to artificially progress to later chapters, give yourself extra potions or gem tiles, insta-kill enemies, etc. As far as I'm concerned, this isn't a huge problem, and I don't care much if people cheat if they find it more entertaining that way. However here's a more serious potential problem with localStorage: you can't resume your game on another device or even in another browser. At least, your progress won't be automatically transferred - if you're console-savvy, you can extract your savefile from localStorage and paste it into the console of another browser to transfer your progress. If enough people complain about this, I'll update it.

## Personalizing BWA

## Adding Mechanics

## Contributing to BWA



## Credits

So far (as of July 8, 2002), I have been the sole programmer of BWA. I've also drawn all of the background illustrations and some of the character art. My sister Ada drew most of the character art.
