const fs = require('fs');
const fileName = "in.txt";
const contents = fs.readFileSync(fileName, 'utf8').split("\n");

console.log(contents)
