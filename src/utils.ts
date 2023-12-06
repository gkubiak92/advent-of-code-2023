export const parseFile = async (path: string) => {
  const file = Bun.file(path);
  return await file.text();
};

export const getLinesFromInput = async (path: string) => {
  const text = await parseFile(path);
  return text.split("\n");
};
