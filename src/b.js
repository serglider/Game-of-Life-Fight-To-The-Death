/* jshint strict: false */

function gameInit() {
    addClass(pane, "hidden");
    if ( gridOn ) { drawGrid(S, colN, rowN, "both"); }
    drawStage(greenArr, "right");
    drawStage(orangeArr, "left");
    informer.drawMessage("Hit the spacebar or any arrowes when you're done.");
    mTimeout = setTimeout(function () {
        informer.msgOn = false;
        if ( gridOn ) {
            if ( gridOn ) { drawGrid(S, colN, rowN, "both"); }
        }else {
            gс.clearRect(0, 0, W, H);
        }
    }, 1000);
}

function startGame(anim) {
    bf1 = getEmptyArray(colN, rowN);
    bf2 = joinArrays(orangeArr, greenArr);
    if ( gridOn ) { drawGrid(S, colN, rowN ); }
    drawStage(bf2);
    mTimeout = setTimeout(function () {
        console.log(anim);
        showMustGoOn(anim);
    }, 1000);
}

function drawStage(arr, half) {
    var len = arr.length,
        i = 0, j, add = 0;
    if ( half === "right" ) {
        add = halfW + S;
    }
    for ( ; i < len; i++ ) {
        for ( j = 0; j < rowN; j++ ) {
            drawCell(add + i*S, j*S, arr[i][j]);
        }
    }
}

function drawGrid(s, nw, nh, half) {
    var w = ( half ) ? halfW : W,
        nwh = ( half ) ? colHN + 1 : nw + 1,
        m, add, i = 0;
    gс.strokeStyle = CLRS[3];
    gс.clearRect(0, 0, W, H);
    for ( ; i < nwh; i++ ) {
        m = i * s;
        drawLine(m, 0, m, H);
    }
    for ( i = 0; i < nh + 1; i++ ) {
        m = i * s;
        drawLine(0, m, w, m);
    }
    if ( half === "both" ) {
        add = halfW + S;
        for ( i = 0; i < nwh; i++ ) {
            m = add + i * s;
            drawLine(m, 0, m, H);
        }
        for ( i = 0; i < nh + 1; i++ ) {
            m = i * s;
            drawLine(add, m, add + w, m);
        }
    }
}

function drawLine(sx, sy, fx, fy) {
    gс.beginPath();
    gс.moveTo(sx, sy);
    gс.lineTo(fx, fy);
    gс.stroke();
}

function drawCell(x, y, t) {
    c.fillStyle = CLRS[t];
    c.fillRect(x, y, S, S);
}

function showMustGoOn(anim) {
    if ( informer.msgOn ) {
        clearTimeout(mTimeout);
        informer.msgOn = false;
        if ( gridOn ) {
            drawGrid(S, colN, rowN );
        }else {
            gс.clearRect(0, 0, W, H);
        }
    }
    // if ( bothtribes ) {
    //     bothtribes = !bothtribes;
    //     startGame(500);
    //     return;
    // }
    if ( !anim ) {
        console.log("nextGen");
        nextGen();
    }else {
        animation = !animation;
        if ( animation ) { requestAnimationFrame(nextGen); }
    }
}

function nextGen() {
    var i = 0, j;
    for ( ; i < colN; i++ ) {
        for ( j = 0; j < rowN; j++ ) {
            bf1[i][j] = calcState(i, j);
            drawCell(i*S, j*S, bf1[i][j]);
        }
    }
    bf1 = [bf2, bf2 = bf1][0];   // swap the arrays
    generation++;

    if ( animation ) {
        if ( checking ) {
            if ( bf2.check ) {
                animation = checkjson !== JSON.stringify(bf2);
                bf2.check = false;
            }
            if ( generation%25 === 0 ) {
                animation = checkCellNum(bf2, true);
                bf2.check = true;
                checkjson = JSON.stringify(bf2);
            }
            if ( !animation ) { displayResults(); }
        }
        if ( generation >= maxGen ) {
            animation = !animation;
            displayResults();
        }else {
            requestAnimationFrame(nextGen);
        }
    }else {
        if ( generation >= maxGen ) {
            displayResults();
        }
    }
}

function checkState() {
    cellnum = checkCellNum(bf2);
    informer.drawScore(cellnum);
}

function displayResults() {
    cellnum = checkCellNum(bf2);
    informer.drawScore(cellnum);
}

function checkCellNum(arr, check) {
    var len = arr.length,
        i = 0, j,
        obj = {
            dead: 0,
            oranges: 0,
            greens: 0
        };
    for ( ; i < len; i++ ) {
        for ( j = 0; j < rowN; j++ ) {
            if ( arr[i][j] ) {
                if ( arr[i][j] === 1 ) {
                    obj.oranges++;
                }else {
                    obj.greens++;
                }
            }else {
                obj.dead++;
            }

        }
    }
    if ( check ) {
        return !!obj.oranges && !!obj.greens;
    }
    return obj;
}

function calcState(i,j) {

    // The battlefield essentially is a torus.
    var mi = ( i-1 < 0 ) ? colN-1 : i-1,
        pi = ( i+1 > colN-1 ) ? 0 : i+1,
        mj = ( j-1 < 0 ) ? rowN-1 : j-1,
        pj = ( j+1 > rowN-1 ) ? 0 : j+1,
    // all the neighbours are welcome to the special array
        neighbours = [
            bf2[mi][mj],
            bf2[mi][j],
            bf2[mi][pj],
            bf2[i][mj],
            bf2[i][pj],
            bf2[pi][mj],
            bf2[pi][j],
            bf2[pi][pj]
        ],
        zerro = 0, ones = 0, twos = 0, z = 0, alive;
    for ( ; z<8; z++ ) {
        if ( neighbours[z] ) {
            if ( neighbours[z]===1 ) {
                ones++;
            }else {
                twos++;
            }
        }else {
            zerro++;
        }
    }
    alive = ones + twos;
    // usual rules of the Conway's Game Of Life

    if ( bf2[i][j] ) {
        return ( alive<2 || alive>3 ) ? 0 : bf2[i][j];
    }
    //but if the dead cell was made to came to life, it appears as a member of the predominant (in the neighbourhood) tribe
    return ( alive!==3 ) ? 0 : ( twos > ones ) ? 2 : ( ones > twos ) ? 1 : (Math.floor(Math.random()+0.5));
}