export const parsePlate = (str: string): string => {
  let parsedStr = str.toUpperCase().trim();
  parsedStr = parsedStr.replace(/[-\s]/g, '');

  const letterPart = parsedStr.match(/[A-Z]+/g)?.[0] ?? '';
  const numberPart = parsedStr.match(/\d+/g)?.[0] ?? '';

  const formattedNumberPart =
    numberPart.length === 3 ? '0' + numberPart : numberPart;

  return `${letterPart}${formattedNumberPart}`;
};
