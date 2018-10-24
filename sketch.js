var locs = [];
var numlocs;
var pointSize;
var currDist;
var bestDist;
var bestPath = [];
var locsOrder = [];

function setup() {
        createCanvas(600, 600);
        numlocs = 4;
        pointSize = 10;
        bestDist = 0;
        currDist = 0;
        for (var i = 0; i < numlocs; i++) {
                locs.push(createVector(random(width), random(height)));
		locsOrder[i] = i;
        }
}

function draw() {
        background(0);
        calcDist();
        showPoints();
        drawPath();
        showText();
        changeLoc();
}

function showPoints() {
        fill(255);
        for (var i = 0; i < bestPath.length; i++) {
                ellipse(bestPath[i].x, bestPath[i].y, pointSize, pointSize);
        }
}

function drawPath() {
        stroke(255);
        for (var i = 0; i < bestPath.length - 1; i++) {
                line(bestPath[i].x, bestPath[i].y, bestPath[i + 1].x, bestPath[i + 1].y);
        }
}

function calcDist() {
        currDist = 0;
        for (var i = 0; i < locs.length - 1; i++) {
                currDist += dist(locs[i].x, locs[i].y, locs[i + 1].x, locs[i + 1].y);
        }

        if (currDist < bestDist || bestDist === 0) {
                bestDist = (floor(currDist * 1000)) / 1000; //rounds down to 3 digits
                bestPath = locs.slice();
        }
}

/*
 * Lexocographic order algorithm
 * Using: https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering#
 */
function lexOrder() {
	
}

// Assumes numlocs is > 2
function changeLoc() {
        swap(locs, 0, floor(random(1, numlocs)));
}

function swap(a, index1, index2) {
        var temp = a[index1];
        a[index1] = a[index2];
        a[index2] = temp;
}

function showText() {
        fill(225, 55);
        textSize(15);
        text("Best distance: " + bestDist, 35, 35);
}
