export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export function randomBetween(minValue, maxValue, precision) {
  if (typeof precision == "undefined") {
    precision = 2;
  }
  return parseFloat(
    Math.min(
      minValue + Math.random() * (maxValue - minValue),
      maxValue
    ).toFixed(precision)
  );
};
