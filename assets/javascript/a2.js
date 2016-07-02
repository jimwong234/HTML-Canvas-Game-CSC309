/*    INDEX:     
 *  Callback function: line 329
 *  Objects defined: line 358 
 *   */

$(document).ready(function(){
	//hide the all pages except for start page at the beginning
	//@@get rid after finish: code on purpose of testing
	
	$("canvas").hide();
	$("#game_page").hide();
	showTopScores();
	$("#start_button").click(
		function(){
			//hide start page when button is clicked
			$("#start_page").hide();
			//show canvas
			$("canvas").show();
			write = false;
			//set timer when game starts.
			t = setInterval(decrementCounter,1000);
		});
});


//draw canvas framework
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 200;
var objectsNum = 10;
var seconds = 60;
//timer variable
var t;
//Current game level (initial value=1)
var level = 1;
//scorelist used to store and retreive user's scores

//localStorage.setItem("scorelist",JSON.stringify(scorelist));

/* Objects --> */

//#1)spaceship 50px*50px --> //
var spaceship = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		//spaceship body
	    ctx.save();
	    ctx.translate(this.x,this.y);
	    ctx.beginPath();
	    ctx.moveTo(-10,15);
	    ctx.lineTo(10,15);
	    ctx.lineTo(10,45);
	    ctx.lineTo(-10,45);
	    ctx.closePath();
	    ctx.stroke();
	    //spaceship center
	    ctx.fillStyle = "#4A9AB0";
	    ctx.beginPath();
	    ctx.moveTo(0,20);
	    ctx.lineTo(-5,30);
	    ctx.lineTo(0,40);
	    ctx.lineTo(5,30);
	    ctx.closePath();
	    ctx.fill();
	    //spaceship head
	    ctx.translate(0,0);
	    ctx.fillStyle = "#706E6E";
	    ctx.beginPath();
	    ctx.arc(0,15,10,Math.PI,0);
	    ctx.fill();
	    //spaceship wings
	    var grd = ctx.createLinearGradient(0,0,0,60);
	    grd.addColorStop(0,"#433DAF");
	    grd.addColorStop(1,"white");
	    ctx.fillStyle = grd;
	    ctx.beginPath();
	    ctx.moveTo(-10,15);
	    ctx.lineTo(-25,45);
	    ctx.lineTo(-10,45);
	    ctx.closePath();
	    ctx.fill();
	    ctx.beginPath();
	    ctx.moveTo(10,15);
	    ctx.lineTo(25,45);
	    ctx.lineTo(10,45);
	    ctx.closePath(); 
	    ctx.fill();
	    //spaceship fire
	    ctx.fillStyle = "#D14D38";
	    ctx.translate(0,30);
	    ctx.beginPath();
	    ctx.moveTo(-25,15);
	    ctx.lineTo(-17.5,25);
	    ctx.lineTo(-10,15);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.moveTo(25,15);
	    ctx.lineTo(17.5,25);
	    ctx.lineTo(10,15);
	    ctx.fill();
	    ctx.restore();
	}
};

// <-- spaceship //

 
//#2)moon 50px*50px -->//
var moon = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		// //moon outer circle.
		// ctx.save();
		// ctx.translate(this.x,this.y);
		// //draw outer arc of moon
		// ctx.beginPath();
		// var grd = ctx.createLinearGradient(0,0,0,60);
	    // grd.addColorStop(0,"#FFFF66");
	    // grd.addColorStop(1,"gray");
		// ctx.fillStyle = grd;
		// ctx.strokeStyle = "black";
		// ctx.arc(0,25,20,Math.PI/8,Math.PI*15/8,0);	
		// ctx.fill();
		// ctx.stroke();
		// //draw stroke of inner arc of moon
		// ctx.beginPath();
		// ctx.strokeStyle = "black";
		// ctx.arc(8,25,13,Math.PI/4,Math.PI*7/4,0);
		// ctx.fill();
		// ctx.stroke();
		
		// //Fill inner part of moon with white.
		// ctx.beginPath();
		// var grd1 = ctx.createLinearGradient(0,0,0,60);
	    // grd1.addColorStop(0,"rgba(0,0,102,0.4)");
	    // grd1.addColorStop(1,"rgba(41,41,61,0.2)");
		// ctx.fillStyle = grd1;
		// ctx.strokeStyle = "rgba(41,41,61,0.2)";
		// ctx.arc(8,25,12,0,Math.PI*2,0);
		// ctx.fill();
		// ctx.stroke();
		// ctx.restore();
		
		
		ctx.save();
		ctx.translate(this.x,this.y);
		
		ctx.beginPath();
		var grd = ctx.createLinearGradient(0,60,0,0);
	    grd.addColorStop(0,"#ffff33");
	    grd.addColorStop(1,"#b3b300");
		ctx.fillStyle = grd;
		
		ctx.moveTo(10,8);
		ctx.quadraticCurveTo(-30,25,10,42);
		ctx.quadraticCurveTo(-5,25,10,8);
		ctx.stroke();
		ctx.fill();
		
		ctx.restore();
	}
};

