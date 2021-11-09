import { Field, FieldProps } from 'formik';
import { FieldDateTime } from '@istreamplanet/pebble';
import React from 'react';
import { InputOptions, DimensionType } from './types';
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
export const generateOnChangeHandler = ({
  name,
  setFieldValue,
  onChange: userOnChange,
}: {
  name: string;
  setFieldValue: Function;
  onChange?: Function;
}) => (value: unknown): void => {
  if (userOnChange) {
    userOnChange(value);
  }
  setFieldValue(name, value);
};

/**
 * @description Higher order function that generates the render prop consumed by
 * the Formik Field component as a child
 *
 * Documentation for the functions params match the prop-type comments below
 */
export const generateFieldDateTimeRenderProp = ({
  autoFocus,
  className,
  dateFormat,
  disabled,
  excludeTime,
  filterDate,
  helpText,
  hideLabel,
  id,
  isClearable,
  label,
  maxDate,
  maxTime,
  minDate,
  minTime,
  onChange,
  placeholderText,
  popperPlacement,
  required,
  selectLocalDateTime,
  size,
  timeFormat,
  width,
  withPortal,
}: FieldDateTimeAdapterOptions) =>
  // Disabling the line below because of an existing bug with eslint
  // that interprets the function below as a stateless/functional component
  // therefore erring because propTypes are not defined
  // ref: https://github.com/yannickcr/eslint-plugin-react/issues/1919

  // eslint-disable-next-line
    ({ field: { name, value }, form: { setFieldValue, errors, touched, submitCount = 0 } }: FieldProps) => (
    <FieldDateTime
      autofocus={autoFocus}
      className={className}
      dateFormat={dateFormat}
      disabled={disabled}
      excludeTime={excludeTime}
      filterDate={filterDate}
      helpText={helpText}
      hideLabel={hideLabel}
      id={id}
      isClearable={isClearable}
      isInvalid={
        !!(errors[name] && (isTouched(touched, name) || submitCount > 0))
      }
      label={label}
      maxDate={maxDate}
      maxTime={maxTime}
      minDate={minDate}
      minTime={minTime}
      onChange={generateOnChangeHandler({ name, setFieldValue, onChange })}
      placeholderText={placeholderText}
      popperPlacement={popperPlacement}
      required={required}
      selectLocalDateTime={selectLocalDateTime}
      size={size}
      timeFormat={timeFormat}
      validationText={
        (isTouched(touched, name) || submitCount > 0) && errors[name]
          ? errors[name]
          : null
      }
      value={value}
      width={width}
      withPortal={withPortal}
    />
  );

/**
 * @description This component serves as an adapter between the Formik Field component and
 * the underlying pebble FieldDateTime component
 *
 * @see https://pebble.istreamplanet.net/#/Components/FieldDateTime
 */
const FieldDateTimeAdapter = ({
  autoFocus,
  className,
  dateFormat,
  disabled,
  excludeTime,
  filterDate,
  helpText,
  hideLabel,
  id,
  isClearable,
  label,
  maxDate,
  maxTime,
  minDate,
  minTime,
  name,
  onChange,
  placeholderText,
  popperPlacement,
  required,
  selectLocalDateTime,
  size,
  timeFormat,
  type,
  width,
  withPortal,
}: FieldDateTimeAdapterOptions): JSX.Element => (
  <Field name={name} type={type}>
    {generateFieldDateTimeRenderProp({
      autoFocus,
      className,
      dateFormat,
      disabled,
      excludeTime,
      filterDate,
      helpText,
      hideLabel,
      id,
      isClearable,
      label,
      maxDate,
      maxTime,
      minDate,
      minTime,
      onChange,
      placeholderText,
      popperPlacement,
      required,
      selectLocalDateTime,
      size,
      timeFormat,
      width,
      withPortal,
    })}
  </Field>
);

interface FieldDateTimeAdapterOptions extends InputOptions {
  /**
   * The id attribute of the input
   */
  id?: string;
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Flag to automatically focus the input when true
   */
  autoFocus?: boolean;
  /**
   * Additional classNames to add
   */
  className?: string;
  /**
   * Format used to display text in the input box default is YYYY-MM-DD
   * or YYYY-MM-DD {timeFormat} Z To support correct handling of
   * inputting UTC times, the UTC offset should be included in the format
   *
   * ref: https://momentjs.com/docs/#/parsing/string-format/
   */
  dateFormat?: string;
  /**
   * Flag when true will make input disabled and non-focusable
   */
  disabled?: boolean;
  /**
   * Will disable time of day setting when true
   */
  excludeTime?: boolean;
  /**
   * Filter the selectable dates based on custom criteria
   *
   * @param {string} date - a UTC ISO 8601 string ref: https://en.wikipedia.org/wiki/ISO_8601
   * @returns {Function} - Flag that determines if the date is selectable by the user
   */
  filterDate?: Function;
  /**
   * Additional hint displayed beneath the input
   */
  helpText?: string;
  /**
   * Flag that when true will hide the label text
   */
  hideLabel?: boolean;
  /**
   * Flag when true will show a clear button
   */
  isClearable?: boolean;
  /**
   * Latest date allowed to be selected.
   *
   * Note: the time of the value is ignored. Can be anything that can be converted to
   * a valid javascript date object
   */
  maxDate?: object | string;
  /**
   * Earliest date allowed to be selected.
   * Note: the time of the value is ignored. Can be anything that can be converted to
   * a valid javascript date object
   */
  minDate?: object | string;
  minTime?: object;
  maxTime?: object;
  /**
   * The reference to the field name that exists in Formik state
   */
  name?: string;
  /**
   * Optional onChange handler called after the default
   */
  onChange?: Function;
  /**
   * String value applied to the input element's placeholder attribute
   */
  placeholderText?: string;
  /**
   * Placement of the calendar popup relative to the text input
   */
  popperPlacement?:
    | 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
  /**
   * If the section is required
   */
  required?: boolean;
  /**
   * Flag when true will display times in browser's local time instead of UTC
   */
  selectLocalDateTime?: boolean;
  /**
   * Changes the size of the input, giving it more or less padding and font size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Format used to display time in the time column in the popover
   */
  timeFormat?: string;
  /**
   * A valid css width (%, px, em, rem).
   *
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  width?: DimensionType;
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password etc)
   */
  type?: string;
  /**
   * When true will use a React portal to display the calendar popup
   *
   * ref: https://react-select.com/advanced#portaling
   */
  withPortal?: boolean;
}

// Appending display name attribute to conform to the desired name
// otherwise tests will reference this component as FieldDateTimeAdapter
FieldDateTimeAdapter.displayName = 'FieldDateTime';

export default FieldDateTimeAdapter;
