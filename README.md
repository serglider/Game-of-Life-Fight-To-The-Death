
Game ofLife: Fight To The Death
===============================

This is an entry for the [Js13kGames](http://js13kgames.com/) competition - 2014:  it's yet another view on the classic John Conway's game based on [my entry](http://js1k.com/2014-dragons/demo/1912) for the [JS1K](http://js1k.com) competition - 2014.

Update: The game is submitted and accepted on Js13kGames. So you can try it [here.](http://js13kgames.com/entries/game-of-life-fight-to-the-death)

### Game

Game Of Life: Fight To The Death is yet another view on the classic John Conway's game/model. If you know nothing about classics please read the Wikipedia [article](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) and if you want to extend your knowledge and get inspired please visit awesome [conwaylife.com](http://conwaylife.com/wiki/Main_Page)

The main added feature of this version is that you have two tribes of the living cells. These two tribes will fight each other to the death after you set a battle field. Well, actually not necessarily to the death, because you can limit number of generation to pass. Please read on to learn what else you can configurate.

### Options

Please, don't forget to click the "Apply configuration" button to actually apply configuration. Note that you'll start with an empty battlefield in this case.

<ul>
	<li><strong>Number of columns</strong> - select this and the number of rows will be calculated automatically based on you browser window size.</li>
	<li><strong>Population density</strong> - select the maximal population density allowed for you and your rivals. The exact max allowed number of living cells will be presented to you too.</li>
	<li><strong>Set both tribes</strong> - you have the ability to set battlefields for the both tribes. Otherwise the script will fill the left pane randomly by green tribe cells. The script will use the max allowed number of living cells</li>
	<li><strong>Perform checking</strong> - if this option is chosen the script will check every 25 generations the following:
		<ol style="list-style-type: lower-alpha;">
			<li>if there are no living cells at all</li>
			<li>if just one tribe's cells left</li>
			<li>if there is stable situation</li>
			<li>if there is "blinking" battlefield and this blink has a period of two</li>
		</ol>
	If any of these is true - the game will stop and you will be presented with results</li>
</ul>

### Gameplay

<ol>
	<li>Set preferred options.</li>
	<li>Set position of living cells by clicking or dragging over the battlefield. Note that you can't exceed the max allowed amount of cells. At any time you can empty your battlefield by clicking the Reset button.</li>
	<li>Hit the Start button to open the left pane. Do you work if you chose to rule both tribes.</li>
	<li>When you're done you have two options:
		<ol style="list-style-type: lower-alpha;">
			<li>Start automatic generations passing by pressing the spacebar. To stop - hit it one more time.</li>
			<li>See next generation by pressing any keyboard arrow.</li>
			<li>You can mix the two previous ways to continue.</li>
		</ol>
	</li>
	<li>If game is over and you enjoyed its results you can get back to the initial position by pressing "Esc"</li>
</ol>

### Thanks

I hope all the nerds, math lovers and Conway's game funs will enjoy this game. I'm planning to improve the game and advance it beyond 13k limitations: add multiplayer, ability to load patterns from conwaylife.com and plenty of other features. So I'm eager to hear from you: feedback, suggestions, etc. Just drop a line to @sergonaut on Twiiter or seglider on GitHub. Thanks.