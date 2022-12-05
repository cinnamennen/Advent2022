import run from "aocrunner";
import _ from "lodash";
import { transpose } from "../utils/index.js";

const parseInput: (
  rawInput: string,
) => [string[][], [number, number, number][]] = (rawInput: string) => {
  const raw = rawInput.split("\n");
  let [crates, instructions] = [
    raw.slice(0, raw.indexOf("")),
    raw.slice(raw.indexOf("") + 1),
  ];
  return [
    [
      [],
      ...transpose(
        crates.map((u) => _.chunk(u, 4).map((u) => u[1])).slice(0, -1),
      ).map((u) => u.filter((x) => x != " ").reverse()),
    ] as string[][],
    instructions
      .map((i) => i.match(/move (\d+) from (\d+) to (\d+)/))
      .filter((i): i is RegExpMatchArray => i != null)
      .map((i) => i.slice(1).map(Number)) as [number, number, number][],
  ];
};

const part1 = (rawInput: string) => {
  const [crates, instructions] = parseInput(rawInput);
  instructions.forEach(([amount, from, to]) => {
    for (let i = 0; i < amount; i++) {
      const tmp = crates[from].pop() ?? "";
      crates[to] = [...crates[to], tmp];
    }
  });
  return crates
    .slice(1)
    .map((u) => u.reverse()[0])
    .join("");
};

const part2 = (rawInput: string) => {
  const [crates, instructions] = parseInput(rawInput);
  instructions.forEach(([amount, from, to]) => {
    const tmp = crates[from].slice(-amount);
    crates[from] = crates[from].slice(0, -amount)
    crates[to] = [...crates[to], ...tmp];
  });
  return crates
    .slice(1)
    .map((u) => u.reverse()[0])
    .join("");
};

run({
  part1: {
    tests: [
      {
        // language=TEXT
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        // language=TEXT
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
