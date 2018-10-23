var locs = [];
var numlocs;
var pointSize;
var currDist;
var bestDist;
var bestPath = [];

function setup()
{
	createCanvas(600, 600);
	numlocs = 5;
	pointSize = 10;
	bestDist = 0;
	currDist = 0;
	for (var i = 0; i < numlocs; i++) {
		locs.push(createVector(random(width), random(height)));
	}
}

function draw()
{
	background(0);
	calcDist();
	showPoints();
	drawPath();
	showText();
	changeLoc();
}

function showPoints()
{
	fill(255);
	for (var i = 0; i < bestPath.length; i++) {
		ellipse(bestPath[i].x, bestPath[i].y, pointSize, pointSize);
	}
}

function drawPath()
{
	stroke(255);
	for (var i = 0; i < bestPath.length - 1; i++) {
		line(bestPath[i].x, bestPath[i].y, bestPath[i+1].x, bestPath[i+1].y);
	}
}

function calcDist()
{
	currDist = 0;
	for (var i = 0; i < locs.length - 1; i++) {
		currDist += dist(locs[i].x, locs[i].y, locs[i+1].x, locs[i+1].y);
	}

	if (currDist < bestDist || bestDist === 0) {
		bestDist = (floor(currDist * 1000))/1000; //rounds down to 3 digits
		bestPath = locs.slice();
	}
}

// Assumes numlocs is > 2
function changeLoc()
{
	swap(0, floor(random(1,numlocs)));
}

function swap(index1, index2)
{
	var temp = locs[index1];
	locs[index1] = locs[index2];
	locs[index2] = temp;
}

function showText()
{
	fill(225, 55);
	textSize(15);
	text("Best distance: " + bestDist, 35, 35);
}
