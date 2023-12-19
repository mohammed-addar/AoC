const fs = require('fs');
const fileDir = "in.txt";

//solution of part 1
const max = {
    red: 12,
    green: 13,
    blue: 14,
}

const contents = fs.readFileSync(fileDir, 'utf8').split('\n').reduce((acc, line) => {
    if (line === "") {
        return acc;
    }
    const gameId = +line.split(":")[0].split(" ")[1]; 
    const  validLines = line.split(":")[1].split(";").map(game => {
        const g = game.split(",").map(dice => {
            const color = dice.trim().split(" ")[1];
            const count = +dice.trim().split(" ")[0];
            return count <= max[color]
        });
        
        return g.every(dice => dice === true);
    });
    const valid = validLines.every(line => line === true);

    if (valid) {
        acc.push(gameId);
    }
    return acc
}, []);

console.log(contents.reduce((acc, gameId) => acc + gameId, 0));

//solution of part 2
const contents2 = fs.readFileSync(fileDir, 'utf8').split('\n').reduce((acc, line) => {
    if (line === "") {
        return acc;
    }
    const max = {
        red: 0,
        green: 0,
        blue: 0,
    }
    line.split(":")[1].split(";").forEach(game => {
        game.split(",").forEach(dice => {
            const color = dice.trim().split(" ")[1];
            const count = +dice.trim().split(" ")[0];
            max[color] = Math.max(max[color], count);
        });
    });
    
    return max['red'] * max['blue'] * max['green'] + acc;

}, 0);

console.log(contents2);