// <-- moon //

//#3)satellite 50px*50px -->//
var satellite = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y) {
		this.x = x;
		this.y = y;
	},
	draw:function() {
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.translate(0,25);
		ctx.rotate(-45/180*Math.PI);
		ctx.translate(0, -25);
		
		//center(body) of satellite
		ctx.beginPath();
		ctx.fillStyle = "#80ff00";
		ctx.arc(0,25,6,0,Math.PI*2,0);	
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.arc(0,25,4,0,Math.PI*2,0);	
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.fillStyle = "#00ffbf";
		ctx.arc(0,25,1.5,0,Math.PI*2,0);	
		ctx.fill();
		ctx.stroke();
		
		//Top signal sign.
		ctx.beginPath();
		ctx.strokeStyle = "#bfff00";
		ctx.arc(0,25,8,-Math.PI*3/8,-Math.PI*5/8,1);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = "#00ffbf";
		ctx.arc(0,25,11,-Math.PI*5/16,-Math.PI*11/16,1);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = "#00bfff";
		ctx.arc(0,25,14,-Math.PI/4,-Math.PI*3/4,1);
		ctx.stroke();
		
		//right wing of satellite
		drawSatelliteWing(1,0,"#00bfff");
		drawSatelliteWing(1,4,"#00ffff");
		drawSatelliteWing(1,8,"#00bfff");
		
		//left wing
		drawSatelliteWing(-1,0,"#00bfff");
		drawSatelliteWing(-1,4,"#00ffff");
		drawSatelliteWing(-1,8,"#00bfff");
		
		ctx.restore();
	}
};

//Helper function for drawing satellite wings
function drawSatelliteWing(sign, value, fillColor) {
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.fillStyle = fillColor;
		ctx.moveTo(sign*8+sign*value,20);
		ctx.lineTo(sign*8+sign*value,30);
		ctx.lineTo(sign*11+sign*value,30);
		ctx.lineTo(sign*11+sign*value,20);
		ctx.lineTo(sign*8+sign*value,20);
		ctx.stroke();
		ctx.fill();
}
//<-- satellite //

//#4) sun 50px*50px --> //
var sun = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		ctx.save();
		ctx.translate(this.x,this.y);
		
		ctx.beginPath();
		var grd = ctx.createRadialGradient(0,25,5,0,25,30);
	    grd.addColorStop(0,"#cc3300");
	    grd.addColorStop(1,"#ffff66");
		ctx.fillStyle = grd;
		ctx.strokeStyle = "#e6e600";
		ctx.arc(0,25,15,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		var grd1 = ctx.createLinearGradient(12,30,0,0);
	    grd1.addColorStop(0,"#ff794d");
	    grd1.addColorStop(1,"#e6e600");
		ctx.fillStyle = grd1;
		ctx.moveTo(17,22);
		ctx.lineTo(17,28);
		ctx.lineTo(17+3*Math.sqrt(3),25);
		ctx.lineTo(17,22);
		ctx.stroke();
		ctx.fill();
		
		//Draw triangles around sun (decoration of sun icon).
		drawSunTriangle(0);
		for (i = 0; i < 7; i++) {
			drawSunTriangle(-45/180);
		}
		
		ctx.restore();
	}
};

//Helper function for drawing sun.
function drawSunTriangle(angle) {
		ctx.translate(0,25);
		ctx.rotate(angle*Math.PI);
		ctx.translate(0,-25);
		ctx.beginPath();
		var grd1 = ctx.createLinearGradient(12,30,0,0);
	    grd1.addColorStop(0,"#ff794d");
	    grd1.addColorStop(1,"#e6e600");
		ctx.fillStyle = grd1;
		ctx.moveTo(17,22);
		ctx.lineTo(17,28);
		ctx.lineTo(17+3*Math.sqrt(3),25);
		ctx.lineTo(17,22);
		ctx.stroke();
		ctx.fill();
}
//<-- sun //

