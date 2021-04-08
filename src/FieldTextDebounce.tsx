import { DimensionType, InputOptions } from './types';
import { Field, FieldProps } from 'formik';

import { FieldTextDebounce } from '@istreamplanet/pebble';
import React from 'react';
import { isTouched } from './Utils';

/**
 * @description Higher order function that generates the onChange handler
 *  passed to the FieldDateTime pebble component, this is needed because
 *  the formik onChange handler expects the input event object while the FieldDateTime
 *  component only passes the new input value so we set the form field imperatively
 *  in this method
 *
 * @param {object} param
 * @param {string} param.name - Formik field name
 * @param {Function} param.setFieldValue - Formik form method that imperatively sets the field value
 * @returns {Function} - The onChange handler passed to the FieldDateTime pebble component
 */
export const generateOnDebounceHandler = ({ name, setFieldValue, onDebounce }: { name: string; setFieldValue: Function; onDebounce?: Function }) => (value: any) => {
  setFieldValue(name, value);
  if (onDebounce) {
    onDebounce(value);
  }
};

/**
 * @description Render prop generator function consumed and invoked within FieldTextAdapter
 *
 * Note: Params for this function are documented within the FieldTextAdapter's propTypes' declaration
 *
 * @returns {Function} - Renderprop function that conforms to the Formik Field's interface
 */
export const generateFieldTextDebounceRenderProp = ({
  autoFocus,
  className,
  clearBtnFunc,
  disabled,
  helpText,
  hideLabel,
  id,
  ignoreSpellCheck,
  isReadOnly,
  label,
  max,
  maxLength,
  min,
  minimumCharacters,
  minLength,
  multiple,
  onDebounce,
  onFocus,
  pattern,
  placeholder,
  prefix,
  required,
  size,
  suffix,
  type,
  width,
}: IFieldTextDebounceOptions) => (
  /**
   * Disabling the line below because of an existing bug with eslint
   * that interprets the function below as a stateless/functional component
   * therefore erring because propTypes are not defined
   *
   * @see https://github.com/yannickcr/eslint-plugin-react/issues/1919
   */
  // eslint-disable-next-line
  ({ field: { onBlur, name, value }, form: { errors, setFieldValue, touched, submitCount = 0 } }: FieldProps) => (
    <FieldTextDebounce
      autoFocus={autoFocus}
      className={className}
      clearBtnFunc={clearBtnFunc}
      disabled={disabled}
      helpText={helpText}
      hideLabel={hideLabel}
      id={id}
      ignoreSpellCheck={ignoreSpellCheck}
      isInvalid={!!((isTouched(touched, name) || submitCount > 0) && errors[name])}
      isReadOnly={isReadOnly}
      label={label}
      max={max}
      maxLength={maxLength}
      min={min}
      minimumCharacters={minimumCharacters}
      minLength={minLength}
      multiple={multiple}
      name={name}
      onBlur={onBlur}
      onDebounce={generateOnDebounceHandler({ name, setFieldValue, onDebounce })}
      onFocus={onFocus}
      pattern={pattern}
      placeholder={placeholder}
      prefix={prefix}
      required={required}
      size={size}
      suffix={suffix}
      type={type}
      validationText={errors[name]}
      value={value}
      width={width}
    />
  ));


const FieldTextDebounceAdapter = ({
  autoFocus,
  className,
  clearBtnFunc,
  disabled,
  helpText,
  hideLabel,
  id,
  ignoreSpellCheck,
  isReadOnly,
  label,
  max,
  maxLength,
  min,
  minimumCharacters,
  minLength,
  multiple,
  name,
  onDebounce,
  onFocus,
  pattern,
  placeholder,
  prefix,
  required,
  size,
  suffix,
  type,
  width,
}: IFieldTextDebounceOptions) => (
  <Field name={name} type={type}>
    {generateFieldTextDebounceRenderProp({
      autoFocus,
      className,
      clearBtnFunc,
      disabled,
      helpText,
      hideLabel,
      id,
      ignoreSpellCheck,
      isReadOnly,
      label,
      max,
      maxLength,
      min,
      minimumCharacters,
      minLength,
      multiple,
      name,
      onDebounce,
      onFocus,
      pattern,
      placeholder,
      prefix,
      required,
      size,
      suffix,
      type,
      width,
    })}
  </Field>
);

interface IFieldTextDebounceOptions extends InputOptions {
  /**
   * Automatically focuses the input when true
   */
  autoFocus?: Boolean;
  /**
   * Class name applied/passed to the FieldTextDebounce pebble component
   */
  className?: string;
  /**
   * Callback for a button to clear the input value
   */
  clearBtnFunc?: Function;
  /**
   * The input will be disabled and not focusable when true
   */
  disabled?: Boolean;
  /**
   * Additional hint displayed beneath the input
   */
  helpText?: JSX.Element | string;
  /**
   * Boolean flag that will hide the field's label text
   */
  hideLabel?: Boolean;
  /**
   * Id prop passed to the FieldTextDebounce pebble component
   */
  id?: string;
  /**
   * The spellcheck attribute of the input
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck
   */
  ignoreSpellCheck?: Boolean;
  /**
   * If the value of the input can be read, but not changed
   */
  isReadOnly?: Boolean;
  isValid?: Boolean;
  /**
   * Text that is displayed as the field's label
   */
  label?: string;
  /**
   * The minimum number of characters before triggering a change
   */
  minimumCharacters?: number;
  /**
   * The reference to the field name that exists in Formik state
   */
  name: string;
  /**
   * Callback provided by Formik Field render props to fire when input is blurred
   */
  onBlur?: Function;
  /**
   * Callback provided by Formik Field render props to fire when input is debounced
   */
  onDebounce?: Function;
  /**
   * Callback function called when select is focused
   */
  onFocus?: Function;
  /**
   * Text that is displayed in the field when it is empty
   */
  placeholder?: string;
  /**
   * Text or node to display before the value
   */
  prefix?: JSX.Element | string;
  /**
   * If the section is required
   */
  required?: Boolean;
  /**
   * Changes the size of the input, giving it more or less padding and font size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Text or node to display after the value
   */
  suffix?: JSX.Element | string;
  /**
   * Type attribute of the input
   */
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  validationText?: string;
  /**
   * The current field value for the input
   */
  value?: string;
  /**
   * A valid css width (%, px, em, rem).
   *
   * Or one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  width?: DimensionType,
};

// Appending display name attribute to conform to the desired name
// otherwise tests will reference this component as FieldTextDebounceAdapter
FieldTextDebounceAdapter.displayName = 'FieldTextDebounce';

export default FieldTextDebounceAdapter;
