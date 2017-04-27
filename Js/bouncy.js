//this is a js file

// This is a js file

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//set up some data holders for the dots

var dotSize = 10;
var dotsAdded = 0;
var xCoordList = new Array();
var yCoordList = new Array();
var dotColorList = new Array();
var dxList = new Array();
var dyList = new Array();

var rect = canvas.getBoundingClientRect();
	var canvasWidth = rect.right - rect.left;
	var canvasHeight = rect.bottom - rect.top;

alert("Hi canvas width and height are" + canvasWidth + ", " + canvasHeight); 

var listOfColors = ["Indigo", "Aquamarine", "Azure", "AliceBlue", "Black", "BlueViolet", 
"GreenYellow", "LightCoral", "LightGreen", "MediumPurple", "Gold"];

var totalColors = listOfColors.length;

var id = setInterval(frame, 5);
 


function moveDots() {
	for (var whatDot = 0; whatDot < xCoordList.length; whatDot++ ) {
	xCoordList[whatDot] = xCoordList[whatDot] + dxList[whatDot];
	yCoordList[whatDot] = yCoordList[whatDot] + dyList[whatDot];
	
	if(dxList[whatDot] < 0) {
		if(xCoordList[whatDot] < 0 ) {
			xCoordList[whatDot] = 5;
			dxList[whatDot] *= -1;
		}
	} else {
		// This is for right side... 
		if(xCoordList[whatDot] > canvasWidth ) {
			xCoordList[whatDot] = canvasWidth - 5;
			dxList[whatDot] *= -1;
		}
	} 

	if(dyList[whatDot] < 0 ) {
		if(yCoordList[whatDot] < 0) {
			yCoordList[whatDot] = 5;
			dyList[whatDot] *= -1;
		}
	} else {
		// This is for right side... 
		if(yCoordList[whatDot] > canvasHeight) {
			yCoordList[whatDot] = canvasHeight - 5;
			dyList[whatDot] *= -1;
		}
	} 
}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
function addClick(x,y) {
	xCoordList.push(x);
	yCoordList.push(y);
	var randomColor = Math.floor(Math.random() * totalColors);
	dotColorList.push(randomColor);
	var myDX = (Math.floor(Math.random() *7))-3;
	if ( myDX === 0) {
		myDX = 1;
	}
	var myDY = (Math.floor(Math.random() *7))-3;
	if (myDY === 0) {
		myDY = 1;
	}
	dxList.push(myDX);
	dyList.push(myDY);
	// this is added for bounce checking Nailuj Gany Yang Julian
	
}


function redraw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); 

	for(var i=0; i < xCoordList.length; i++) {

		context.beginPath(); 
			context.ellipse(xCoordList[i], yCoordList[i], dotSize, dotSize, 0, 0, Math.PI*2);
			// context.fillStyle = "red";

		var whatColorNumber = dotColorList[i]

			var myColor = listOfColors[whatColorNumber];
			context.fillStyle = myColor;
			context.fill();
		context.closePath();

	}
}


canvas.addEventListener('mousedown',function(event) {
	
	var mousePos = getMousePos(canvas, event);
	var message = 'Mouse Down position: ' + mousePos.x + ',' + mousePos.y 
	  ;

	 addClick(mousePos.x, mousePos.y);
	 redraw();
	 console.log(message);

}, false);

function frame() {
	moveDots();
	redraw();
}
