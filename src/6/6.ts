import { getLinesFromInput } from "../utils.ts";

const getPossibilitiesToBeatRecordCount = (
  time: number,
  distanceToBeat: number,
) => {
  const possibilities: number[] = [];

  for (let i = 0; i < time; i++) {
    const distance = i * (time - i);
    if (distance > distanceToBeat) {
      possibilities.push(distance);
    }
  }

  return possibilities;
};

export const getPartOneResult = async () => {
  const inputFilePath = import.meta.dir + "/input.txt";
  const lines = await getLinesFromInput(inputFilePath);
  const [...times] = lines[0].matchAll(/\d+/g);
  const [...distances] = lines[1].matchAll(/\d+/g);

  const races = [];
  for (let i = 0; i < times.length; i++) {
    races.push([Number(times[i]), Number(distances[i])]);
  }

  const beatRecordPossibilities: number[] = [];

  races.forEach(([time, distanceToBeat]) => {
    const possibilities = getPossibilitiesToBeatRecordCount(
      time,
      distanceToBeat,
    );
    beatRecordPossibilities.push(possibilities.length);
  });

  console.log(beatRecordPossibilities);
  console.log(beatRecordPossibilities.reduce((acc, next) => acc * next, 1));
};

export const getPartTwoResult = async () => {
  const inputFilePath = import.meta.dir + "/input.txt";
  const lines = await getLinesFromInput(inputFilePath);
  const [...times] = lines[0].matchAll(/\d+/g);
  const [...distances] = lines[1].matchAll(/\d+/g);

  const [time, distanceToBeat] = [
    Number(times.join("")),
    Number(distances.join("")),
  ];

  const possibilities = getPossibilitiesToBeatRecordCount(time, distanceToBeat);
  console.log(possibilities.length);
};
