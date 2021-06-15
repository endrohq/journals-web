export const capitalize = (str: string) => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
};

export const getShortenedFormat = (
  address: string = '',
  length: number = 6
) => {
  if (!address) return '';
  const maxLength = address.length;
  const minLength = 6;

  let actualLength = length - minLength < 0 ? minLength : length;

  if (actualLength < maxLength) {
    return `${address.substring(0, actualLength)}...${address.substring(
      maxLength - 4,
      maxLength
    )}`;
  } else {
    return address;
  }
};
