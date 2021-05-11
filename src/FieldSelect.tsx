import { Field, FieldProps } from 'formik';
import { FieldSelect } from '@istreamplanet/pebble';
import React from 'react';
import { dimensionType, InputOptions } from './types';
import { isTouched } from './Utils';

/**
 * @description Higher order function that provides a closure for the FieldSelect onChange handler
 *  we need to set the values, this is necessary because the Formik Field onChange handler is expecting
 *  an event object while the FieldSelect onChange is only providing the value as the first argument
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
  setFieldValue(name, value);
  if (userOnChange) {
    userOnChange(value);
  }
};

/**
 * @description Render prop generator function consumed and invoked within FieldSelectAdapter
 *
 * Note: Params for this function are documented within the FieldSelectAdapter's propTypes declaration
 *
 * @returns {Function} - Renderprop function that conforms to the Formik Field's interface
 */
export const generateFieldSelectRenderProp = ({
  ariaLabel,
  ariaLabelledby,
  autoFocus,
  className,
  closeMenuOnSelect,
  disabled,
  helpText,
  hideLabel,
  id,
  isClearable,
  isReadOnly,
  label,
  loading,
  loadingMessage,
  menuIsOpen,
  menuPlacement,
  menuPortalTarget,
  multiSelect,
  name,
  noOptionsMessage,
  onChange,
  onFocus,
  options,
  placeholder,
  required,
  showCheckbox,
  size,
  width,
}: FieldSelectAdapterOptions) =>
  // Disabling the line below because of an existing bug with eslint
  // that interprets the function below as a stateless/functional component
  // therefore erring because propTypes are not defined
  // ref: https://github.com/yannickcr/eslint-plugin-react/issues/1919

  // eslint-disable-next-line
    ({ field: { onBlur, value }, form: { errors, touched, setFieldValue, submitCount = 0 } }: FieldProps) => (
    <FieldSelect
      ariaLabel={ariaLabel}
      ariaLabelledby={ariaLabelledby}
      autoFocus={autoFocus}
      className={className}
      closeMenuOnSelect={closeMenuOnSelect}
      disabled={disabled}
      helpText={helpText}
      hideLabel={hideLabel}
      id={id}
      isClearable={isClearable}
      isInvalid={
        !!(errors[name] && (isTouched(touched, name) || submitCount > 0))
      }
      isReadOnly={isReadOnly}
      label={label}
      loading={loading}
      loadingMessage={loadingMessage}
      menuIsOpen={menuIsOpen}
      menuPlacement={menuPlacement}
      menuPortalTarget={menuPortalTarget}
      multiSelect={multiSelect}
      noOptionsMessage={noOptionsMessage}
      onBlur={onBlur}
      onChange={generateOnChangeHandler({ name, setFieldValue, onChange })}
      onFocus={onFocus}
      options={options}
      placeholder={placeholder}
      required={required}
      showCheckbox={showCheckbox}
      size={size}
      validationText={errors[name]}
      value={value}
      width={width}
    />
  );

/**
 * @description Adapter component that connects the Formik Field component with
 * the pebble FieldSelect component
 *
 * FieldSelect ref: https://pebble.istreamplanet.net/#/Components/FieldSelect
 */
const FieldSelectAdapter = ({
  ariaLabel,
  ariaLabelledby,
  autoFocus,
  className,
  closeMenuOnSelect,
  disabled,
  helpText,
  hideLabel,
  id,
  isClearable,
  isReadOnly,
  label,
  loading,
  loadingMessage,
  menuIsOpen,
  menuPlacement,
  menuPortalTarget,
  multiSelect,
  name,
  noOptionsMessage,
  onChange,
  onFocus,
  options,
  placeholder,
  required,
  showCheckbox,
  size,
  type,
  value,
  width,
}: FieldSelectAdapterOptions): JSX.Element => (
  <Field name={name} type={type}>
    {generateFieldSelectRenderProp({
      ariaLabel,
      ariaLabelledby,
      autoFocus,
      className,
      closeMenuOnSelect,
      disabled,
      helpText,
      hideLabel,
      id,
      isClearable,
      isReadOnly,
      label,
      loading,
      loadingMessage,
      menuIsOpen,
      menuPlacement,
      menuPortalTarget,
      multiSelect,
      name,
      noOptionsMessage,
      onChange,
      onFocus,
      options,
      placeholder,
      required,
      showCheckbox,
      size,
      value,
      width,
    })}
  </Field>
);

interface FieldSelectAdapterOptions extends InputOptions {
  /**
   * The id attribute of the FieldSelect's container
   */
  id: string;
  /**
   * The label for the checkbox
   */
  label: string;
  /**
   * Sets aria-label attribute
   */
  ariaLabel?: string;
  /**
   * Sets aria-labelledby attribute
   */
  ariaLabelledby?: string;
  /**
   * Focuses the select box of FieldSelect when true
   */
  autoFocus?: boolean;
  /**
   * Additional classes to add
   */
  className?: string;
  /**
   * Close the menu when the user selects an option when true
   */
  closeMenuOnSelect?: boolean;
  /**
   * Makes select disabled and not focusable when true
   */
  disabled?: boolean;
  /**
   * Additional hint displayed beneath the input
   */
  helpText?: JSX.Element | string;
  /**
   * Visually hides the label when true but is still readable by screen readers
   */
  hideLabel?: boolean;
  /**
   * After a selection is made, display a button that clears the selection
   */
  isClearable?: boolean;
  /**
   * Allows the user to read the values but not change them when true
   */
  isReadOnly?: boolean;
  /**
   * Will show the FieldSelect in a loading state when true
   */
  loading?: boolean;
  /**
   * Text to display when FieldSelect is in a loading state
   */
  loadingMessage?: string;
  /**
   * Flag that sets the menu to open when true
   */
  menuIsOpen?: boolean;
  /**
   * Sets placement of menu in relation to the control
   *
   * 'auto' will flip the menu if there isn't enough space
   * below the control
   */
  menuPlacement?: 'auto' | 'top' | 'bottom';
  /**
   * Whether the menu should use a portal, and where it should attach
   *
   * An example can be found https://react-select.com/advanced#portaling
   */
  menuPortalTarget?: JSX.Element;
  /**
   * Flag that enables multi-select when true
   */
  multiSelect?: boolean;
  /**
   * The reference to the field name that exists in Formik state
   */
  name?: string;
  /**
   * Text to display when there are no options
   */
  noOptionsMessage?: Function;
  /**
   * Optional onChange handler called after the default
   */
  onChange?: Function;
  /**
   * Callback function called when select is focused
   */
  onFocus?: Function;
  /**
   * Array of options to populate the select menu
   */
  options?: object[];
  /**
   * A short hint that is displayed when there is no value
   */
  placeholder?: string;
  /**
   * If the selection is required
   */
  required?: boolean;
  /**
   * Displays a checkbox before each option when true
   */
  showCheckbox?: boolean;
  /**
   * Changes the size of the input, giving it more or less padding and font size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password)
   */
  type?: string;
  /**
   * The value(s) within the select control
   */
  value?: object | object[];
  /**
   * A valid css width (%, px, em, rem).
   *
   * Or one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  width: dimensionType;
}

// Appending display name attribute to conform to the desired name
// otherwise tests will reference this component as FieldSelectAdapter
FieldSelectAdapter.displayName = 'FieldSelect';

export default FieldSelectAdapter;
