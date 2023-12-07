const fs = require('fs');
const fileDir = "in.txt";

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
