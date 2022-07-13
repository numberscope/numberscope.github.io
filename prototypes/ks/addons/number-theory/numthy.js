function Numthy(p) {

	///////////////////////////////////////////////////
	// modular reduction using %
	///////////////////////////////////////////////////
	/**
	 * Compute the residue of n modulo m
	 * @param {Number} n Integer to be reduced.
	 * @param {Number} m Modulus with which to reduce.
	 * @ return the residue of n modulo m
	 * @author Katherine E. Stange
	 */
	this.modulo = function(n,m) {
	  if (m == 0) { 
		throw new Error("numthy module: zero modulus");
	   }
	  if (m < 0) { m = -m; }
	  if (n > 0) { return n%m; }
	  if (n == 0 ) { return 0 }
	  if (n < 0 ) { 
		  res = (-n)%m;
		  if( res == 0 ){ return 0; }
		  if( res > 0 ){ res = m-res; };
		  return res;
	  }
	  // this should be equivalent to return n - m*Math.floor(n / m);
	}

	///////////////////////////////////////////////////
	// modular reduction attempt speed up? only works positive right now
	///////////////////////////////////////////////////
	/**
	 * Compute the residue of n modulo m
	 * @param {Number} n Integer to be reduced.
	 * @param {Number} m Modulus with which to reduce.
	 * @ return the residue of n modulo m
	 * @author Katherine E. Stange
	 */
	this.moduloFaster = function(n,m) {
		if( m == 0 ){
			throw new Error("zero modulus");
		}
		var remainder = n; // this is where more multiples of m may lie
		var totalfactor = 0; // this accumulates the total factor
		var factor = 1; // should always have summand = factor*modulus
		var summand = m;
		while( remainder > summand ){
			while( remainder > summand ){
			     remainder = remainder - summand;
			     totalfactor += factor;
			     summand += summand; // double the summand
			     factor += factor; // meaning double the factor
			}
			if( factor > 1 ){
			     summand = m;
			     factor = 1;
			}
		}
		return n - totalfactor*m;
	}

	//////////////////////////////////////////////////////
	// GCD
	//////////////////////////////////////////////////////
	/**
	 * Finds the greatest common divisor between two integers.
	 * @param {Number} a First integer.
	 * @param {Number} b Second integer.
	 * @return The gcd of a and b.
	 * @module number-theory
	 * @author Ryan Sandor Richards, Jim Fowler
	 */
	this.gcd = function(a, b) {
	  if (a < 0 || a < BigInt(0) ) { a = -a; }
	  if (b < 0 || b < BigInt(0) ) { b = -b; }
	  while (true) {
	    if (b === 0 || b === BigInt(0) ) { return a; }
	    a = a % b;
	    if (a === 0 || a === BigInt(0) ) { return b; }
	    b = b % a;
	  }
	}

	/////////////////////////////////////////////////////
	// LCM
	/////////////////////////////////////////////////////
	/**
	 * Finds the least common multiple between two integers.
	 * @param {Number} a First integer.
	 * @param {Number} b Second integer.
	 * @return The lcm of a and b.
	 * @module number-theory
	 * @author Ricky Reusser
	 */
	this.lcm = function(a, b) {
	  return a * b / gcd(a, b);
	}

	/////////////////////////////////////////////////////
	// Pollard's rho to find small divisor
	/////////////////////////////////////////////////////
	/**
	 * Given composite x with a small prime factor, Pollard's rho
	 * algorithm often finds the small factor quickly.
	 *
	 * Modified from
	 * http://userpages.umbc.edu/~rcampbel/NumbThy/Class/Programming/JavaScript
	 *
	 * @param {Number} a number x
	 * @return {Number} a number dividing x (possibly 1).
	 * @module number-theory
	 * @author Jim Fowler
	*/
	this.findDivisor = function(x) {
	  var numsteps = 2 * Math.floor( Math.sqrt( Math.sqrt(x) ) );
	  var slow = 2;
	  var fast = slow;
	  var thegcd;
	  for (var i = 1; i < numsteps; i++){
	    slow = (slow * slow + 1) % x;
	    fast = (fast * fast + 1) % x;
	    fast = (fast * fast + 1) % x;
	    thegcd = gcd(fast - slow, x);
	    if (thegcd != 1) {
	      return thegcd;
	    }
	  }
	  return 1;
	}

	////////////////////////////////////////////////////
	// Sieve of Eratosthenes finds list of primes < n
	////////////////////////////////////////////////////
	/**
	 * Sieves primes from 1 to the given number.
	 * @param {Number} n Upper bound for the sieve.
	 * @return {Array} A list of primes between 1 and n.
	 * @module number-theory
	 * @author Ryan Sandor Richards
	 */
	this.sieve = function(n) {
	  var numbers = new Array(n);

	  for (var i = 0; i < n; i++) {
	    numbers[i] = true;
	  }

	  for (var i = 2; i < Math.sqrt(n); i++) {
	    for (var j = i*i; j < n; j += i) {
	      numbers[j] = false;
	    }
	  }

	  var primes = [];
	  for (var i = 2; i < n; i++) {
	    if (numbers[i]) {
	      primes.push(i);
	    }
	  }

	  return primes;
	}

	// Store primes < 100 000
	var primes = this.sieve(100000);

	//////////////////////////////////////////////
	// Factor integer using Sieve
	//////////////////////////////////////////////
	/**
	 * Factors a given integer.
	 * @param {Number} n Number to factor.
	 * @return {Array} A list of prime factors and the powers of those factors.
	 * @module number-theory
	 * @author Ryan Sandor Richards, Jim Fowler
	 */
	this.factor = function(n) {
	  if ((!primes) || (primes[primes.length - 1] < n)) {
	    primes = sieve(n);
	  }

	  var factors = [];
	  for (var k = 0; k < primes.length && n > 1; k++) {
	    var p = primes[k];
		if (n % p === 0) {
		    var factor = { prime: p, power: 0 };
		    while (n % p === 0) {
		factor.power++;
		n /= p;
	      }
	      factors.push(factor);
	    }
	  }

	  if (n > 1) {
	    // Whatever remains, if it is not 1, must be prime
	    factors.push( { prime: n, power: 1 } );
	  }
	  return factors;
	}

	////////////////////////////////////////////////
	// Is n prime?
	////////////////////////////////////////////////
	/**
	 * Determines whether an integer is prime. Note this is a very slow method that
	 * uses direct factoring from a sieve. For a faster primality check use the
	 * `miller` method.
	 * @param {Number} an integer x to test
	 * @return {Boolean} Whether or not the x is prime.
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.isPrime = function(p) {
	  var factors = factor(p);
	  if (factors.length != 1) {
	    return false;
	  }
	  return (factors[0].power === 1);
	}

	/////////////////////////////////////////////////
	// Is n square?
	/////////////////////////////////////////////////
	/**
	  * Determines whether an integer is 'square'.
	  * Algorithm works by finding the 'square root' of an int,
	  * then checking whether the result is a whole number.
	  * See: https://en.wikipedia.org/wiki/Square_number
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is square.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isSquare = function(n) {
	  return (Math.sqrt(n)) % 1 === 0;
	}

	////////////////////////////////////////////////////
	// Prime factors of an integer
	////////////////////////////////////////////////////
	/**
	 * Returns the prime factors for a given number.
	 * @param {Number} n Number for which to find the prime factors.
	 * @return {Array} The prime factors of n.
	 * @module number-theory
	 * @author Ryan Sandor Richards
	 */
	this.primeFactors = function(n) {
	  return factor(n).map(function (f) { return f.prime });
	}

	///////////////////////////////////////////////////
	// n-adic valuation
	///////////////////////////////////////////////////
	/**
	 * Compute the highest power of n dividing an integer.
	 * Computed by log search.
	 * @param {Number} n Integer whose powers we seek.
	 * @param (Number} m Integer in which to find powers of n.
	 * @ return the highest power of n dividing m
	 * @author Katherine E. Stange
	 */
	this.nadicVal = function(m,n) {
	   if( m === 0 || m === BigInt(0) ){
		   throw new Error("infinite valuation");
	   }
	   var remainder = m; // this is where more powers of n may lie
 	   var totalpower = 0; // this accumulates the answer
	   var power = 1; // should always have divisor = n^power
	   var divisor = n;
	   var numn = n;
           var one = 1;
 	   var zero = 0;
	   if( typeof(m) == "bigint" || typeof(n) == "bigint" ) {
		   n = BigInt(n);
		   m = BigInt(m);
		   remainder = BigInt(remainder);
		   totalpower = BigInt(0);
		   power = BigInt(1);
		   divisor = BigInt(divisor);
		   numn = BigInt(n);
		   one = BigInt(1);
		   zero = BigInt(0);
	   }
	   while( this.modulo(remainder,divisor) == zero ){
		   while( this.modulo(remainder,divisor) == zero ){
		   	remainder = remainder/divisor;
		   	totalpower += power;
		   	divisor = divisor*divisor; // square the divisor
		   	power += power; // meaning double the power
		   }
	  	   if( power > one ){
 		        divisor = numn;
		        power = one;
	 	   }
	   }
	   return totalpower;
	}

	///////////////////////////////////////////////////
	// Euler's totient function
	///////////////////////////////////////////////////
	/**
	 * Compute Euler's totient function phi. Computed via Euler's product formula,
	 * see: http://en.wikipedia.org/wiki/Euler%27s_totient_function
	 * @param {Number} n Integer for which to return the totient.
	 * @return the number of positive integers less than or equal to n that are
	 *   relatively prime to n.
	 * @module number-theory
	 * @author Jim Fowler, Ryan Sandor Richards
	 */
	this.eulerPhi = function(n) {
	  var product = function (list) {
	    return list.reduce(function (memo, number) {
	      return memo * number;
	    }, 1);
	  };
	  var factors = primeFactors(n);

	  // Product{p-1} for all prime factors p
	  var N = product(factors.map(function (p) { return p - 1; }))

	  // Product{p} for all prime factors p
	  var D = product(factors);

	  // Compose the product formula and return
	  return n * N / D;
	}

	/////////////////////////////////////////////////////
	// Mixed digit base increment
	/////////////////////////////////////////////////////
	/**
	 * Increment an n-dimensional tuple of integers representing a number with
	 * mixed digit bases.
	 *
	 * @example
	 * incMixed([0, 0], [1, 2]) // Returns [1, 0]
	 * incMixed([1, 0], [1, 2]) // Returns [0, 1]
	 * incMixed([0, 1], [1, 2]) // Returns [1, 1]
	 * incMixed([1, 1], [1, 2]) // Returns [0, 2]
	 * incMixed([0, 2], [1, 2]) // Returns [1, 2]
	 * incMixed([1, 2], [1, 2]) // Returns [0, 0]
	 *
	 * @param {array} tuple A mixed base number.
	 * @param {array} bases The bases for each of the "digit" entries in the tuple.
	 * @return {array} The next number in the sequence.
	 * @module number-theory
	 * @author Ryan Sandor Richards
	 */
	this.incMixed = function(tuple, bases) {
	  var result = tuple.map(function (value) { return value; });
	  result[0]++;
	  for (var k = 0; k < tuple.length; k++) {
	    if (result[k] <= bases[k]) {
	      break;
	    }
	    else if (k !== tuple.length - 1){
	      result[k] = 0;
	      result[k+1]++;
	    }
	    else {
	      result[k] = 0;
	    }
	  }
	  return result;
	}

	/////////////////////////////////////////
	// Divisors of an integer
	/////////////////////////////////////////	
	/**
	 * Determines all of the divisors for a given number.
	 * @param {Number} n Number for which to find the factors.
	 * @return {Array} A list of all divisors for the given number.
	 * @module number-theory
	 * @author Ryan Sandor Richards
	 */
	this.divisors = function(n) {
	  var factors = factor(n);
	  var powers = factors.map(function (factor) {
	    return 0;
	  });
	  var maxPowers = factors.map(function (factor) {
	    return factor.power;
	  });

	  var divisors = [1];
	  while (true) {
	    powers = incMixed(powers, maxPowers);
	    var d = powers.map(function (m, i) {
	      return Math.pow(factors[i].prime, m);
	    }).reduce(function (memo, curr) {
	      return memo * curr;
	    }, 1);
	    if (d === 1) break;
	    divisors.push(d);
	  }

	  divisors.sort(function (a, b) {
	    return parseInt(a) - parseInt(b);
	  });
	  return divisors;
	}

	///////////////////////////////////
	// Multiplication mod n
	///////////////////////////////////
	/**
	 * Multiply two numbers (up to 2^52) in Z mod m.  JavaScript numbers
	 * are stored as floats, and Number.MAX_SAFE_INTEGER ==
	 * 9007199254740991, so multiplication (a * b) % m works fine if the
	 * modulus is less than sqrt(Number.MAX_SAFE_INTEGER) approx 94906265.
	 * This routine gets around this barrier and permits the modulus to be
	 * as large as 2^52 at the price of a loop.
	 *
	 * This is a modification of some code from Wikipedia, replacing
	 * bitshifts with floating point arithmetic to avoid JavaScript's
	 * coercing the floats back to 32-bit integers.
	 *
	 * @param {Number} an integer a (up to 2^52)
	 * @param {Number} an integer b (up to 2^52)
	 * @param {Number} a modulus m (up to 2^52)
	 * @return {Number} the result of a * b mod m
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.multiplyMod = function(a, b, m) {
	  // For small enough numbers, we can multiply without overflowing
	  if ((a < 94906265) && (b < 94906265)) {
	    return (a*b) % m;
	  }

	  var d = 0;

	  // Bitshifts in javascript reduce everything to 32-bit ints, but with
	  // division we can get 53-bit resolutions as a float
	  var mp2 = m / 2;

	  if (a >= m) a %= m;
	  if (b >= m) b %= m;

	  for (var i = 0; i < 53; i++) {
		d = (d >= mp2) ? (2 * d - m) : (2 * d);

		// Checking top bit (but I can't use bitwise operators without coercing down
		// to 32 bits)
		if (a >= 4503599627370496) {
	      d += b;
	      a = a - 4503599627370495;
		}

		if (d > m) {
	      d -= m;
	    }
		a *= 2;
	  }

	  return d;
	}

	/////////////////////////////////////
	// Inverse mod n
	/////////////////////////////////////
	/**
	 * Find an inverse for a modulo n.
	 * See: http://en.wikipedia.org/wiki/Modular_multiplicative_inverse
	 * @param {Number} a Integer relatively prime to n
	 * @param {Number} n Integer modulus
	 * @return an integer b so that a * b equv 1 mod n
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.inverseMod = function(a, n) {
	  if (a < 0) {
	    a = (a % n) + n;
	  }

	  var t = 0;
	  var newt = 1;
	  var r = n;
	  var newr = a;

	  while(newr !== 0) {
	    var quotient = Math.floor(r/newr);
	    var oldt = t;
	    t = newt;
	    newt = oldt - quotient * newt;

	    var oldr = r;
	    r = newr;
	    newr = oldr - quotient * newr;
	  }

	  if(r > 1) { return NaN };

	  return (t > 0) ? t : (t+n);
	}

	/////////////////////////////////
	// Power mod n
	/////////////////////////////////
	/**
	 * Performs a power modulo some integer.
	 * @param {Number} base Base for the power.
	 * @param {Number} exponent Exponent of the power.
	 * @param {Number} mod Modulus.
	 * @return The base raised to the exponent power modulo the mod.
	 * @module number-theory
	 * @author Ryan Richards, Jim Fowler
	 */
	this.powerMod = function(base, exponent, mod) {
	  if (exponent < 0) {
	    return inverseMod(powerMod(base,-exponent,mod),mod);
	  }

	  var result = 1;
	  base = base % mod;

	  while (exponent > 0) {
	    if (exponent % 2 == 1) {
	      // Use modulus multiplication to avoid overflow
	      result = multiplyMod(result, base, mod);
	      exponent -= 1;
	    }

	    // using /2 instead of >>1 to work with numbers up to 2^52
	    exponent /= 2;

	    // Use modulus multiplication to avoid overflow
	    base = multiplyMod(base, base, mod);
	  }
	  return result;
	}

	/////////////////////////////////////////////////
	// Discrete log via baby-step-giant-step
	/////////////////////////////////////////////////
	
	// Cache for the discrete log tables
	var babyStepGiantStepTables = {};

	/**
	 * Solves the discrete log problem.
	 *
	 * See:
	 * http://en.wikipedia.org/wiki/Discrete_logarithm
	 * http://en.wikipedia.org/wiki/Baby-step_giant-step
	 * 
	 * @param {Number} x An integer
	 * @param {Number} g A generator of the group of units in Z mod modulus
	 * @param {Number} modulus A modulus
	 * @return {Number} An integer k so that g^k equiv x mod m.
	 * @module number-theory
	 */
	this.logMod = function(x, g, modulus) {
	  // normalize x to be positive
	  x = ((x % modulus) + modulus) % modulus;

	  var m = Math.ceil( Math.sqrt(modulus) );
	  var hash = {};

	  if (babyStepGiantStepTables[modulus] === undefined) {
	    babyStepGiantStepTables[modulus] = {};
	  }

	  if (babyStepGiantStepTables[modulus][g] === undefined) {
	    babyStepGiantStepTables[modulus][g] = {};
	    hash = babyStepGiantStepTables[modulus][g];
	    for (var j = 0; j < m; j++) {
	      // Compute g^j and store the pair (j, g^j) in the hash
	      // table.
		    hash[powerMod( g, j, modulus )] = j;
	    }
	  }
	  else {
	    hash = babyStepGiantStepTables[modulus][g];
	  }

	  var generatorInverseM = powerMod( g, -m, modulus );
	  var location = x;

	  for (var i = 0; i < m; i++) {
	    // Check to see if location is the second component (g^j) of any
	    // pair in the table.
	    if (hash[location] !== undefined) {
	      // If so, return i*m + j.
		    return ( multiplyMod(i, m, modulus) + hash[location] ) % modulus;
		  }
	    else {
	      // If not, update location.
		    location = multiplyMod( location, generatorInverseM, modulus );
	    }
	  }

	  return NaN;
	}

	//////////////////////////////////////////////////
	// Primality test via Miller-Rabin
	//////////////////////////////////////////////////
	/**
	 * Deterministic miller-rabin primality test.
	 * @param {Number} n Integer < 341,550,071,728,321 for which to test primality.
	 * @return `true` if the number is prime, `false` otherwise.
	 * @module number-theory
	 * @author Ryan Sandor Richards
	 */
	this.miller = function(n) {
	  if (n < 2) return false;
	  if (n == 2 || n == 3) return true;
	  if (!(n & 1) || n % 3 == 0) return false;

	  // Find n-1 = 2^s * d such that d is odd
	  var d = n - 1;
	  var s = 0;
	  while( (d % 2) === 0 ) {
	    d = d / 2;
	    s = s + 1;
	  }

	  var witnesses;

	  if (n < 1373653) {
	    witnesses = [2, 3];
	  } else if (n < 9080191) {
	    witnesses = [31, 73];
	  } else if (n < 4759123141) {
	    witnesses = [2, 7, 61];
	  } else if (n < 1122004669633) {
	    witnesses = [2, 13, 23, 1662803];
	  } else if (n < 2152302898747) {
	    witnesses = [2, 3, 5, 7, 11];
	  } else if (n < 3474749660383) {
	    witnesses = [2, 3, 5, 7, 11, 13];
	  } else {
	    witnesses = [2, 3, 5, 7, 11, 13, 17];
	  }

	  for (var i = 0; i < witnesses.length; i++) {
	    var a = witnesses[i];
	    var x = powerMod(a, d, n);
	    var y = 0;
	    var q = s;
	    while (q > 0) {
	      y = multiplyMod( x, x, n );
	      if (y === 1 && x !== 1 && x !== n - 1) { return false; }
	      x = y;
				--q;
	    }
	    if (y !== 1) { return false; }
	  }

	  return true;
	}

	///////////////////////////////////////
	// Jacobi symbol
	///////////////////////////////////////
	/**
	 * The Jacobi symbol generalizes the Legendre symbol (a on p); when a equiv
	 * 0 mod p, (a on p) = 0, but otherwise (a on p) is +1 or -1 depending as to
	 * whether there is or is not an integer r so that r^2 equiv a mod p.
	 *
	 * See: http://en.wikipedia.org/wiki/Jacobi_symbol
	 * See also: http://en.wikipedia.org/wiki/Legendre_symbol
	 *
	 * @param {Number} a An integer.
	 * @param {Number} b An integer b which factors into primes p_1 ... p_k
	 * @return the product of the Legendre symbols (a on p_1) * ... * (a on p_k)
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.jacobiSymbol = function(a,b) {
	  if (b % 2 === 0) { return NaN };
	  if (b < 0) { return NaN };

	  // (a on b) is independent of equivalence class of a mod b
	  if (a < 0) {
	    a = ((a % b) + b);
	  }

	  // flips just tracks parity, so I xor terms with it and end up looking at the
	  // low order bit
	  var flips = 0;

	  while(true) {
	    a = a % b;

	    // (0 on b) = 0
	    if (a === 0) { return 0; }

	    // Calculation of (2 on b)
		while ((a % 2) === 0) {
	      // b could be so large that b*b overflows
	      flips ^= ((b % 8)*(b % 8) - 1)/8;
	      a /= 2;
		}

	    // (1 on b) = 1
	    if (a == 1) {
		    // look at the low order bit of flips to extract parity of total flips
		    return (flips & 1) ? (-1) : 1;
	    }

		// Now a and b are coprime and odd, so "QR" applies
		// By reducing modulo 4, I avoid the possibility that (a-1)*(b-1) overflows
	    flips ^= ((a % 4)-1) * ((b % 4)-1) / 4;

	    var temp = a;
	    a = b;
	    b = temp;
	  }

	  // Cannot get here
	  return NaN;
	}

	//////////////////////////////////
	// Smallest primitive root
	//////////////////////////////////
	/**
	 * Find the smallest primitive root for Z mod n, meaning a multiplicative
	 * generator for the group of units of Z mod n.
	 *
	 * See: http://en.wikipedia.org/wiki/Primitive_root_modulo_n
	 *
	 * @param {Number} modulus An integer > 2
	 * @return an integer g so that every integer coprime to n is congruent to a
	 *   power of g, modulo n.
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.primitiveRoot = function(modulus) {
	  var phi_m = eulerPhi(modulus);
	  var factors = primeFactors(phi_m);
	  for (var x = 2; x < modulus; x++) {
	    var check = true;
	    var n = factors.length;
	    for (var i = 0; i < n; i++) {
	      if (powerMod(x, phi_m / factors[i], modulus) === 1) {
		check = false;
		break;
	      }
	    }
	    if (check) { return x; }
	  }
	  return NaN;
	};

	////////////////////////////////
	// A random primitive root
	////////////////////////////////
	/**
	 * Find a random primitive root for Z mod n, meaning a multiplicative generator
	 * for the group of units of Z mod n. Unlike primitiveRoot, this function
	 * returns a random primitive root.
	 * @param {Number} modulus Integer for which to find the random primitive root.
	 * @return {Number} An integer g so that every integer coprime to n is congruent
	 *   to a power of g, modulo n.
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.randomPrimitiveRoot = function(modulus) {
	  var g = primitiveRoot(modulus);
	  var eulerPhiModulus = eulerPhi(modulus);
	  for (var trials = 0; trials < 100; trials++) {
	    var i = Math.floor( Math.random() * eulerPhiModulus );
	    if (gcd(i, eulerPhiModulus) == 1) {
	      return powerMod( g, i, modulus );
	    }
	  }
	  return g;
	};

	///////////////////////////////////
	// A quadratic nonresidue
	///////////////////////////////////
	/**
	 * Find a quadratic nonresidue.
	 * See: http://en.wikipedia.org/wiki/Quadratic_residue
	 * @param {Number} p A prime number.
	 * @return {Number} A number b so that there is no c with c^2 = b mod p
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.quadraticNonresidue = function(p) {
	  for (var x = 2; x < p; x++) {
	    if (jacobiSymbol(x, p) == -1) { return x; }
	  }
	  return NaN;
	};


	//////////////////////////////////////////////////////
	// Find a square root mod prime via Tonelli-Shanks
	//////////////////////////////////////////////////////
	/**
	 * Find a single square root in Z mod p using the Tonelli–Shanks algorithm.
	 *
	 * See: http://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm
	 *
	 * @param {Number} m A quadratic residue
	 * @param {Number} p A prime number
	 * @return {Number} A number b so b^2 = n mod p.
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.squareRootModPrime = function(n, p) {
	  if (jacobiSymbol(n,p) != 1) { return NaN; }

	  var Q = p - 1;
	  var S = 0;
	  while( (Q % 2) === 0 ) {
	    Q /= 2;
	    S++;
	  }

	  // Now p - 1 = Q 2^S and Q is odd.
	  if ((p % 4) == 3) {
		return powerMod( n, (p+1)/4, p );
	  }

	  // So S != 1 (since in that case, p equiv 3 mod 4
	  var z = quadraticNonresidue(p);
	  var c = powerMod(z, Q, p);
	  var R = powerMod(n, (Q+1)/2, p);
	  var t = powerMod(n, Q, p);
	  var M = S;

	  while(true) {
	    if ((t % p) == 1) return R;

	    // Find the smallest i (0 < i < M) such that t^{2^i} = 1
	    var u = t;
	    for(var i = 1; i < M; i++) {
		    u = (u * u) % p;
		    if (u == 1) break;
	    }

	    var minimum_i = i;
	    i++;

	    // Set b = c^{2^{M-i-1}}
	    var b = c;
	    while( i < M ) {
		    b = (b * b) % p;
		    i++;
	    }

		M = minimum_i;
		R = (R * b) % p;
		t = (t * b * b) % p;
		c = (b * b) % p;
	  }

	  return NaN;
	};


	/////////////////////// requires repair, uses unique
	
	///////////////////////////////////////////////////
	// Find all square roots mod n
	///////////////////////////////////////////////////

	/**
	 * Find all square roots of a given number n modulo m.
	 * @param {Number} n A quadratic residue
	 * @param {Number} modulus A modulus
	 * @return {Array} Representatives of all square roots of n modulo m.
	 * @module number-theory
	 * @author Jim Fowler
	 */
	this.squareRootMod = function(n, modulus) {
	  var m = 1;
	  var results = [0];

	  factor(modulus).forEach(function (f) {
	    var p = f.prime;
		var exponent = f.power;
		var s = squareRootModPrime( n, p );

		// Chinese remainder theorem
		var combined = [];
		if (jacobiSymbol(n, p) != 1) { return []; }

	    results.forEach(function (r) {
	      // find a lift of r mod m and s mod p
	      combined.unshift( r * p * inverseMod(p, m) + s * m * inverseMod(m, p) );
	      combined.unshift( r * p * inverseMod(p, m) - s * m * inverseMod(m, p) );
	    });

	    unique(combined, false);
	    results = combined;

		m = m * p;
		var soFar = 1;
		exponent--;

		while (exponent > 0) {
	      var q = Math.pow( p, Math.min( soFar, exponent ) );
	      exponent -= Math.min( soFar, exponent );

	      // Hensel's lemma
	      // see: http://en.wikipedia.org/wiki/Hensel%27s_lemma
	      results = results.map(function (r) {
		var A = -((r*r - n) / m);
		var B = inverseMod(2 * r, q);
		return r + m * multiplyMod(A, B, q);
	      });

	      m = m * q;
		}
	  });

	  return results.map(function (r) {
	    return ((r % modulus) + modulus) % modulus;
	  });
	};

	////////////////////////////////////////////////
	// Mobius function
	////////////////////////////////////////////////
	/**
	 * Compute the Mobius function
	 * @param {Number} n argument to compute
	 * @return The value of the mobius function for n
	 * @module number-theory
	 * @author Ricky Reusser
	 */
	this.mobius = function(n) {
	  // Handle zero (perhaps undefined in some sense, but this value
	  // matches Wolfram Alpha):
	  if (n === 0) {
	    return 0;
	  }

	  // Factor the absolute value so that negative numbers are
	  // permissible:
	  var factors = factor(Math.abs(n));

	  // Return zero if any factor has power > 1:
	  for (var i = 0; i < factors.length; i++) {
	    if (factors[i].power > 1) {
	      return 0;
	    }
	  }

	  // Otherwise return 2 if even:
	  if (factors.length % 2 === 0) {
	    return 1;
	  } else {
	    return -1;
	  }
	}

	/////////////////////////////////////////////////
	// Mobius Range?
	/////////////////////////////////////////////////
	//
	this.mobiusRange = function(n1, n2, primalityTest) {
	  var i, j, i1, i2, p, k, sqrt;
	  var n = n2 - n1;
	  var A = new Array(n);

	  primalityTest = primalityTest || miller;

	  // Initialize the output array to all ones:
	  for (i = 0; i < n; i++) {
	    A[i] = 1;
	  }

	  sqrt = Math.ceil(Math.sqrt(n2));

	  // Loop over 0 to ~sqrt(n2) and only act if p is prime:
	  for (p = 2; p < sqrt; p++) {
	    if (p < n1) {
	      // If below the lower bound of our range, we're not directly
	      // sieving, so use an external primality test:
	      if (!primalityTest(p)) {
		continue;
	      }
	    } else if (A[p - n1] !== 1) {
	      // If within our range, we're implicitly sieving as we go,
	      // so !== 1 is sufficient to determine that p is not prime.
	      continue;
	    }

	    // Compute the limits relative to the prime:
	    i1 = Math.ceil(n1 / p);
	    i2 = Math.ceil(n2 / p);

	    for (i = i1; i < i2; i++) {
	      k = i * p;
	      if (i % p === 0) {
		A[k - n1] = 0;
	      } else {
		A[k - n1] *= -p;
	      }
	    }
	  }

	  // Analyze the results and assign values:
	  for (i = 0; i < n; i++) {
	    if (A[i] === n1 + i) {
	      A[i] = 1;
	    } else if (A[i] === -n1 - i) {
	      A[i] = -1;
	    } else if (A[i] < 0) {
	      A[i] = 1;
	    } else if (A[i] > 0) {
	      A[i] = -1;
	    } else {
	      // If the above isn't true, then this must be the case,
	      // but we'll assign explicitly to avoid negative zeros:
	      A[i] = 0;
	    }
	  }

	  // Handle a boundary condition when n1 === 0:
	  if (n1 === 0 && n2 > 0) {
	    A[0] = 0;
	  }

	  return A;
	}
	
	////////////////////////////////
	// Is integer perfect?
	////////////////////////////////
	/**
	  * Determines whether an integer is 'perfect'.
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not x is perfect.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isPerfect = function(n) {
	  if (n === 1) { return false }
	  var divisorsOfNumber = divisors(n);
	  divisorsOfNumber.pop(); // to remove n and leave the 'proper divisors'
	  var sumOfDivisors = divisorsOfNumber.reduce(function(a,b) { 
	    return a + b
	  });
	  return n === sumOfDivisors;
	};

	////////////////////////////////
	// Is integer abundant?
	////////////////////////////////
	/**
	  * Determines whether an integer is 'abundant'.
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not x is abundant.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isAbundant = function(n) {
	  if (n === 1) { return false }
	  var divisorsOfNumber = divisors(n);
	  divisorsOfNumber.pop(); // to remove n and leave the 'proper divisors'
	  var sumOfDivisors = divisorsOfNumber.reduce(function(a,b) { 
	    return a + b
	  });
	  return n < sumOfDivisors;
	};

	////////////////////////////////
	// Is integer deficient?
	////////////////////////////////
	/**
	  * Determines whether an integer is 'deficient'.
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is deficient.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isDeficient = function(n) {
	  if (n === 1) { return true };
	  var divisorsOfNumber = divisors(n);
	  divisorsOfNumber.pop(); // to remove n and leave the 'proper divisors'
	  var sumOfDivisors = divisorsOfNumber.reduce(function(a,b) { 
	    return a + b
	  });
	  return n > sumOfDivisors;
	};

	/////////////////////////////
	// Is integer triangular?
	/////////////////////////////
	/**
	  * Determines whether an integer is 'triangular'.
	  * Algorithm works by finding the 'triangular root' of an int,
	  * then checking whether the result is a whole number.
	  * See: https://en.wikipedia.org/wiki/Triangular_number
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is triangular.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isTriangular = function(n) {
	  return (Math.sqrt((8 * n) + 1)) % 1 === 0;
	};

	/////////////////////////////
	// Is integer pentagonal?
	/////////////////////////////
	/**
	  * Determines whether an integer is 'pentagonal'.
	  * Algorithm works by finding the 'pentagonal root' of an int,
	  * then checking whether the result's a whole number.
	  * See: https://en.wikipedia.org/wiki/Pentagonal_number
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is pentagonal.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isPentagonal = function(n) {
	  return ((Math.sqrt((24 * n) + 1) + 1) / 6) % 1 === 0;
	};
	
	/////////////////////////////
	// Is integer hexagonal?
	/////////////////////////////
	/**
	  * Determines whether an integer is 'hexagonal'.
	  * Algorithm works by finding the 'hexagonal root' of an int,
	  * then checking whether the root's a whole number.
	  * See: https://en.wikipedia.org/wiki/Hexagonal_number
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is hexagonal.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isHexagonal = function(n) {
	  return ((Math.sqrt((8 * n) + 1) + 1) / 4) % 1 === 0;
	};
	
	/////////////////////////////
	// Is integer heptagonal?
	/////////////////////////////
	/**
	  * Determines whether an integer is 'heptagonal'.
	  * Algorithm works by finding the 'heptagonal root' of an int,
	  * then checking whether that root is a whole number.
	  * See: https://en.wikipedia.org/wiki/Heptagonal_number
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is heptagonal.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isHeptagonal = function(n) {
	  return (((Math.sqrt((40 * n) + 9)) + 3) / 10) % 1 === 0;
	};

	/////////////////////////////
	// Is integer octagonal?
	/////////////////////////////
	/**
	  * Determines whether an integer is 'octagonal'.
	  * Algorithm works by finding the 'octagonal root' of an int,
	  * then checking to see whether the result's a whole number.
	  * See: https://en.wikipedia.org/wiki/Octagonal_number
	  *
	  * @param {Number} an integer x to test
	  * @return {Boolean} Whether or not the x is octagonal.
	  * @module number-theory
	  * @author Kelly Innes
	  */

	this.isOctagonal = function(n) {
	  return (((Math.sqrt((3 * n) + 1)) + 1) / 3) % 1 == 0;
	};

}
// from https://golb.hplar.ch/2018/09/javascript-bigint.html
function BigIntMath(p) {

	this.max = function(...values) {
		if (values.length === 0) {
			return null;
		}

		if (values.length === 1) {
			return values[0];
		}

		let max = values[0];
		for (let i = 1; i < values.length; i++) {
			if (values[i] > max) {
				max = values[i];
			}
		}
		return max;
	}

	this.min = function(...values) {
		if (values.length === 0) {
			return null;
		}

		if (values.length === 1) {
			return values[0];
		}

		let min = values[0];
		for (let i = 1; i < values.length; i++) {
			if (values[i] < min) {
				min = values[i];
			}
		}
		return min;
	}

	this.sign = function(value) {
		if (value > 0n) {
			return 1n;
		}
		if (value < 0n) {
			return -1n;
		}
		return 0n;
	}

	this.abs = function(value) {
		if (this.sign(value) === -1n || this.sign(value) == -1) {
			return -value;
		} else {
			return value;
		}
	}

	this.sqrt = function(value) {
		if (value < 0n) {
			throw 'square root of negative numbers is not supported'
		}

		if (value < 2n) {
			return value;
		}

		function newtonIteration(n, x0) {
			const x1 = ((n / x0) + x0) >> 1n;
			if (x0 === x1 || x0 === (x1 - 1n)) {
				return x0;
			}
			return newtonIteration(n, x1);
		}

		return newtonIteration(value, 1n);
	}

}
