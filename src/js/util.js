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

export const SVG = {
  select(selector) {
    const el = document.querySelector(selector);
    return this.makeWrapper(el);
  },
  create(type) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", type);
    return this.makeWrapper(el);
  },
  makeWrapper(el) {
    if (!el) return null;
    return {
      get element() {
        return el;
      },
      set(attr, value) {
        el.setAttribute(attr, value);
        return this;
      },
      style(prop, value) {
        el.style[prop] = value;
        return this;
      }
    };
  }
};