const fs = require('fs');
const fileName = "in.txt";
const contents = fs.readFileSync(fileName, 'utf8').split("");

//PART 1
let floor = 0;

console.log(contents)

for (let i = 0, len = contents.length; i < len; i++) {
	if (contents[i] === "(") {
		floor++;
	} else if (contents[i] === ")") {
		floor--;
	}
}

console.log("part 1 solution: ", floor);



//PART 2 

let floor2 = 0;
let result = contents.map(dir => dir === '(' ? ++floor2 : --floor2).indexOf(-1) + 1;
console.log("part 2 solution: ", result)

