var chaosGame = function( p ) {

	//var myseq = [1,2,1,165,600,106,70,150,151,152];
//	var myseq = [1, 7, 8, 12, 13, 17, 21, 22, 23, 27, 28, 30, 31, 33, 34, 37, 41, 42, 44, 46, 48, 50, 52, 53, 55, 58, 60, 62, 63, 64, 67, 75, 76, 77, 78, 80, 81, 86, 87, 88, 89, 91, 92, 96, 97, 100, 102, 103, 104, 105, 106, 108, 109, 111, 113, 114, 115, 119, 125, 127, 129, 135, 136];
//	var myseq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 0, 9, 18, 27, 36, 45, 54, 63, 72, 81];
//	var myseq = [5, 7, 19, 11, 41, 31, 53, 109, 47, 83, 127, 271, 107, 251, 191, 499, 311, 811, 239, 929, 659, 839, 431, 683, 503, 2161, 971, 3659, 2267, 3119, 1319, 4421, 4969, 2663, 2999, 1871, 4373, 4871, 6551, 9311, 5939, 10099, 5039, 8423, 11423, 13309, 9839, 16001];
//	var myseq = [1, 1, 1, 3, 5, 12, 30, 79, 227, 709, 2318, 8049, 29372, 112000, 444855, 1833072, 7806724, 34252145, 154342391, 712231465];
//	var myseq = [2, 4, 6, 9, 12, 15, 20, 25, 30, 35, 42, 49, 56, 63, 70, 77, 88, 99, 110, 121, 132, 143, 156, 169, 182, 195, 208, 221, 238, 255, 272, 289, 306, 323, 342, 361, 380, 399, 418, 437, 460, 483, 506, 529, 552, 575, 598, 621, 644, 667, 696, 725, 754, 783, 812, 841, 87];
//	var myseq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77]; // integers
//	var myseq = [1, 1, 1, 2, 3, 4, 6, 9, 13, 19, 28, 41, 60, 88, 129, 189, 277, 406, 595, 872, 1278, 1873, 2745, 4023, 5896, 8641, 12664, 18560, 27201, 39865, 58425, 85626, 125491, 183916, 269542, 395033, 578949, 848491, 1243524, 1822473, 2670964, 3914488, 5736961, 8407925];

	// Fonts
	var font;
	var fontsize = 18;

	// Colours
	var fromColor = p.color(218, 165, 32);
	var toColor = p.color(72, 61, 139);
	var colorPalette;

	// Parameters of the Chaos Game
	var frac = 0.5;
	var poly = 4;
	var numWalkers = 1;

	// Speed of the simulation
	var fr = 60; // frame rate
	var pixelsPerFrame = 600; // pixels per frame

	// Variables controlling location/size on the canvas
	var locSeq = { x: 400,	y: 410 };
	var locRand = { x: 400,	y: 410 };
	var widthGame = 360;
	var cornersSeq, cornersRand;
	
	// Variables during drawing
	var cornerChoiceSeq, cornerChoiceRand;
	var cornerNumSeq, cornerNumRand;
	var arrayWalkersSeq = [];
	var arrayWalkersRand = [];
	var pixelCount = 0;
	var myIndex = 0;

	var myManySeq = new manySeq(p);
	var mySeqIndex = 19;

	var showFlag = 0;
	var circSize = 1; // size of pixel

	var headFade = 10; // number of initial terms to ignore

	var colorStyle = 0;
	var highlightWalker = 0;

	var basicAlpha = 50;

	var randomflag = false;

	// set up colour palettes
	var palettes, colorPaletteIndex;

	var showgon = false;

	// set up number theory 
	var numthy = new Numthy(p);  // Call a new number theory object with number theory functions from my p5 library


	p.setup = function() {
		// create canvas
		var canvas = p.createCanvas(1550,900);	
		p.clear();

		// set up fonts
		p.textFont('Montserrat');
		p.textSize(fontsize);

		// Choose sequences
		//myseq = p.createA002024(100000); 
		//mySeq = p.createIntegers(1000); // creates integers as an array
		//mySeq = p.createFibsmodn(10000,100000000000); // creates Fibs mod modulus
		//mySeq = p.createModPow(100000,3,1000003); // wow!  this is a pattern in powers of 3, before repeats, try on square!
		//mySeq = p.createModSquare(10000,1000003); 
		//mySeq = p.createModQuad(10000,1000003,1,0,8); 
		//mySeq = p.createModCubic(10000,1000003,3,2,15); 
		//mySeq = p.createModPow(100000,2,1000105); // on square
		//myseq = p.createModPow(100000,3,1000289); // same big effect
		//myseq = p.createModPow(100000,2,1000667); // safe prime
		//mySeq = primes10Seq;
		//mySeq = p.createFloorReal(10000,math.sqrt(2));
		//mySeq = p.createFloorQuad(10000);
		//mySeq = p.createFloorLog(10000);
		//mySeq = p.createHailstone(10000,837799);
		//mySeq = p.createLongRangeRand(100000,100);
		//mySeq = p.createRandChunks(1000000,11,30);
		//mySeq = p.createRandChunks2(1000000,2); // pretty!
		//mySeq = p.createRandChunks2(100000,2); // pretty on two walkers!!
		//mySeq = p.createRandChunks2(100000,2);
		//mySeq = myRotorSeq; // wow, cool!
		
		
		
		// set up sequences
		myVariety = myManySeq.createVariety(100000);
		mySeq = myVariety[mySeqIndex][0];
		myName = myVariety[mySeqIndex][1];
		myOEIS = myVariety[mySeqIndex][2];
		if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }


		// set up presets
		presets = []; // name, modulus, frac, numwalkers, dotsize, darkness, head fade, color style
		presets.push(['3^n modulo 1000003',4,0.5,1,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Prime numbers',8,0.5,1,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Coeffs of j q-expansion',10,0.5,2,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Number of divisors of n',12,0.5,6,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Cototient function',6,0.5,6,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Prime quaternions of norm n',11,0.5,3,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Rounded zeta zeroes',59,0.5,6,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Rounded zeta zeroes',4,0.5,2,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Toothpick sequence',115,0.5,1,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Hofstadter Figure-Figure',81,0.5,1,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Hofstadter Figure-Figure',8,0.5,5,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Weird numbers',63,0.5,1,1,250,10,0]); // two walkers; one diffuse, one not
		presets.push(['Moebius function',3,0.5,6,1,250,10,0]); // two walkers; one diffuse, one not
		

		// set up palettes
		// dot color list, background, text, polyoutcolor
		palettes = [
			[ 
				[toColor, fromColor, p.color('#003f5c'),p.color('#ff6361'),p.color('#ffa600'),p.color('#bc5090'),p.color('#58508d')], 
				p.color(255),
				toColor, 
				p.color(225)
			],
			[ 
				[toColor, fromColor, p.color('#003f5c'),p.color('#ff6361'),p.color('#ffa600'),p.color('#bc5090'),p.color('#58508d')], 
				p.color(20), 
				fromColor,
				p.color(0)
			]
		]
		colorPaletteIndex = 0;
		colorPalette = palettes[colorPaletteIndex][0];
		backgroundColor = palettes[colorPaletteIndex][1];
		textColor = palettes[colorPaletteIndex][2];
		textColor.setAlpha(250);
		polyColor = palettes[colorPaletteIndex][3];

		presetIndex = 0;
		p.presetSetup();
		p.preDraw();


	}

	p.preDraw = function() {

		p.clear();
		p.background(backgroundColor);
		if( showgon ){ p.background(polyColor); };

		pixelCount = 0;
		myIndex = 0;

		// set up arrays of walkers
		arrayWalkersSeq = [];
		//arrayWalkersRand = [];
		for( i = 0; i < numWalkers; i++ ){
			arrayWalkersSeq.push({ x:locSeq.x, y:locSeq.y }); // all start at origin
		//	arrayWalkersRand.push({ x:locRand.x, y:locRand.y }); // all start at origin
		}

		//myRand = p.createRandom(mySeq.length+1,poly); // creates random integers in range 0 to N

		// Set up the windows and return the coordinates of the corners
		cornersSeq = p.chaosWindow(poly,locSeq.x,locSeq.y,widthGame); // draws the chaos diagram
		//cornersRand = p.chaosWindow(poly,locRand.x,locRand.y,widthGame); // draws the chaos diagram
		cornersLabels = p.chaosWindow(poly,locSeq.x,locSeq.y,widthGame+20);

		// Set frame rate
		p.frameRate(fr);


		showFlag = 0; // 0 = show the sequence, 1 = show random

		// create the polygon and label the corners
		if( showgon ){
			p.fill(backgroundColor);
			p.noStroke();
			p.beginShape();
			for (let i = 0; i < cornersSeq.length; i++ ) {
			    p.vertex(cornersSeq[i].x,cornersSeq[i].y);
			}
			p.endShape(p.CLOSE);
			p.fill(textColor);
			for( i = 0; i < cornersLabels.length; i++ ){
				p.text( i, cornersLabels[i].x, cornersLabels[i].y );
			}
		}

	}

	p.draw = function() {


		// if pixelcount is still under the sequence length, keep going
		if( pixelCount + pixelsPerFrame < mySeq.length ){
			p.strokeWeight(0);
			// work out the next pixelsPerFrame pixels
			for( let i = 0; i < pixelsPerFrame; i++ ){

				myIndex = pixelCount+i;
				
				// choose which walker to move
				walkerNumSeq = myIndex;
				//walkerNumRand = myIndex;

				// choose the corner to move to
				indCorSeq = mySeq[myIndex];
				//indCorRand = myRand[myIndex];

				//console.log(indCorSeq, Number.MAX_SAFE_INTEGER);
				if( true ){ //p.abs(indCorSeq) < Number.MAX_SAFE_INTEGER ){

					// move that direction
					cornerNumSeq = numthy.modulo(indCorSeq,bigmod);
					//cornerNumRand = modulo(indCorRand,poly);
					cornerCoordSeq = cornersSeq[cornerNumSeq];
					//cornerCoordRand = cornersRand[cornerNumRand];
					walker = modulo(walkerNumSeq,numWalkers);
					arrayWalkersSeq[walker].x = (1-frac)*arrayWalkersSeq[walker].x+frac*cornerCoordSeq.x;
					arrayWalkersSeq[walker].y = (1-frac)*arrayWalkersSeq[walker].y+frac*cornerCoordSeq.y;
					//walker = modulo(walkerNumRand,numWalkers);
					//arrayWalkersRand[walker].x = (1-frac)*arrayWalkersRand[walker].x+frac*cornerCoordRand.x;
					//arrayWalkersRand[walker].y = (1-frac)*arrayWalkersRand[walker].y+frac*cornerCoordRand.y;
					
					// setup color
					if( colorStyle == 0 ){ // colour by walker
						myColSeq = colorPalette[modulo(walkerNumSeq,numWalkers)];
					//	myColRand = colorPalette[modulo(walkerNumRand,numWalkers)];
						myColSeq.setAlpha(basicAlpha);
					//	myColRand.setAlpha(basicAlpha);
					}
					if( colorStyle == 1 ){ // colour by destination
						myColSeq = colorPalette[numthy.modulo(Number(numthy.modulo(cornerNumSeq,bigmod)),colorPalette.length)];
						myColSeq.setAlpha(basicAlpha);
					}
					if( colorStyle == 2 ){ // colour by index
						myColSeq = p.lerpColor(fromColor, toColor, myIndex/mySeq.length );
						myColSeq.setAlpha(basicAlpha);
					}
					if( colorStyle == 3 ){ // colour one walker
						if( walker == highlightWalker ){
							myColSeq = colorPalette[0];
							myColSeq.setAlpha(basicAlpha);
						} else {
							myColSeq = p.color(255);
							myColSeq.setAlpha(basicAlpha);
						}
					}

					// draw some circles
					p.fill(myColSeq);
					walker = modulo(walkerNumSeq,numWalkers);
					if( showFlag == 0 && myIndex >= headFade ){
						p.circle( arrayWalkersSeq[walker].x, arrayWalkersSeq[walker].y, circSize*0.5 );
					}
					//p.fill(myColRand);
					//walker = modulo(walkerNumRand,numWalkers);
					//if( showFlag == 1 && myIndex >= headFade ){
				//		p.circle( arrayWalkersRand[walker].x, arrayWalkersRand[walker].y, circSize );
				//	}
				}

			}
			pixelCount += pixelsPerFrame;
		} 

		p.drawSmallMenu();
	}

	p.drawSmallMenu = function() {
		p.push();
		//p.translate(300,200);
		p.translate(p.width*0.65,p.height*(0.1));
		p.fill(backgroundColor);
		p.strokeWeight(2);
		p.rect( 0, 0, p.width*0.30, p.height*0.75, 10 );
		p.fill(textColor);
		p.noStroke();
		p.textSize(30);
		p.translate(50,50);
		p.text(myName,0,0);
		p.translate(0,35);
		p.text(myOEIS,0,0);
		p.textSize(20);
		lineskip = 30;
		columnskip = 400;
		tabspace = 200;
		p.translate(0,lineskip);
		seqstr = "";
		seqstrCt = 0;
		while( seqstr.length < 45 ){
			seqstr += mySeq[seqstrCt];
			seqstr += ", ";
			seqstrCt += 1;
		}
		seqstr += "...";
		p.text(seqstr,0,0);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.translate(0,lineskip);

		p.text("Modulus (m/n):",0,0);
		p.text(p.nf(poly,1,0),tabspace,0);
		p.translate(0,lineskip);

		p.text("Fractional step (u/i):",0,0);
		p.text(p.nf(frac,1,2),tabspace,0);
		p.translate(0,lineskip);

		p.text("Number of Walkers (t/y):",0,0);
		p.text(p.nf(numWalkers,1,0),tabspace,0);
		p.translate(0,lineskip);

		p.text("Size of dots (f/g):",0,0);
		p.text(p.nf(circSize,1,0),tabspace,0);
		p.translate(0,lineskip);

		p.text("Darkness (j/k):",0,0);
		p.text(p.nf(basicAlpha,1,0),tabspace,0);
		p.translate(0,lineskip);

		p.text("Head fade (v/b):",0,0);
		p.text(p.nf(headFade,1,0),tabspace,0);
		p.translate(0,lineskip);

		p.text("Color style (c):",0,0);
		if( colorStyle == 0 ){
			p.text("colour by walker",tabspace,0);
		}
		if( colorStyle == 1 ){
			p.text("colour by destination",tabspace,0);
		}
		if( colorStyle == 2 ){
			p.text("colour by index",tabspace,0);
		}
		if( colorStyle == 3 ){
			p.text("colour one walker",tabspace,0);
			p.translate(0,lineskip);
			p.text("Highlighted walker (9/0):",0,0);
			p.text(p.nf(highlightWalker,1,0),tabspace,0);
			p.translate(0,lineskip);
		}
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.text("q: toggle random",0,0);
		p.translate(0,lineskip);
		p.text("l: toggle background",0,0);
		p.translate(0,lineskip);
		p.text("p: change palette",0,0);

		p.translate(0,lineskip);
		p.textSize(25);
		p.pop();


	}

	p.keyTyped = function() {
		switch( p.key ){
			case 'm': // m
				poly += 1;
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }
				randomflag = false;
				p.preDraw();
				break;
			case 'n': // n 
				if(poly > 2){ poly -= 1};
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }
				randomflag = false;
				p.preDraw();
				break;
			//case 'h': // h
		//		menu = numthy.modulo(menu+1,2); // rotate through menu options
		//		break;
			case 'f': // change circ size
				circSize += 1;
				p.preDraw();
				break;
			case 'g': // lower circ size
				if( circSize > 1 ){ circSize -= 1; }
				p.preDraw();
				break;
			case 'j': // raise alpha
				if( basicAlpha < 245 ){ basicAlpha += 10; }
				p.preDraw();
				break;
			case 'k': // lower alpha
				if( basicAlpha > 10 ){ basicAlpha -= 10; }
				p.preDraw();
				break;
			case 't': // number of walkers
				if( numWalkers < colorPalette.length) { numWalkers += 1; };
				p.preDraw();
				break;
			case 'y': // number of walkers
				if( numWalkers > 1 ){ numWalkers -=1; }
				p.preDraw();
				break;
			case 'u': // fraction
				if( frac < 0.95 ){ frac += 0.05; }
				p.preDraw();
				break;
			case 'i': // fraction
				if( frac > 0.05 ){ frac -= 0.05; }
				p.preDraw();
				break;
			case 'v': // headFade
				headFade += 1;
				p.preDraw();
				break;
			case 'b': // headFade
				if( headFade > 0 ){ headFade -= 1 };
				p.preDraw();
			case '2':
				fr += 5;
				p.frameRate(fr);
				break;
			case '1':
				if( fr >= 10 ){ fr -= 5 };
				p.frameRate(fr);
				break;
			case '8': // change highlighted walker
				highlightWalker = modulo(highlightWalker-1,numWalkers);
				p.preDraw();
				break;
			case '7': // change highlighted walker
				highlightWalker = modulo(highlightWalker+1,numWalkers);
				p.preDraw();
				break;
			case '0': // cycle through presets
				presetIndex = numthy.modulo(presetIndex+1,presets.length);
				p.presetSetup();
				p.preDraw();
				break;
			case '9': // cycle through presets
				presetIndex = numthy.modulo(presetIndex-1,presets.length);
				p.presetSetup();
				p.preDraw();
				break;
			case 'c': // change color style (what to color)
				colorStyle = modulo(colorStyle+1,4);
				p.preDraw();
				break;
			case 'p': // change palette and background
				colorPaletteIndex = modulo(colorPaletteIndex+1,palettes.length);
				colorPalette = palettes[colorPaletteIndex][0];
				backgroundColor = palettes[colorPaletteIndex][1];
				textColor = palettes[colorPaletteIndex][2];
				polyColor = palettes[colorPaletteIndex][3];
				p.preDraw();
				break;
			case 'l': // show or hide polygon & labels
				showgon = !showgon;
				p.preDraw();
				break;
			case 'r': // change sequence
				mySeqIndex = modulo(mySeqIndex+1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }
				p.preDraw();
				break;
			case 'e': // change sequence other direction
				mySeqIndex = modulo(mySeqIndex-1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }
				p.preDraw();
				break;
			case 'q': // toggle random modulo modulus
				randomflag = !randomflag;
				if( randomflag ){
					mySeq = myManySeq.createRandom(mySeq.length,poly);
					myName = "Random Modulo "+poly;
				}
				if( !randomflag ){
					mySeq = myVariety[mySeqIndex][0];
					myName = myVariety[mySeqIndex][1];
					myOEIS = myVariety[mySeqIndex][2];
				}
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }
				p.preDraw();
				break;
		}
		return false;
	}

	p.presetSetup = function() {
		// name, modulus, frac, numwalkers, dotsize, darkness, head fade, color style
		mySupposedName = presets[presetIndex][0];
		for( i = 0; i < myVariety.length; i++ ){
			if( myVariety[i][1] == mySupposedName ){
				mySeqIndex = i;
				mySeq = myVariety[i][0];
				myName = myVariety[i][1];
				myOEIS = myVariety[i][2];
				poly = presets[presetIndex][1];
				frac = presets[presetIndex][2];
				numWalkers = presets[presetIndex][3];
				circSize = presets[presetIndex][4];
				basicAlpha = presets[presetIndex][5];
				headFade = presets[presetIndex][6];
				colorStyle = presets[presetIndex][7];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(poly) }else{ bigmod = poly }
			}
		}
	}



	p.chaosWindow = function(numcorners,xloc,yloc,rad) {
		var pts = [], angle, newpt;
		for( var i = 0; i < numcorners; i++ ){ // create corner points
			angle = p.radians( 45+360*i/numcorners );
			newpt = { x:0, y:0 };
			newpt.x = xloc + rad*math.cos(angle);
			newpt.y = yloc + rad*math.sin(angle);
			pts.push(newpt);
		}
		return pts;
	}

	p.createRandChunks2 = function(bd, spacing) {
		var myinseq = [];
		var termrep = 1;
		var moveforward = 0;
		var grabseq = p.createRandom(termrep, poly); // get A chuncks
		for( var i = 1; i < bd; i++ ){
			if( modulo(i,termrep+spacing) < termrep ){
			 	next = modulo(moveforward+1,4); //grabseq[modulo(i,termrep+spacing)]; // write A chunk
				moveforward += 1;
			} else {
				next = math.floor(math.random()*(poly));
			}
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createRandChunks = function(bd, termrep, spacing) {
		var myinseq = [];
		var grabseq = p.createRandom(termrep, poly); // get A chuncks
		for( var i = 1; i < bd; i++ ){
			if( modulo(i,termrep+spacing) < termrep ){
			 	next = grabseq[modulo(i,termrep+spacing)]; // write A chunk
			} else {
				next = math.floor(math.random()*(poly));
			}
			myinseq.push(next);
		}
		return myinseq;
	}


	p.createLongRangeRand = function(bd, termrep) {
		var myinseq = [];
		var grabseq = p.createRandom(termrep, poly);
		for( var i = 1; i < bd; i++ ){
			next = grabseq[modulo(i,termrep)];
			myinseq.push(next);
		}
		return myinseq;
	}


	p.createFloorLog = function(bd) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = math.floor(math.log(i));
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createFloorQuad = function(bd) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = math.floor(math.sqrt(i));
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createFloorReal = function(bd,alpha) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = math.floor(alpha*i);
			myinseq.push(next);
		}
		return myinseq;
	}


	p.createModCubic = function(bd,mod,a,b,c) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(myinseq[i-1]**3 + a*myinseq[i-1]**2+b*myinseq[i-1]+c,mod);
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createModQuad = function(bd,mod,a,b,c) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(a*myinseq[i-1]**2+b*myinseq[i-1]+c,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	p.createModSquare = function(bd,mod) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(myinseq[i-1]**2,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	p.createModPow = function(bd,gen,mod) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(myinseq[i-1]*gen,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	p.createPentagonal = function(bd) {
		var myinseq = [0,1];
		var next = 0;
		for( var i = 2; i < bd; i++ ){
			myinseq.push(i*(3*i-1)/2);
		}
		return myinseq;
	}

	p.createA002024 = function(bd) {
		var myinseq = [0,1];
		var next = 0;
		for( var i = 2; i < bd; i++ ){
			next = math.floor(math.sqrt(2*i)+1/2);
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createHailstone = function(bd,initial) {
		var myinseq = [initial];
		var next = 0;
		for( var i = 0; i < bd; i++ ){
			if( modulo(myinseq[i],2) == 0 ){
				next = myinseq[i]/2;
			}else{
				next = 3*myinseq[i]+1;
			};
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createA006369 = function(bd) {
		var myinseq = [0,1];
		var next = 0;
		for( var i = 2; i < bd; i++ ){
			if( modulo(i,3) == 0 ){
				next = 2*i/3;
			}else{
				next = math.round(4*i/3);
			};
			myinseq.push(next);
		}
		return myinseq;
	}

	p.createIntegers = function(bd) {
		var myinseq = [];
		for( var i = 0; i < bd; i++ ){
			myinseq.push(i);
		}
		return myinseq;
	}

	p.createRandom = function(bd,N) {
		var myinseq = [];
		for( var i = 0; i < bd; i++ ){
			rand = math.floor(math.random()*(N));
			myinseq.push(rand);
		}
		return myinseq;
	}

	p.createFibs = function(bd) {
		var myinseq = [1,1,2];
		for( var i = 3; i < bd; i++ ){
			var newfib = myinseq[i-1] + myinseq[i-2];
			myinseq.push(newfib);
		}
		return myinseq;
	}

	p.createFibsmodn = function(bd,nn) {
		var myinseq = [1,1,2];
		for( var i = 3; i < bd; i++ ){
			var newfib = modulo(myinseq[i-1] + myinseq[i-2],nn);
			myinseq.push(newfib);
		}
		return myinseq;
	}
}

function modulo(a, b) {
  if (b <= 0) { 
    throw new Error("modulus error");
  }
  return a - b*Math.floor(a / b);
}


var myp5 = new p5(chaosGame, 'chaos-game-holder');
