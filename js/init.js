var NW = 51,   // initial number of columns
    P = 0.4,    // density of the population
    S,          // cell's size
    NH,
    myC,
    enemyC,         // number of rows
    C,          // array to keep state of each cell
    N,          // array to keep state of each cell
    W, H, DW, DH, HW, HNW, GEN,
    CLRS = ["#5A1F00", "#D1570D","#477725", "rgba(0,0,0,1)"],
    AN = false, // mark that animation's on
    GO = true,
    prevCellCache = {
        i: 1000,
        j: 1000
    },
    dragging;
// A9CC66
// 477725+
// FDE792
// D1570D+
// 5A1F00+
function getEl(s) {
    return document.querySelector(s);

}

var game = getEl("#game"),
    grid = getEl("#grid"),
    pane = getEl("#pane"),
    apply = getEl("#apply"),
    rulesBtn = getEl("#nav-rules"),
    optionBtn = getEl("#nav-option"),
    navbtns = document.getElementsByClassName("btn"),
    panels = document.getElementsByClassName("panels"),
    form = document.forms[0],
    c = game.getContext("2d"),
    gс = grid.getContext("2d"),
    b = document.body,
    IW = window.innerWidth,
    IH = window.innerHeight;

function init() {
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
    form.livecells.value = getCellsNumber(P);

    myC = getEmptyArray(HNW, NH);
    enemyC = getEmptyArray(HNW, NH);
}

function getEmptyArray(col, row) {
    var arr = [], i = 0, j;
    for ( ; i < col; i++ ) {
        arr[i] = [];
        for ( j = 0; j < row; j++ ) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function getCellsNumber(p) {
    return Math.floor(HNW * NH * p);
}

init();


