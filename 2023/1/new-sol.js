const fs = require('fs');
const fileDir = "input-demo.txt";

const file = fs.readFileSync(fileDir, 'utf8');
const strings = file.split('\n');

const words = [ {word: 'one',val: 1}, {word: 'two',val: 2}, {word: 'three',val: 3}, {word: 'four',val: 4}, {word: 'five',val: 5}, {word: 'six',val: 6}, {word: 'seven',val: 7}, {word: 'eight',val: 8}, {word: 'nine',val: 9} ];

let sum2 = 0;

for (let i = 0; i < strings.length; i++) { 
    let matches = []; 
    for (let k = 0; k < strings[i].length; k++) { 
        if (isNaN(strings[i][k])) { 
            for (const x of words) { 
                const { word, val } = x 
                const check = strings[i].slice(k, k + word.length); 
                if (check == word) { 
                    matches.push(val); 
                    break; 
                } 
            } 
        } else { 
            matches.push(parseInt(strings[i][k])) 
        } 
    }
    console.log(matches);
    
    const firstNum = matches[0];
    const lastNum = matches[matches.length-1];
    const numero = Number(`${firstNum}${lastNum}`);
    console.log(firstNum, lastNum, numero);
    sum2 += numero;

}

console.log(sum2);
