var locs = []; // Array of random locations
var numlocs; // Number of random locations
var pointSize;
var currDist; // Distance of current path in Lexocographic order
var bestDist; // Best distance found so far
var bestGenDist; // best distance found by genetic algo so far
var bestPath = [];
var bestGenPath = []; // Array of best order for path found by genetic algo
var locsOrder = []; // Order for locations in Lexocographic order computation
var numIter; // Number in order of current Lexocographic permutation
var numPop;
var population = []; // Array of orders for genetic algorithm
var fitness = []; // Array of fitness values of population

function setup() {
        createCanvas(600, 600);
        numlocs = 5;
        pointSize = 10;
        bestDist = 0;
        bestGenDist = Infinity;
        currDist = 0;
        numIter = 0;
        numPop = 10;
        for (var i = 0; i < numlocs; i++) {
                locs.push(createVector(random(width), random(height)));
                locsOrder.push(i);
        }

        for (var i = 0; i < numPop; i++) {
                population[i] = locsOrder.slice();
                population[i] = shuffle(population[i]);
                var d = calcDist(locs, population[i]);
                if (d < bestGenDist) {
                        bestGenDist = d;
                        bestGenPath = population[i];
                }
                fitness[i] = d;
        }
        console.log(population);
        console.log(fitness);
        console.log(bestGenDist);
}

function draw() {
        background(0);
        showPoints(locs);
        drawPath(locs, bestGenPath);
}

function showPoints(a) {
        fill(255, 55);
        for (var i = 0; i < a.length; i++) {
                ellipse(locs[i].x, locs[i].y, pointSize, pointSize);
        }
}

function drawPath(a, order) {
        stroke(255, 55);
        for (var i = 0; i < order.length - 1; i++) {
                line(a[order[i]].x, a[order[i]].y, a[order[i + 1]].x, a[order[i + 1]].y);
        }
}

function calcDist(a, order) {
        var tempdist = 0;
        for (var i = 0; i < order.length - 1; i++) {
                tempdist += dist(a[order[i]].x, a[order[i]].y, a[order[i+1]].x, a[order[i+1]].y);
        }
        return tempdist;
}

function calcLexDist() {
        currDist = 0;
        for (var i = 0; i < locsOrder.length - 1; i++) {
                currDist += dist(locs[locsOrder[i]].x, locs[locsOrder[i]].y, locs[locsOrder[i + 1]].x, locs[locsOrder[i + 1]].y);
        }

        if (currDist < bestDist || bestDist === 0) {
                bestDist = (floor(currDist * 1000)) / 1000; //rounds down to 3 digits
                bestPath = locsOrder.slice();
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

                if (locsOrder[i] < locsOrder[i + 1]) {
                        largestX = i;
                }
        }
        if (largestX === -1) { // order is finished
                console.log("finished");
                //console.log(bestPath);
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

}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * Taken from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
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

function fact(n) {
        var result = n;
        for (var i = n - 1; i > 0; i--) {
                result *= i;
        }
        return result;
}

function showLexText() {
        fill(225);
        textSize(15);
        text("Best distance: " + bestDist, 35, 35);

        var pct = floor((((numIter + 1) / fact(numlocs)) * 100) * 1000) / 1000;
        text("% finished: " + pct, 35, 65);
}
