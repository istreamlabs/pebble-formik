import { Field, FieldProps } from 'formik';
import { FieldNumber } from '@istreamplanet/pebble';
import { DimensionType, InputOptions } from './types';
import React from 'react';
import { isTouched } from './Utils';

/**
 * @description Render prop generator function consumed and invoked within FieldNumberAdapter
 *
 * @param {object} param
 * @param {string} param.id - Id attribute for the FieldNumber component
 * @param {string} param.label - Text for the label markup
 * @param {boolean} param.autoFocus - Boolean flag that focuses input when true
 * @param {string} param.className - Additional classNames to add to FieldNumber component
 * @param {Function} param.clearBtnFunc - Callback fired when clear button is clicked
 * @param {boolean} param.disabled - Flag that disables the input when true
 * @param {string} param.helpText - Additional hint displayed below input
 * @param {boolean} param.hideLabel - Flag that hides the label text when true
 * @param {boolean} param.isReadOnly - Flag that makes input read-only when true
 * @param {Function} param.onFocus - Callback that is fired when the input is focused
 * @param {string} param.placeholder - Placeholder text for the input when the input has no value
 * @param {string|Node} param.prefix - Text or node to display before the value
 * @param {boolean} param.required - If the section is required
 * @param {('small'|'medium'|'large')} param.size - Changes the size of the input, giving it more or
 *  less padding and font size
 * @param {string|Node} param.suffix - Text or node to display after the value
 * @param {string|number|Array} param.width - Valid css width, see prop-type comment block below for more
 * @returns {Function} - The render prop function passed to the Field component as a child
 */
export const generateFieldNumberRenderProp =
  ({
    autoFocus,
    className,
    clearBtnFunc,
    disabled,
    helpText,
    hideLabel,
    id,
    isReadOnly,
    label,
    onFocus,
    placeholder,
    prefix,
    required,
    size,
    suffix,
    width,
  }: FieldNumberAdapterOptions) =>
  /**
   * Disabling the line below because of an existing bug with eslint
   * that interprets the function below as a stateless/functional component
   * therefore erring because propTypes are not defined
   *
   * @see https://github.com/yannickcr/eslint-plugin-react/issues/1919
   */

  // eslint-disable-next-line
  ({ field: { onBlur, onChange, name, value= '' }, form: { errors, touched, submitCount = 0 } }: FieldProps) => (
      <FieldNumber
        autoFocus={autoFocus}
        className={className}
        clearBtnFunc={clearBtnFunc}
        disabled={disabled}
        helpText={helpText}
        hideLabel={hideLabel}
        id={id}
        isInvalid={
          !!(errors[name] && (isTouched(touched, name) || submitCount > 0))
        }
        isReadOnly={isReadOnly}
        label={label}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        prefix={prefix}
        required={required}
        size={size}
        suffix={suffix}
        validationText={errors[name]}
        width={width}
        value={value}
      />
    );

/**
 * @description This component serves as an adapter between the Formik Field component and the underlying
 * pebble based number field component
 *
 * @see https://pebble.istreamplanet.net/#/Components/FieldNumber
 */
const FieldNumberAdapter = ({
  autoFocus,
  className,
  clearBtnFunc,
  disabled,
  helpText,
  hideLabel,
  id,
  isReadOnly,
  label,
  name,
  onFocus,
  placeholder,
  prefix,
  required,
  size,
  suffix,
  type,
  width,
  value,
}: FieldNumberAdapterOptions): JSX.Element => (
  <Field name={name} type={type}>
    {generateFieldNumberRenderProp({
      autoFocus,
      className,
      clearBtnFunc,
      disabled,
      helpText,
      hideLabel,
      id,
      isReadOnly,
      label,
      name,
      onFocus,
      placeholder,
      prefix,
      required,
      size,
      suffix,
      width,
      value,
    })}
  </Field>
);

interface FieldNumberAdapterOptions extends InputOptions {
  /**
   * Automatically focuses the input element when true
   */
  autoFocus?: boolean;
  /**
   * Classname applied/passed to the FieldText pebble component
   */
  className?: string;
  /**
   * Callback for a button to clear the input value
   */
  clearBtnFunc?: Function;
  /**
   * Flag that disables the input and makes it not focusable when true
   */
  disabled?: boolean;
  /**
   * Additional hint displayed beneath the input
   */
  helpText?: string;
  /**
   * Boolean flag that will hide the field's label text
   */
  hideLabel?: boolean;
  /**
   * Id prop passed to the FieldText pebble component
   */
  id?: string;
  /**
   * Flag that will make the input read-only when true
   */
  isReadOnly?: boolean;
  /**
   * Text that is displayed as the field's label
   */
  label?: string;
  /**
   * The reference to the field name that exists in Formik state
   */
  name: string;
  /**
   * Callback function called when input is focused
   */
  onFocus?: Function;
  /**
   * Text that is displayed in the field when it is empty
   */
  placeholder?: string;
  /**
   * Text or node to display before the value
   */
  prefix?: string | JSX.Element;
  /**
   * If the section is required
   */
  required?: boolean;
  /**
   * Changes the size of the input, giving it more or less padding
   * and font size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Text or node to display after the value
   */
  suffix?: string | JSX.Element;
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password)
   */
  type?: string;
  /**
   * A valid css width (%, px, em, rem).
   *
   * Or one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  width?: DimensionType;
  /**
   * The field value
   */
  value?: number;
}

// Appending display name attribute to conform to the desired name
// otherwise tests will reference this component as FieldNumberAdapter
FieldNumberAdapter.displayName = 'FieldNumber';

export default FieldNumberAdapter;
