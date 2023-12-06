import { getLinesFromInput } from "../utils.ts";

type Map = number[];
type SourceToDestinationMap = number[][];
type SourceToDestinationMaps = Record<string, SourceToDestinationMap>;

const findDestinationNumber = (source: number, maps: Map[]): number => {
  let destination;
  let mapWithDestination = null;
  let checkingMapIndex = 0;

  while (mapWithDestination === null && checkingMapIndex < maps.length) {
    const sourceStart = maps[checkingMapIndex][1];
    const mapLength = maps[checkingMapIndex][2];
    if (source >= sourceStart && source <= sourceStart + mapLength - 1) {
      mapWithDestination = checkingMapIndex;
    }
    checkingMapIndex++;
  }

  if (mapWithDestination === null) {
    destination = source;
  } else {
    const indexOfDestination = source - maps[mapWithDestination][1];
    destination = maps[mapWithDestination][0] + indexOfDestination;
  }

  return destination;
};

const getSeedsAndMapsFromInput = async () => {
  const inputFilePath = import.meta.dir + "/input.txt";
  const [seedsLine, ...lines] = await getLinesFromInput(inputFilePath);

  const seeds = seedsLine
    .split(": ")[1]
    .split(" ")
    .map((s) => parseInt(s));
  const mapLines = lines.filter((line) => line !== "");

  const maps: Record<string, number[][]> = {};

  const mapPattern = /map:/;

  let currentMap = mapLines
    .find((line) => mapPattern.test(line))
    ?.split(" ")[0]!;

  for (let i = 0; i < mapLines.length; i++) {
    if (mapPattern.test(mapLines[i])) {
      currentMap = mapLines[i].split(" ")[0];
    } else {
      maps[currentMap] = [
        ...(maps[currentMap] ?? []),
        mapLines[i].split(" ").map((n) => parseInt(n)),
      ];
    }
  }

  return { seeds, maps };
};

const getLocations = (seeds: number[], maps: SourceToDestinationMaps) => {
  const locations: number[] = [];

  seeds.forEach((seed) => {
    const mapSet = Object.values(maps);
    let source = seed;
    let destination = null;

    for (let i = 0; i < mapSet.length; i++) {
      destination = findDestinationNumber(source, mapSet[i]);
      source = destination;
    }

    locations.push(destination!);
  });

  return locations;
};

export const getPartOneResult = async () => {
  const { seeds, maps } = await getSeedsAndMapsFromInput();
  const locations = getLocations(seeds, maps);

  console.log(locations);
  console.log(Math.min(...locations));
};

export const getPartTwoResult = async () => {
  const { seeds, maps } = await getSeedsAndMapsFromInput();
  const allSeeds: number[] = [];

  // TODO optimize it
  for (let i = 0; i + 2 <= seeds.length; i += 2) {
    console.log(`Processing seed: ${seeds[i]}`);
    for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
      allSeeds.push(j);
    }
  }

  const locations = getLocations(allSeeds, maps);

  console.log(locations);
  console.log(Math.min(...locations));
};
