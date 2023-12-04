import { getLinesFromInput } from "../utils.ts";

export const getPartOneResult = async () => {
  const inputFilepath = import.meta.dir + "/input.txt";
  const lines = await getLinesFromInput(inputFilepath);

  let sumOfParts = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [...numbers] = line.matchAll(/[0-9]+/g);

    numbers.forEach((num) => {
      const numLength = num[0].length;
      const numIndex = num.index!;
      const rightCharPos = numIndex + numLength;

      const leftChar = line[numIndex - 1];
      const rightChar = line[rightCharPos];
      const topChars =
        i > 0
          ? lines[i - 1].substring(
              numIndex === 0 ? 0 : numIndex - 1,
              rightCharPos + 1,
            )
          : undefined;
      const bottomChars =
        i < lines.length - 1
          ? lines[i + 1].substring(
              numIndex === 0 ? 0 : numIndex - 1,
              rightCharPos + 1,
            )
          : undefined;

      const adjacentSymbolsConcatenated = [
        leftChar,
        rightChar,
        topChars,
        bottomChars,
      ].join("");

      const hasAdjacentSymbol = [...adjacentSymbolsConcatenated].some((ch) =>
        /[^0-9|.]/g.test(ch),
      );

      if (hasAdjacentSymbol) {
        sumOfParts += Number(num[0]);
      }
    });
  }

  console.log(sumOfParts);
};

type Symbol = {
  line: number;
  index: number;
};

type Number = {
  line: number;
  startIndex: number;
  endIndex: number;
  value: number;
};

type AsteriskWithAdjacentNumber = Symbol & {
  adjacentNumbers: Number[];
};

const isAdjacent = (number: Number, symbol: Symbol) =>
  symbol.line <= number.line + 1 &&
  symbol.line >= number.line - 1 &&
  symbol.index >= number.startIndex - 1 &&
  symbol.index <= number.endIndex + 1;

export const getPartTwoResult = async () => {
  const inputFilepath = import.meta.dir + "/input.txt";
  const lines = await getLinesFromInput(inputFilepath);

  let sumOfGearRatios = 0;
  const asterisksFound: Symbol[] = [];
  const numbersFound: Number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [...asterisksInLIne] = line.matchAll(/\*/g);
    const [...numbersInLine] = line.matchAll(/\d+/g);

    asterisksInLIne.forEach((asterisk) => {
      asterisksFound.push({
        line: i,
        index: asterisk.index!,
      });
    });

    numbersInLine.forEach((number) => {
      numbersFound.push({
        line: i,
        startIndex: number.index!,
        endIndex: number.index! + number[0].length - 1,
        value: Number(number[0]),
      });
    });
  }

  const asterisksWithAdjacentNumbers: AsteriskWithAdjacentNumber[] = [];

  asterisksFound.flat().forEach((asterisk) => {
    const adjacentNumbers: Number[] = [];

    numbersFound.flat().forEach((number) => {
      if (isAdjacent(number, asterisk)) {
        adjacentNumbers.push(number);
      }
    });

    if (adjacentNumbers.length > 0) {
      asterisksWithAdjacentNumbers.push({
        ...asterisk,
        adjacentNumbers,
      });
    }
  });

  const validGears = asterisksWithAdjacentNumbers.filter(
    (a) => a.adjacentNumbers.length === 2,
  );
  console.log(validGears.length);

  const gearsPowerSum = validGears.reduce((acc, next) => {
    acc += next.adjacentNumbers[0].value * next.adjacentNumbers[1].value;
    return acc;
  }, 0);
  console.log(gearsPowerSum);
};