//#5) UFO 50px*50px --> //
var UFO = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		ctx.save();
		ctx.translate(this.x,this.y);
				
		//UFO body.
		ctx.beginPath();
		var grd = ctx.createRadialGradient(0,25,3,0,25,20);
	    grd.addColorStop(0,"#002699");
	    grd.addColorStop(1,"#007399");
		ctx.fillStyle = grd;
		ctx.moveTo(-20,25);
		ctx.bezierCurveTo(-20,35,20,35,20,25);
		ctx.bezierCurveTo(20,15,-20,15,-20,25);
		ctx.stroke();
		ctx.fill();
		
		//UFO head
		ctx.beginPath();
		ctx.arc(0,20,10,0,-Math.PI,1);
		ctx.stroke();
		ctx.fill();
		
		//UFO window
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(0,20,3,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		//UFO bottom
		ctx.beginPath();
		var grd1 = ctx.createLinearGradient(-50,35,0,0);
	    grd1.addColorStop(0,"#002699");
	    grd1.addColorStop(1,"#007399");
		ctx.fillStyle = grd1;
		ctx.arc(-10,35,3,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = grd1;
		ctx.arc(0,38,3,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = grd1;
		ctx.arc(10,35,3,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.restore();
	}
};
// <-- UFO //

//#6) Alien 50px*50px --> //
var alien = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		ctx.save();
		ctx.translate(this.x,this.y);
		
		//Alien face
		ctx.beginPath();
		var grd1 = ctx.createLinearGradient(12,30,0,0);
	    grd1.addColorStop(0,"#b92db9");
	    grd1.addColorStop(1,"#f0c1f0");
		ctx.fillStyle = grd1;
		ctx.moveTo(0,5);
		ctx.quadraticCurveTo(-40,5,0,45);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(0,5);
		ctx.quadraticCurveTo(40,5,0,45);
		ctx.stroke();
		ctx.fill();
	
		//Alien's eyes
		ctx.translate(-10,17);
		ctx.rotate(45/180*Math.PI);
		ctx.translate(10,-17);
		
		ctx.beginPath();
		var grd2 = ctx.createLinearGradient(12,30,0,0);
	    grd2.addColorStop(0,"#ffff80");
	    grd2.addColorStop(1,"#808000");
		ctx.fillStyle = grd2;
		ctx.moveTo(-15,17);
		ctx.bezierCurveTo(-15,14,-5,14,-5,17);
		ctx.bezierCurveTo(-5,20,-15,20,-15,17);
		ctx.stroke();
		ctx.fill();
		
		ctx.rotate(-45/180*Math.PI);
		ctx.translate(-3,2);
		ctx.translate(-10,17);
		ctx.rotate(-45/180*Math.PI);
		ctx.translate(10,-17);
		
		ctx.beginPath();
		ctx.moveTo(15,17);
		ctx.bezierCurveTo(15,14,5,14,5,17);
		ctx.bezierCurveTo(5,20,15,20,15,17);
		ctx.stroke();
		ctx.fill();
		
		ctx.restore();
	}
};

//<--Alien //

//#7) Saturn 50px*50px --> //
var saturn = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		ctx.save();
		ctx.translate(this.x,this.y);
		
		ctx.translate(0,25);
		ctx.rotate(-Math.PI/8);
		ctx.translate(0,-25);
		
		//Outer ring of saturn
		ctx.beginPath();
		ctx.strokeStyle = "#4d3d00";
		var grd = ctx.createLinearGradient(-28,25,0,0);
		grd.addColorStop(0, "#1a1400");
		grd.addColorStop(1,"#b38f00");
		ctx.fillStyle = grd;
		ctx.moveTo(-20,25);
		ctx.bezierCurveTo(-20,33,20,33,20,25);
		ctx.bezierCurveTo(20,17,-20,17,-20,25);
		ctx.stroke();
		ctx.fill();
		
		//Inner ring of saturn
		ctx.beginPath();
		ctx.strokeStyle = "#4d3d00";
		ctx.fillStyle = "white";
		ctx.moveTo(-15,25);
		ctx.bezierCurveTo(-15,29,15,29,15,25);
		ctx.bezierCurveTo(15,21,-15,21,-15,25);
		ctx.stroke();
		ctx.fill();
		
		//white ring between outer ring and inner ring.
		ctx.beginPath();
		ctx.strokeStyle = "rgba(255,255,255,0.6)";
		ctx.moveTo(-18,25);
		ctx.bezierCurveTo(-18,31,18,31,18,25);
		ctx.bezierCurveTo(18,19,-18,19,-18,25);
		ctx.stroke();
		
		//body of saturn.
		ctx.beginPath();
		ctx.strokeStyle = "#4d3d00";
		var grd1 = ctx.createLinearGradient(0,0,0,70);
		grd1.addColorStop(0, "#4d2600");
		grd1.addColorStop(1,"#ffb366");
		ctx.fillStyle = grd1;
		ctx.arc(0,25,10,Math.PI/12,-13/12*Math.PI,1);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(0,25,10,Math.PI/6,5/6*Math.PI,0);
		ctx.stroke();
		ctx.fill();
		
		//white lines on saturn.
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.moveTo(-8,20);
		ctx.bezierCurveTo(-8,22,8,22,8,20);
		ctx.lineWidth = 0.3;
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.moveTo(-9,25);
		ctx.bezierCurveTo(-9,27,9,27,9,27);
		ctx.lineWidth = 0.3;
		ctx.stroke();
		
		ctx.restore();
	}
};

