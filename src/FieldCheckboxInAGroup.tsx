import { Field, FieldProps } from 'formik';
import { FieldCheckbox } from '@istreamplanet/pebble';
import React from 'react';
import { InputOptions } from './types';
import { isTouched } from './Utils';

/**
 * @description Higher order function that provides a closure for the FieldCheckbox onChange handler
 *
 * @param {string} name - The formik state field name for the checkbox
 * @param {object} field - The formik field render prop ref: https://jaredpalmer.com/formik/docs/api/field
 * @param {string} value - The value attribute associated with the checkbox element
 * @param {object} form - Reference to the formik form that allows for imperative invocation of form methods and form state checking
 * @param {string} groupName - The group name that identifies which checkboxes are within a group
 * @returns {Function} - The onChange handler passed to the FieldCheckbox component
 */
export const generateFieldOnChangeHandler =
  ({
    name,
    field,
    value,
    form,
    groupName,
  }: {
    name: string;
    field: { value: string[] };
    value: string;
    form: {
      setFieldValue: Function;
      setFieldTouched: Function;
    };
    groupName: string;
  }) =>
  (): void => {
    if (field.value.includes(value)) {
      const nextValue = field.value.filter((nValue) => nValue !== value);
      form.setFieldValue(name, nextValue);
      form.setFieldTouched(groupName, true, false);
    } else {
      const nextValue = field.value.concat(value);
      form.setFieldValue(name, nextValue);
      form.setFieldTouched(groupName, true, false);
    }
  };

/**
 * @description Render prop generator function consumed and invoked within FieldCheckboxInAGroup
 */
export const generateFieldCheckboxRenderProp =
  ({
    className,
    disabled,
    helpText,
    id,
    label,
    toggle,
    groupName,
    name,
    required,
    value,
  }: FieldCheckboxInAGroupOptions) =>
  // Disabling the block below because of an existing bug with eslint
  // that interprets the function below as a stateless/functional component
  // therefore erring because propTypes are not defined
  // ref: https://github.com/yannickcr/eslint-plugin-react/issues/1919

  /* eslint-disable */
  ({ field, form }: FieldProps) => (
    <FieldCheckbox
      className={className}
      disabled={disabled}
      helpText={helpText}
      id={id}
      isInvalid={Boolean(((isTouched(form.touched, name) || form.submitCount > 0) && form.errors[name]) || (form.errors[groupName] && (isTouched(form.touched, groupName) || form.submitCount > 0)))}
      isSelected={field.value.includes(value)}
      label={label}
      onChange={generateFieldOnChangeHandler({ name, field, value, form, groupName })}
      required={required}
      toggle={toggle}
      validationText={((isTouched(form.touched, name) || form.submitCount > 0) && form.errors[name]) ? form.errors[name] : null}
    />
  )
  /* eslint-enable */

/**
 * @description Adapter component that connects the Formik Field component with the pebble FieldCheckbox component
 * @see https://pebble.istreamplanet.net/#/Components/FieldCheckbox
 */
const FieldCheckboxInAGroup = ({
  className,
  disabled,
  groupName,
  helpText,
  id,
  label,
  name,
  required,
  toggle,
  type,
  value,
}: FieldCheckboxInAGroupOptions): JSX.Element => (
  <Field name={name} type={type}>
    {generateFieldCheckboxRenderProp({
      className,
      disabled,
      helpText,
      label,
      id,
      toggle,
      groupName,
      name,
      required,
      value,
    })}
  </Field>
);

interface FieldCheckboxInAGroupOptions extends InputOptions {
  /**
   * Classname applied/passed to the FieldCheckbox pebble component
   */
  className?: string;
  /**
   * Boolean flag that will disable interaction with the checkbox when true
   */
  disabled?: boolean;
  /**
   * Name that serves as a group id to identify to which group a checkbox belongs
   */
  groupName: string;
  /**
   * Additional hint displayed beneath the label
   */
  helpText?: string;
  /**
   * Id prop passed to the FieldCheckbox pebble component
   */
  id: string;
  /**
   * The label for the checkbox
   */
  label?: string;
  /**
   * The reference to the field name that exists in Formik state
   */
  name: string;
  /**
   * If the selection is required
   */
  required?: boolean;
  /**
   * Boolean flag that will make the checkbox look like a toggle when true
   * ref: https://pebble.istreamplanet.net/#/Components/FieldToggle
   */
  toggle?: boolean;
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password)
   */
  type?: string;
  /**
   * The current field value associated with the checkbox
   */
  value: string;
}

export default FieldCheckboxInAGroup;
