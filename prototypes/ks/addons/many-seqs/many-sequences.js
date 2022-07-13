//
//
//
function manySeq(p) {

	
	var numthy = new Numthy(p);  // Call a new number theory object with number theory functions from my p5 library

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
		mySeqs.push([this.createIntegers(bd),'Integers']);
		mySeqs.push([this.createQuadratic(bd,1,0,0),'Squares']);
		mySeqs.push([this.createCubic(bd,1,0,0,0),'Cubes']);
		mySeqs.push([this.createQuadratic(bd,1,-1,41),'n^2 - n + 41']);
		mySeqs.push([this.transformNadic(this.createIntegers(bd),2),'2-adic val of Z']);
		//mySeqs.push([this.createRandom(bd,2),'Random Binary']); // 3
		//mySeqs.push([this.createRandom(bd,4),'Random mod 4']); // 4
		//mySeqs.push([this.createRandom(bd,10),'Random mod 10']); // 5
//		mySeqs.push([this.createRandom(bd,1009),'Random mod 1009']); // 6
//		mySeqs.push([this.createRandom(bd,1000000000039),'Random modulo prime 1000000000039']); // 7
		mySeqs.push([this.createMod(bd,4),'Integers modulo 4']);
		//mySeqs.push([this.createThueMorse(bd),'Thue-Morse','A010060']);
		//mySeqs.push([this.createHofstadterQ(bd),'Hofstadter Q','A005185']);
		//mySeqs.push([this.createFibsModn(bd,1000000000039),'Fibonacci modulo prime 1000000000039']);
		mySeqs.push([this.createModPow(bd,3,1000003),'3^n modulo 1000003']);
		mySeqs.push([this.createFromFile(myRotorSeq,bd),'A rotor walk']);
		mySeqs.push([this.createLongRangeRand(bd,100,4),'100 string repeat']);
		//mySeqs.push([this.createSloth(bd),'Norgard Sloth Canon','A004718']);
		//mySeqs.push([this.createRacaman(bd),'Recaman','A005132']);
		//mySeqs.push([this.createFromFile(divisorsSeq,bd),'Number of divisors','A000005']);
		//mySeqs.push([this.createFromFile(primesSeq,bd),'Primes','A000040']);
		//mySeqs.push([this.createFromFile(ephiSeq,bd),'Euler Phi','A000010']);
		//mySeqs.push([this.createCoEphi(bd),'Cototient','A051953']);
		//mySeqs.push([this.createFromFile(sigmaSeq,bd),'Sigma 2']);
		//mySeqs.push([this.createFromFile(ramtauSeq,bd),'Ramanujan Tau']);
		//mySeqs.push([this.transformNadic(this.createFromFile(ramtauSeq,bd),2),'2-adic val of Tau']);
		//mySeqs.push([this.transformNadic(this.createFromFile(ramtauSeq,bd),3),'3-adic val of Tau']);
		mySeqs.push([this.transformNadic(this.createFromFile(ramtauSeq,bd),5),'5-adic val of Tau']);
		mySeqs.push([this.transformNadic(this.createFromFile(ramtauSeq,bd),11),'11-adic val of Tau']);
		///// from here
		//mySeqs.push([this.createFromFile(partSeq,bd),'Partitions']);
		//mySeqs.push([this.createFromFile(sumdivSeq,bd),'Sum of divisors']);
		//mySeqs.push([this.createFromFile(beattyTwoSeq,bd),'Beatty sqrt(2)']);
		//mySeqs.push([this.createFromFile(EDSSeq,bd),'Elliptic Divisibility mod something']);
		//mySeqs.push([this.createFromFile(GoldbachSeq,bd),'Goldbach']);
		//mySeqs.push([this.createFromFile(forestFireSeq,bd),'Forest Fire','A229037']);
		//mySeqs.push([this.createFromFile(congruentSeq,bd),'Congruent Numbers']);
		//mySeqs.push([this.createFromFile(thetaDFourSeq,bd),'Theta of D4']);
		//mySeqs.push([this.createFromFile(mordellSeq,bd),'y^2=x^3-n has no solns']);
		//mySeqs.push([this.createFromFile(ctdpiSeq,bd),'Contd frac Pi','A001203']);
		////mySeqs.push([this.createFromFile(odiousSeq,bd),'Odious numbers','A000069']);
		//mySeqs.push([this.createFromFile(sumFifthSeq,bd),'Sum of two fifth powers']);
		//mySeqs.push([this.createFromFile(digitPiSeq,bd),'Digits of Pi']);
		//mySeqs.push([this.createFromFile(diffCompSeq,bd),'Hofstadter Fig.-Fig.','A005228']);
		mySeqs.push([this.createFromFile(bugeyeSeq,bd),'Bugeye Apollonian Packing']);
		//mySeqs.push([this.createFromFile(sumFourSeq,bd),'Num ways sum of 4 squares']);
		//mySeqs.push([this.createSumFourOverEight(bd),'Num ways sum of 4 squares /8']);
		//mySeqs.push([this.createFromFile(mobiusSeq,bd),'Mobius Function']);
		mySeqs.push([this.createFromFile(A027642Seq,bd),'Denominators of Bernoulli','A027642']);
		mySeqs.push([this.createFromFile(A000367Seq,bd),'Numerators of Bernoulli','A000367']);
		mySeqs.push([this.createFromFile(A184535Seq,bd),'Elliptic troublemaker R(2,5)','A184535']);
		mySeqs.push([this.createFromFile(A267167Seq,bd),'Growth series of B4 Coxeter','A267167']);
		mySeqs.push([this.createFromFile(A055671Seq,bd),'Prime quaternions of norm n','A055671']);
		mySeqs.push([this.createFromFile(A000930Seq,bd),'Narayana\'s Cows','A000930']);
		mySeqs.push([this.createFromFile(A006874Seq,bd),'Mu atoms of Mandelbrot','A006874']);
		mySeqs.push([this.createFromFile(A001359Seq,bd),'Lesser of twin primes','A001359']);
		mySeqs.push([this.createFromFile(A003285Seq,bd),'Ctd frac period of sqrt n','A003285']);
		mySeqs.push([this.createFromFile(A001175Seq,bd),'Pisano periods','A001175']);
		mySeqs.push([this.createFromFile(A163890Seq,bd),'Hilbert curve orbits','A163890']);
		mySeqs.push([this.createFromFile(A163355Seq,bd),'Hilbert curve permutation','A163355']);
		mySeqs.push([this.createFromFile(A005171Seq,bd),'Prime locations','A005171']);
		mySeqs.push([this.createFromFile(A003849Seq,bd),'Fibonacci word','A003849']);
		mySeqs.push([this.createFromFile(A000793Seq,bd),'Landau\'s g','A000793']);
		mySeqs.push([this.createFromFile(A159819Seq,bd),'L-series of ellcurve 48a4','A159819']);
		mySeqs.push([this.createFromFile(A005788Seq,bd),'Elliptic curve conductors','A005788']);
		mySeqs.push([this.createFromFile(A060838Seq,bd),'Rank of ellcurve family','A060838']);
		mySeqs.push([this.createFromFile(A088192Seq,bd),'Upper QR gap','A088192']);
		mySeqs.push([this.createFromFile(A001918Seq,bd),'Smallest primitive root','A001918']);
		mySeqs.push([this.createFromFile(A001122Seq,bd),'Primes with prim-root 2','A001122']);
		mySeqs.push([this.createFromFile(A004018Seq,bd),'Ways sum of 2 squares','A004018']);
		mySeqs.push([this.createFromFile(A079296Seq,bd),'Andrica\'s conjecture','A079296']);
		mySeqs.push([this.createFromFile(A101273Seq,bd),'Prop-Calculus Goedel','A101273']);
		mySeqs.push([this.createFromFile(A002410Seq,bd),'Rounded zeta zeroes','A002410']);
		mySeqs.push([this.createFromFile(A082885Seq,bd),'Primes of big gap','A082885']);
		mySeqs.push([this.createFromFile(A253236Seq,bd),'Prime where cyclo-poly factors','A253236']);
		mySeqs.push([this.createFromFile(A003417Seq,bd),'Continued fraction of e','A003417']);
		mySeqs.push([this.createFromFile(A001006Seq,bd),'Motzkin numbers','A001006']);
		mySeqs.push([this.createFromFile(A004001Seq,bd),'Hofstadter-Conway 10K','A004001']);
		mySeqs.push([this.createFromFile(A000700Seq,bd),'Distinct odd partitions','A000700']);
		mySeqs.push([this.createFromFile(A000045Seq,bd),'Fibonacci numbers','A000045']);
		mySeqs.push([this.createFromFile(A006721Seq,bd),'Somos-5','A006721']);
		mySeqs.push([this.createFromFile(A006769Seq,bd),'An elliptic divisibility seq','A006769']);
		mySeqs.push([this.createFromFile(A000108Seq,bd),'Catalan numbers','A000108']);
		mySeqs.push([this.createFromFile(A005318Seq,bd),'Conway-Guy','A005318']);
		mySeqs.push([this.createFromFile(A007542Seq,bd),'Conway\'s Prime Game','A007542']);
		mySeqs.push([this.createFromFile(A000521Seq,bd),'Coeffs of j q-expansion','A000521']);
		mySeqs.push([this.createFromFile(A002326Seq,bd),'Multiplic order of 2 mod 2n+1','A002326']);
		mySeqs.push([this.createFromFile(A001605Seq,bd),'Indices of prime Fibonaccis','A001605']);
		mySeqs.push([this.createFromFile(A061446Seq,bd),'Primitive part of Fibonaccis','A061446']);
		mySeqs.push([this.createFromFile(A000727Seq,bd),'Expansion of (1-x^k)^4','A000727']);
		mySeqs.push([this.createFromFile(A104272Seq,bd),'Ramanujan primes','A104272']);
		mySeqs.push([this.createFromFile(A067128Seq,bd),'Ramanujan\'s largely composite','A067128']);
		mySeqs.push([this.createFromFile(A064533Seq,bd),'Ramanujan-landau constant digits','A064533']);
		mySeqs.push([this.createFromFile(A001113Seq,bd),'Digits of e','A001113']);
		mySeqs.push([this.createFromFile(A001622Seq,bd),'Digits of phi','A001622']);
		mySeqs.push([this.createFromFile(A002193Seq,bd),'Digits of sqrt(2)','A002193']);
		mySeqs.push([this.createFromFile(A139250Seq,bd),'Toothpick sequence','A139250']);
		mySeqs.push([this.createFromFile(A000129Seq,bd),'Pell numbers','A000129']);
		mySeqs.push([this.createFromFile(A005385Seq,bd),'Safe primes','A005385']);
		mySeqs.push([this.createFromFile(A003602Seq,bd),'Kimberling\'s paraphrases','A003602']);
		mySeqs.push([this.createFromFile(A064413Seq,bd),'EKG sequence','A064413']);
		mySeqs.push([this.createFromFile(A000037Seq,bd),'Non-squares','A000037']);
		mySeqs.push([this.createFromFile(A068921Seq,bd),'Tile 2xn with Tatami mats','A068921']);
		mySeqs.push([this.createFromFile(A001055Seq,bd),'Multiplicative partitions','A001055']);
		mySeqs.push([this.createFromFile(A001235Seq,bd),'Taxicab numbers','A001235']);
		mySeqs.push([this.createFromFile(A001223Seq,bd),'Prime gaps','A001223']);
		mySeqs.push([this.createFromFile(A001043Seq,bd),'Sum of two consecutive primes','A001043']);
		mySeqs.push([this.createFromFile(A001414Seq,bd),'Integer log of n','A001414']);
		mySeqs.push([this.createFromFile(A078701Seq,bd),'Least odd prime factor','A078701']);
		mySeqs.push([this.createFromFile(A090783Seq,bd),'Diff of prime sqrs three ways','A090783']);
		mySeqs.push([this.createFromFile(A120498Seq,bd),'c from abc conjecture','A120498']);
		mySeqs.push([this.createFromFile(A000085Seq,bd),'Young tableaux','A000085']);
		mySeqs.push([this.createFromFile(A185256Seq,bd),'Stanley sequence S(0,3)','A185256']);
		mySeqs.push([this.createFromFile(A005487Seq,bd),'Stanley sequence S(0,4)','A005487']);
		mySeqs.push([this.createFromFile(A236269Seq,bd),'First diff of Stanley S(0,4)','A236269']);
		mySeqs.push([this.createFromFile(A171109Seq,bd),'Gromov-Witten genus 1','A171109']);
		mySeqs.push([this.createFromFile(A000069Seq,bd),'Odious numbers','A000069']);
		mySeqs.push([this.createFromFile(A020896Seq,bd),'Sums of two fifth powers','A020896']);
		mySeqs.push([this.createFromFile(A000796Seq,bd),'Digits of Pi','A000796']);
		mySeqs.push([this.createFromFile(A005228Seq,bd),'Hofstadter Figure-Figure','A005228']);
		mySeqs.push([this.createFromFile(A000118Seq,bd),'Num ways sum of 4 squares','A000118']);
		mySeqs.push([this.createFromFile(A008683Seq,bd),'Moebius function','A008683']);
		mySeqs.push([this.createFromFile(A001203Seq,bd),'Continued fraction Pi','A001203']);
		mySeqs.push([this.createFromFile(A000041Seq,bd),'Partitions of n','A000041']);
		mySeqs.push([this.createFromFile(A001951Seq,bd),'Beatty (floor n*(sqrt2))','A001951']);
		mySeqs.push([this.createFromFile(A002375Seq,bd),'Goldbach (num ways)','A002375']);
		mySeqs.push([this.createFromFile(A229037Seq,bd),'Forest Fire','A229037']);
		mySeqs.push([this.createFromFile(A003273Seq,bd),'Congruent numbers','A003273']);
		mySeqs.push([this.createFromFile(A004011Seq,bd),'Theta series of D4','A004011']);
		mySeqs.push([this.createFromFile(A081121Seq,bd),'y^2 = x^3 - n no solutions','A081121']);
		mySeqs.push([this.createFromFile(A004718Seq,bd),'Norgard\'s infinity sequence','A004718']);
		mySeqs.push([this.createFromFile(A005132Seq,bd),'Recaman\'s sequence','A005132']);
		mySeqs.push([this.createFromFile(A000005Seq,bd),'Number of divisors of n','A000005']);
		mySeqs.push([this.createFromFile(A000040Seq,bd),'Prime numbers','A000040']);
		mySeqs.push([this.createFromFile(A000010Seq,bd),'Euler phi function','A000010']);
		mySeqs.push([this.createFromFile(A051953Seq,bd),'Cototient function','A051953']);
		mySeqs.push([this.createFromFile(A000203Seq,bd),'Sigma(1,n) (sum of divisors)','A000203']);
		mySeqs.push([this.createFromFile(A001157Seq,bd),'Sigma(2,n)','A001157']);
		mySeqs.push([this.createFromFile(A001158Seq,bd),'Sigma(3,n)','A001158']);
		mySeqs.push([this.createFromFile(A000594Seq,bd),'Ramanujan Tau','A000594']);
		mySeqs.push([this.createFromFile(A005185Seq,bd),'Hofstadter Q','A005185']);
		mySeqs.push([this.createFromFile(A010060Seq,bd),'Thue-Morse','A010060']);
		mySeqs.push([this.createFromFile(A007814Seq,bd),'2-adic valuation of n','A007814']);
		mySeqs.push([this.createFromFile(A007949Seq,bd),'3-adic valuation of n','A007949']);
		mySeqs.push([this.createFromFile(A112765Seq,bd),'5-adic valuation of n','A112765']);
		mySeqs.push([this.createFromFile(A046644Seq,bd),'square root of Riemann zeta','A046644']);
		mySeqs.push([this.createFromFile(A278478Seq,bd),'2-adic valuation of partitions','A278478']);
		mySeqs.push([this.createFromFile(A005206Seq,bd),'Hofstadter G','A005206']);
		mySeqs.push([this.createFromFile(A000217Seq,bd),'Triangular numbers','A000217']);
		mySeqs.push([this.createFromFile(A000110Seq,bd),'Bell numbers','A000110']);
		mySeqs.push([this.createFromFile(A006037Seq,bd),'Weird numbers','A006037']);
		mySeqs.push([this.createFromFile(A092782Seq,bd),'Ternary tribonacci word','A092782']);
		mySeqs.push([this.createFromFile(A103391Seq,bd),'Even fractal sequence','A103391']);
		mySeqs.push([this.createFromFile(A000201Seq,bd),'Lower Wythoff (Beatty phi)','A000201']);
		mySeqs.push([this.createFromFile(A022843Seq,bd),'Beatty of e (floor n*e)','A022843']);
		mySeqs.push([this.createFromFile(A007306Seq,bd),'Farey denominators','A007306']);
		mySeqs.push([this.createFromFile(A008836Seq,bd),'Liouville\'s function','A008836']);
		mySeqs.push([this.createFromFile(A020882Seq,bd),'Hypot of Pythagorean triples','A020882']);
		mySeqs.push([this.createFromFile(A099254Seq,bd),'A granny knot sequence','A099254']);
		mySeqs.push([this.createFromFile(A152389Seq,bd),'Steps in game of life','A152389']);
		mySeqs.push([this.createFromFile(A269160Seq,bd),'Rule 30 automaton rule','A269160']);
		mySeqs.push([this.createFromFile(A051023Seq,bd),'Rule 30 automaton center','A051023']);
		mySeqs.push([this.createFromFile(A055673Seq,bd),'norms of primes in Z[sqrt(2)]','A055673']);
		mySeqs.push([this.createFromFile(A062537Seq,bd),'Nodes in RIFF','A062537']);
		mySeqs.push([this.createFromFile(A061350Seq,bd),'max(Aut(G)) for finite groups','A061350']);
		mySeqs.push([this.createFromFile(A003963Seq,bd),'Multiplicative a(p_k)=k','A003963']);
		mySeqs.push([this.createFromFile(A001008Seq,bd),'Numerators of harmonic numbers','A001008']);
		mySeqs.push([this.createFromFile(A019444Seq,bd),'Permut\'n with integer averages','A019444']);
		mySeqs.push([this.createFromFile(A047659Seq,bd),'Non-attacking queens on nxn','A047659']);
		mySeqs.push([this.createFromFile(A057660Seq,bd),'Sum_k of n/gcd(n,k)','A057660']);
		mySeqs.push([this.createFromFile(A003679Seq,bd),'Not sum of 3 pentagonal','A003679']);
		mySeqs.push([this.createFromFile(A002348Seq,bd),'Deg. Poncelet porism n-gon','A002348']);
		mySeqs.push([this.createFromFile(A037161Seq,bd),'Numerators well-ordered rat\'ls','A037161']);
		mySeqs.push([this.createFromFile(A027844Seq,bd),'Klein bottle fundamental group','A027844']);
		mySeqs.push([this.createFromFile(A090751Seq,bd),'Indecomposable grps of order n','A090751']);
		mySeqs.push([this.createFromFile(A003114Seq,bd),'Partitions into 5k+1 or 5k+4','A003114']);
		return mySeqs
	}

	this.createPrimesLastDigit = function(bd) {
		var myinseq = [];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(primes10Seq[i]);
		}
		return myinseq;
	}

	this.createSumFourOverEight = function(bd) {
		var myinseq = [];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(sumFourSeq[i]/8);
		}
		return myinseq;
	}


	this.createFromFile = function(seq,bd) {
		var myinseq = [];
		for( var i = 1; i < p.min(bd,seq.length); i++ ){
			myinseq.push(seq[i]);
		}
		return myinseq;
	}

	this.createHofstadterQ = function(bd) {
		var myinseq = [1,1,1];
		for( var i = 3; i < bd; i++ ){
			newval = myinseq[i-myinseq[i-1]] + myinseq[i-myinseq[i-2]];
			myinseq.push(newval);
		}
		return myinseq;
	}


	this.createCoEphi = function(bd) {
		var myinseq = [];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(i-ephiSeq[i]);
		}
		return myinseq;
	}
	


	this.transformDiff = function(inseq) {
		var myinseq = [];
		for( var i = 1; i < inseq.length-1; i++ ){
			newval = inseq[i+1] - inseq[i];
			myinseq.push(newval);
		}
		return myinseq
	}


	this.transformNadic = function(inseq,n) {
		var myinseq = [];
		for( var i = 0; i < inseq.length; i++ ){
			term = inseq[i];
			if( term == 0 ){ 
				newval = 0;
			//if( term >= p.MAX_SAFE_INTEGER ){ return 0 };
			} else {
				newval = numthy.nadicVal( inseq[i], n );
			}
			myinseq.push(newval);
		}
		return myinseq
	}

	this.transformJiggle = function(inseq,jigmax) {
		var myinseq = [];
		for( var i = 0; i < inseq.length; i++ ){
			rand = -jigmax + math.floor(math.random()*(2*jigmax+1))
			if( typeof(inseq[i]) == "bigint" ){ rand = BigInt(rand) }
			newval = inseq[i] + rand;
			myinseq.push(newval);
		}
		return myinseq;
	}

	this.createCubic = function(bd,a,b,c,d) {
		var myinseq = [d];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(a*i**3+b*i**2+c*i+d);
		}
		return myinseq;
	}

	this.createQuadratic = function(bd,a,b,c) {
		var myinseq = [c];
		for( var i = 1; i < bd; i++ ){
			myinseq.push(a*i**2+b*i+c);
		}
		return myinseq;
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
		var myinseq = [0];
		for( var i = 1; i < bd; i++ ){
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