//<--saturn //

//#8) Andromeda 50px*50px --> //
var andromeda = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		ctx.save();
		ctx.translate(this.x,this.y);
		
		//Orbit below the core of andromeda
		ctx.beginPath();
		var grd1 = ctx.createRadialGradient(0,25,5,0,25,20);
	    grd1.addColorStop(0,"#b3d1ff");
	    grd1.addColorStop(1,"#003380");
		ctx.strokeStyle = grd1;
		ctx.moveTo(-7,25);
		ctx.bezierCurveTo(-7,28,7,28,7,25);
		ctx.bezierCurveTo(7,22,-7,22,-7,25);
		ctx.stroke();
		
		//Core of andromeda
		ctx.beginPath();
		var grd = ctx.createRadialGradient(0,25,1,0,25,5);
	    grd.addColorStop(0,"#ffe6e6");
	    grd.addColorStop(1,"#660000");
		ctx.fillStyle = grd;
		ctx.arc(0,25,5,0,2*Math.PI,0);
		ctx.stroke();
		ctx.fill();
		
		//First orbit around core of andromeda
		ctx.beginPath();
		ctx.strokeStyle = grd1;
		ctx.moveTo(-10,25);
		ctx.bezierCurveTo(-10,32,10,32,10,25);
		ctx.bezierCurveTo(10,18,-10,18,-10,25);
		ctx.stroke();
		
		//Stars around andromeda
		ctx.beginPath();
		ctx.fillStyle = "#001f4d";
	    ctx.arc(0,15,1,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
	    ctx.arc(-16,25,2,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
	    ctx.arc(16,35,2,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
	    ctx.arc(-10,38,1,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
	    ctx.arc(-20,12,1,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
	    ctx.arc(19,13,1,0,Math.PI*2,0);
		ctx.stroke();
		ctx.fill();
		
		//Orbits around andromeda (rotated);
		drawRotatedOrbits(0,grd1);
		drawRotatedOrbits(Math.PI*1/8,grd1);
		drawRotatedOrbits(Math.PI*6/8,grd1);
		
		ctx.restore();
	}
};

//Helper function for drawing orbits of andromeda.
function drawRotatedOrbits(angle, strokeColor) {
		ctx.translate(0,25);
		ctx.rotate(angle);
		ctx.translate(0,-25);
	
		ctx.beginPath();
		ctx.strokeStyle = strokeColor;
		ctx.moveTo(-22,25);
		ctx.bezierCurveTo(-22,35,22,35,22,25);
		ctx.bezierCurveTo(22,15,-22,15,-22,25);
		ctx.stroke();
}

//<--Andromeda //

//#9) Shooting star 50px*50px --> //
var shooting_star = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		/* Star can be expressed as a combination of small triangles
		 * Let side length of triangle be x.
		 * Then width/2 = x/2 and height = x/2*Math.sqrt(3)  */
		var x = 4;
		var half_width = x/2;
		var height = x/2*Math.sqrt(3);
		
		ctx.save();
		ctx.translate(this.x,this.y);
		
		var grd1 = ctx.createLinearGradient(10,16,-25,50);
	    grd1.addColorStop(0,"#000080");
	    grd1.addColorStop(1,"#e0ccff");
		
		//Trace of shooting star
		ctx.beginPath();
		ctx.strokeStyle = grd1;
		ctx.moveTo(3,12);
		ctx.quadraticCurveTo(-3,12,-15,32);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(5,17);
		ctx.quadraticCurveTo(-1,16,-12,39);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(7,22);
		ctx.quadraticCurveTo(1,19,-8,46);
		ctx.stroke();
		
		ctx.translate(10,-9);

		//Star
		ctx.beginPath();
		var grd = ctx.createRadialGradient(10,16,3,7,16,15);
	    grd.addColorStop(0,"#e0ccff");
	    grd.addColorStop(1,"#330080");
		ctx.fillStyle = grd;
		ctx.strokeStyle = "#140033";
		ctx.moveTo(0,25-2*height); //(1)
		ctx.lineTo(half_width,25-height); //(2)
		ctx.lineTo(half_width*3,25-height); //(3)
		ctx.lineTo(half_width*2,25); //(4)
		ctx.lineTo(height*2/Math.sqrt(2),
					25+height*2/Math.sqrt(2)); //(5)
		ctx.lineTo(0,25+half_width); //(6)
		ctx.lineTo(-height*2/Math.sqrt(2),
					25+height*2/Math.sqrt(2)); //(7)
		ctx.lineTo(-half_width*2,25); //(8)
		ctx.lineTo(-half_width*3,25-height); //(9)
		ctx.lineTo(-half_width,25-height); //(10)
		ctx.lineTo(0,25-2*height);
		ctx.stroke();
		ctx.fill();
		
		ctx.restore();
	}
};

// <--Shooting star //

//#10) Telescope 50px*50px --> //
var telescope = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		ctx.save();
		ctx.translate(this.x,this.y);
		
		ctx.beginPath();
		ctx.fillStyle = "#003300";
		ctx.arc(0,25,3,0,Math.PI*2);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = "#003333";
		ctx.moveTo(4,28);
		ctx.lineTo(-4,28);
		ctx.lineTo(-4,32);
		ctx.lineTo(4,32);
		ctx.lineTo(4,28);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = "#001a00";
		ctx.moveTo(-4,32);
		ctx.lineTo(-2,32);
		ctx.lineTo(-7,45);
		ctx.lineTo(-9,45);
		ctx.lineTo(-4,32);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(-1,32);
		ctx.lineTo(1,32);
		ctx.lineTo(1,45);
		ctx.lineTo(-1,45);
		ctx.lineTo(-1,32);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(2,32);
		ctx.lineTo(4,32);
		ctx.lineTo(9,45);
		ctx.lineTo(7,45);
		ctx.lineTo(2,32);
		ctx.stroke();
		ctx.fill();
		
		ctx.translate(0,-4);
		ctx.translate(0,25);
		ctx.rotate(-Math.PI/8);
		ctx.translate(0,-25);
		
		ctx.beginPath();
		var grd1 = ctx.createLinearGradient(5,10,-10,60);
	    grd1.addColorStop(0,"#003311");
	    grd1.addColorStop(1,"#b3ffcc");
		ctx.fillStyle = grd1;
		ctx.moveTo(-11,23);
		ctx.lineTo(-11,27);
		ctx.lineTo(-19,26);
		ctx.lineTo(-19,24);
		ctx.lineTo(-11,23);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = grd1;
		ctx.moveTo(3,21);
		ctx.lineTo(3,29);
		ctx.lineTo(-10,27);
		ctx.lineTo(-10,23);
		ctx.lineTo(3,21);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = grd1;
		ctx.moveTo(4,21);
		ctx.lineTo(4,29);
		ctx.lineTo(17,31);
		ctx.lineTo(17,19);
		ctx.lineTo(4,21);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.moveTo(17,19);
		ctx.bezierCurveTo(15,19,15,31,17,31);
		ctx.bezierCurveTo(19,31,19,19,17,19);
		ctx.stroke();
		ctx.fill();
		
		ctx.restore();
	}
};

