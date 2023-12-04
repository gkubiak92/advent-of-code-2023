import { getLinesFromInput } from "../utils.ts";

const inputFilePath = import.meta.dir + "/input.txt";

type ColorOccurrences = {
  red: number[];
  green: number[];
  blue: number[];
};

const getGameData = (gameLine: string) => {
  const patterns = {
    red: /\b\d+\sred\b/gi,
    green: /\b\d+\sgreen\b/gi,
    blue: /\b\d+\sblue\b/gi,
  };

  const colonPosition = gameLine.indexOf(":");
  const gameId = gameLine.substring(5, colonPosition);
  const colorOccurrences = Object.entries(patterns).reduce<ColorOccurrences>(
    (acc, [color, pattern]) => {
      const occurrences = [...gameLine.matchAll(pattern)].flat();

      return {
        ...acc,
        [color]: occurrences.map((o) => Number(o.split(" ")[0])),
      };
    },
    {} as ColorOccurrences,
  );

  return { gameId, colorOccurrences };
};

export const getPartOneResult = async () => {
  //   [red, green, blue]
  const availableColorsCount: readonly [number, number, number] = [12, 13, 14];
  const lines = await getLinesFromInput(inputFilePath);

  let sumOfIds = 0;

  lines.forEach((line) => {
    const { gameId, colorOccurrences } = getGameData(line);
    const maxOfColors: number[] = [];

    Object.values(colorOccurrences).forEach((value) => {
      const max = value.reduce((acc, next) => (next > acc ? next : acc), 0);
      maxOfColors.push(max);
    });

    if (
      maxOfColors[0] <= availableColorsCount[0] &&
      maxOfColors[1] <= availableColorsCount[1] &&
      maxOfColors[2] <= availableColorsCount[2]
    ) {
      sumOfIds += Number(gameId);
    }
  });

  console.log(sumOfIds);
};

export const getPartTwoResult = async () => {
  const lines = await getLinesFromInput(inputFilePath);

  let sumOfPowers = 0;

  lines.forEach((line) => {
    const { colorOccurrences } = getGameData(line);

    const colorOccurrencesValues = Object.values(colorOccurrences);

    let power = 1;

    for (let i = 0; i < 3; i++) {
      const max = Math.max(...colorOccurrencesValues[i]);

      power *= max;
    }

    sumOfPowers += power;
  });

  console.log(sumOfPowers);
};
