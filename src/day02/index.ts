import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((r) => r.split(" "));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const normalized = input.map(([them, me]) => [
    them,
    String.fromCharCode(
      me.charCodeAt(0) - "X".charCodeAt(0) + "A".charCodeAt(0),
    ),
  ]);
  const results = normalized.map(([them, me]) => {
    let score = 0;
    if (them == me) score += 3;
    else if ((them == "A" && me == "B") || (them == "B" && me == "C") || (them == "C" && me == "A"))
      score += 6;
    score += 1 + me.charCodeAt(0) - "A".charCodeAt(0);
    return score
  });

  return results.reduce((a,b)=>a+b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const results = input.map(([them, me]) => {
    let score = 0;
    if (me == 'Y'){
      score += 3;
      score += 1 + them.charCodeAt(0) - "A".charCodeAt(0);
    } else if (me == 'X'){
      if (them == 'A') score += 3;
      if (them == 'B') score += 1;
      if (them == 'C') score += 2;
    }
    else if (me == 'Z'){
      score += 6;
      if (them == 'A') score += 2;
      if (them == 'B') score += 3;
      if (them == 'C') score += 1;
    }
    return score
  });
  return results.reduce((a,b)=>a+b, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
