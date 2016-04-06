function sendToGoogle() {
 	window.location = "https://boringssl.googlesource.com/boringssl/";
}

function calc(v) {
	if(v.value.match(/[^\d]+/))
	{
		v.value = v.value.replace(/[^\d]+/,"");
		return false;
	}

	var FPTM = 4300000;			//Four point three million dollars
	var MILE = 5280;			//feet per mile
	var MSQR = 27878400;		//feet per square mile
	var INCH = 12;				//inches per foot
	var ISQR = 144;				//square inches per square foot
	var ICUB = 1728;			//cubic inches per cubic foot
	var ETOS = 93000000;		//distance from earth to sun, in miles
	var ETOM = 238900;			//distance from earth to moon, in miles
	var CIRC = 24902;			//circumference of the earth at the equator, in miles
	var DWTH = 2.61;			//width of a one dollar bill
	var DLEN = 6.14;			//length of a dollar bill
	var DHGT = 0.0043;			//height of a dollar bill
	var USAR = 3806000;			//area of the US, in square miles
	var UGDP = 16770000000000;	//US GDP for 2013
	var WGDP = 77868000000000;	//Global GDP for 2014
	var SECS = 86400;			//seconds in a day
	var YEAR = 365.25;			//legth of a calendar year, in days
	var WRLD = 7400000000		//world population

	var mult = (!v.value || v.value == "" || v.value == 0 || v.value == '0') ? 0 : v.value;
	try {
		var TOTAL = FPTM * mult;
		document.getElementById("total_amount").innerHTML = "$" + numberWithCommas(TOTAL);

		var person = Math.floor(TOTAL / WRLD);
		document.getElementById("person").innerHTML = "$" + numberWithCommas(person);

		var usgdp = TOTAL / UGDP;
		usgdp = roundTo(usgdp, 2);
		document.getElementById("usgdp").innerHTML = numberWithCommas(roundTo((usgdp * 100),2)) + "%";

		var worldgdp = TOTAL / WGDP;
		worldgdp = roundTo(worldgdp, 2);
		document.getElementById("worldgdp").innerHTML = numberWithCommas(roundTo((worldgdp * 100),2)) + "%";

		var height = ((TOTAL * DHGT) / INCH) / MILE;
		height = Math.round(height);
		document.getElementById("height").innerHTML = numberWithCommas(height) + " Miles";

		var moon = height / ETOM;
		moon = Math.round(moon);
		document.getElementById("moon").innerHTML = numberWithCommas(moon) + " Trips";

		var sun = height / ETOS;
		sun = roundTo(sun, 2);
		document.getElementById("sun").innerHTML = numberWithCommas(sun) + " Trips";

		var equator = (((TOTAL * DLEN) / INCH) / MILE) / CIRC;
		equator = Math.round(equator);
		document.getElementById("equator").innerHTML = numberWithCommas(equator) + " Times";

		var area = ((TOTAL * DWTH * DLEN) / ISQR) / MSQR;
		area = Math.round(area);
		document.getElementById("area").innerHTML = numberWithCommas(area) + " Square Miles";

		var size = area / USAR;
		size = roundTo(size, 2);
		document.getElementById("ussize").innerHTML = numberWithCommas(size) + " Times the Size of the US";

		var cube = cubeRoot((TOTAL * DWTH * DLEN * DHGT) / ICUB);
		cube = Math.round(cube);
		document.getElementById("cube").innerHTML = numberWithCommas(cube) + " Feet Per Side";

		var year = (TOTAL / SECS) / YEAR;
		year = roundTo(year, 2);
		document.getElementById("years").innerHTML = numberWithCommas(year) + " Years";
	}
	catch(err){
		console.log(err.toString());
	}
}

function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function roundTo(num, exp) {
	var rnd = num * Math.pow(10, exp);
	rnd = Math.round(rnd);
	var dec = rnd / Math.pow(10, exp);
	return dec;
}

function cubeRoot(x) {
	var y = Math.pow(Math.abs(x), 1/3);
	return x < 0 ? -y : y;
}