// <-- Telescope //

//Array of objects
var obj_arr = []; 

function addAllObjects() {
	obj_arr = [spaceship,moon,satellite,sun,UFO,alien,
			saturn,andromeda,shooting_star,telescope];
}

//add all objects in the beginning
addAllObjects();

/* <-- Objects */ 

/* Objects random assortment --> */

var x;
var y;
var speed;
var angle;

//random assortment of 10 objects
function assortment(object) {
	/* Only position "object" randomly in the beginning of level.
	 * This condition makes "object" stays in the same place when 
	 * blackhole which was pulling "object" is clicked */
	if (object.x == 0 && object.y == 0) {
		x = Math.floor(Math.random()*900+50);
		y = Math.floor(Math.random()*540+50);
		object.setCoordinate(x,y);
	}
	//random direction
	speed = 3;
	angle = Math.floor(Math.random()*2*Math.PI);
	
	//Convert polar coord. to rect. coord.,
	//and assign speed to object.
	object.vx = speed*Math.cos(angle);
	object.vy = speed*Math.sin(angle);	
}

//random assortment of 10 objects
function assortAll() {
	for (var obj = 0; obj < obj_arr.length; obj++) {
		assortment(obj_arr[obj]);
	}
}

//Place all objects randomly on the screen in the beginning.
assortAll();

//Helper function to reassort objects that were pulled by 
//removed black holes.
function reassortment(blackhole) {
	for (var obj = 0; obj < obj_arr.length; obj++) {
		if ((obj_arr[obj] != 0) &&
			(obj_arr[obj].x <= blackhole.x+75 && 
			obj_arr[obj].x >= blackhole.x-75 && 
			obj_arr[obj].y <= blackhole.y+50 && 
			obj_arr[obj].y >= blackhole.y-100)) {
			
			assortment(obj_arr[obj]);
		}
	}
}

/* <-- Objects random assortment */


/* Black hole related variables and functions -->  */

//hole properties
var blackhole = document.getElementById("blackhole");
var bluehole = document.getElementById("bluehole");
var purplehole = document.getElementById("purplehole");

