type FormatCurrencyAmountOptions = {
  trimInteger?: boolean;
};

export function formatCurrencyAmount(
  value: number,
  options: FormatCurrencyAmountOptions = {},
) {
  if (options.trimInteger && Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2);
}
