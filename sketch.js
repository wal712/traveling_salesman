var locs = [];
var numlocs;
var pointSize;
var currDist;
var bestDist;
var bestPath = [];
var locsOrder = [];
var numIter;

function setup() {
        createCanvas(600, 600);
        numlocs = 4;
        pointSize = 10;
        bestDist = 0;
        currDist = 0;
	numIter = 0;
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
	lexOrder();
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
	/* Largest x such that locsOrder[x] < locsOrder[x+1] */
	var largestX = -1;
	for (var i = 0; i < locsOrder.length - 1; i++) {

		if (locsOrder[i] < locsOrder[i+1]) {
			largestX = i;
		}
	}
	if (largestX === -1) { // order is finished
		console.log("finished");
		noLoop();
		return;
	} else {
		// console.log(locsOrder);
		// console.log("Largest X is: " + largestX);
	}

	var largestY = -1;
	/* Largest y such that locsOrder[largestX] < locsOrder[y] */
	for (var i = 0; i < locsOrder.length; i++) {
		if (locsOrder[largestX] < locsOrder[i]) {
			largestY = i;
		}

	}

	swap(locsOrder, largestX, largestY);

	/* Reverse locsOrder[largestX + 1...end] */
	var temp = locsOrder.splice(largestX + 1);
	temp.reverse();
	locsOrder = locsOrder.concat(temp);
	numIter++;
	console.log("#" + numIter + " : " + locsOrder);

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
