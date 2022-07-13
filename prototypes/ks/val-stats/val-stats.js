var valStats = function( p ) {

	// Fonts
	var font;
	var fontsize = 18;

	// Colours
	var fromColor = p.color('#ffff6a');//p.color(218, 165, 32);
	var purple = p.color(72, 61, 139);
	var toColor = p.color('#263764');//p.lerpColor(purple,p.color(0,0,0),0.5);
	var mistColor;

	// Sequences
	var myseq2 = [];

	// Speed of the simulation
	var fr = 5; // frame rate

	// Location of center on the canvas
	var locSeq = { x: 300,	y: 300 };

	// depth of fade
	var fade;

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

	var mySeqNew;
	var primes;
	var transMin,transMax;
	var numframes;
	var frame;

	var seqType = "number"; // the type of the sequence, which controls behaviour

	var dataStart, dataEnd;

	// gcd function
	var numthy = new Numthy(p);  // Call a new number theory object with number theory functions from my p5 library

	p.setup = function() {
		// create canvas
		var canvas = p.createCanvas(1810,910);	

		// set up fonts
		p.textFont('Montserrat');
		p.textSize(fontsize);

		// set up sequences
		myVariety = myManySeq.createVariety(10000);
		mySeqIndex = 0;
		mySeq = myVariety[mySeqIndex][0];
		myName = myVariety[mySeqIndex][1];
		myOEIS = myVariety[mySeqIndex][2];
		seqType = typeof(mySeq[0]);

		// Presets
		presets = []; // name, mode-d, mode-t, beginning, ending
		presets.push(["Integers",0,0,0,1000]);
		presets.push(["Ramanujan Tau",0,0,0,1000]);
		presets.push(["Beatty (floor n*(sqrt2))",0,0,0,1000]);
		presets.push(["Hofstadter G",0,0,0,1000]);
		presets.push(["square root of Riemann zeta",0,0,0,1000]);
		presets.push(["Sums of two fifth powers",0,0,0,1000]);

		presetIndex = 0;

		// "Young tableaux"
		// "Taxicab numbers"
		// "Tile 2xn with Tatami mats"
		// "Pell numbers"
		// "Ramanujan\'s largely composite"
		// "Expansion of (1-x^k)^4"
		// "Primitive part of Fibonaccis"
		// "Multiplic order of 2 mod 2n+1"
		// "Conway's Prime Game"
		// "Conways-Guy"
		// "Catalan numbers"
		// "Fibonacci numbers"
		// "Motzkin numbers"
		// "Prime where cyclo-poly factors"
		// "Prop-Calculus Goedel"
		// "Naranyana\'s cows"
		// "Cubes"
		// "Squares"

		// Set frame rate
		p.frameRate(fr);

		numframes = 100;

		// initial values of booleans
		initialDraw = true;

		// set fade
		fade = 5;

		menu = 0;
		scaleFactor = 1;

		p.fill(100);

		xorigin = 100;
		yorigin = 300;

		translation = 0;


		histotype = -1;

		mySeqNew = true;

		primes = [2,3,5,7,11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241,251,257, 263,269,271,277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431];//, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613];
		transMin = -15;
		transMax = 15;
		if( seqType == "bigint" ){ zero = BigInt(0) }else{ zero = 1 };
		if( seqType == "bigint" ){ one = BigInt(1) }else{ one = 1 };

		dataType = 0;

		//myScale = chroma.scale(['#ffff6a','#093944']).mode('lch');
		myScale = chroma.scale(['#85f4f5','#440919']).mode('lch');
		myScale = chroma.scale(['#b8e8ed','#440919']).mode('lch');
		//myScale = chroma.scale(['#f5d485','#440919']).mode('lch');
		//myScale = chroma.scale(['#f5d485','#092444']).mode('lch');
		//myScale = chroma.scale(['#ede6d8','#041223']).mode('lch');
		//myScale = chroma.scale(['#d9e1f8','#142304']).mode('lch');

		dataStart = 0;
		dataEnd = 1000;
		p.collectData(dataStart,dataEnd);

	}

	p.collectData = function(dataS,dataE) {

		p.noLoop();

		if( true ){ // valuation data
			// collect the p-adic valuation data
			// call histogram data by timeframes[timeframe][0][index-of-prime][translation+transMin][valuation]
			// call totalval sums by timeframes[timeframe][1][index-of-primes][translation+transMin]
			// call colavgs histos by timeframes[timeframe][2][index-of-prime][valuation]
			// call colavgs totalvals by timeframes[timeframe][3][index-of-prime]
			// call residue data by timeframes[timeframe][4][index-of-prime][residue]
			// this stores the total valuation weight of the entire sequence
			
			// set up the container
			timeframes = [];
			framesize = p.floor((dataE-dataS)/numframes);
			console.log("about to build container");
			for( let k = 0; k < (dataE-dataS)/framesize+1; k++ ){ // for each timeframe
				histos = [];
				valuationsum = [];
				histosPer = [];
				valuationsumPer = [];
				residues = [];
				for( let pp = 0; pp < primes.length; pp++ ){ // row (prime)

					// column average stuff
					primeHisto = []; // colavg
					pCount = 0; // colavg
					residueHisto = [];
					for( let h = 0; h < 64; h++ ){ // store up to valuation 64
						primeHisto.push(0);
					}
					for( let r = 0; r < primes[pp]; r++ ){ // store up to prime size
						residueHisto.push(0);
					}
					histos.push(primeHisto);
					valuationsum.push(pCount);
					residues.push(residueHisto);

					// per translation stuff
					primeHistoPer = []; // by trans
					pCountPer = []; //by trans
					for( let j = transMin; j < transMax+1; j++ ){ // column (translation)
						primeHistoPerj = [];
						pCountPerj = 0;
						for( let h = 0; h < 64; h++ ){ // store up to valuation 64
							primeHistoPerj.push(0);
						}
						primeHistoPer.push(primeHistoPerj);
						pCountPer.push(pCountPerj);
					}
					histosPer.push(primeHistoPer);
					valuationsumPer.push(pCountPer);
				}
				timeframes.push([histosPer,valuationsumPer,histos,valuationsum,residues]);
			}
			console.log("container created");
			console.log(mySeq);
			//console.log(timeframes[0][0][0][0][0]); //k,whichof4,p,j,h

			// populate the container
			for( let k = 0; k < (dataE-dataS)/framesize+1; k++ ){ // for each timeframe
				for( let i = 0; i < framesize; i++ ){ // sequence term in the timeframe
					ind = k*framesize + i;
					if( ind < mySeq.length ){
						for( let j = transMin; j < transMax+1; j++ ){ // column (translation)
							if( seqType == "bigint" ){ bigj = BigInt(j) }else{ bigj = j };
							if( typeof(mySeq[ind]) != "bigint" ){ console.log(ind, mySeq[ind]); };
							myTransTerm = mySeq[ind] + bigj;
							for( let pp = 0; pp < primes.length; pp++ ){ // row (prime)
								if ( myTransTerm != NaN ){ // ignore terms that are too large
									if( myTransTerm == 0 ){
										myVal = 0;
										myRes = 0;
									} else {
										if( seqType == "bigint" ){ bigprime = BigInt(primes[pp]) }else{ bigprime = primes[pp] };
										myVal = Number(numthy.nadicVal(myTransTerm,bigprime));
										myRes = Number(numthy.modulo(myTransTerm,bigprime));
									}
									if( seqType == "bigint" ){ bigMyVal = BigInt(myVal) }else{ bigMyVal = myVal };
									timeframes[k][0][pp][j-transMin][myVal] += 1;
									timeframes[k][1][pp][j-transMin] += myVal;
									timeframes[k][2][pp][myVal] += 1;
									timeframes[k][3][pp] += myVal;
									if( j == 0 ){ timeframes[k][4][pp][myRes] += 1; }
								}
							}
						}
					}
				}
			} // at this point the data is not cumulative
			console.log("container populated");
//			console.log(transMax - transMin);
//			for( let k = 0; k < transMax-transMin+1; k++ ){
//				console.log(k,timeframes[10][1][25][k]);
//			}
//			console.log(timeframes[10][3][25]);


			// accumulate the data
			for( let k = 1; k < (dataE-dataS)/framesize+1; k++ ){ // for each frame after the first, add previous one to it
				for( let pp = 0; pp < primes.length; pp++ ){
					timeframes[k][3][pp] += timeframes[k-1][3][pp];
					for( let val = 0; val < 64; val++) {
						timeframes[k][2][pp][val] += timeframes[k-1][2][pp][val];
					}
					for( let r = 0; r < primes[pp]; r++) {
						timeframes[k][4][pp][r] += timeframes[k-1][4][pp][r];
					}
					for( let j = 0; j < transMax - transMin + 1; j++) {
						timeframes[k][1][pp][j] += timeframes[k-1][1][pp][j];
						for( let val = 0; val < 64; val++) {
							timeframes[k][0][pp][j][val] += timeframes[k-1][0][pp][j][val];
						}
					}
				}
			}
			console.log("container accumulated");
			//console.log(transMax - transMin);
			//for( let k = 0; k < 10; k++ ){
			//	console.log(k,timeframes[k][4][5]);
			//}
			//console.log(timeframes[10][4][22]);


		}

		frame = 1;
		p.loop();
	}

	p.draw = function() {
		
		frame = numthy.modulo(frame+1,numframes);
		//
		//
		// set up canvas
		p.clear();
		p.push();
		initialXtranslate = p.width*0.05;
		initialYtranslate = p.height*(0.05);
		p.translate(initialXtranslate, initialYtranslate);
	
		// draw the graph
		xWidth = 20;
		yWidth = 20;
		p.push();
		p.strokeWeight(1);
		p.textSize(13);
		
		// label primes
		p.translate(8,15);
		for( let j = 0; j < primes.length; j++) {
			if( dataType == 0 && histotype == -1 ){ colavg = timeframes[frame][3][j] }else{ colavg = timeframes[frame][1][j][histotype] };
			p.translate(xWidth,0);
			//if( j == 4 ){ p.translate(-4,0); };
			//if( j == 25 ){ p.translate(-3,0); p.textSize(13) };
			p.push();
			p.rotate(-p.radians(45));
			p.text( primes[j], 0, 0 );
			p.pop();
			p.push();
			p.textSize(12);
			p.translate(0, yWidth*(2+transMax-transMin) );
			p.rotate(p.radians(45));
			p.text( colavg, 0, 0 );
			p.pop();
		}
		p.pop();
		p.push();
		p.strokeWeight(1);
		p.textSize(13);
		
		// label translations
		p.translate(-xWidth+20,yWidth-10);
		p.translate(0,yWidth*(transMax-transMin+2));
		for( let i = 0 ; i < transMax - transMin+1; i++) {
			p.translate(0,-yWidth);
			p.text( i + transMin, 0, 0 );
		}
		p.pop();
		p.push();


		// draw big box color histogram
		for( let i = 0 ; i < transMax - transMin+1; i++) { // rows = translations
			p.translate(0,yWidth);
			p.push();
			for( let pp = 0; pp < primes.length; pp++) { // columns = primes
				p.translate(xWidth,0);
				if( dataType == 0 ){ // valuation data
					if( histotype == -1 ){ // meaning, full count histo
						valuenum = timeframes[frame][1][pp][transMax-transMin-i];
						valueden = timeframes[frame][3][pp]/(transMax-transMin);
					} else { // then we are taking just histo of one valuation
						valuenum = timeframes[frame][0][pp][transMax-transMin-i][histotype];
						valueden = timeframes[frame][2][pp][histotype]/(transMax-transMin);
					}
					col = p.color(myScale(p.map(valuenum,0,valueden*7,0,1)).hex());
				} else { // residue data
					valuenum = timeframes[frame][4][pp][numthy.modulo(-(histotype-i-transMin),primes[pp])];
					valueden = frame*(dataEnd-dataStart)/numframes;
					col = p.color(myScale(p.map(valuenum,0,3*valueden/primes[pp],0,1)).hex());
				}
				p.fill(col);
				p.strokeWeight(0);
				p.rect(0,0,xWidth,yWidth);
			}
			p.pop();
		}
		p.pop();
		p.pop();


		// draw menus if called for

		if( true ){ // small menu, always show
			p.push();
			
			// location of menu
			p.translate(p.width*0.05,p.height*(0.8));
			p.fill(toColor, alpha=0.5);
			p.textSize(30);

			// name of sequence
			p.translate(50,50);
			p.text(myName,0,0);
			p.textSize(20);
			lineskip = 30;
			columnskip = 400;
			tabspace = 60;
			p.translate(0,lineskip);

			// sequence first few terms
			seqstr = "";
			seqstrCt = 0;
			while( seqstr.length < 135 ){
				seqstr += mySeq[seqstrCt];
				seqstr += ", ";
				seqstrCt += 1;
			}
			seqstr += "...";
			p.text(seqstr,0,0);
			p.translate(0,lineskip);

			// what type of data
			if( dataType == 0 && histotype == -1 ){ p.text("Valuations, total sum",0,0); }
			if( dataType == 0 && histotype != -1 ){ p.text("Valuations, tendency to "+p.nf(histotype,1,0),0,0); }
			if( dataType == 1 ){ p.text("Residues, tendency to "+p.nf(histotype,1,0),0,0); }
			p.translate(0,lineskip);
			p.text("Terms beginning at "+p.nf(dataStart,0,0)+", ending at "+p.nf(dataEnd,0,0),0,0);
			p.translate(0,lineskip);
			p.text("Press h for help",0,0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.translate(columnskip,-4*lineskip);

			//p.text("",tabspace,0);
			//p.text(p.nf(steps,1,0),0,0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.textSize(25);
			p.pop();


			// draw a little graph depending on where mouse is
			
			// choose mouse position
			mouseTrans = transMax - transMin + 1 - p.floor((p.mouseY-initialYtranslate)/yWidth); // pick out mouse position
			mousePrime = p.floor((p.mouseX-initialXtranslate)/xWidth)-1;
			whichTranslate = -1;
			whichPrime = -1;
			if( mouseTrans >= 0 && mouseTrans < transMax - transMin + 1 && mousePrime >= 0 && mousePrime < primes.length ){
				whichTranslate = mouseTrans;
				whichPrime = mousePrime;
			}
			// call pie graph
			if( whichTranslate > -1 ){
				myarray = timeframes[frame][0][whichPrime][whichTranslate]; // val sum
				p.miniPie(0.9*p.width,0.9*p.height,myarray,10);
				myarray = timeframes[frame][4][whichPrime]; // residues
				p.miniPie(0.77*p.width,0.9*p.height,myarray,primes[whichPrime]);
			}
		}


		if( menu == 1 ){ // big menu
			p.push();
			//p.translate(300,200);
			p.translate(p.width*0.40,p.height*(0.1));
			p.fill(255);
			p.strokeWeight(2);
			p.rect( 0, 0, p.width*0.55, p.height*0.62, 10 );
			p.fill(toColor);
			p.textSize(30);
			p.translate(50,50);
			p.text("Prime Filter",0,0);
			p.textSize(20);
			lineskip = 30;
			tabspace = 60;
			p.translate(0,lineskip*1.8);
			p.text("The rows correspond to the sequence (row '0') and its translates.", 0,0);
			p.translate(0,lineskip);
			p.text("The columns correspond to primes.", 0, 0);
			p.translate(0,lineskip);
			p.text("Mouse over a square to see a pie-chart of residues (left) and valuations (right) mod p.", 0, 0);
			p.translate(0,lineskip*1.8);
			p.textSize(30);
			// what type of data
			if( dataType == 0 && histotype == -1 ){ 
				p.text("Your mode:  Valuations, total sum",0,0);
				p.textSize(20);
				p.translate(0,lineskip*1.8);
				p.text("Darkness of the square represents the total sum of the p-adic valuation of the (translated) sequence.",0,0);
			}
			if( dataType == 0 && histotype != -1 ){ 
				p.text("Your mode:  Valuations, tendency to "+p.nf(histotype,1,0),0,0);
				p.textSize(20);
				p.translate(0,lineskip*1.8);
				p.text("Darkness of the square represents the number of terms with valuation"+p.nf(histotype,1,0)+".",0,0);
			}
			if( dataType == 1 ){ 
				p.text("Your mode:  Residues, tendency to "+p.nf(histotype,1,0),0,0); 
				p.textSize(20);
				p.translate(0,lineskip*1.8);
				p.text("Darkness of the square represents the number of terms being "+p.nf(histotype,1,0)+" modulo p.",0,0);
			}
			p.translate(0,lineskip);
			p.text("The display shows the cumulative stats as more terms are taken, looping.", 0, 0);
			p.translate(0,lineskip);
			p.translate(0,lineskip);
			p.textSize(30);
			p.text("Key Controls", 0, 0);
			p.textSize(20);
			p.translate(0,lineskip*1.8);
			p.text("h:  toggle this menu", 0, 0);
			p.translate(0,lineskip);
			p.text("e/r:  change sequence", 0, 0);
			p.translate(0,lineskip);
			p.text("d:  change mode between valation/residue", 0, 0);
			p.translate(0,lineskip);
			p.text("t:  change sub-type of the mode", 0, 0);
			p.translate(0,lineskip);
			p.text("f/g:  increase/decrease the number of sequence terms to take", 0, 0);
			p.translate(0,lineskip);
			p.text("9/0:  cycle through interesting presets", 0, 0);
			p.translate(0,lineskip);
			//p.text("s/d:  zoom in/out", 0, 0);
			//p.translate(0,lineskip);
			
		}


	}

	p.miniPie = function(xpos, ypos, myarray, maxpie){
		p.push();
		p.translate(xpos,ypos); // where to place the graph
		p.fill(fromColor);
		p.strokeWeight(0);
		sum = 0;
		for( let i = 0; i < maxpie; i++ ){ //myarray.length; i++ ){ // add up pie bits
			sum += myarray[i];
		}
		//console.log(sum);
		origin = 0;
		for( let i = 0; i < maxpie; i++) { //myarray.length; i++ ){ // draw pie bits

			// arc
			p.fill(p.lerpColor(toColor,fromColor,i/maxpie));
			moreangle = 360*myarray[i]/sum;
			if( myarray[i] == sum ){
				p.circle(0,0,90);
			}
			//console.log(origin+moreangle);
			p.arc(0,0,180,180,p.radians(origin),p.radians(origin + moreangle));

			// text
			if( moreangle > maxpie ){
				p.push();
				p.textSize(20);
				p.fill(255);
				p.translate(70*p.cos(p.radians(origin+moreangle/2)),70*p.sin(p.radians(origin+moreangle/2)));
				p.text(i,0,0);
				p.textSize(15);
				p.text(myarray[i],10,10);
				p.pop();
			}
			origin += moreangle;
		}
		//console.log("done");
		p.textSize(30);
		p.text(sum,-20,-20);
		p.pop();
	}

	p.keyTyped = function() {
		switch( p.key ){
			case 't': // m
				histotype = modulo(histotype+2,20)-1;
				p.collectData(dataStart,dataEnd);
				//console.log(histotype);
				break;
			case 'd': // d change type (valuation or residue)
				dataType = modulo(dataType+1,2);
				if( dataType == 0 ){ histotype = -1 };
				if( dataType == 1 ){ histotype = 0 };
				dataStart = 0;
				dataEnd = 1000;
				p.collectData(dataStart,dataEnd);
				break;
			case 'h': // h
				menu = modulo(menu+1,2); // rotate through menu options
				break;
			case 'f': // change sequence length to compute
				dataEnd = dataEnd*2;
				p.collectData(dataStart,dataEnd);
				break;
			case 'g': // lower steps depth
				if( dataEnd > 500 ){ dataEnd = p.floor(dataEnd/2); }
				p.collectData(dataStart,dataEnd);
				break;
			case '2':
				fr += 5;
				p.frameRate(fr);
				break;
			case '1':
				if( fr >= 10 ){ fr -= 5 };
				p.frameRate(fr);
				break;
			case 'r': // change sequence
				mySeqIndex = modulo(mySeqIndex+1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				dataStart = 0;
				dataEnd = 1000;
				seqType = typeof(mySeq[0]);
				if( seqType == "bigint" ){ zero = BigInt(0) }else{ zero = 1 };
				if( seqType == "bigint" ){ one = BigInt(1) }else{ one = 1 };
				p.collectData(dataStart,dataEnd);
				break;
			case 'e': // change sequence other direction
				mySeqIndex = modulo(mySeqIndex-1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				dataStart = 0;
				dataEnd = 1000;
				seqType = typeof(mySeq[0]);
				if( seqType == "bigint" ){ zero = BigInt(0) }else{ zero = 1 };
				if( seqType == "bigint" ){ one = BigInt(1) }else{ one = 1 };
				p.collectData(dataStart,dataEnd);
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
		// name, mode-d, mode-t, beginning, ending
		mySupposedName = presets[presetIndex][0];
		for( i = 0; i < myVariety.length; i++ ){
			if( myVariety[i][1] == mySupposedName ){
				mySeqIndex = i;
				mySeq = myVariety[i][0];
				myName = myVariety[i][1];
				myOEIS = myVariety[i][2];
				dataType = presets[presetIndex][1];
				histoType = presets[presetIndex][2];
				dataStart = presets[presetIndex][3];
				dataEnd = presets[presetIndex][4];
				seqType = typeof(mySeq[0]);
				if( seqType == "bigint" ){ zero = BigInt(0) }else{ zero = 1 };
				if( seqType == "bigint" ){ one = BigInt(1) }else{ one = 1 };
				p.collectData(dataStart,dataEnd);
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


var myp5 = new p5(valStats, 'val-stats-holder');
