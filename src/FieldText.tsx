import { DimensionType, InputOptions } from './types';
import { Field, FieldProps } from 'formik';

import { FieldText } from '@istreamplanet/pebble';
import React from 'react';
import { isTouched } from './Utils';

/**
 * @description Render prop generator function consumed and invoked within FieldTextAdapter
 *
 * Note: Params for this function are documented within the FieldTextAdapter's propTypes' declaration
 *
 * @returns {Function} - Renderprop function that conforms to the Formik Field's interface
 */
export const generateFieldTextRenderProp = ({
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
  minLength,
  multiple,
  onChange: userOnChange,
  onFocus,
  pattern,
  placeholder,
  prefix,
  required,
  size,
  suffix,
  type,
  width
}: IFieldTextOptions) =>
  /**
   * Disabling the line below because of an existing bug with eslint
   * that interprets the function below as a stateless/functional component
   * therefore erring because propTypes are not defined
   *
   * @see https://github.com/yannickcr/eslint-plugin-react/issues/1919
   */

  // eslint-disable-next-line
  ({ field: { onBlur, onChange, name, value = '' }, form: { errors, touched, submitCount = 0 } }: FieldProps) => (
    <FieldText
      autoFocus={autoFocus}
      className={className}
      clearBtnFunc={clearBtnFunc}
      disabled={disabled}
      helpText={helpText}
      hideLabel={hideLabel}
      id={id}
      ignoreSpellCheck={ignoreSpellCheck}
      isInvalid={
        !!(errors[name] && (isTouched(touched, name) || submitCount > 0))
      }
      isReadOnly={isReadOnly}
      label={label}
      max={max}
      maxLength={maxLength}
      min={min}
      minLength={minLength}
      multiple={multiple}
      name={name}
      onBlur={onBlur}
      onChange={
        userOnChange
          ? (e: React.ChangeEvent<any>) => {
              userOnChange(e);
              onChange(e);
            }
          : onChange
      }
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
  );

/**
 * @description This component serves as an adapter between the Formik Field component and the underlying
 * pebble based text field component
 *
 * @see https://pebble.istreamplanet.net/#/Components/FieldText
 */
const FieldTextAdapter = ({
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
  minLength,
  multiple,
  name,
  onChange,
  onFocus,
  pattern,
  placeholder,
  prefix,
  required,
  size,
  suffix,
  type,
  width
}: IFieldTextOptions) => (
  <Field name={name} type={type}>
    {generateFieldTextRenderProp({
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
      minLength,
      multiple,
      name,
      onChange,
      onFocus,
      pattern,
      placeholder,
      prefix,
      required,
      size,
      suffix,
      type,
      width
    })}
  </Field>
);

interface IFieldTextOptions extends InputOptions {
  /**
   * Automatically focuses the input when true
   */
  autoFocus?: Boolean;
  /**
   * Classname applied/passed to the FieldText pebble component
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
   * Id prop passed to the FieldText pebble component
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
  /**
   * Text that is displayed as the field's label
   */
  label?: string;
  /**
   * The reference to the field name that exists in Formik state
   */
  name: string;
  /**
   * Callback provided by Formik Field render props to fire when input is blurred
   */
  onBlur?: Function;
  /**
   * Callback provided by Formik Field render props to fire when input is changed
   */
  onChange?: Function;
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
  width?: DimensionType;
}

// Appending display name attribute to conform to the desired name
// otherwise tests will reference this component as FieldTextAdapter
FieldTextAdapter.displayName = 'FieldText';

export default FieldTextAdapter;
