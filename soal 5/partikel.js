/*
	 UTS
	 soal nomor 5
	 Puji Syukri Ilahi
	 10215079
*/
 
//Define particle 1 parameter
var m1, D1, x1, y1, vx1, vy1, cL1, cF1;

//Define particle 2 parameter
var m2, D2, x2, y2, vx2, vy2, cL2, cF2;

//Define force parameter
var kN;

// Define global variables for simulation
var tstep, tbeg, tend, tdata, tproc, proc, t, Ndata, idata;

// Define global variables for coordinates
var xmin, ymin, xmax, ymax, XMIN, YMIN, XMAX, YMAX;

// Define global variables for visual elements
var h1, h3, taIn, caOut, taOut0;
var btClear, btLoad, btRead, btStart;

//excute main function
main();

//define main function
function main(){
	//create and arrange elements
	setElementsLayout();
	
	//initialize parameters
	initParams();
}

// Initialize all parameters
function initParams() {
	
	// Initialize simulation parameters
	t = tbeg;
	Ndata = Math.floor(tdata / tstep);
	idata = Ndata;
	
	//set color of m1 and m2
	cL1 ="#f00";
	cF1 ="#fcc";
	cL2 ="#00f";
	CF2 ="#ccf";
	
}

// Perform simulation
function simulate() {
	// Verbose result each tdata period
	if(idata == Ndata) {
		var digit = -Math.floor(Math.log10(tdata));
		var tt = t.toExponential(digit-2);
		
		// Display header for first run
		if(t == tbeg) {
			tout(taOut0, "# t	x1	y1	vx1	vy1	x2	y2	vx2	vy2	\n");
			//
		}
		
		tout(taOut0,
			tt + " "
			+ x1.toFixed(digit + 1) + "\t"
			+ y1.toFixed(digit + 1) + "\t"
			+ vx1.toFixed(digit + 1) + "\t"
			+ vy1.toFixed(digit + 1) + "\t"
			+ x2.toFixed(digit + 1) + "\t"
			+ y2.toFixed(digit + 1) + "\t"
			+ vx2.toFixed(digit + 1) + "\t"
			+ vy2.toFixed(digit + 1) + "\n"
		);		
		
		if(t >= tend) {
			tout(taOut0, "\n");
		}
		
	//display mass position of canvas
	clearCanvas(caOut);
	drawSystem(x1,y1,0.5*D1,cL1,cF1,caOut);
	drawSystem(x2,y2,0.5*D2,cL2,cF2,caOut);
	
	idata = 0;
	}
	//calculate overlap
	var r1 = Math.sqrt(x1*x1 + y1*y1);
	var vr1 = Math.sqrt(vx1*vx1 + vy1*vy1);
	var r2 = Math.sqrt(x2*x2 + y2*y2);
	var vr2 = Math.sqrt(vx2*vx2 + vy2*vy2);
	
	var l12 = Math.abs(r1-r2);
	var ri = Math.max(0, 0.5*(D1+D2)-l12);
	var ridot = -Math.abs(vr1-vr2)*Math.sign(ri);
	
	//calculate normal force
	var m = (m1*m2/(m1+m2));
	var w = Math.sqrt(kN/m)
	var F1 = (m1*w*w*ri)*(-1);
	var F2 = (m2*w*w*ri);
	
	var Fx1 = (x1*F1/r1);
	var Fy1 = (y1*F1/r1);
	var Fx2 = -(x2*F2/r2);
	var Fy2 = -(y2*F2/r2);
	
	//use newton 2nd law of motion
	var ax1 = Fx1/m;
	var ay1 = Fy1/m;
	var ax2 = Fx2/m;
	var ay2 = Fy2/m;
	
	//implement euler method
	vx1 = vx1 +ax1*tstep;
	vy1 = vy1 +ay1*tstep;
	x1 = x1 +vx1*tstep;
	y1 = y1 +vy1*tstep;
	
	vx2 = vx2 +ax2*tstep;
	vy2 = vy2 +ay2*tstep;
	x2 = x2 +vx2*tstep;
	y2 = y2 +vy2*tstep;
	
	// Stop simulation
	if(t >= tend) {
		btStart.innerHTML = "Start";
		btStart.disabled = true;
		btRead.disabled = false;
		taIn.disabled = false;
		clearInterval(proc);
	} else {
	t += tstep;
	idata++;
	}
}

