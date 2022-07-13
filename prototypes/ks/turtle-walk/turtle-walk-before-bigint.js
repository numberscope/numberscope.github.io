var turtleWalk = function( p ) {

	// Fonts
	var font;
	var fontsize = 18;

	// Colours
	var fromColor = p.color(218, 165, 32);
	var purple = p.color(72, 61, 139);
	var toColor = p.lerpColor(purple,p.color(0,0,0),0.5);
	var mistColor;

	// Sequences
	var myseq2 = [];

	// Speed of the simulation
	var fr = 5; // frame rate

	// Location of center on the canvas
	var locSeq = { x: 300,	y: 300 };

	// modulus for sequence
	var modulus;

	// depth of fade
	var fade;

	// mode (distance or gcd)
	var mode = 0; // 0 = distance, 1 = gcd

	// the spacing of the grid
	var zoomFactor = 13;

	// some booleans for toggles
	var initialDraw;
	var menu = 0;
	var paleMist = false;
	var axes = false;

	// the size of the purple rectangle
	var backgroundWidth, backgroundHeight; // for purple rectangle

	// to hold sequences
	var myManySeq = new manySeq(p);
	var mySeqIndex = 0;
	var myVariety, mySeq, myName;

	// turtle rules
	var ruleset;

	// variables say which rule is being changed in GUI
	var highlightedrule = 0, highlightedtype = 0;
	
	var scaleFactor = 1;
	var speeds = [];
	var speedjump = 0.002;
	var jump = 1;

	var steps, facing, steplength;

	var modulus_upflag;

	var xorigin,yorigin;

	var translation;

	var colortype;

	// gcd function
	var numthy = new Numthy(p);  // Call a new number theory object with number theory functions from my p5 library

	p.setup = function() {
		// create canvas
		var canvas = p.createCanvas(1610,910);	

		// set up fonts
		p.textFont('Montserrat');
		p.textSize(fontsize);

		// Choose sequences
		//mySeq = p.createA002024(100000); 
		//mySeq = p.createIntegers(1000000); // creates integers as an array
		//mySeq = p.createFibsmodn(10000,5); // creates Fibs mod modulus
		//mySeq = p.createModPow(100000,3,1000003); // wow!  this is a pattern in powers of 3, before repeats, try on square!
		//mySeq = p.createModPow(100000,3,103); // wow!  this is a pattern in powers of 3, before repeats, try on square!
		//mySeq = p.createModSquare(10000,100003); 
		//mySeq = p.createModQuad(10000,1000003,1,0,8); 
		//mySeq = p.createModCubic(10000,1000003,3,2,15); 
		//mySeq = p.createModPow(1000,2,1000105); // on square
		//myseq = p.createModPow(100000,3,1000289); // same big effect
		//myseq = p.createModPow(10000,2,1000667); // safe prime
		//mySeq = primes10Seq;
		//
		//mySeq = p.createFloorReal(1000,math.sqrt(2));
		//mySeq = p.createFloorQuad(10000);
		//mySeq = p.createFloorLog(10000);
		//mySeq = p.createHailstone(100,837799);
		//mySeq = p.createLongRangeRand(100000,100,4);
		//mySeq = myRotorSeq; // wow, cool!
		//console.log(mySeq);
		//mySeq = p.createRandom(1000000,4);
		//mySeq = p.createMod(100000,13);
		//mySeq = myManySeq.createThueMorse(10000);
		myVariety = myManySeq.createVariety(10000);
		mySeqIndex = 1;
		mySeq = myVariety[mySeqIndex][0];
		myName = myVariety[mySeqIndex][1];

		// Set frame rate
		p.frameRate(fr);

		// initial values of draw parameters
		contract = 1;
		translat = 1; //p.width/zoomFactor;
		modulus = 3;

		// initial values of booleans
		initialDraw = true;

		// size of purple rectangle precomputation
		backgroundWidth = zoomFactor*(p.floor(p.width/zoomFactor)-3);
		backgroundHeight = zoomFactor*(p.floor(p.height/zoomFactor)-3);

		// set mist color	
		mistColor = p.lerpColor(toColor,p.color(255),0.2);

		// set fade
		fade = 5;

		// set up ruleset [degrees, steps]
		ruleset = [[0,1],[60,0],[120,0]]; 
		for( rule in ruleset ){
			speeds.push([0,0]);
		}

		// set up preset rulesets 
		presets = [];
		presets.push([[[137,3],[0,2],[105,1]],'Hofstadter Fig.-Fig.',9960,0.1372,100,-260,3]); // pretty on Figure-Figure
		presets.push([[[118,2],[0,5]],'Ramanujan Tau',1210,0.9234,100,-130,2]); // try on Ramanujan Tau
		presets.push([[[79,1],[0,0],[45,1]],'Beatty sqrt(2)',9960,0.2358,160,200,3]); // cool on Beatty 2
		presets.push([[[1,1.1],[0,0],[1,-1]],'Ramanujan Tau',9960,0.1252,90,-190,3]); // barbed wire like
		presets.push([[[126,3],[0,2]],'Odious numbers',9960,0.1144,-210,-470,2]); // try on Odious
		presets.push([[[120,7],[0,-11],[60,1],[15,1]],'Recaman',9960,0.0984,160,80,4]); // try on Recaman
		presets.push([[[120,8],[12,7]],'2-adic val of Z',9960,0.0639,260,370,2]); // try on 2-adic Z
		presets.push([[[120,8],[24,7]],'2-adic val of Z',9960,0.0895,160,20,2]); // ditto
		presets.push([[[121,8],[34,7],[60,4]],'Recaman',9960,0.1651,240,-310,3]); // try on Recaman
		presets.push([[[120,0],[0,2],[60,1],[89,1]],'Recaman',9960,0.6727,470,220,4]); // try on Recaman
		presets.push([[[119,8],[60,9]],'Number of divisors',9960,0.3138,210,-200,2]); // try on number of divisors
		presets.push([[[0,1],[60,0]],'Thue-Morse',9960,0.1228,100,-440,2]); // a type of Snowflake
		presets.push([[[0,0],[0,1],[1,0],[2,0],[4,0],[8,0],[16,0],[32,0],[64,0],[128,0]],'Contd frac Pi',9960,0.1771,20,-150,0]); // continued fraction Pi
		
		steps = 1000;
		steplength = 20;
		facing = 0;

		menu = 0;
		scaleFactor = 0.6;

		p.fill(100);

		xorigin = 100;
		yorigin = 200;

		translation = 0;

		colortype = 0;
		
		// set up initial Draw (first in presets)
		presetIndex = 0;
		p.presetSetup();



	}

	p.draw = function() {

		p.clear();
		p.push();
		p.translate(p.width*0.35,p.height/2);
		
		// allow panning with ijkl
		pansize = 10;
		if( p.keyIsDown(76) ){ xorigin += pansize; } // l right
		if( p.keyIsDown(74) ){ xorigin -= pansize; } // j left
		if( p.keyIsDown(73) ){ yorigin -= pansize; } // i up
		if( p.keyIsDown(75) ){ yorigin += pansize; } // k down
		p.translate(xorigin,yorigin);

		// allow zoom with s/d
		if( p.keyIsDown(83) ){ scaleFactor = scaleFactor*1.1; } // s -- zoom in
		if( p.keyIsDown(68) ){ scaleFactor = scaleFactor*0.9; } // d -- zoom out
		p.scale(scaleFactor);

		// allow length change with f/g
		if( p.keyIsDown(70) && steps < mySeq.length-1 ){ steps += 1; } // f -- get longer
		if( p.keyIsDown(71) ){ if( steps > 0 ){ steps -=1; } } // g -- get shorter
		if( p.keyIsDown(86) && steps < mySeq.length-70 ){ steps += 70; } // b -- get longer fast
		if( p.keyIsDown(66) ){ if( steps > 70 ){ steps -=70; } } // v -- get shorter fast

		// allow changing speed on selected rule angle/steps
		htype = p.floor(highlightedtype/2);
		if( modulo(highlightedtype,2) == 1 ){
			if( p.keyIsDown(187) ){ speeds[highlightedrule][htype] += speedjump; } // + -- speed up 
			if( p.keyIsDown(189) ){ speeds[highlightedrule][htype] -= speedjump; } // - -- slow down
			if( p.keyIsDown(32) ){ speeds[highlightedrule][htype] = 0; } // space -- pause
		} else {
			if( p.keyIsDown(187) ){ ruleset[highlightedrule][htype] += jump; } // + -- angle/steps up 
			if( p.keyIsDown(189) ){ ruleset[highlightedrule][htype] -= jump; } // - -- down
			if( p.keyIsDown(32) ){ ruleset[highlightedrule][htype] = 0; } // space -- zero out
		}
			
		// now implement all the speeds
		for( let r = 0; r < ruleset.length; r++) {
			for( let s = 0; s < 2; s++ ){
				ruleset[r][s]+=speeds[r][s];
			}
		}
		// use arrow keys to select the rule to alter
		if( p.keyIsDown(p.LEFT_ARROW) && highlightedtype > 0){ highlightedtype -= 1 };
		if( p.keyIsDown(p.RIGHT_ARROW) && highlightedtype < 3 ){ highlightedtype += 1 };
		if( p.keyIsDown(p.UP_ARROW) && highlightedrule > 0){ highlightedrule -= 1 };
		if( p.keyIsDown(p.DOWN_ARROW) && highlightedrule < ruleset.length-1){ highlightedrule += 1 };

		// draw the turtle walk
		p.push();
		p.stroke(fromColor);
		p.strokeWeight(2);
		//p.circle(0,0,10);
		if( modulus_upflag ){ modulus += 1; modulus_upflag = false };
		for( let i=0; i < steps; i++ ){
			if( i < mySeq.length ){
				myTerm = mySeq[i]+translation;
				if( modulus > ruleset.length || p.abs(myTerm) > p.MAX_VALID_INTEGER || modulus == 0 || myTerm == NaN ){ // if modulus is too big, or is zero, then use ruleset length and ignore big terms
					if( myTerm >= ruleset.length || myTerm < 0 || myTerm == NaN ){
						stepdegree = 0;
						stepcount = 0;
					} else {
						//console.log(myTerm);
						stepdegree = ruleset[myTerm][0];
						stepcount = ruleset[myTerm][1];
					}
				} else { 
					//console.log("before:", myTerm);
					myTerm = numthy.modulo(myTerm,modulus);
					//console.log("after:", myTerm);
					stepdegree = ruleset[myTerm][0];
					stepcount = ruleset[myTerm][1];
				};
				p.rotate(p.radians(stepdegree));
				newx = stepcount*steplength;
				if( colortype == 0 ){
					p.colorMode(p.HSB);
				//col = p.lerpColor(fromColor,toColor,i/steps);
					p.stroke(modulo(360*i/steps,360), 40, 80);
				}
				if( colortype == 1 ) {
					col = p.lerpColor(fromColor,toColor,i/steps);
					p.stroke(col);
				}
				if( colortype == 2 ){
					col = fromColor;
					p.stroke(col);
				}
				p.line( 0, 0, newx, newx );
				p.translate(newx, newx);
			}
		}
		p.pop();
		p.pop();

		//console.log(scaleFactor,xorigin,yorigin);

		// draw menus if called for

		if( true ){ // small menu, always show
			p.push();
			//p.translate(300,200);
			p.translate(p.width*0.75,p.height*(0.1));
			p.fill(255);
			p.strokeWeight(2);
			p.rect( 0, 0, p.width*0.23, p.height*0.8, 10 );
			p.fill(toColor);
			p.textSize(30);
			p.translate(50,50);
			p.text(myName,0,0);
			p.textSize(20);
			lineskip = 30;
			tabspace = 60;
			p.translate(0,lineskip);
			seqstr = "";
			seqstrCt = 0;
			while( seqstr.length < 35 ){
				seqstr += mySeq[seqstrCt];
				seqstr += ",";
				seqstrCt += 1;
			}
			seqstr += "...";
			p.text(seqstr,0,0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.text("press h for help",30,0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.text("length (f/g; v/b)",tabspace,0);
			p.text(p.nf(steps,1,0),0,0);
			p.translate(0,lineskip);
			p.text("modulus (m/n; o/p)",tabspace,0);
			p.text(p.nf(modulus,1,0),0,0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.textSize(25);
			p.text("Turtle Rules:",30,0);
			p.textSize(20);
			p.translate(0,lineskip);
			p.text("press a/x to add/remove",0,0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.text("Term",0,0);
			p.text("Angle",tabspace,0);
			p.text("Speed",2*tabspace,0);
			p.text("Steps",3*tabspace,0);
			p.text("Speed",4*tabspace,0);
			for( let rule = 0; rule < ruleset.length; rule ++ ){
				p.translate(0,lineskip);
				if( rule == highlightedrule ){
					p.push();
					p.strokeWeight(0);
					p.fill(200); // highlightedtype = 0 (angle) or 1 (steps)
					p.rect(tabspace-10+tabspace*1*highlightedtype,-20,1*tabspace, 25);
					p.pop();
				}
				p.text(rule-translation,0,0);
				p.text(p.nf(ruleset[rule][0],1,1),tabspace,0);
				p.text(p.nf(speeds[rule][0],1,3),2*tabspace,0);
				p.text(p.nf(ruleset[rule][1],1,1),3*tabspace,0);
				p.text(p.nf(speeds[rule][1],1,2),4*tabspace,0);
			}
			p.pop();
		}


		if( menu == 1 ){ // big menu
			p.push();
			//p.translate(300,200);
			p.translate(p.width*0.05,p.height*(0.1));
			p.fill(255);
			p.strokeWeight(2);
			p.rect( 0, 0, p.width*0.35, p.height*0.85, 10 );
			p.fill(toColor);
			p.textSize(30);
			p.translate(50,50);
			p.text("Turtle on a Sequence",0,0);
			p.textSize(20);
			lineskip = 30;
			tabspace = 60;
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.text("For each term of the sequence, the turtle turns and steps.", 0,0);
			p.translate(0,lineskip);
			p.text("The sequence is considered modulo m, if m is non-zero.", 0, 0);
			p.translate(0,lineskip);
			p.text("When terms exceed the number of rules, they are ignored.", 0, 0);
			p.translate(0,lineskip);
			p.text("Rules can be set to change at a fixed speed.", 0, 0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.textSize(30);
			p.text("Key Controls", 0, 0);
			p.textSize(20);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.text("h:  toggle this menu", 0, 0);
			p.translate(0,lineskip);
			p.text("e/r:  change sequence", 0, 0);
			p.translate(0,lineskip);
			p.text("9/0:  cycle through presets", 0, 0);
			p.translate(0,lineskip);
			p.text("m/n:  change modulus", 0, 0);
			p.translate(0,lineskip);
			p.text("o/p:  change modulus quickly", 0, 0);
			p.translate(0,lineskip);
			p.text("t/y:  translate terms/rules", 0, 0);
			p.translate(0,lineskip);
			p.text("a/x:  add/remove rules", 0, 0);
			p.translate(0,lineskip);
			p.text("f/g:  lengthen/shorten path slowly", 0, 0);
			p.translate(0,lineskip);
			p.text("v/b:  lengthen/shorten path quickly", 0, 0);
			p.translate(0,lineskip);
			p.text("s/d:  zoom in/out", 0, 0);
			p.translate(0,lineskip);
			p.text("i/j/k/l:  pan around", 0, 0);
			p.translate(0,lineskip);
			p.text("c:  change color", 0, 0);
			p.translate(0,lineskip);
			p.text("1/2:  lower/raise frame rate", 0, 0);
			p.translate(0,lineskip);
			p.text("arrow keys:  choose a rule/speed to change", 0, 0);
			p.translate(0,lineskip);
			p.text("+/-:  change the rule/speed highlighted", 0, 0);
			p.translate(0,lineskip);
		}


	}

	p.keyTyped = function() {
		switch( p.key ){
			case 'm': // m
				modulus_upflag = true;
				break;
			case 'n': // n 
				if(modulus > 0){ modulus -= 1};
				break;
			case 'h': // h
				menu = modulo(menu+1,2); // rotate through menu options
				break;
			case 'o': // big modulus up
				modulus += 20;
				break;
			case 'p': // big modulus down
				if(modulus > 20){ modulus -= 20 };
				break;
			case 'z': // set modulus to 0 (no modulus)
				modulus = 0;
				break;
			case 'f': // change steps depth
				steps += 1;
				break;
			case 'g': // lower steps depth
				if( steps > 1 ){ steps -= 1; }
				break;
			case 't': // translate rules
				translation += 1;
				break;
			case 'y':
				translation -=1;
				break;
			case '2':
				fr += 5;
				p.frameRate(fr);
				break;
			case '1':
				if( fr >= 10 ){ fr -= 5 };
				p.frameRate(fr);
				break;
			case 'a': // add a turtle rule
				ruleset.push([0,0]);
				speeds.push([0,0]);
				break;
			case 'x': // add a turtle rule
				ruleset.pop();
				speeds.pop();
				break;
			case 'c': // change color type
				colortype = modulo(colortype+1,3);
				break;
			case 'e': // change sequence
				mySeqIndex = modulo(mySeqIndex+1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				break;
			case 'r': // change sequence other direction
				mySeqIndex = modulo(mySeqIndex-1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				break;
			case 'q': // change mode
				mode = !mode;
				break;
			case '0': // cycle through presets
				presetIndex = numthy.modulo(presetIndex+1,presets.length);
				p.presetSetup();
				break;
			case '9': // cycle through presets
				presetIndex = numthy.modulo(presetIndex-1,presets.length);
				p.presetSetup();
				break;
		}
		return false;
	}

	p.presetSetup = function() {
		mySupposedName = presets[presetIndex][1];
		for( i = 0; i < myVariety.length; i++ ){
			if( myVariety[i][1] == mySupposedName ){
				mySeqIndex = i;
				mySeq = myVariety[i][0];
				myName = myVariety[i][1];
				ruleset = presets[presetIndex][0].slice();
				speeds = [];
				for( rule in ruleset ){ speeds.push([0,0]); };
				steps = presets[presetIndex][2];
				scaleFactor = presets[presetIndex][3];
				xorigin = presets[presetIndex][4];
				yorigin = presets[presetIndex][5];
				modulus = presets[presetIndex][6];
				//console.log("found sequence", ruleset, speeds );
			}
		}
	}

}

function modulo(a, b) {
  if (b <= 0) { 
    throw new Error("modulus error");
  }
  return a - b*Math.floor(a / b);
}


var myp5 = new p5(turtleWalk, 'turtle-walk-holder');
