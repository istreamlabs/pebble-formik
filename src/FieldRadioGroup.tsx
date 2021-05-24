import React from 'react';
import { Field, FieldProps } from 'formik';
import { FieldRadioGroup } from '@istreamplanet/pebble';
import { InputOptions } from './types';

/**
 * @description Higher order function that provides a closure for the FieldRadioGroup onChange handler
 *  we need to set the values, this is necessary because the Formik Field onChange handler is expecting
 *  an event object while the FieldRadioGroup onChange is only providing the value as the argument
 *
 * @param {object} param
 * @param {name} param.name - Formik field name
 * @param {Function} param.setFieldValue - Formik form setFieldValue function
 * @param {bool} param.required - If the selection is required
 * @returns {Function} - The onChange handler function passed to FieldRadioGroup
 */
export const generateOnChangeHandler = ({
  name,
  setFieldValue,
}: {
  name: string;
  setFieldValue: Function;
}) => (value: unknown): void => setFieldValue(name, value);

/**
 * @description Render prop generator function consumed and invoked within FieldRadioGroupAdapter
 */
export const generateFieldRadioGroupRenderProp = ({
  className,
  helpText,
  name,
  radios,
  required,
  title,
}: FieldRadioGroupAdapterOptions) =>
  // Disabling the line below because of an existing bug with eslint
  // that interprets the function below as a stateless/functional component
  // therefore erring because propTypes are not defined
  // ref: https://github.com/yannickcr/eslint-plugin-react/issues/1919

  // eslint-disable-next-line
  ({ field: { value }, form: { setFieldValue } }: FieldProps) => (
    <FieldRadioGroup
      className={className}
      helpText={helpText}
      name={name}
      onChange={generateOnChangeHandler({ name, setFieldValue })}
      radios={radios}
      required={required}
      title={title}
      value={value}
    />
  );

/**
 * @description This component serves as an adapter between the Formik Field component and the underlying
 * pebble FieldRadioGroup component ref: https://pebble.istreamplanet.net/#/Components/FieldRadioGroup
 */
const FieldRadioGroupAdapter = ({
  className,
  helpText,
  name,
  radios,
  required,
  title,
  type,
}: FieldRadioGroupAdapterOptions): JSX.Element => (
  <Field name={name} type={type}>
    {generateFieldRadioGroupRenderProp({
      className,
      helpText,
      name,
      radios,
      required,
      title,
    })}
  </Field>
);

interface FieldRadioGroupAdapterOptions extends InputOptions {
  /**
   * Additional classes to add
   */
  className?: string;
  /**
   * Additional hint displayed beneath the label
   */
  helpText?: string;
  /**
   * Name attribute applied to all radios
   */
  name: string;
  /**
   * The radio options structured as an array of objects
   * that conform to an expected shape.
   * This prop is listed explicity as it is required
   */
  radios: {
    disabled?: boolean;
    helpText?: JSX.Element | string;
    id: string;
    label: string;
    value: string;
  }[];
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password)
   */
  type?: string;
  /**
   * If at least one option must be selected
   */
  required?: boolean;
  /**
   * The label for the group of radios
   */
  title: string;
}

FieldRadioGroupAdapter.displayName = 'FieldRadioGroup';

export default FieldRadioGroupAdapter;