// Clear all
function clearAll() {
	taIn.value = "";
	taOut0.value = "";
	clearCanvas();
}

function clearCanvas() {
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);	
}

//display mass position of canvas
function drawSystem(x,y,R,cLine,cFill,caOut){
	var cx = caOut.getContext("2d");
	
	//draw mass
	var RR = tx(2*R)-tx(R);
	cx.beginPath();
	cx.strokeStyle =cLine;
	cx.lineWidth = 4;
	cx.arc(tx(x), ty(y), RR, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = cFill;
	cx.fill();
	
	//transform x from real coordinate to canvas cordinate
	function tx(x){
		var xx = (x-xmin)/(xmax-xmin)*(XMAX-XMIN)+XMIN;
		return xx;
	}
	
	//transform y from real coordinate to canvas cordinate
	function ty(y){
		var yy = (y-ymin)/(ymax-ymin)*(YMAX-YMIN)+YMIN;
		return yy;
	}
}

// Set layout of all elements
function setElementsLayout() {
	//creare text with style h1
	h1 = document.createElement("h1");
	h1.innerHTML = "UTS | Soal nomor 5";
	h3 = document.createElement("h3");
	h3.innerHTML = "Simulasi Gerak 2 Partikel dalam Potensial Osilator Harmonik";	
	// Create input textarea
	taIn = document.createElement("textarea");
	taIn.style.width = "150px";
	taIn.style.height = "390px";
	taIn.style.overflowY = "scroll"
	taIn.style.float = "left";
	
	// Create output canvas
	caOut = document.createElement("canvas");
	caOut.width = "540";
	caOut.height = "196";
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "left";
	caOut.style.border = "#aaa 1px solid";
	caOut.style.paddingRight = "2px";
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
	XMIN = 0;
	YMIN = caOut.height;
	XMAX = caOut.width;
	YMAX = 0;
	
	// Create ouput textarea 
	taOut0 = document.createElement("textarea");
	taOut0.style.width = "538px";
	taOut0.style.height = "192px"
	taOut0.style.overflowY = "scroll";
	taOut0.style.float = "left";
	
	// Create buttons
	btClear = document.createElement("button");
	btClear.innerHTML = "Clear";
	btClear.style.width = "70px";
	btClear.addEventListener("click", buttonClick);

	btLoad = document.createElement("button");
	btLoad.innerHTML = "Load";
	btLoad.style.width = "70px";
	btLoad.addEventListener("click", buttonClick);
	
	btRead = document.createElement("button");
	btRead.innerHTML = "Read";
	btRead.style.width = "70px";
	btRead.disabled = true;
	btRead.addEventListener("click", buttonClick);

	btStart = document.createElement("button");
	btStart.innerHTML = "Start";
	btStart.style.width = "70px";
	btStart.disabled = true;
	btStart.addEventListener("click", buttonClick);
	
	// Create main division
	var div0 = document.createElement("div");
	div0.style.border = "#aaa 1px solid";
	div0.style.width = 82
		+ parseInt(taIn.style.width)
		+ parseInt(caOut.style.width) + "px";
	div0.style.height = 6
		+ parseInt(taIn.style.height) + "px";
	div0.style.background = "#eee";
	
	// Create button division
	var div1 = document.createElement("div");
	div1.style.width = "70px";
	div1.style.height = (105 + 290) + "px";
	div1.style.float = "left";
	div1.style.border = "#aaa 1px solid";
	
	// Create control division
	var div2 = document.createElement("div");
	div2.style.width = "70px";
	div2.style.height = "130px";
	div2.style.border = "#aaa 1px solid";
	div2.style.textAlign = "center";
	
	// Set layout of visual components
	document.body.append(h1);
	document.body.append(h3);
	document.body.append(div0);
		div0.append(taIn);
		div0.append(div1);
			div1.append(btClear);
			div1.append(btLoad);
			div1.append(btRead);
			div1.append(btStart);
		div0.append(caOut);
		div0.append(taOut0);
}

// Do something when buttons clicked
function buttonClick() {
	// Get target and verbose to taOut1
	var target = event.target;
	var cap = target.innerHTML;
	
	// Perform according to the clicked button
	if(cap == "Load") {
		loadParameters(taIn);
		btRead.disabled = false;
	} else if(cap == "Clear") {
		clearAll();
		btRead.disabled = true;
		btStart.disabled = true;
	} else if(cap == "Read") {
		readParameters(taIn);
		initParams();
		clearCanvas();
		drawSystem(x1,y1,0.5*D1,cL1,cF1,caOut);
		drawSystem(x2,y2,0.5*D2,cL2,cF2,caOut);
		btStart.disabled = false;
	} else if(cap == "Start") {
		target.innerHTML = "Stop";
		btRead.disabled = true;
		taIn.disabled = true;
		proc = setInterval(simulate, tproc);
	} else if(cap == "Stop") {
		target.innerHTML = "Start";
		btRead.disabled = false;
		taIn.disabled = false;
		clearInterval(proc);
	} 
}

// Load parameters to textarea
function loadParameters() {
	var lines = "";
	lines += "# Parameters particle 1\n";

	lines += "x1 -0.01\n";     // initial position of particle 1 in x-axis
	lines += "y1 -0.005\n";     // initial position of particle 1 in y-axis
	lines += "vx1 0.1\n";     // initial velocity of particle 1 in x-axis
	lines += "vy1 0.1\n";     // initial velocity of particle 1 in y-axis
	lines += "m1 0.01\n";     // particle mass 1
	lines += "D1 0.001\n\n";     // particle diameter 1

	lines += "# Parameters particle 2\n";
	
	lines += "x2 0.01\n";     // initial position of particle 2 in x-axis
	lines += "y2 0.005\n";     // initial position of particle 2 in y-axis
	lines += "vx2 -0.1\n";     // initial velocity of particle 2 in x-axis
	lines += "vy2 -0.1\n";     // initial velocity of particle 2 in y-axis	
	lines += "m2 0.01 \n";    // particle mass 2
	lines += "D2 0.001\n\n";     // particle diameter 2

	lines += "# Force Parameters \n";
	
	lines += "kN 1000\n";    // Force Constant N/m

	lines += "\n";
	lines += "# Coordinates\n"; 
	lines += "xmin -0.02\n";   // xmin             m
	lines += "ymin -0.01\n";   // ymin             m
	lines += "xmax 0.02\n";    // xmax             m
	lines += "ymax 0.01\n";    // ymax             m
	
	lines += "\n";
	lines += "# Simulation\n";
	lines += "TSTEP 0.0001\n";   // Time step        s
	lines += "TBEG 0\n";        // Initial time     s
	lines += "TEND 2\n";        // Final time       s
	lines += "TDATA 0.001\n";    // Data period      s
	lines += "TPROC 1\n";       // Event period     ms
		
	var ta = arguments[0];
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = arguments[0].value;
	
	// Get parameters particle 1 information
	x1 = getValue(lines, "x1");
	y1 = getValue(lines, "y1");
	vx1 = getValue(lines, "vx1");
	vy1 = getValue(lines, "vy1");
	m1 = getValue(lines, "m1");
	D1 = getValue(lines, "D1");

	// Get parameters particle 2 information	
	x2 = getValue(lines, "x2");
	y2 = getValue(lines, "y2");
	vx2 = getValue(lines, "vx2");
	vy2 = getValue(lines, "vy2");
	m2 = getValue(lines, "m2");
	D2 = getValue(lines, "D2");	

	//force parameter
	kN = getValue(lines, "kN");
	
	// Get simulation information
	tstep = getValue(lines, "TSTEP");
	tbeg = getValue(lines, "TBEG");
	tend = getValue(lines, "TEND");
	tdata = getValue(lines, "TDATA");
	tproc = getValue(lines, "TPROC");	
	
	//Drawing area information
	xmin = getValue(lines, "xmin")
	ymin = getValue(lines, "ymin");
	xmax = getValue(lines, "xmax");
	ymax = getValue(lines, "ymax");
}

// Get value from a line inside parameter textarea
function getValue(lines, key) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[1]);
		}
	}
	return value;
}

// Display text in an output textarea
function tout() {
	var taOut = arguments[0];
	var msg = arguments[1];
	taOut.value += msg;
	taOut.scrollTop = taOut.scrollHeight;
}
