b.onkeyup = function(e) {
    switch (e.keyCode) {
        case 32: showMustGoOn(); break;
        case 39: if ( !AN ) { NW+=6; init(); } break;
        case 37: if ( !AN ) { NW-=6; init(); } break;
        case 38: if ( !AN ) { P+=0.02; init(); } break;
        case 40: if ( !AN ) { P-=0.02; init(); } break;
    }
};

b.onmouseup = function(e) {
    if ( e.target.nodeName === "SPAN" ) {
        onSpanMouseUp(e);

    }else if ( e.target.nodeName === "CANVAS" ) {
        onCanvasMouseUp(e);
    }else if ( e.target.nodeName === "DIV" ) {
        if ( e.target.id === "apply" ) {
            applyConfig();
        }

    }
};
grid.onmousedown = onCanvasMouseDown;
grid.onmousemove = onCanvasMouseMove;

function applyConfig(e) {
    NW = +form.colnum.value;
    P = +form.popdens.value;
    GEN = +form.gennum.value;
    GO = +form.showgrid.value;
    init();
    drawStage(myC, true);
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
    if ( dragging ) {
        var mouse = getPointerPos(e.target, e),
            i = Math.floor(mouse.x/S),
            j = Math.floor(mouse.y/S);
        form.livecells.value = mouse.x + " | " + mouse.y;
        console.log(i);
         console.log(prevCellCache.i);
        if ( !(prevCellCache.i === i && prevCellCache.j === j) ) {
            myC[i][j] = ( myC[i][j] ) ? 0 : 1;
            prevCellCache.i = i;
            prevCellCache.j = j;
            drawStage(myC, true);
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