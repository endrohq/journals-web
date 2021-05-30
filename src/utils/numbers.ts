export const getFormattedNumber = (value: string) => {
  const nf = Intl.NumberFormat();
  const x = Number(value);
  return nf.format(x);
}
