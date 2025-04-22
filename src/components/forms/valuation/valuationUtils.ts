
export const calculateRowValue = (quantity: number, ratePerUnit: number) => {
  return (quantity * ratePerUnit) / 100000;
};
export const calculateTotal = (rows: {quantity: number, ratePerUnit: number}[]) =>
  rows.reduce((total, row) => total + calculateRowValue(row.quantity, row.ratePerUnit), 0);

export const numberToWords = (num: number): string => {
  return num.toFixed(2);
};
