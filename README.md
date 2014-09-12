
Game-of-Life-Fight-To-The-Death
===============================

This is an entry for the [Js13kGames](http://js13kgames.com/) competition - 2014:  it's yet another view on the classic John Conway's game based on [my entry](http://js1k.com/2014-dragons/demo/1912) for the [JS1K](http://js1k.com] competition - 2014.

### Game

Game Of Life: Fight To The Death is yet another view on the classic John Conway's game/model. If you know nothing about classics please read the Wikipedia [article](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) and if you want to extend your knowledge and get inspired please visit awesome [conwaylife.com](http://conwaylife.com/wiki/Main_Page)

The main added feature of this version is that you have two tribes of the living cells. These two tribes will fight each other to the death after you set a battle field. Well, actually not necessarily to the death, because you can limit number of generation to pass. Please read on to learn what else you can configurate.

### Options

Please, don't forget to click the "Apply configuration" button to actually apply configuration. Note that you'll start with an empty battlefield in this case.

-<strong>Number of columns</strong> - select this and the number of rows will be calculated automatically based on you browser window size.
-<strong>Population density</strong> - select the maximal population density allowed for you and your rivals. The exact max allowed number of living cells will be presented to you too.
-<strong>Set both tribes</strong> - you have the ability to set battlefields for the both tribes. Otherwise the script will fill the left pane randomly by green tribe cells. The script will use the max allowed number of living cells
-<strong>Perform checking</strong> - if this option is chosen the script will check every 25 generations the following:
		a.if there are no living cells at all
		b.if just one tribe's cells left
		c.if there is stable situation
		d.if there is "blinking" battlefield and this blink has a period of two
	If any of these is true - the game will stop and you will be presented with results

### Gameplay

1.Set preferred options.
2.Set position of living cells by clicking or dragging over the battlefield. Note that you can't exceed the max allowed amount of cells.
3.At any time you can empty your battlefield by clicking the Reset button.
4.Hit the Start button to open the left pane. Do you work if you chose to rule both tribes.
5.When you're done you have two options:
		a.Start automatic generations passing by pressing the spacebar. To stop - hit it one more time.
		b.See next generation by pressing any keyboard arrow.
		c.You can mix the two previous ways to continue.

6.If game is over and you enjoyed its results you can get back to the initial position by pressing "Esc"
