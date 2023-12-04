const fs = require('fs');
const readline = require('readline');
/*fs.readFile('in.txt', (err, inputD) => {
   if (err) throw err;
   while (true ) {
      console.log(inputD.toString().match(/[0-9]+/));
   }
})*/


const rl = readline.createInterface({
  input: fs.createReadStream('in.txt')
});
rl.on('line', (line) => {
  //console.log(line);
  let lineNum = line.replace(/\D+/g, '').trim().split('');/*.map(e => parseInt(e));*/
  lineNum = lineNum.toString().replace(/\s/g, '').replace(/[,]/g, '');
  
  let firstNum = lineNum.charAt(0);
  let lastNum = lineNum.charAt(lineNum.length-1);
  let joinedNum = firstNum + lastNum;
  let tabon = Number(joinedNum);

  
  
  function totality(inp){
    let sum = "";
    for(let i=0; i <= inp.length-1; i++){
      sum+=inp[i];
    }
    console.log(sum);
  }
  totality(tabon);

});

