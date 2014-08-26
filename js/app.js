drawStage(myC, true);

// function init() {
//     var i = 0,
//         t = 1,  //"tribes" are represented by "ones" and "twos"
//         j;
//     C = [];
//     N = [];
//     for ( ; i<NW; i++ ) {
//         C[i] = [];
//         N[i] = [];
//         if ( i > NW/2-1 ) { t = 2; } // next half for another tribe
//         for ( j = 0; j<NH; j++ ) {
//             C[i][j] = ( Math.random() > P) ? 0 : t;
//             N[i][j] = 0;
//             drawCell(i*S, j*S, C[i][j]);
//         }
//     }
//     if ( GO ) { drawGrid(S, NW, NH); }
// }

function drawStage(arr, half) {
    var len = arr.length,
        i = 0, j;
    for ( ; i < len; i++ ) {
        for ( j = 0; j<NH; j++ ) {
            drawCell(i*S, j*S, arr[i][j]);
        }
    }
    if ( GO ) { drawGrid(S, NW, NH, half); }
}

function drawGrid(s, nw, nh, half) {
    var w = ( half ) ? HW : W;
    var nwh = ( half ) ? HNW + 1 : nw + 1;
    var m, i = 0;
    gс.strokeStyle = CLRS[3];
    for ( ; i < nwh; i++ ) {
        m = i * s;
        drawLine(m, 0, m, H);
    }
    for ( i = 0; i < nh + 1; i++ ) {
        m = i * s;
        drawLine(0, m, w, m);
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

function showMustGoOn() {
    AN = !AN;
    if ( AN ) { requestAnimationFrame(generation); }
    function generation() {
        var m = 0, n;
        for ( ; m<NW; m++ ) {
            for ( n = 0; n<NH; n++ ) {
                N[m][n] = calcState(m, n);
                drawCell(m*S, n*S, N[m][n]);
            }
        }
        N = [C, C = N][0];   // swap the arrays
        if ( AN ) { requestAnimationFrame(generation); }
    }
}

function calcState(i,j) {

    // The battlefield essentially is a torus.
    var mi = ( i-1 < 0 ) ? NW-1 : i-1,
        pi = ( i+1 > NW-1 ) ? 0 : i+1,
        mj = ( j-1 < 0 ) ? NH-1 : j-1,
        pj = ( j+1 > NH-1 ) ? 0 : j+1,
    // all the neighbours are welcome to the special array
        neighbours = [
            C[mi][mj],
            C[mi][j],
            C[mi][pj],
            C[i][mj],
            C[i][pj],
            C[pi][mj],
            C[pi][j],
            C[pi][pj]
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
    if ( C[i][j] ) {
        return ( alive<2 || alive>3 ) ? 0 : C[i][j];
    }
    //but if the dead cell was made to came to life, it appears as a member of the predominant (in the neighbourhood) tribe
    return ( alive!==3 ) ? 0 : ( twos > ones ) ? 2 : ( ones > twos ) ? 1 : (Math.floor(Math.random()+0.5));
}