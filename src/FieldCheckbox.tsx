import { Field, FieldProps } from 'formik';
import { getNestedValue, isTouched } from './Utils';

import { FieldCheckbox } from '@istreamplanet/pebble';
import { InputOptions } from './types';
import React from 'react';

/**
 * @description Higher order function that provides a closure for the FieldCheckbox onChange handler
 *  we need to set the values, this is necessary because the Formik Field onChange handler is expecting
 *  an event object while the FieldCheckbox onChange is only providing the value as the argument
 *
 * @param {object} param
 * @param {string} param.name - Formik field name
 * @param {Function} param.setFieldValue - Formik form setFieldValue function
 * @returns {Function} - The onChange handler function passed to FieldCheckbox
 */
export const generateOnChangeHandler =
  ({
    name,
    setFieldValue,
    onChange: userOnChange,
  }: {
    name: string;
    setFieldValue: Function;
    onChange?: Function;
  }) =>
  (value: unknown): void => {
    setFieldValue(name, value);
    if (userOnChange) {
      userOnChange(value);
    }
  };

/**
 * @description Render prop generator function consumed and invoked within FieldCheckboxAdapter
 *
 * @param {object} param
 * @param {string} param.className - Classname prop passed to FieldCheckboxAdapter
 * @param {boolean} param.disabled - flag that can disable the checkbox from user interaction
 * @param {string} param.helpText - Additional hint displayed beneath the label
 * @param {string} param.hideLabel - Visually hide the label
 * @param {string} param.label - The label for the checkbox
 * @param {boolean} param.required - Visually indicate required field
 * @param {boolean} param.toggle - Boolean flag that will make the checkbox look like a toggle when true @see https://pebble.istreamplanet.net/#/Components/FieldToggle
 * @param {string} param.value - The current field value associated with the checkbox
 * @returns {Function} - Renderprop function that conforms to the Formik Field's interface
 */
export const generateFieldCheckboxRenderProp =
  ({
    className,
    disabled,
    helpText,
    hideLabel,
    label,
    onChange,
    required,
    toggle,
    value,
  }: FieldCheckboxAdapterOptions) =>
  /**
   * Disabling the line below because of an existing bug with eslint
   * that interprets the function below as a stateless/functional component
   * therefore erring because propTypes are not defined
   *
   * @see https://github.com/yannickcr/eslint-plugin-react/issues/1919
   */
  // eslint-disable-next-line
  ({ field: { name }, form: { values, touched, errors, setFieldValue, submitCount = 0 } }: FieldProps) => {
    return (
      <FieldCheckbox
        className={className}
        disabled={disabled}
        helpText={helpText}
        hideLabel={hideLabel}
        id={name}
        isInvalid={
          !!(errors[name] && (isTouched(touched, name) || submitCount > 0))
        }
        isSelected={getNestedValue(values, name, '.')}
        label={label}
        onChange={generateOnChangeHandler({ name, setFieldValue, onChange })}
        required={required}
        toggle={toggle}
        validationText={
          (isTouched(touched, name) || submitCount > 0) && errors[name]
            ? errors[name]
            : null
        }
        value={value}
      />
    );
  };

/**
 * @description Adapter component that connects the Formik Field component with the pebble FieldCheckbox component
 * FieldCheckbox
 *
 * @see https://pebble.istreamplanet.net/#/Components/FieldCheckbox
 */
const FieldCheckboxAdapter = ({
  className,
  disabled,
  helpText,
  hideLabel,
  label,
  name,
  onChange,
  required,
  toggle,
  type,
  value,
}: FieldCheckboxAdapterOptions): JSX.Element => (
  <Field name={name} type={type}>
    {generateFieldCheckboxRenderProp({
      className,
      disabled,
      helpText,
      hideLabel,
      label,
      onChange,
      required,
      toggle,
      value,
    })}
  </Field>
);

interface FieldCheckboxAdapterOptions extends InputOptions {
  /**
   * Classname applied/passed to the FieldCheckbox pebble component
   */
  className?: string;
  /**
   * Boolean flag that will disable interaction with the checkbox when true
   */
  disabled?: boolean;
  /**
   * Additional hint displayed beneath the label
   */
  helpText?: string;
  /**
   * Visually hide the label
   */
  hideLabel?: boolean;
  /**
   * The label for the checkbox
   */
  label?: string;
  /**
   * If the selection is required
   */
  required?: boolean;
  /**
   * Boolean flag that will make the checkbox look like a toggle when true
   * @see https://pebble.istreamplanet.net/#/Components/FieldToggle
   */
  toggle?: boolean;
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password)
   */
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /**
   * The reference to the field name that exists in Formik state
   *
   * NOTE: Because this value must be equal to the id given to FieldCheckbox/FieldToggle
   *  whatever this value is will also be the id attribute of the underlying checkbox element
   */
  name?: string;
  /**
   * Optional onChange handler called after the default
   */
  onChange?: Function;
  /**
   * The current field value associated with the checkbox
   */
  value?: string;
}

FieldCheckboxAdapter.displayName = 'FieldCheckbox';

export default FieldCheckboxAdapter;
