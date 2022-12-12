import run from "aocrunner";
import { transpose } from "../utils/index.js";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split("").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let visible = input.length *2 + input[0].length * 2 -4;
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      let seen: number[][] = [];
      seen.push(input[i].slice(0, j));
      seen.push(input[i].slice(j + 1));
      const t = transpose(input) as number[][];
      seen.push(t[j].slice(0, i));
      seen.push(t[j].slice(i + 1));
      seen = seen.map((v) => v.filter((tree) => tree >= input[i][j]));
      const clean = seen.filter((v) => v.length>0);
      const hiding = clean.length;
      if (hiding <4) visible+=1
    }
  }
  return visible;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