//define hole object
function hole(x,y,type){
	this.x = x;
	this.y = y;
	this.type = type; //1 for bluehole 2 for purplehole 3 for blackhole
	this.objEat = 0; 
}
//draw hole on canvas
function drawHole(holeObject){
	if(holeObject.type == 1){
		ctx.drawImage(bluehole,holeObject.x-25,holeObject.y-25,50,50);
	}else if(holeObject.type == 2){
		ctx.drawImage(purplehole,holeObject.x-25,holeObject.y-25,50,50);
	}else{
		ctx.drawImage(blackhole,holeObject.x-25,holeObject.y-25,50,50);
	}
}

//hole array
var holeArr = [];
//random create holes every HOLEINTERVAL
var interval;
var createHoleInterval = 4;
//frequency of appearance of blackhole
var frequecyBlack;
var frequecyPurple;
var frequecyBlue;

function createHole(){
	var ram = Math.random();
	var ramX;
	var ramY;

	//check current level
	if(level == 1){
		frequecyBlack = 0.2;
		frequecyPurple = 0.35;
		frequecyBlue = 0.5;
	}else if(level == 2){
		frequecyBlack = 0.4;
		frequecyPurple = 0.7;
		frequecyBlue = 1;
	}

	if(ram <= frequecyBlack){
		ramX = Math.floor(Math.random()*900+50);
	    ramY = Math.floor(Math.random()*515+75);
	    //check overlap
	    while(!checkOverlap(ramX,ramY)){
	    	ramX = Math.floor(Math.random()*900+50);
	    	ramY = Math.floor(Math.random()*515+75);
	    }
		holeArr.push(new hole(ramX,ramY,3));
	}

	ram = Math.random();

	if(ram <= frequecyPurple){
		ramX = Math.floor(Math.random()*900+50);
	    ramY = Math.floor(Math.random()*515+75);
	    //check overlap
	    while(!checkOverlap(ramX,ramY)){
	    	ramX = Math.floor(Math.random()*900+50);
	    	ramY = Math.floor(Math.random()*515+75);
	    }
		holeArr.push(new hole(ramX,ramY,2));
	}

	ram = Math.random();

	if(ram <= frequecyBlue){
		ramX = Math.floor(Math.random()*900+50);
	    ramY = Math.floor(Math.random()*515+75);
	    //check overlap
	    while(!checkOverlap(ramX,ramY)){
	    	ramX = Math.floor(Math.random()*900+50);
	    	ramY = Math.floor(Math.random()*515+75);
	    }
		holeArr.push(new hole(ramX,ramY,1));
	}
}

function createHoleEveryInterval() {
	if (createHoleInterval == 0) {
		createHole();
		createHoleInterval = 4;
	}
}

function checkOverlap(ramX,ramY){
	for(var i = 0; i < holeArr.length; i++){
		if(ramX >= holeArr[i].x-100 && ramX <= holeArr[i].x+100 
			&& ramY <= holeArr[i].y+100 && ramY >= holeArr[i].y-100){
			return false;
		}
	}
	return true;
}

function drawHoleArr(){
	for(var i = 0; i < holeArr.length; i++){
		if (holeArr[i] != 0) {
			drawHole(holeArr[i]);
		}
	}
}

var dx;
var dy;
function pullObject(){
	//check list of objects!!
	//here just use one object as example!!
	var len = holeArr.length;
	for(var i = 0; i < len; i++){
		for (var obj = 0; obj < obj_arr.length; obj++) {

			//inside the event horizon
			dx = holeArr[i].x - obj_arr[obj].x;
			dy = holeArr[i].y - obj_arr[obj].y-25;
			
			if ((holeArr[i] != 0 && obj_arr[obj] != 0) && 
				(obj_arr[obj].x <= holeArr[i].x+75 && 
				obj_arr[obj].x >= holeArr[i].x-75 && 
				obj_arr[obj].y <= holeArr[i].y+50 && 
				obj_arr[obj].y >= holeArr[i].y-100)) {
				
				obj_arr[obj].vx = 0;
				obj_arr[obj].vy = 0;

				//fast pull speed
				if(holeArr[i].type == 3){
					if(dx > 0){
						obj_arr[obj].x++;
					}
					if(dx < 0){
						obj_arr[obj].x--;
					}
					if(dy > 0){
						obj_arr[obj].y++;
					}
					if(dy < 0){
						obj_arr[obj].y--;
					}
					//medium pull speed
				}else if(holeArr[i].type == 2){
					if(dx > 0){
						obj_arr[obj].x += 0.5;
					}
					if(dx < 0){
						obj_arr[obj].x -= 0.5;
					}
					if(dy > 0){
						obj_arr[obj].y += 0.5;
					}
					if(dy < 0){
						obj_arr[obj].y -= 0.5;
					}
					//slow pull speed
				}else if(holeArr[i].type == 1){
					if(dx > 0){
						obj_arr[obj].x += 0.2;
					}
					if(dx < 0){
						obj_arr[obj].x -= 0.2;
					}
					if(dy > 0){
						obj_arr[obj].y += 0.2;
					}
					if(dy < 0){
						obj_arr[obj].y -= 0.2;
					}
				}
				
				if(Math.abs(dx)<=1 && Math.abs(dy)<=1){
					//Decrement objectsNum (current # of objects) by 1.
					objectsNum--;
					//disappear
					obj_arr[obj] = 0;
					//Increment objEat by 1
					holeArr[i].objEat++;
					//Decrease score by 50pt
					score -= 50;
					//check # of obj eaten
					removeBlackhole(i);
				}
			}
		}
		
	}
}

