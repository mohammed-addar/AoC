const fs = require('fs');
const fileName = "in_demo.txt";
const contents = fs.readFileSync(fileName, 'utf8').split("\n\n");

function part1() {
	const mapXtoY = (mapping, X) => {
		let Y = -1;
		for (const row of mapping) {
			const [end, start , count] = row.split(" ").map(Number);
			if (X >= start && X <= start + count) {
				Y = end - start + X;
				break;
			}
		}
		return Y === -1 ? X : Y;
	};
	const contentsSeeds = contents[0].split("seeds: ").filter((x) => x)[0].split(" ").map((x) => parseInt(x.trim()));
	
	let [, ...seedToSoil] = contents[1].split("\n");
	let [, ...soilToFertilizer] = contents[2].split("\n");
	let [, ...fertilizerToWater] = contents[3].split("\n");
	let [, ...waterToLight] = contents[4].split("\n");
	let [, ...lightToTemperature] = contents[5].split("\n");
	let [, ...temperatureToHumidity] = contents[6].split("\n");
	let [, ...humidityToLocation] = contents[7].split("\n");
	
	let res = contentsSeeds
		.map((n) => mapXtoY(seedToSoil, n))
		.map((n) => mapXtoY(soilToFertilizer, n))
		.map((n) => mapXtoY(fertilizerToWater, n))
		.map((n) => mapXtoY(waterToLight, n))
		.map((n) => mapXtoY(lightToTemperature, n))
		.map((n) => mapXtoY(temperatureToHumidity, n))
		.map((n) => mapXtoY(humidityToLocation, n));
		
	console.log(Math.min(...res));
}
console.log("part 1 solution: ");
part1()


