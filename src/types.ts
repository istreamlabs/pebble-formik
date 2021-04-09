const validDimensionsList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  10,
  20,
  25,
  30,
  33,
  34,
  40,
  50,
  60,
  70,
  75,
  80,
  90,
  100,
  '10',
  '20',
  '25',
  '30',
  '33',
  '34',
  '40',
  '50',
  '60',
  '70',
  '75',
  '80',
  '90',
  '100',
];

export type ValidDimensions = typeof validDimensionsList[number];

export type DimensionType = ValidDimensions | string | ValidDimensions[];

export interface InputOptions {
  /**
   * Relates to the max HTML5 attribute for inputs
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
   */
  max?: string;
  /**
   * Relates to the maxLength HTML5 attribute for inputs
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
   */
  maxLength?: number | string;
  /**
   * Relates to the min HTML5 attribute for inputs
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
   */
  min?: string;
  /**
   * Relates to the minLength HTML5 attribute for inputs
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
   */
  minLength?: number | string;
  /**
   * Relates to the multiple HTML5 attribute for inputs
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
   */
  multiple?: boolean;
  /**
   * Relates to the pattern HTML5 attribute for inputs
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
   */
  pattern?: RegExp;
}
