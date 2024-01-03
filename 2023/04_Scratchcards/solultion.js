const fs = require('fs');
const fileName = "in.txt";
let result = 0;

function tDict(numbers) {
	return numbers.reduce((acc, x) => {
		acc[x] = true;
		return acc;
	}, {})
}
//part 1 
const contents1 = fs.readFileSync(fileName, 'utf8').split("\n").filter(x => x.length).map(x => { 
	const values = x.split(": ")[1];
	const [winners, numbers] = values.split(" | ");
	const wDict = tDict(winners.split(" ").filter(x => x).map(x => parseInt(x)));
	return [wDict, numbers.split(" ").map(x => parseInt(x.trim()))];
}).reduce((acc, [wDict, numbers]) => {
	let point = 0;
	numbers.forEach(x => {
		if (wDict[x]) {
			if (point === 0) {
				point = 1;
			} else {
				point <<= 1;
			}
		}
	});
	return acc + point ;
}, 0);
console.log("part1", contents1);

//part 2
const cards = fs.readFileSync(fileName, 'utf8').split("\n").filter(x => x.length);

function getPoints(x, index) {
	const values = x.split(": ")[1];
	const [winners, numbersValues] = values.split(" | ");
	const wDict = tDict(winners.split(" ").filter(x => x).map(x => parseInt(x)));
	const numbers = numbersValues.split(" ").map(x => parseInt(x.trim()))
	let point = 0;
	numbers.forEach(x => {
		if (wDict[x]) {
			point++;
		}
	});
	return new Array(point).fill(index + 1).map((x, i) => {
		return x + i
	});
}
const process = new Array(cards.length).fill(0).map((_, i) => i + 1);
const seen = {};
const count = {};

while (process.length) {
	const idx = process.pop();
	count[idx] = count[idx] ? count[idx] + 1 : 1;
	const points = seen[idx] ? seen[idx] : getPoints(cards[idx - 1], idx);
	seen[idx] = points;

	points.forEach(x => {
		process.push(x);
	});
}

const resultat = Object.keys(count).reduce((acc, x) => {
	return acc + count[x];
}, 0);

console.log("part2 ", resultat)
