import run from "aocrunner";
import { intersection } from "../utils/index.js";
import _ from 'lodash'

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((u) => u.split(""))
    ;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const bags = input.map((u) => [u.slice(0, u.length / 2), u.slice(u.length / 2)]).map(([a, b]) => [new Set(a), new Set(b)]);
  const common = bags.map(([a, b]) => intersection(a, b));
  return common
    .map((s) =>
      [...s]
        .map((u: string) =>
          u.charCodeAt(0) <= "z".charCodeAt(0) &&
          u.charCodeAt(0) >= "a".charCodeAt(0)
            ? u.charCodeAt(0) - "a".charCodeAt(0) + 1
            : u.charCodeAt(0) - "A".charCodeAt(0) + 27,
        )
        .reduce((p, n) => p + n, 0),
    )
    .reduce((p, n) => p + n, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(u=>new Set(u));
  const groups = _.chunk(input, 3)
  const common = groups.map(([a,b,c])=>intersection(a,intersection(b,c)))
  return common
    .map((s) =>
      [...s]
        .map((u: string) =>
          u.charCodeAt(0) <= "z".charCodeAt(0) &&
          u.charCodeAt(0) >= "a".charCodeAt(0)
            ? u.charCodeAt(0) - "a".charCodeAt(0) + 1
            : u.charCodeAt(0) - "A".charCodeAt(0) + 27,
        )
        .reduce((p, n) => p + n, 0),
    )
    .reduce((p, n) => p + n, 0);

};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
