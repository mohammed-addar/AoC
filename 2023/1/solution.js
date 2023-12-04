const fs = require('fs');
const fileDir = "in.txt";

const file = fs.readFileSync(fileDir, 'utf8');
const lines = file.split(/\r?\n/);

// Part 1 Solution.
let sum = 0;

lines.forEach(lina => {
  const digit = lina.match(/\d/g);

  if (!digit || digit.length === 0 ) return;

  const twoNum = digit.length === 1 ? parseInt(digit[0] + digit[0]) : parseInt(digit[0] + digit[digit.length-1]);

  sum += twoNum;
  
});

console.log('part1 solution = ' + sum);

// Part 2 Solution.
const wordMap = [
  {word: 'one',   val: 1},
  {word: 'two',   val: 2},
  {word: 'three', val: 3},
  {word: 'four',  val: 4},
  {word: 'five',  val: 5},
  {word: 'six',   val: 6},
  {word: 'seven', val: 7}, 
  {word: 'eight', val: 8},
  {word: 'nine',  val: 9} 
];

let sum2 = 0;
let found = [];

for(let i = 0; i < lines.length; i++) {
  let matches = [];
  for (let k = 0; k < lines[i].length; k++) {
    if(isNaN(lines[i][k])) {
      for (const x of wordMap) {
        const { word, val } = x ;
        const check = lines[i].slice(k, k + word.length);
        if (check == word) {
          matches.push(val);
          break;
        }
      }
    } else {
      matches.push(Number(lines[i][k]));
    }
    
  }
  //console.log(matches);

  const firstNum = matches[0];
  const lastNum = matches[matches.length-1];
  const numero = Number(`${firstNum}${lastNum}`);
  found.push(numero);


  

}

const newArray = found.filter(function (value) {
    return !Number.isNaN(value);
});

for (let i = 0; i < newArray.length; i++ ) {
  sum2 += newArray[i];
}


console.log("part2 solution = " + sum2);

