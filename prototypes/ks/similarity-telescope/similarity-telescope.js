var simTelescope = function( p ) {

	// Fonts
	var font;
	var fontsize = 18;

	// Colours
	//var fromColor = p.color('#f2766b');//
	var warmColor = p.color(218, 165, 32); // yellow
	var warmColorString = warmColor.toString('#rrggbb');
	var purple = p.color(72, 61, 139);
	var toColor = p.lerpColor(purple,p.color(0,0,0),0.5);
	//var coolColor = p.color('#5fc066');
	var coolColor = p.lerpColor(toColor,p.color(0,255,255),0.5);//p.color('#5fc066');
	var coolColorString = coolColor.toString('#rrggbb');
	var zeroColor = p.color(0,0,0);//p.lerpColor(p.color('#5fc066'),p.color(0,0,0),0.5);
	var mistColor;

	// Sequences
	var myseq2 = [];

	// Speed of the simulation
	var fr = 60; // frame rate
	var pixelsPerFrame = 30; // pixels per frame

	// Location of center on the canvas
	var locSeq = { x: 300,	y: 300 };

	// modulus for sequence
	var modulus;

	// depth of fade
	var fade;

	// mode (distance or gcd)
	var mode = 0; // 0 = distance, 1 = gcd

	// the spacing of the grid
	var zoomFactor = 11;

	// some booleans for toggles
	var initialDraw;
	var menu = 1;
	var paleMist = false;
	var axes = false;

	// the size of the purple rectangle
	var backgroundWidth, backgroundHeight; // for purple rectangle

	// to hold sequences
	var myManySeq = new manySeq(p);
	var mySeqIndex = 0;
	var myVariety, mySeq, myName;
	var randomflag = false;
	var jiggleflag = false;
	var jiggle = 1;

	// for p-adic comparison
	var primeAdic = 2;

	// gcd function
	var numthy = new Numthy(p);  // Call a new number theory object with number theory functions from my p5 library
	var bigclass = new BigIntMath(p);  // Call a new object that does basic big int max/min etc

	p.setup = function() {
		// create canvas
		var canvas = p.createCanvas(1610,910);	

		// set up fonts
		p.textFont('Montserrat');
		p.textSize(fontsize);

		// get array of sample sequences
		myVariety = myManySeq.createVariety(3000);
		mySeq = myVariety[mySeqIndex][0];
		myName = myVariety[mySeqIndex][1];
		myOEIS = myVariety[mySeqIndex][2];

		// set up presets
		presets = []; // modulus, contract, translate, fade, mode
		presets.push(["Integers",0,1,1,13,0]);
		presets.push(["Integers",0,1,1,1,1]);
		presets.push(["Fibonacci numbers",0,1,1,6,1]); // compare to integers
		presets.push(["An elliptic divisibility seq",0,1,1,6,1]); // compare to integers
		presets.push(["Catalan numbers",0,1,1,6,1]); // compare to integers
		presets.push(["Conway-Guy",0,1,1,6,1]); // compare to integers
		presets.push(["Conway\'s Prime Game",0,1,1,6,1]); // compare to integers
		presets.push(["Coeffs of j q-expansion",0,1,1,6,1]); // compare to integers
		presets.push(["Squares",48,1,1,13,0]);
		presets.push(["Hofstadter Figure-Figure",20,1,1,4,0]);
		presets.push(["Recaman\'s sequence",24,1,1,7,0]);
		presets.push(["Prime numbers",38,1,1,8,0]);
		presets.push(["Even fractal sequence",38,1,1,8,0]);
		presets.push(["Congruent numbers",20,1,1,4,0]);
		presets.push(["Numerators of harmonic numbers",17,1,1,6,0]);
		presets.push(["Hofstadter-Conway 10K",0,1,1,25,0]); // shows growth rate
		presets.push(["Goldbach (num ways)",0,1,1,25,0]); //mysterious perhaps
		presets.push(["Young tableaux",0,1,1,3,1]);
		presets.push(["Ramanujan Tau",0,1,1,1,1]);
		presets.push(["Hofstadter Q",0,1,1,1,1]);
		presets.push(["Farey denominators",0,1,1,6,0]);
		presets.push(["Farey denominators",0,1,1,6,1]);
		presets.push(["A granny knot sequence",0,1,1,3,1]);
		presets.push(["Numerators well-ordered rat\'ls",0,1,1,7,1]);
		presets.push(["Landau\'s g",0,1,1,1,1]); // a good one to jiggle
		presets.push(["Least odd prime factor",0,1,1,2,1]);

		// Set frame rate
		p.frameRate(fr);

		// initial values of draw parameters
		contract = 1;
		translat = 1; //p.width/zoomFactor;
		modulus = 0;
		if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
		if( typeof(mySeq[0]) == "bigint" ){ bigpadic = BigInt(primeAdic) }else{ bigpadic = primeAdic }
		
		// set up initial Draw (first in presets)
		presetIndex = 0;
		p.presetSetup();


		// initial values of booleans
		initialDraw = true;

		// size of purple rectangle precomputation
		backgroundWidth = zoomFactor*(p.floor(p.width/zoomFactor)-3);
		backgroundHeight = zoomFactor*(p.floor(p.height/zoomFactor)-3);

		// set mist color	
		mistColor = p.lerpColor(toColor,p.color(255),0.2);

		// set fade
		fade = 5;

		// get frequency of terms
		p.histoArray();

		// set sizing flag
		sizing = true;


	}

	p.draw = function() {


		// compute change, run computations only if change necessary
		//contractChange = p.valleyFloor((p.mouseX-p.width/2),-30,30)/80000;
		//translatChange = -p.valleyFloor((p.mouseY-p.height/2),-30,30)/1000;

		contractChange = 0;
		translatChange = 0;

		if( p.keyIsDown(p.LEFT_ARROW) ){
			translatChange = -1/100;
			initialDraw = true;
		}
		if( p.keyIsDown(p.RIGHT_ARROW) ){
			translatChange = 1/100;
			initialDraw = true;
		}
		if( p.keyIsDown(p.UP_ARROW) ){
			contractChange = 1/1000;
			intialDraw = true;
		}
		if( p.keyIsDown(p.DOWN_ARROW) ){
			contractChange = -1/1000;
			initialDraw = true;
		}
		if( initialDraw  
			|| ( p.keyIsPressed && p.focused && (contractChange != 0 || translatChange != 0) ) 
			){

			p.freshDraw();

			if( menu == 2 ){ p.bigMenu(); }

			if( menu == 1 ){ p.smallMenu(); }

			initialDraw = false;
		}

		if( p.keyIsPressed == false ){
			p.noLoop();
		}


	}

	p.histoArray = function() {

		//console.log(mySeq);
		//arrayMax = math.max(...mySeq.slice(0,p.floor(p.width/zoomFactor)));

		bins = new Map();
		binsArrayMax = 0;
		for( i = 0; i < mySeq.length; i++ ){
			if( modulus > 0 ){ myval = numthy.modulo(mySeq[i],bigmod); }
			if( modulus == 0 ){ myval = mySeq[i]; }
			if( bins.get(myval) != undefined ){
				bins.set(myval, bins.get(myval) + 1);
			} else {
				bins.set(myval,1);
			}
			if( bins.get(myval) > binsArrayMax ){ binsArrayMax = bins.get(myval) };
		}

		mybins = bins;
	}


	p.freshDraw = function() {
		contract += contractChange;
		translat += translatChange;

		p.clear();
		shownArray = [];

		//arrayMax = math.max(...mySeq.slice(0,p.floor(p.width/zoomFactor)));
		if( axes ){
			// label the axes
			p.textSize(zoomFactor);
			for (let j = 2; j < p.floor(p.height/zoomFactor)-1; j++) { // label y axis
				p.text(modulo(j-2,10),5,(j+1)*zoomFactor);
			}
			for (let i = 2; i < p.floor(p.width/zoomFactor)-1; i++) { // label x axis
				p.text(modulo(i-2,10),i*zoomFactor,20);
			}
		}

		// fill background to boxes
		c = toColor;
		p.fill(c);
		p.strokeWeight(1);
		p.rect(2*zoomFactor,2*zoomFactor,backgroundWidth,backgroundHeight);

		// run through the boxes and fill
		for (let j = 2; j < p.floor(p.height/zoomFactor)-1; j++) { // y coordinate (row)
			for (let i = 2; i < p.floor(p.width/zoomFactor)-1; i++) { // x coordinate (column entries in row)

				// compute the new index
				//indexFun = p.floor((contract**(j-2))*(i-2) + translat*(j-2));
				indexFun = p.floor( translat*(j-2) + contract*(i-2) );
				
				//c = p.lerpColor(warmColor, toColor, modulo(mySeq[p.floor(indexFun)],modulus)/modulus);
				
				// compare new index to column header
				compareVal = mySeq[indexFun];
				baseVal = mySeq[i-2];
				if( modulus > 0 ){  // if there's a modulus, we compare with respect to that
					compareVal = numthy.modulo(compareVal,bigmod);
					baseVal = numthy.modulo(baseVal,bigmod);
				}

				// fill the rectangles individually if axes or pale mist
				p.noFill();
				if( indexFun < 0 || indexFun >= mySeq.length ){
					c = p.color(0,0,0); // fill in failed computations with a failure color
					p.fill(c);
				}
				if( paleMist ){ // if pale mist is turned on, change background color
					if ( shownArray.includes(indexFun) ){ // if we've already seen this index above, pale
						c = mistColor; 
						p.fill(c);
					}
					shownArray.push(indexFun);
				}
				p.strokeWeight(0);
				p.rect(i*zoomFactor, j*zoomFactor, zoomFactor, zoomFactor);

				// put on a dot if it is same value and we are in the defined zone
				if( indexFun > 0 && indexFun < mySeq.length && i-2 < mySeq.length && baseVal != Infinity && compareVal != Infinity ){
					zero = 0;
					one = 1;
					two = 2;
					if( typeof(baseVal) == "bigint" || typeof(compareVal) == "bigint" ){
						baseVal = BigInt(baseVal);
						compareVal = BigInt(compareVal);
						zero = BigInt(0);
						one = BigInt(1);
						two = BigInt(2);
					}
					if( mode == 0 ){ // additive difference mode
						diff = baseVal - compareVal;
						if( modulus > 0 ){
							if( diff < zero ){ diff = diff + bigmod };
							if( two*diff > bigmod ){ diff = bigmod - diff };
						}
					}
					if( mode == 1 ){ // gcd (divisibility) difference mode
						mygcd = numthy.gcd( baseVal, compareVal );
						mymin = bigclass.min( bigclass.abs(baseVal), bigclass.abs(compareVal) );
						mymax = bigclass.max( bigclass.abs(baseVal), bigclass.abs(compareVal) );
						if( mygcd == 0 ){ lerp = 0 }else{
							if( typeof(mymin) == "bigint" && mymax > p.MAX_SAFE_INTEGER ){
								minlen = mymin.toString(2).length-0.75;
								maxlen = mymax.toString(2).length-0.75;
								gcdlen = mygcd.toString(2).length-0.75;
							} else {
								minlen = Math.log2(Number(mymin))+0.25;
								maxlen = Math.log2(Number(mymax))+0.25;
								gcdlen = Math.log2(Number(mygcd))+0.25;
							}
							ratio = (gcdlen/minlen)**(3/fade); // should be between 0 and 1
							absdiff = (1-ratio)*fade;
							if( bigclass.abs(baseVal) < bigclass.abs(compareVal) ){ diff = -absdiff }else{ diff = absdiff };
						}
					}
					if( mode == 2 ){ // 2-adic comparison mode
						if( baseVal == zero ){ baseAdic = zero }else{	
							if( modulus > 0 ){
								baseAdic = numthy.modulo(numthy.nadicVal( baseVal, bigpadic ),bigmod);
							} else {
								baseAdic = numthy.nadicVal( baseVal, bigpadic );
							}
						}
						if( compareVal == zero ){ compareAdic = zero }else{ 
							if( modulus > 0 ){
								compareAdic = numthy.modulo(numthy.nadicVal( compareVal, bigpadic ), bigmod);
							} else {
								compareAdic = numthy.nadicVal( compareVal, bigpadic );
							}
						}
						diff = bigclass.abs(baseAdic - compareAdic);
						//console.log(baseVal,compareVal,baseAdic,compareAdic,diff);
					}
					if( typeof(diff) == "bigint" ){ nfade = BigInt(fade) }else{ nfade = fade };
					myfade = bigclass.max(bigclass.min(diff,nfade),-nfade);
					if( typeof(myfade) == "bigint" ){ myfade = Number(myfade) };
					mixing = p.map(Math.atan(p.map(myfade,-fade,fade,-10,10)),-p.PI/2,p.PI/2,0,1);
					if( mode == 1 ){
						col1 = chroma.mix(coolColorString,warmColorString,mixing,'lab').brighten(minlen/maxlen);
					} else {
						col1 = chroma.mix(coolColorString,warmColorString,mixing,'lab').brighten(1);
					}
					c = p.lerpColor(p.color(col1.hex()),toColor,p.abs(myfade)/fade);
					//coolColor = p.lerpColor(c,p.color('#5fc066'),0.5);
					mycircsize = zoomFactor/2.1;
					if( mode == 1 ){ 
						if( mymin == 0 ){ // when one of the two numbers is zero, indicate failure of gcd this way
							c = p.color(100,100,100);
							mycircsize = mycircsize*0.4;
						}
					}
					p.fill(c);
					p.strokeWeight(0);
					//if( modulus > 0 ){ mycircsize = mycircsize*(1-p.map(baseVal,modulus,0,0,0.6)); }
					//if( modulus == 0 ){ mycircsize = mycircsize*(1-p.map(baseVal,arrayMax,0,0,0.6)); }
					//sizing = false;
					//if( sizing ){ mycircsize = mycircsize*(1-p.map(mybins.get(baseVal)/mySeq.length,0,0.5,0,0.6)); }
					p.circle((i+1/2)*zoomFactor,(j+1/2)*zoomFactor, mycircsize);
					//c = p.lerpColor(warmColor, toColor, p.abs(baseVal-compareVal)/3);
				}
			}
		}
	}

	p.bigMenu = function() {
		p.fill(255,alpha=220);
		p.strokeWeight(0);
		p.translate(60,60);
		p.rect( 0,0,p.width-120,700,20 );
		p.fill(toColor);
		p.push();
		p.translate(50,0);
		lineskip = 25;
		p.textSize(40);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.text("Self-Similarity Telescope", 0,0);
		p.textSize(20);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.text("Each row is a translated, contracted subsequence of the original:", 0,0);
		p.translate(0,lineskip);
		p.text("Position (x,y) compares the terms at index floor( c*x + t*y ) and index x.", 0,0);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		if( mode == 0 ){
			p.text("You are using distance comparison mode.",0,0);
			p.translate(0,lineskip);
			p.text("The brightness of a star indicates the distance",0,0);
			p.translate(0,lineskip);
			p.text("distance (color indicates sign) between the compared terms.",0,0);
			p.translate(0,lineskip);
		}
		if( mode == 1 ){
			p.text("You are using divisibility detection mode.",0,0);
			p.translate(0,lineskip);
			p.text("Bright stars indicate high gcd relative to the term sizes.",0,0);
			p.translate(0,lineskip);
			p.text("The colour of the star indicates which term is bigger in absolute value.",0,0);
			p.translate(0,lineskip);
		}
		if( mode == 2 ){
			p.text("You are using n-adic comparison mode.",0,0);
			p.translate(0,lineskip);
			p.text("This is like distance comparison mode on the n-adic valuation",0,0);
			p.translate(0,lineskip);
			p.text("instead of the sequence itself.",0,0);
			p.translate(0,lineskip);
		}
		p.translate(0,lineskip);
		p.text("The sequence is considered modulo m, if m is non-zero.", 0,0);
		p.translate(0,lineskip);
		p.text("Mouse over a star to see indices and values.", 0,0);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
	        p.text("Hints:",0,0);	
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.text("Vertical lines correspond to fixed x.",0,0);
		p.translate(0,lineskip);
		p.text("Horizontal lines correspond to fixed translation.",0,0);
		p.translate(0,lineskip);
		p.text("Diagonal NW/SE lines correspond to fixed contractions.",0,0);
		p.translate(0,lineskip);
		p.text("Diagonal NE/SW lines can correspond to fixed floor(c*x+t*y).",0,0);
		p.translate(0,lineskip);
		p.text("",0,0);
		p.pop();

		p.push();
		p.translate(700,60);
		p.textSize(30);
		p.text("Key Controls", 0,0);
		p.textSize(20);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.text("h:  toggle menus/help", 0,0);
		p.translate(0,lineskip);
		p.text("x:  change mode", 0,0);
		p.translate(0,lineskip);
		p.text("e/r:  change sequence", 0,0);
		p.translate(0,lineskip);
		p.text("f/g:  change fade", 0, 0);
		p.translate(0,lineskip);
		p.text("q/w:  zoom in/out", 0,0);
		p.translate(0,lineskip);
		p.text("y:  toggle from given sequence to random sequence modulo modulus (when modulus > 0)", 0,0);
		p.translate(0,lineskip);
		p.text("u:  toggle from given sequence to random jiggle of sequence", 0,0);
		p.translate(0,lineskip);
		p.text("1/2:  raise/lower the amount of jiggle (must rejiggle to see)", 0,0);
		p.translate(0,lineskip);
		p.text("a:  toggle axes", 0,0);
		p.translate(0,lineskip);
		p.text("8:  toggle background mist that indicates indices repeated from earlier", 0,0);
		p.translate(0,lineskip);
		p.text("9/0:  rotate through interesting presets", 0,0);
		p.translate(0,lineskip);
		p.translate(0,lineskip);
		p.text("modulus (m/n; j/k giant step; z for zero):   "+p.nf(modulus,1,0),0,0);
		p.translate(0,lineskip);
		p.text("adic valuation (p/P) in n-adic mode:   "+p.nf(primeAdic,1,0),0,0);
		p.translate(0,lineskip);
		p.text("contraction c (up/down arrow; i/o or I/O larger step; c for one):   "+ p.nf(contract,1,3),0,0);
		p.translate(0,lineskip);
		p.text("translation t (right/left arrow; s/d or S/D larger step; t for zero):   "+ p.nf(translat,1,2),0,0);
		p.pop();
	}

	p.smallMenu = function() {
		p.push();
		p.fill(255,alpha=220);
		p.strokeWeight(0);
		p.translate(p.width-490, p.height-440);
		p.rect(0,0,450,400,20);
		p.fill(toColor);
		p.textSize(30);
		p.translate(20,30);
		lineskip = 25;
		taboffset = 85;
		p.text(myName,0,0);
		p.translate(0,lineskip+5);
		p.text(myOEIS,0,0);
		p.translate(0,lineskip);

		// sequence first few terms
		p.textSize(20);
		seqstr = "";
		seqstrCt = 0;
		while( seqstr.length < 35 ){
			seqstr += mySeq[seqstrCt];
			seqstr += ", ";
			seqstrCt += 1;
		}
		seqstr += "...";
		p.text(seqstr,0,0);
		p.translate(0,lineskip);
		if( mode == 0 ){ p.text("Distance similarity (x to change)",0,0); }
		if( mode == 1 ){ p.text("Divisibility detection (x to change)",0,0); }
		if( mode == 2 ){ p.text("n-adic similarity (x to change)",0,0); }
		p.translate(0,lineskip);
		p.translate(0,lineskip/2);

		if( mode == 2 ){ 
			p.text("n-adic valuation (p/P)",1.3*taboffset,0);
			p.text(p.nf(primeAdic,1,0),0,0);
			p.translate(0,lineskip);
		}
		p.text("modulus (m/n; j/k; z)",1.3*taboffset,0);
		p.text(p.nf(modulus,1,0),0,0);
		p.translate(0,lineskip);
		p.text("contract (up/down; i/o; c)",1.3*taboffset,0);
		p.text(p.nf(contract,1,3),0,0);
		p.translate(0,lineskip);
		p.text("translate (right/left; s/d; t)",1.3*taboffset,0);
		p.text(p.nf(translat,1,2),0,0);
		p.translate(0,lineskip);
		p.text("fade (f/g)",1.3*taboffset,0);
		p.text(p.nf(fade,1,0),0,0);
		p.translate(0,lineskip);
				// get index under mouse
		xx = p.floor(p.mouseX/zoomFactor)-2;
		yy = p.floor(p.mouseY/zoomFactor)-2;
		mouseIndex = p.floor(contract*xx + translat*yy);
		p.text("frequency",1.3*taboffset,0);
		mybinskey = mySeq[xx];
		if( modulus > 0 ){ mybinskey = numthy.modulo(mybinskey,bigmod); }
		p.text(p.nf(mybins.get(mybinskey)/mySeq.length,1,2),0,0);
		p.translate(0,lineskip);
		p.text(xx,2*taboffset,0);
		p.text(mouseIndex,3*taboffset,0);
		p.text("indices compared:",0*taboffset,0);
		p.text("diff="+p.nf(mouseIndex-xx,0,0),4*taboffset,0);
		p.translate(0,lineskip);
		if( mode == 2 ){
			p.text("n-adic values compared",2*taboffset,0);
			if( mySeq[xx]==0 || xx > mySeq.length ){ val = "" }else{ val = numthy.nadicVal(mySeq[xx],bigpadic); };
			p.text(val,0,0);
			if( mySeq[mouseIndex]==0 || mouseIndex > mySeq.length ){ val = "" }else{ val = numthy.nadicVal(mySeq[mouseIndex],bigpadic); };
			p.text(val,taboffset,0);
		} else {
			p.text("values compared:",0,0);
			p.text(mySeq[xx],2*taboffset,0);
			p.translate(0,lineskip);
			p.text(mySeq[mouseIndex],2*taboffset,0);
			p.translate(0,lineskip);
			if( mode == 1 ){
				p.text("gcd:",0,0);
				if( mouseIndex < mySeq.length && (typeof(mySeq[mouseIndex]) == "number" || typeof(mySeq[mouseIndex]) == "bigint") ){
					p.text(numthy.gcd(mySeq[xx],mySeq[mouseIndex]),2*taboffset,0);
				}
			} else {
				p.text("difference:",0,0);
				p.text(mySeq[mouseIndex]-mySeq[xx],2*taboffset,0);
			}
		}
		p.translate(0,lineskip*1.3);

		p.text("e/r change seq; y toggle random; u jiggle; h help",0,0);
		p.pop();
	}

	p.keyPressed = function() {
		initialDraw = true;
		p.loop();
	}

	p.mouseMoved = function() {
		initialDraw = true;
		p.loop();
	}

	p.keyTyped = function() {
		switch( p.key ){
			case 'm': // m
				modulus += 1;
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				p.histoArray();
				break;
			case 'n': // n 
				if(modulus > 0 ){ modulus -= 1};
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				p.histoArray();
				break;
			case 'c': // c
				contract = 1;
				break;
			case 'h': // h
				menu = modulo(menu+1,3); // rotate through menu options
				break;
			case '8': //
				paleMist = !paleMist;
				break;
			case 'k': // big modulus up
				modulus += 20;
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				p.histoArray();
				break;
			case 'j': // big modulus down
				if(modulus > 20){ modulus -= 20 };
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				p.histoArray();
				break;
			case 'i': // big contract down
				contract -= 0.2;
				break;
			case 'I': // big contract down
				contract -= 1;
				break;
			case 'o': // big contrac up
				contract += 0.2;
				break;
			case 'O': // big contrac up
				contract += 1;
				break;
			case 's': // big translat down
				translat -= 1;
				break;
			case 'S': // big translat down
				translat -= 20;
				break;
			case 'd': // big translate up
				translat += 1;
				break;
			case 'D': // big translate up
				translat += 20;
				break;
			case 't': // translte = 1
				translat = 0;
				break;
			case 'a': // toggle axes
				axes = !axes;
				break;
			case 'z': // set modulus to 0 (no modulus)
				modulus = 0;
				break;
			case 'g': // change fade depth
				fade += 1;
				break;
			case 'f': // lower fade depth
				if( fade > 1 ){ fade -= 1; }
				break;
			case '2': // increase jiggle value
				jiggle += 1;
				break;
			case '1': // decrease jiggle value
				if( jiggle > 1 ){ jiggle -= 1; }
				break;
			case 'y': // toggle showing random sequence of correct modulus instead, if modulus > 0
				randomflag = !randomflag;
				if( modulus > 0 && randomflag ){
					mySeq = myManySeq.createRandom(mySeq.length,modulus);
					myName = "Random Modulo "+modulus;
					myOEIS = "";
					if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
					p.histoArray();
				}
				if( !randomflag ){
					mySeq = myVariety[mySeqIndex][0];
					myName = myVariety[mySeqIndex][1];
					myOEIS = myVariety[mySeqIndex][2];
					if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
					p.histoArray();
				}
				break;
			case 'u': // toggle showing your sequence perturbed by jiggle value
				jiggleflag = !jiggleflag;
				if( jiggleflag ){
					mySeq = myManySeq.transformJiggle(mySeq,jiggle);
					myName = "Jiggled by "+jiggle;
					if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
					p.histoArray();
				}
				if( !jiggleflag ){
					mySeq = myVariety[mySeqIndex][0];
					myName = myVariety[mySeqIndex][1];
					myOEIS = myVariety[mySeqIndex][2];
					if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
					p.histoArray();
				}
				break;
			case 'e': // change sequence
				mySeqIndex = modulo(mySeqIndex-1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				p.histoArray();
				break;
			case 'r': // change sequence other direction
				mySeqIndex = modulo(mySeqIndex+1,myVariety.length);
				mySeq = myVariety[mySeqIndex][0];
				myName = myVariety[mySeqIndex][1];
				myOEIS = myVariety[mySeqIndex][2];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				p.histoArray();
				break;
			case 'w': // zoom in
				if( zoomFactor < 50 ){ zoomFactor += 1};
				break;
			case 'q': // zoom out
				if( zoomFactor > 5 ){ zoomFactor -= 1};
				break;
			case 'x': // change mode
				mode = numthy.modulo(mode+1,3);
				break;
			case 'p': // change prime for p-adic
				primeAdic += 1;
				if( typeof(mySeq[0]) == "bigint" ){ bigpadic = BigInt(primeAdic) }else{ bigpadic = primeAdic }
				break;
			case 'P': // change prime for p-adic
				if( primeAdic > 1 ){ primeAdic -= 1; }
				if( typeof(mySeq[0]) == "bigint" ){ bigpadic = BigInt(primeAdic) }else{ bigpadic = primeAdic }
				break;
			case '0': // cycle through presets
				presetIndex = numthy.modulo(presetIndex+1,presets.length);
				p.presetSetup();
				p.histoArray();
				break;
			case '9': // cycle through presets
				presetIndex = numthy.modulo(presetIndex-1,presets.length);
				p.presetSetup();
				p.histoArray();
				break;
		}
		initialDraw = true;
		p.loop();
		return false;
	}

	p.presetSetup = function() {
		// modulus, contract, translate, fade
		mySupposedName = presets[presetIndex][0];
		for( i = 0; i < myVariety.length; i++ ){
			if( myVariety[i][1] == mySupposedName ){
				mySeqIndex = i;
				mySeq = myVariety[i][0];
				myName = myVariety[i][1];
				myOEIS = myVariety[i][2];
				modulus = presets[presetIndex][1];
				contract = presets[presetIndex][2];
				translat = presets[presetIndex][3];
				fade = presets[presetIndex][4];
				mode = presets[presetIndex][5];
				if( typeof(mySeq[0]) == "bigint" ){ bigmod = BigInt(modulus) }else{ bigmod = modulus }
				if( typeof(mySeq[0]) == "bigint" ){ bigpadic = BigInt(primeAdic) }else{ bigpadic = primeAdic }
				//console.log("found sequence", ruleset, speeds );
			}
		}
	}


	p.valleyFloor = function(inVal,beginVal,endVal) {
		valLength = (endVal - beginVal)/2;
		if( inVal > beginVal && inVal < endVal ){
			return 0;
		}
		if( inVal <= beginVal ){
			return inVal + valLength; 
		}
		if( inVal >= endVal ){
			return inVal - valLength;
		}
	}

}

function modulo(a, b) {
  if (b <= 0) { 
    throw new Error("modulus error");
  }
  return a - b*Math.floor(a / b);
}


var myp5 = new p5(simTelescope, 'similarity-telescope-holder');
