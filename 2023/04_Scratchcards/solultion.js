const fs = require('fs');
const fileName = "in.txt";
let result = 0;

function tDict(numbers) {
	return numbers.reduce((acc, x) => {
		acc[x] = true;
		return acc;
	}, {})
}

const contents = fs.readFileSync(fileName, 'utf8').split("\n").filter(x => x.length).map(x => { 
	const values = x.split(": ")[1];
	console.log(values)
	const [winners, numbers] = values.split(" | ");
	const wDict = tDict(winners.split(" ").filter(x => x).map(x => parseInt(x)));

	console.log(wDict)
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


console.log(contents)
