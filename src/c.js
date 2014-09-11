/* jshint strict: false */

b.onkeyup = function(e) {
    switch (e.keyCode) {
        case 32: onSpaceBarPress(); break;
        case 27: if ( !animation ) { init(true); } break;
        case 39: onArrowPress(); break;
        case 37: onArrowPress(); break;
        case 38: onArrowPress(); break;
        case 40: onArrowPress(); break;
    }
};

function onArrowPress() {
    if ( !animation && generation < maxGen ) {
        // showMustGoOn.onegen = true;
        if ( !generation ) {
            startGame();
        }else {
            nextGen();
        }
    }
}

function onSpaceBarPress() {
    if ( generation < maxGen ) {
        // showMustGoOn.onegen = false;
        if ( !generation ) {
            startGame(true);
        }else {
            console.log("onSpaceBarPress");
            showMustGoOn(true);
        }
    }
}

b.onmouseup = function(e) {
    if ( e.target.nodeName === "SPAN" ) {
        onSpanMouseUp(e);
    }else if ( e.target.nodeName === "CANVAS" ) {
        onCanvasMouseUp(e);
    }else if ( e.target.nodeName === "DIV" ) {
        switch ( e.target.id ) {
            case "apply":  applyConfig(); break;
            case "start":  gameInit(); break;
            case "generate": generateArr(); break;
            case "reset": resetArr(); break;
            default: return false;
        }
    }
};

grid.onmousedown = onCanvasMouseDown;
grid.onmousemove = onCanvasMouseMove;

function generateArr() {
    if ( bothtribes ) {
        orangeArr = getTribeArray(colHN, rowN, 1);
        greenArr = getTribeArray(colHN, rowN, 2);
        cellnum = checkCellNum(greenArr);
        drawStage(greenArr, "right");
        drawStage(orangeArr, "left");
        if ( gridOn ) { drawGrid(S, colN, rowN, "both"); }
    }else {
        orangeArr = getTribeArray(colHN, rowN, 1);
        drawStage(orangeArr, "left");
        cellnum.oranges = checkCellNum(orangeArr).oranges;
        if ( gridOn ) { drawGrid(S, colN, rowN, "left"); }
    }
}

function resetArr() {
    if ( bothtribes ) {
        orangeArr = getEmptyArray(colHN, rowN);
        greenArr = getEmptyArray(colHN, rowN);
        cellnum.greens = 0;
        cellnum.oranges = 0;
        drawStage(greenArr, "right");
        drawStage(orangeArr, "left");
        if ( gridOn ) { drawGrid(S, colN, rowN, "both"); }
    }else {
        orangeArr = getEmptyArray(colHN, rowN);
        drawStage(orangeArr, true);
        if ( gridOn ) { drawGrid(S, colN, rowN, "left"); }
    }
}

function applyConfig(e) {
    var ps = form.getElementsByTagName("p"),
        i = 0;
    for ( ; i < ps.length; i++ ) { ps[i].style.opacity = 1; }
    colN = +form.colnum.value;
    P = +form.popdens.value;
    maxGen = +form.gennum.value;
    gridOn = +form.showgrid.value;
    init();

}

function onSpanMouseUp(e) {
    var panel = document.getElementById(e.target.id.replace("nav", "pane")),
        i = 0;
    if ( hasClass(e.target, "inactive-btn") ) {
        for ( ; i < navbtns.length; i++ ) {
            addClass(navbtns[i], "inactive-btn");
        }
        remClass(e.target, "inactive-btn");
        for ( i = 0; i < panels.length; i++ ) {
            addClass(panels[i], "hidden");
        }
        remClass(panel, "hidden");
    }
}

function onCanvasMouseUp(e) {
    dragging = false;
}

function onCanvasMouseDown(e) {
    dragging = true;
    onCanvasMouseMove(e);
}

function onCanvasMouseMove(e) {
    if ( dragging && !generation ) {
        var mouse = getPointerPos(e.target, e),
            i = Math.floor(mouse.x/S),
            j = Math.floor(mouse.y/S);
        if ( mouse.x < halfW ) {
            if ( !(cache.oranges.i === i && cache.oranges.j === j) ) {
                orangeArr[i][j] = ( orangeArr[i][j] ) ? 0 : 1;
                if ( orangeArr[i][j] ) {
                    cellnum.oranges++;
                    if ( cellnum.oranges > maxLС ) {
                        cellnum.oranges--;
                        orangeArr[i][j] = 0;
                    }
                }else {
                    cellnum.oranges--;
                }
                cache.oranges.i = i;
                cache.oranges.j = j;
                drawStage(orangeArr, "left");
            }
        }else if ( bothtribes && mouse.x > halfW + S ) {
            i -= colHN + 1;
            if ( !(cache.greens.i === i && cache.greens.j === j) ) {
                greenArr[i][j] = ( greenArr[i][j] ) ? 0 : 2;
                if ( greenArr[i][j] ) {
                    cellnum.greens++;
                    if ( cellnum.greens > maxLС ) {
                        cellnum.greens--;
                        greenArr[i][j] = 0;
                    }
                }else {
                    cellnum.greens--;
                }
                cache.greens.i = i;
                cache.greens.j = j;
                drawStage(greenArr, "right");
            }
        }
    }
}

function getCellCoord(mouse) {
    var i = Math.round(mouse.x/S),
        j = Math.round(mouse.y/S);
}

function hasClass(el, cls) {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
}

function addClass(el, cls) {
    if ( hasClass(el, cls) ) { return; }
    el.className += " " + cls;
}

function remClass(el, cls) {
    el.className = el.className.replace(" " + cls, "");
}

function getPointerPos(c, e) {
    var bcr = c.getBoundingClientRect();
    return {
        x: e.pageX - bcr.left,
        y: e.pageY - bcr.top
    };
}

function pointInRect (point, rect) {
    return inRange(point.x, rect.x, rect.x + rect.w) && inRange(point.y, rect.y, rect.y + rect.h);
}

function inRange (value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
}

init();