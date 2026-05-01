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

export function formatCurrency(value: number) {
  return `$${formatCurrencyAmount(value)}`;
}

export function formatMultiplier(value: number) {
  return `${value.toFixed(2)}x`;
}
