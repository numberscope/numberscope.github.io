var numthy = (function(root) {

	'use strict';

	var gcd = function(a, b) {
	  if (a < 0) { a = -a; }
	  if (b < 0) { b = -b; }
	  while (true) {
	    if (b === 0) { return a; }
	    a %= b;
	    if (a === 0) { return b; }
	    b %= a;
	  }
	}

	var lcm = function(a, b) {
	  return a * b / gcd(a, b);
	};

}());
