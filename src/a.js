/* jshint strict: false */
var colN = 51,   // initial number of columns
    P = 0.5,    // density of the population
    S,          // cell's size
    rowN,
    orangeArr,
    playerLC,
    greenArr,
    enemyLC,
    bf1,
    bf2,
    maxLС,
    W, H, dW, dH, halfW, colHN, maxGen,
    CLRS = ["#5A1F00", "#D1570D","#477725", "rgba(0,0,0,1)"],
    animation = false, // mark that animation's on
    gridOn = true,
    cache = {
        greens: {
            i: 1000,
            j: 1000
        },
        oranges: {
            i: 1000,
            j: 1000
        }
    },
    checkjson,
    checking,
    mTimeout,
    bothtribes,
    dragging,
    cellnum,
    oranges,
    greens,
    dead,
    generation;

function getEl(s) { return document.querySelector(s); }

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
    windowW = window.innerWidth,
    windowH = window.innerHeight,
    informer;

function init(showpanel) {
    generation = 0;
    cellnum = {};
    oranges = 0;
    greens = 0;
    dead = 0;
    bothtribes = +form.bothtribes.value;
    checking = +form.checking.value;
    maxGen = getGenNumber(+form.gennum.value);
    S = Math.floor(windowW/colN);
    rowN = Math.floor(windowH/S);
    W = S * colN;
    H = S * rowN;
    dW = (windowW - W)/2;
    dH = (windowH - H)/2;
    colHN =(colN - 1)/2;
    halfW = S * colHN;
    maxLС = getCellsNumber(P);
    informer = new Informer();

    game.width = W;
    game.height = H;
    grid.width = W;
    grid.height = H;
    game.style.left = dW + "px";
    game.style.top = dH + "px";
    grid.style.left = dW + "px";
    grid.style.top = dH + "px";

    pane.style.top = dH + "px";
    pane.style.right = dW + "px";
    pane.style.width = halfW + "px";
    pane.style.height = H + "px";
    form.live.value = maxLС;
    form.gennumO.value = maxGen.toString();

    if ( bothtribes ) {
        orangeArr = getEmptyArray(colHN, rowN);
        greenArr = getEmptyArray(colHN, rowN);
        cellnum.greens = 0;
        cellnum.oranges = 0;
    }else {
        orangeArr = getEmptyArray(colHN, rowN);
        greenArr = getTribeArray(colHN, rowN, 2);
        cellnum = checkCellNum(greenArr);
    }

    drawStage(orangeArr, "left");

    if ( gridOn ) { drawGrid(S, colN, rowN, true); }
    if ( showpanel ) { remClass(pane, "hidden"); }
}

function getCellsNumber(p) {
    return Math.floor(colHN * rowN * p);
}

function getGenNumber(n) {
    return ( n ) ? n : Infinity;
}

function Informer() {
    var self = this,
        h = H/8,
        fs = h/1.2,
        rectY = (H - h)/2,
        textY = rectY + h/2;
    self.msgOn = false;
    self.drawScore = function (cells) {
        var max = Math.max(cells.oranges, cells.greens),
            text = max + ":" + max,
            nv, nx, textX1, textX2, textX3;
        gс.save();
        gс.font = fs + "px fantasy";
        nw = gс.measureText(text).width + h;
        nx = (W - nw)/2;
        textX2 = nx + nw/2,
        textX1 = textX2 - h/4,
        textX3 = textX2 + h/4;
        gс.textBaseline = "middle";
        gс.fillStyle = "#5A1F00";
        gс.lineWidth = 5;
        gс.strokeStyle = "#FDE792";
        gс.fillRect(nx, rectY, nw, h);
        gс.strokeRect(nx, rectY, nw, h);
        gс.fillStyle = "#D1570D";
        gс.textAlign = "end";
        gс.fillText(cells.oranges, textX1, textY);
        gс.textAlign = "center";
        gс.fillStyle = "#FDE792";
        gс.fillText(":", textX2, textY);
        gс.textAlign = "start";
        gс.fillStyle = "#477725";
        gс.fillText(cells.greens, textX3, textY);
        gс.restore();
    };
    self.drawMessage = function (m) {
        self.msgOn = true;
        gс.save();
        gс.font = fs/2 + "px sans-serif";
        var nw = gс.measureText(m).width,
            nx = (W - nw)/2;
        gс.textBaseline = "middle";
        gс.fillStyle = "#5A1F00";
        gс.lineWidth = 5;
        gс.strokeStyle = "#FDE792";
        gс.fillRect(nx, rectY, nw + h/2, h);
        gс.strokeRect(nx, rectY, nw + h/2, h);
        gс.fillStyle = "#FDE792";
        gс.textAlign = "start";
        gс.fillText(m, nx + h/4, textY);
        gс.restore();
    };
}

function getEmptyArray(col, row) {
    var arr = [], i = 0, j;
    for ( ; i < col; i++ ) {
        arr[i] = new Array(row);
        for ( j = 0; j < row; ) { arr[i][j++] = 0; }
    }
    return arr;
}

function getTribeArray(col, row, cfill) {
    var initarr = getInitArray(col, row, cfill),
        arr = [],
        colarr;
    while ( initarr.length ) {
        colarr = initarr.splice(0, row);
        arr.push(colarr);
    }
    return arr;
}

function getInitArray(col, row, cfill) {
    var empty = (col * row) - maxLС,
        filled = new Array(maxLС),
        zeros = new Array(empty),
        arr, i;
    for ( i = 0; i < maxLС; ) { filled[i++] = cfill; }
    for ( i = 0; i < empty; ) { zeros[i++] = 0; }
    arr = filled.concat(zeros);
    return shuffle(arr);
}

function joinArrays(a, b) {
    var len = a[0].length,
        mid = new Array(len),
        j = 0;
    for ( ; j < len; ) { mid[j++] = 0; }
    return a.concat([mid], b);
}

// The Fisher-Yates (Knuth) shuffle algorithm
function shuffle(arr) {
    var i = arr.length, randi;
    while ( i ) {
        randi = Math.floor(Math.random() * (i--));
        arr[i] = [arr[randi], arr[randi] = arr[i]][0];
    }
    return arr;
}

