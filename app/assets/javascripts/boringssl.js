function sendToGoogle() {
 	window.location = "https://boringssl.googlesource.com/boringssl/";
}

function calc(v) {
	if(v.value.match(/[^\d]+/))
	{
		v.value = v.value.replace(/[^\d]+/,"");
		return false;
	}

	var FPTM = 4300000;
	var MILE = 5280;
	var MSQR = 27878400;
	var INCH = 12;
	var ISQR = 144;
	var ICUB = 1728;
	var ETOS = 93000000;
	var ETOM = 238900;
	var CIRC = 24902;
	var DWTH = 2.61;
	var DLEN = 6.14;
	var DHGT = 0.0043;
	var USAR = 3806000;
	var UGDP = 16770000000000;
	var WGDP = 77868000000000;
	var SECS = 86400;
	var YEAR = 365.25;
	var WRLD = 7400000000

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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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