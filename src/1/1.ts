const getLinesFromInput = async () => {
  const inputFilePath = import.meta.dir + "/input.txt";

  const file = Bun.file(inputFilePath);
  const text = await file.text();
  return text.split("\n");
};

export const getPartOneResult = async () => {
  const lines = await getLinesFromInput();
  let sum = 0;

  lines.forEach((line) => {
    const digitsFromLine = Array.from(line).filter(Number);
    const firstDigit = digitsFromLine[0];
    const lastDigit = digitsFromLine.at(-1);

    const number = Number(`${firstDigit}${lastDigit}`);

    sum += number;
  });

  console.log("Result of part1 is:");
  console.log(sum);
};

export const getPartTwoResult = async () => {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const lines = await getLinesFromInput();
  let sum = 0;

  lines.forEach((line) => {
    const digits = [];

    for (let i = 0; i < line.length; i++) {
      if (Number.isInteger(Number(line[i]))) {
        digits.push(Number(line[i]));
      } else {
        words.forEach((word, index) => {
          if (line.substring(i, i + word.length) === word) {
            digits.push(index);
          }
        });
      }
    }

    const firstNumber = digits[0];
    const lastNumber = digits.at(-1);

    const number = Number(`${firstNumber}${lastNumber}`);

    sum += number;
  });

  console.log("Result of part2 is:");
  console.log(sum);
};
