import { getLinesFromInput } from "../utils.ts";
import { kMaxLength } from "buffer";

const getDataFromCardLine = (line: string) => {
  const cardNo = line.substring(4, line.indexOf(":")).trim();
  const winningNumbers = line
    .substring(line.indexOf(":") + 1, line.indexOf("|"))
    .trim()
    .split(" ")
    .filter((number) => number !== "");
  const myNumbers = line
    .substring(line.indexOf("|") + 1, line.length)
    .trim()
    .split(" ")
    .filter((number) => number !== "");

  return { cardNo, winningNumbers, myNumbers };
};

const getMatchingNumbers = (winningNumbers: string[], myNumbers: string[]) => {
  const matchingNumbers: string[] = [];

  myNumbers.forEach((myNumber) => {
    if (winningNumbers.includes(myNumber)) {
      matchingNumbers.push(myNumber);
    }
  });

  return matchingNumbers;
};

export const getPartOneResult = async () => {
  const inputFilePath = import.meta.dir + "/input.txt";
  const lines = await getLinesFromInput(inputFilePath);

  let sumOfPoints = 0;

  lines.forEach((line) => {
    const { winningNumbers, myNumbers } = getDataFromCardLine(line);

    const matchingNumbers = getMatchingNumbers(winningNumbers, myNumbers);

    if (matchingNumbers.length > 0) {
      const cardValue = 2 ** (matchingNumbers.length - 1);
      sumOfPoints += cardValue;
    }
  });

  console.log(sumOfPoints);
};

export const getPartTwoResult = async () => {
  const inputFilePath = import.meta.dir + "/input.txt";
  const lines = await getLinesFromInput(inputFilePath);

  const winningNumbersCountList: number[] = [];

  lines.forEach((line) => {
    const { cardNo, winningNumbers, myNumbers } = getDataFromCardLine(line);
    const matchingNumbers = getMatchingNumbers(winningNumbers, myNumbers);
    winningNumbersCountList.push(matchingNumbers.length);
  });

  const cardInstances = Array.from({ length: lines.length }).fill(
    1,
  ) as number[];

  for (let i = 0; i < cardInstances.length; i++) {
    for (let k = 0; k < cardInstances[i]; k++) {
      if (winningNumbersCountList[i] > 0) {
        const nextIndex = i + 1;
        for (
          let j = nextIndex;
          j < nextIndex + winningNumbersCountList[i];
          j++
        ) {
          cardInstances[j]++;
        }
      }
    }
  }
  const cardsTotal = cardInstances.reduce((acc, next) => acc + next, 0);
  console.log({ cardsTotal });
};
