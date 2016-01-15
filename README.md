VAGABOND
========
The start of a [Roguelike](https://en.wikipedia.org/wiki/Roguelike) game, created in JavaScript, CSS, and HTML.

Install
=======
Run `npm install` from the terminal in the main `vagabond` folder.

DEMO
====
You can play the current build **[HERE](http://marvinkassabian.github.io/vagabond/game.html)**.

Premise
-------
Started off with a simple program to become familar with [Kyle Simpson's OLOO pattern](https://davidwalsh.name/javascript-objects-deconstruction).

Used the [diamond-square algorithm](https://en.wikipedia.org/wiki/Diamond-square_algorithm) to create organic height maps for eventual overworld generation.

Used [cellular automata](http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels) to generate the maps where the player would fight monsters.

Used weighted A* for monster pathfinding AI.

Controls
--------
Key | Action
--- | ------
[W][A][S][D] | Move player character [#]
[UP][LEFT][DOWN][RIGHT] | Move screen
[SPACE] | Reinitilize the map
[CONTROL] | switch between map types
[LEFT CLICK] | attack enemy
[NUMPAD8][NUMPAD2] | Scroll through logs

Game Information
----------------
+ You are the [#][HASH CHARACTER]
+ You can only attack a goblin that is adjacent to you
+ If the map spawns you in a wall, press [SPACE] to make a new map (until you spawn outside a wall)
+ You heal one hit point for every step
+ Goblins [%][PERCENTAGE CHARACTER] only chase you when you're close to them
+ If you decide to switch map types, you will need to press [SPACE] again
+ Make sure [NUMLOCK] is on to scroll through the logs
