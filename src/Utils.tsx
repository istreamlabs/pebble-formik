export function isTouched(touchedFields = {}, field = ''): Boolean {
  const parts = field.split('.');
  if (parts.length > 1) {
    const top = field.slice(0, field.indexOf('.'));
    const rest = field.slice(field.indexOf('.') + 1, field.length);
    return touchedFields[top] ? isTouched(touchedFields[top], rest) : false;
  }
  return !!touchedFields[field];
}

/**
 * Access nested property values using a string representing the path to the property.
 * @param {object} obj
 * @param {string} path
 * @param {string} separator
 */
export function getNestedValue(obj: any, path: string, separator: string) {
  try {
    separator = separator || '.';

    return path
      .replace('[', separator)
      .replace(']', '')
      .split(separator)
      .reduce((obj, property) => obj[property], obj);
  } catch (err) {
    return undefined;
  }
}
