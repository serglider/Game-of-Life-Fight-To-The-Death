var NW = 51,   // initial number of columns
    P = 0.4,    // density of the population
    S,          // cell's size
    NH,         // number of rows
    C,          // array to keep state of each cell
    N,          // array to keep state of each cell
    W, H, DW, DH, HW, HNW,
    CLRS = ["#5A1F00", "#D1570D","#477725", "rgba(0,0,0,1)"],
    AN = false, // mark that animation's on
    GO = true;
// A9CC66
// 477725+
// FDE792
// D1570D+
// 5A1F00+

var game = document.getElementById("game"),
    grid = document.getElementById("grid"),
    pane = document.getElementById("pane"),
    c = game.getContext("2d"),
    gс = grid.getContext("2d"),
    b = document.body,
    IW = window.innerWidth,
    IH = window.innerHeight;

S = Math.floor(IW/NW);
NH = Math.floor(IH/S);
W = S * NW;
H = S * NH;
DW = (IW - W)/2;
DH = (IH - H)/2;
HNW =(NW - 1)/2;
HW = S * HNW;
game.width = W;
game.height = H;
grid.width = W;
grid.height = H;
game.style.left = DW + "px";
game.style.top = DH + "px";
grid.style.left = DW + "px";
grid.style.top = DH + "px";

pane.style.top = DH + "px";
pane.style.right = DW + "px";
pane.style.width = HW + "px";
pane.style.height = H + "px";