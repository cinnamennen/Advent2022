import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n").map((u) => u.split(" "));
  const path: string[] = [];
  const tree: RecursiveObject = {
    "/": { dir: true, contents: {} },
  };
  let dir = false;
  for (const line of input) {
    if (line[0] == "$") {
      dir = false;
      if (line[1] == "cd") {
        if (line[2] == "..") path.pop();
        else path.push(line[2]);
      } else if (line[1] == "ls") {
        dir = true;
      }
    } else {
      let location = tree;
      path.forEach((p) => (location = location[p].contents as RecursiveObject));
      if (line[0] == "dir") {
        location[line[1]] = { contents: {}, dir: true };
      } else {
        location[line[1]] = {
          size: Number(line[0]),
          dir: false,
          contents: null,
        };
      }
    }
  }
  addSize(tree);
  return tree as FS;
};

type RecursiveObject = {
  [key: string]:
    | {
        size?: number;
        dir: true;
        contents: RecursiveObject;
      }
    | {
        size: number;
        dir: false;
        contents: null;
      };
};
type FS = {
  [key: string]:
    | {
        size: number;
        dir: true;
        contents: FS;
      }
    | {
        size: number;
        dir: false;
        contents: null;
      };
};
type DFS = {
  [key: string]: {
    size: number;
    dir: true;
    contents: DFS;
  };
};

function addSize(tree: RecursiveObject): number {
  let sum = 0;
  Object.entries(tree).forEach(([key, val]) => {
    if (val.dir) {
      val.size = addSize(val.contents);
    }
    sum += val.size ?? 0;
  });
  return sum;
}

function findDirs(tree: RecursiveObject): number {
  let sum = 0;
  Object.entries(tree).forEach(([key, val]) => {
    if (val.dir) {
      sum += findDirs(val.contents);
    }
    if (val.size && val.size <= 100000 && val.dir) sum += val.size;
  });
  return sum;
}

function deleteFiles(tree: FS) {
  Object.entries(tree).forEach(([key, val]) => {
    if (!val.dir) delete tree[key];
    else deleteFiles(val.contents);
  });
}

function findFree(tree: FS, size: number): number | null {
  let sum = size;
  Object.entries(tree).forEach(([key, val]) => {
    if (!val.dir) return;
    if (val.size < sum) sum = val.size;
    let sum1 = findFree(val.contents, size);

    if (val.size <= 100000) sum += val.size;
  });
  return sum;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findDirs(input);
};

function overSize(tree: DFS, size: number): Array<number> {
  const over: number[] = [];
  Object.values(tree).forEach((val) => {
    if (val.size >= size) over.push(val.size);
    if (val.contents !={}) over.push(...overSize(val.contents, size))
  });
  return over;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const total = 70000000;
  const needFree = 30000000 - (total - input["/"].size);
  deleteFiles(input);

  return Math.min(...overSize(input as DFS, needFree));
};

run({
  part1: {
    tests: [
      {
        input: `
          $ cd /
          $ ls
          dir a
          14848514 b.txt
          8504156 c.dat
          dir d
          $ cd a
          $ ls
          dir e
          29116 f
          2557 g
          62596 h.lst
          $ cd e
          $ ls
          584 i
          $ cd ..
          $ cd ..
          $ cd d
          $ ls
          4060174 j
          8033020 d.log
          5626152 d.ext
          7214296 k
        `,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          $ cd /
          $ ls
          dir a
          14848514 b.txt
          8504156 c.dat
          dir d
          $ cd a
          $ ls
          dir e
          29116 f
          2557 g
          62596 h.lst
          $ cd e
          $ ls
          584 i
          $ cd ..
          $ cd ..
          $ cd d
          $ ls
          4060174 j
          8033020 d.log
          5626152 d.ext
          7214296 k
        `,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