/* Check # of objects eaten, and if black hole has already eaten
 * enough objects, remove it from screen. */
function removeBlackhole(index) {
	//type: 1 = blue, 2 = purple, 3 = black
	if ((holeArr[index].type == 1 && holeArr[index].objEat == 3) || 
		(holeArr[index].type == 2 && holeArr[index].objEat == 2) ||
		(holeArr[index].type == 3 && holeArr[index].objEat == 1)) {
			
		reassortment(holeArr[index]);
		
		holeArr[index] = 0;
	}
}

/* <-- Black hole related variables and functions */


//border check
function borderCheck(object,x,y){
	if(x + object.vx <= 25 || x + object.vx>= 975){
		object.vx = -object.vx;
	}
	if(y + object.vy <= 50 || y + object.vy >= 585){
		object.vy = -object.vy;
	}
}

//HTML element variables
var id_level = (document).getElementById("level");
var id_score = (document).getElementById("score");
var id_button_name = (document).getElementById("button_name");
var id_button = (document).getElementById("next_button");

//animation
var raf;
var running = true;

function animate(){
	ctx.clearRect(0,0,1000,640);
	drawFramework();
	drawPauseButton();
	
	//For all objects in obj_arr, add speed,check border, and draw.
	for (var obj = 0; obj < obj_arr.length; obj++) {
		if (obj_arr[obj] != 0) {
			//Check if object is eaten by blackhole.
			//If not, check border, add speed and draw.
			borderCheck(obj_arr[obj],obj_arr[obj].x,obj_arr[obj].y);
			
			obj_arr[obj].x += obj_arr[obj].vx;
			obj_arr[obj].y += obj_arr[obj].vy;
			
			obj_arr[obj].draw();
		}
	}

	//create blackhole
	createHoleEveryInterval();
	drawHoleArr();
	pullObject();

	//game page shows up when seconds or # of objects is 0.
	if (seconds == 0 || objectsNum == 0) {
		//Add objects newly.
		addAllObjects();
		//Place them again on the canvas randomly.
		assortAll();
		holeArr.length = 0;
		clearInterval(t);
		//if time is up and at least 1 object remains
		if (seconds == 0 && objectsNum != 0) {
			id_level.innerText = level;
			id_score.innerText = score;
			
			$("canvas").hide();
			//(level1) move to next level
			if(level == 1){
				id_button.setAttribute("style", "left:38%");
				id_button_name.innerText = "NEXT";
				
				//Show game_page after level 1.
				$("#game_page").show(nextCallback());
			//(level2) finish game
			}else if(level == 2){
				id_button.setAttribute("style", "left:35%");
				id_button_name.innerText = "FINISH";
				
				//Show finish_page after level 2.
				$("#game_page").show(finishCallback());
			}
		//if no object remains, just finish game
		}else if(objectsNum == 0){
			id_button.setAttribute("style", "left:35%");
			id_level.innerText = level;
			id_score.innerText = score;
			id_button_name.innerText = "FINISH";
			
			$("canvas").hide();
			$("#game_page").show(finishCallback());
		}
	}

	raf = window.requestAnimationFrame(animate);
}


function drawFramework(){
	//draw menu line
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(0,50);
	ctx.lineTo(1000,50);
	ctx.stroke();
	//draw text
	ctx.font = "35px sans-serif";
	ctx.fillText(" Level #", 5, 35);
	ctx.fillText(level, 130, 35);
	ctx.fillText("Score:",400,35);
	ctx.fillText("seconds",850,35)
	//draw number
	ctx.fillText(score,510,35);
	ctx.fillText(seconds,800,35)
}

function drawPauseButton() {
	ctx.clearRect(649, 9, 102, 32);
	//Pause button
	ctx.beginPath();
	ctx.fillStyle = "#99bbff";
	ctx.moveTo(650,10);
	ctx.lineTo(750,10);
	ctx.lineTo(750,40);
	ctx.lineTo(650,40);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	//Pause text
	ctx.font = "17px sans-serif";
	ctx.fillStyle = "#002266";
	if (running == false) {
		ctx.fillText("RESUME",665,32);
	}
	if (running == true) {
		ctx.fillText("PAUSE",672,32);
	}
}

