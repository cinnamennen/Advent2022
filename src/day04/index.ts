import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((l) => l.split(",").map((p) => p.split("-").map(Number)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const overlap = input.filter(
    ([[a, b], [c, d]]) => (a <= c && d <= b) || (c <= a && b <= d),
  );
  return overlap.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const overlap = input.filter(([[a, b], [c, d]]) => {
    for (let i = a; i <= b; i++) {
      if (c <= i && i <= d) {
        return true;
      }
    }
    return false;
  });
  return overlap.length;
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
