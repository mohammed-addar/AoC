const fs = require('fs');
const fileName = "in.txt";

const contents = fs.readFileSync(fileName, 'utf8').split(/\n/g).map(x => x.split('')).filter(x => x.length > 0);

// Part 1
/** @param {string} char **/
function isCharNumber(char) {
	return !isNaN(parseInt(char));
}

function isStar(char) {
	return char === "*";
}

function isDot(char) {
	return char === ".";
}

const dirs = [ [-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1] ];

function get(i, j, [x, y]) {
	const chars = contents[i + y ];
	if (chars === undefined) {
		return undefined;
	}
	return chars[j + x];
}

let sum1 = 0;
for (let y = 0; y < contents.length; y++) {
	const row = contents[y];
	let isNumber = false;
	let currentNumber = "";
	let check = true
	for (let x = 0; x < row.length; x++) {
		isNumber = isCharNumber(get(y, x, [0, 0]));
		if (!isNumber && !check) {
			sum1 += parseInt(currentNumber);
		}
		if (!isNumber) {
			currentNumber = '';
			check = true;
		}
		if (isNumber && check) {
			const is = dirs.reduce((acc, [dy, dx]) => {
				const char = get(y, x, [dy, dx]);
				return acc || !isDot(char) && !isCharNumber(char) && char != undefined;
			}, false);
			if (is) {
				check = false;
			}
		}
		if (isNumber) {
			currentNumber += get(y, x, [0, 0]);
		}
	}
	if (isNumber && !check) {
		sum1 += parseInt(currentNumber);
	}
}

console.log("part1 sum1: ", sum1)

//part 2
/** @param {string} char **/
let sum2 = 0;
let gearNumbers = {};

for (let y= 0; y < contents.length; y++) {
	let row = contents[y], currentNumber = "", check = false, gearLocation = null, isNumber = false;

	for (let x = 0 ; x < row.length; x++) {
		let col = contents[y][x];
		isNumber = isCharNumber(get(y, x, [0, 0]));
		if (!isNumber && !check) {
			sum2 += parseInt(currentNumber);
			console.log(parseInt(sum2), currentNumber)
		}
		if (!isNumber) {
			currentNumber = '';
			check = true;
			gearLocation = null;
		}
		if (x == row.length-1 || col.match(/[0-9]/) && check ) {
			if (gearLocation) gearNumbers[gearLocation].push(parseInt(currentNumber + ((col.match(/[0-9]/)) ? col : '')));
			const is = dirs.reduce((acc, [dy, dx]) => {
				const char = get(y, x, [dy, dx]);
				return acc || !isStar(char) && !isCharNumber(char) && char != undefined;
			}, false);
			if (is) {
				check = false;
			}
		}
		if (isNumber) {
			currentNumber += get(y, x, [0, 0]);

			
		}
	}
	Object.values(gearNumbers).reduce((sum, array) => {
		if (array.length == 2) sum += array[0] * array[1];
		return console.log(sum);
	}, 0);
}



console.log("part2 sum2: ", sum2);
