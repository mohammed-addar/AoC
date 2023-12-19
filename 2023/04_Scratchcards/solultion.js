const fs = require('fs');
const fileName = "in.txt";

const contents = fs.readFileSync(fileName, 'utf8').split(/\n/g).map(x => x.split('')).filter(x => x.length > 0);

