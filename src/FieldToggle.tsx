import FieldCheckbox from './FieldCheckbox';
import React from 'react';

/**
 * NOTE: FieldToggle in pebble is a convenience wrapper for FieldCheckbox with
 * the toggle flag set to true so consuming pebble-formik/FieldToggle
 * in a similar fashion, spreading props is acceptable here
 * because FieldCheckbox will properly gate incoming props to only those
 * that are relevant to the underlying pebble component
 */

/**
 * @description This component serves as a convenience wrapper for the
 * pebble-formik FieldToggle component with the toggle prop set to true
 *
 * @see https://pebble.istreamplanet.net/#/Components/FieldToggle
 */
const FieldToggle = ({ ...rest }: FieldToggleOptions): JSX.Element => (
  <FieldCheckbox {...rest} toggle />
);

interface FieldToggleOptions {
  /**
   * Classname applied/passed to the FieldToggle pebble component
   */
  className?: string;
  /**
   * Boolean flag that will disable interaction with the toggle when true
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
   * The label for the toggle
   */
  label?: string;
  /**
   * The input type that follows the HTML5 standard (i.e. text, number, email, password)
   */
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /**
   * The reference to the field name that exists in Formik state
   */
  name?: string;
  /**
   * Optional onChange handler called after the default
   */
  onChange?: Function;
  /**
   * If the selection is required
   */
  required?: boolean;
  /**
   * The current field value associated with the toggle
   */
  value?: string;
}

FieldToggle.displayName = 'FieldToggle';

export default FieldToggle;