//Decrement seconds and createHoleInterval by 1 each every 1 sec.
function decrementCounter() {
	seconds--;
	createHoleInterval--;
}

//"click" event listener ((1)pause/resume, (2)blackhole) //
canvas.addEventListener("click",function(e){
	//(1) pause/resume --> //
	if(e.clientX > 650 && e.clientX < 750 && e.clientY > 10 && 
		e.clientY < 40 && running == true){	
		//stop animation
		window.cancelAnimationFrame(raf);
		//stop counting time
		clearInterval(t);
		//clear running
		running = false;
		//Change "pause" text to "resume" when game is paused.
		drawPauseButton();
		//interval between two clicks
		sleep(50);
	}
	if(e.clientX > 650 && e.clientX < 750 && e.clientY > 10 && 
		e.clientY < 40 && running == false){	
		raf = window.requestAnimationFrame(animate);
		t = setInterval(decrementCounter,1000);
		//interval = setInterval(createHole,createHoleInterval);
		running = true;
		//Change "resume" text to "pause" when game is running.
		drawPauseButton();
		//interval between two clicks
		sleep(50);
	}
	// <-- pause/resume //
	
	//(2) blackhole --> //
	
	/* Remove blackhole from screen when clicked
	 * (only works when game is running.)
	 * Check if black hole exists within 25px of click event
	 * Remove if exists. 
	 * Reassign speed of objects that are being pulled by
	 * black holes that get removed.*/
	 if (running == true) {
		for (var i = 0; i < holeArr.length; i++) {
			if (holeArr[i] != 0) {
				if (e.clientX > holeArr[i].x-50 && 
					e.clientX < holeArr[i].x+50 &&
					e.clientY > holeArr[i].y-50 &&
					e.clientY < holeArr[i].y+50) {
						
					reassortment(holeArr[i]);
					
					if (holeArr[i].type == 1) { //blue
						score += 5;
					} else if (holeArr[i].type == 2) { //purple
						score += 10;
					} else if (holeArr[i].type == 3) { //black
						score += 20;
					}
			
					holeArr[i] = 0;
				}
			}
		}
	 }
	//<-- blackhole //
});


 //show top three scores
function showTopScores(){
	try{
		scorelist = JSON.parse(localStorage.getItem("scorelist"));
	}catch(e){
		localStorage.setItem("scorelist",JSON.stringify([]));
	}
	//sort
	for(var i = 0; i < scorelist.length; i++){
		for(var j = i; j < scorelist.length;j++){
			if(scorelist[j] >= scorelist[i]){
				var temp = scorelist[i];
				scorelist[i] = scorelist[j];
				scorelist[j] = temp;
			}
		}
	}
	
	var topScores = document.getElementById("high_score");
	topScores.innerHTML = scorelist.length;
	
	if(scorelist.length == 1){
		topScores.innerHTML = "<br>" + scorelist[0];
	}else if(scorelist.length == 2){
		topScores.innerHTML = "<br>" + scorelist[0] + "<br>" + scorelist[1];
	}else if(scorelist.length >= 3){
		topScores.innerHTML = "<br>" + scorelist[0] + "<br>" + scorelist[1] + "<br>" + scorelist[2];
	}if(scorelist.length == 0){
		topScores.innerHTML = "<br>" + "0";
	}
	
}

var scorelist = [];

/* Callback functions --> */

//Move to next level(level2) when "next" button is pressed.
function nextCallback(){
	$("#next_button").click(
		function() {
			createHoleInterval = 4;
			seconds = 60;
			objectsNum = 10;
			level = 2;
			$("canvas").show();
			$("#game_page").hide();
			$("#start_page").hide();
		}
	);
	t = setInterval(decrementCounter,1000);
}

var write = false;
//Go back to start_page when "finish" button is pressed.
function finishCallback(){
	$("#next_button").click(
		function() {
			createHoleInterval = 4;
			seconds = 60;
			//save current score into local storage
			if(write == false){
				try{
					scorelist = JSON.parse(localStorage.getItem("scorelist"));
					scorelist.push(score);
					write = true;
					localStorage.setItem("scorelist",JSON.stringify(scorelist));
				}catch(e){
					localStorage.setItem("scorelist",JSON.stringify([]));
				}
			}
			if(level == 2){
				score = 200;
				level = 1;
			}
			objectsNum = 10;
			$("#game_page").hide();
			$("canvas").hide();
			showTopScores();
			$("#start_page").show();
		}
	);
}

/* <-- Callback functions */
animate();
