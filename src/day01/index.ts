import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function elfCals(input: string) {
  const elves = input
    .split("\n\n")
    .map((c) => c.split("\n").map((c) => parseInt(c)));
  return elves.map((e) => e.reduce((partialSum, a) => partialSum + a, 0));
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const calories = elfCals(input);
  return Math.max(...calories);
};



const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const calories = elfCals(input);
  calories.sort((a, b) => a - b);
  calories.reverse();
  const top = calories.slice(0,3)
  return top.reduce((partialSum, a) => partialSum + a, 0);

};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000
        `,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000
        `,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
