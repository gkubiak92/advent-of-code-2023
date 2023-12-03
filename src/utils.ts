export const getLinesFromInput = async (path: string) => {
  const file = Bun.file(path);
  const text = await file.text();
  return text.split("\n");
};
