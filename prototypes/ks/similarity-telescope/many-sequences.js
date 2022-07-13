//
//
//
function manySeq(p) {

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
		//mySeq = p.createThueMorse(100000);
	//


	this.createVariety = function(bd) {
		mySeqs = [];
		mySeqs.push([this.createRandom(bd,2),'Random Binary']);
		mySeqs.push([this.createRandom(bd,4),'Random modulo 4']);
		mySeqs.push([this.createRandom(bd,30),'Random modulo 30']);
		mySeqs.push([this.createRandom(bd,1009),'Random modulo prime 1009']);
		mySeqs.push([this.createRandom(bd,1000000000039),'Random modulo prime 1000000000039']);
		mySeqs.push([this.createIntegers(bd),'Integers']);
		mySeqs.push([this.createMod(bd,4),'Integers modulo 4']);
		mySeqs.push([this.createThueMorse(bd),'Thue-Morse']);
		mySeqs.push([this.createFibsModn(bd,1000000000039),'Fibonacci modulo prime 1000000000039']);
		mySeqs.push([this.createModPow(bd,3,1000003),'3^n modulo 1000003']);
		mySeqs.push([this.createFloorReal(bd,math.sqrt(2)),'floor(sqrt(2)*n) precision problem']);
		mySeqs.push([this.createRotorSeq(bd),'A rotor walk']);
		mySeqs.push([this.createLongRangeRand(bd,100,4),'Random 4-ary 100-char string repeated']);
		mySeqs.push([this.createSloth(bd),'The Sloth Canon']);
		mySeqs.push([this.createRacaman(bd),'Racaman']);
		return mySeqs
	}

	this.createSloth = function(bd) {
		var myinseq = [0];
		for( var i = 1; i < bd; i++ ){
			if( modulo(i,2) == 0 ){
				myinseq.push(-myinseq[i/2]);
			} else {
				myinseq.push(myinseq[(i-1)/2]+1);
			}
		}
		return myinseq
	}

	this.createRacaman = function(bd) {
		var myinseq = [0];
		for( var i = 1; i < bd; i++ ){
			x = myinseq[i-1]-i;
			if( x >= 0 && !myinseq.includes(x) ){
				myinseq.push(x);
			} else {
				myinseq.push(myinseq[i-1]+i);
			}
		}
		return myinseq
	}

	this.createRotorSeq = function(bd) {
		var myinseq = [];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(myRotorSeq[i]);
		}
		return myinseq;
	}
	
	this.createPrimesLastDigit = function(bd) {
		var myinseq = [];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(primes10Seq[i]);
		}
		return myinseq;
	}
	
	this.createThueMorse = function(bd) {
		var myinseq = [1];
		for( var i = 1; i < bd; i++ ){
			if( modulo(i,2) == 0 ){
				myinseq.push(myinseq[i/2]);
			} else {
				myinseq.push(3 - myinseq[(i-1)/2]);
			}
		}
		return myinseq
	}


	this.createLongRangeRand = function(bd, termrep, pol) {
		var myinseq = [];
		var grabseq = this.createRandom(termrep, pol);
		for( var i = 1; i < bd; i++ ){
			next = grabseq[modulo(i,termrep)];
			myinseq.push(next);
		}
		return myinseq;
	}


	this.createFloorLog = function(bd) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = math.floor(math.log(i));
			myinseq.push(next);
		}
		return myinseq;
	}

	this.createFloorQuad = function(bd) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = math.floor(math.sqrt(i));
			myinseq.push(next);
		}
		return myinseq;
	}

	this.createFloorReal = function(bd,alpha) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = math.floor(alpha*i);
			myinseq.push(next);
		}
		return myinseq;
	}


	this.createModCubic = function(bd,mod,a,b,c) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(myinseq[i-1]**3 + a*myinseq[i-1]**2+b*myinseq[i-1]+c,mod);
			myinseq.push(next);
		}
		return myinseq;
	}

	this.createModQuad = function(bd,mod,a,b,c) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(a*myinseq[i-1]**2+b*myinseq[i-1]+c,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	this.createMod = function(bd,mod) {
		var myinseq = [0];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(i,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	this.createModSquare = function(bd,mod) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(myinseq[i-1]**2,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	this.createModPow = function(bd,gen,mod) {
		var myinseq = [1];
		var next = 0;
		for( var i = 1; i < bd; i++ ){
			next = modulo(myinseq[i-1]*gen,mod);
			myinseq.push(next);
		}
		return myinseq;
	}


	this.createPentagonal = function(bd) {
		var myinseq = [0,1];
		var next = 0;
		for( var i = 2; i < bd; i++ ){
			myinseq.push(i*(3*i-1)/2);
		}
		return myinseq;
	}

	this.createA002024 = function(bd) {
		var myinseq = [0,1];
		var next = 0;
		for( var i = 2; i < bd; i++ ){
			next = math.floor(math.sqrt(2*i)+1/2);
			myinseq.push(next);
		}
		return myinseq;
	}

	this.createHailstone = function(bd,initial) {
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

	this.createA006369 = function(bd) {
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

	this.createIntegers = function(bd) {
		var myinseq = [];
		for( var i = 0; i < bd; i++ ){
			myinseq.push(i);
		}
		return myinseq;
	}

	this.createRandom = function(bd,N) {
		var myinseq = [];
		for( var i = 0; i < bd; i++ ){
			rand = math.floor(math.random()*(N));
			myinseq.push(rand);
		}
		return myinseq;
	}

	this.createFibs = function(bd) {
		var myinseq = [1,1,2];
		for( var i = 3; i < bd; i++ ){
			var newfib = myinseq[i-1] + myinseq[i-2];
			myinseq.push(newfib);
		}
		return myinseq;
	}

	this.createFibsModn = function(bd,nn) {
		var myinseq = [1,1,2];
		for( var i = 3; i < bd; i++ ){
			var newfib = modulo(myinseq[i-1] + myinseq[i-2],nn);
			myinseq.push(newfib);
		}
		return myinseq;
	}
}

