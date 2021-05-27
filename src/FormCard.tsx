/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Block,
  Button,
  ButtonGroup,
  Card,
  Form,
  Icon,
} from '@istreamplanet/pebble';
import { Formik, FormikErrors, FormikHelpers, FormikValues } from 'formik';
import { Prompt, RouteComponentProps, withRouter } from 'react-router-dom';

import ErrorSummary from './ErrorSummary';
import React from 'react';
import classNames from 'classnames';

/**
 * Higher order function that returns the function passed to the onSubmit prop for Formik
 * @param {object} param
 * @param {Function} param.errorCallback - The error callback called on submission failure
 * @param {Function} param.onSubmit - The submission function supplied by the developer (could be an api call)
 * @param {Function} param.setInitValue - Setter function that will reset the form's initial values to what is passed
 * @param {Function} param.successCallback - The success callback called on submission success
 * @param {number} param.errorTimeout - The time in milliseconds an error indication will display to the user
 * @param {number} param.successTimeout - The time in milliseconds a success indication will display to the user
 * @param {object} param.initialStatus - The initial status of the form
 * @returns {undefined}
 */
export const generateHandleSubmit = ({
  errorCallback,
  errorTimeout,
  initialStatus,
  initialValues,
  onSubmit,
  setInitValue,
  successCallback,
  successTimeout,
}: {
  errorCallback: Function;
  errorTimeout: number;
  initialStatus: object;
  initialValues: object;
  onSubmit: Function;
  setInitValue?: Function;
  successCallback: Function;
  successTimeout: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any => {
  let timeoutHandle: NodeJS.Timeout;
  return async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ): Promise<void> => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }

    try {
      const result = await onSubmit({ values, initialValues });
      if (setInitValue) {
        setInitValue(result);
        formikHelpers.setStatus({ result, success: true });
      } else {
        formikHelpers.resetForm({
          values: result,
          status: {
            result,
            success: true,
          },
        });
      }
      if (successTimeout) {
        timeoutHandle = setTimeout(() => {
          formikHelpers.setStatus(initialStatus);
        }, successTimeout);
      }
      successCallback({ result, values, actions: formikHelpers });
    } catch (error) {
      formikHelpers.setStatus({ error });
      if (errorTimeout) {
        timeoutHandle = setTimeout(() => {
          formikHelpers.setStatus(initialStatus);
        }, errorTimeout);
      }
      if (error?.params) {
        formikHelpers.setErrors(error.params);
      }
      errorCallback({ error, values, actions: formikHelpers });
    }
  };
};

/**
 * Default footerRenderProp FormCard will invoke if footerRenderProp is not provided
 * by the external developer.
 *
 * Externally provided functions need to conform to this documented interface
 *
 * @param {object} param
 * @param {boolean} param.dirty - Formik status flag showing if the form is dirty when true
 * @param {object} param.error - Error object that is set on the Formik status object when errors occur
 * @param {object} param.errors - The Formik errors object which exposes existing errors in the form
 * @param {Function} param.footerRenderProp - User provided render prop that will be invoked when supplied
 * @param {boolean} param.isSubmitting - Formik boolean flag that indicates if the form is being submitted
 * @param {object} param.touched - Formik object that maps the touched fields in the form
 * @param {string|object} param.resetContent - Inner content given to the default reset button
 * @param {string|object} param.submitContent - Inner content given to the default submit button
 * @param {string} param.submitSuccessMessage - Success message displayed in the default button block
 * @param {object} param.success - The success object written to the Formik form's status object
 * @returns {Element} - JSX for what will work as the footer for the FormCard
 */
export const defaultFooterRenderProp = ({
  dirty,
  errors,
  isSubmitting,
  onReset,
  resetContent,
  status: { error, success } = {},
  submitContent,
  submitSuccessMessage,
  touched,
}: {
  dirty: boolean;
  errors: object;
  isSubmitting: boolean;
  onReset: Function;
  resetContent: JSX.Element | JSX.Element[] | string;
  status: {
    error?: { errorMessage?: string; requestID?: string };
    success?: boolean;
  };
  submitContent: JSX.Element | JSX.Element[] | string;
  submitSuccessMessage: string;
  touched: object;
}): JSX.Element => (
  <Block
    as="footer"
    background="white"
    itemSpacing="3"
    paddingHorizontal={[4, 5]}
    paddingVertical="4"
    alignItems="end"
    direction={['column', 'row']}
    justify={
      error || Object.keys(errors).some((key) => touched[key])
        ? 'between'
        : 'end'
    }
  >
    <ErrorSummary submitError={error} formErrors={errors} touched={touched} />
    {success && !dirty && submitSuccessMessage && (
      <Block
        background="green-lighter"
        radius="2"
        paddingHorizontal="3"
        paddingVertical="2"
      >
        <Icon name="check-circle" className="green-dark mr-2" />
        {submitSuccessMessage}
      </Block>
    )}
    <ButtonGroup>
      <Button type="reset" disabled={!dirty || isSubmitting} onClick={onReset}>
        {resetContent}
      </Button>
      <Button type="submit" loading={isSubmitting} primary>
        {submitContent}
      </Button>
    </ButtonGroup>
  </Block>
);

/**
 * @description Render prop generator function consumed and invoked within FormCardAdapter
 *
 * Note: Params for this function are documented within the FormCardAdapter's propTypes' declaration
 *
 * @returns {Function} - Renderprop function that conforms to the Formik Form's interface
 */
export const generateFormRenderProp = ({
  children,
  className,
  footerRenderProp,
  location,
  onReset,
  promptMessage,
  resetContent,
  sectioned,
  submitContent,
  submitSuccessMessage,
}: {
  children?: JSX.Element | JSX.Element[] | string | Function;
  className?: string;
  footerRenderProp: Function;
  location: { pathname: string };
  onReset?: Function;
  promptMessage?: string | Function | boolean;
  resetContent?: JSX.Element | JSX.Element[] | string;
  sectioned?: boolean;
  submitContent?: JSX.Element | JSX.Element[] | string;
  submitSuccessMessage?: string;
}): Function => (formik: FormikValues): JSX.Element => {
  const { dirty, handleReset, handleSubmit, isSubmitting } = formik;
  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      {promptMessage && (
        <Prompt
          message={(loc: { pathname: string }): boolean =>
            loc.pathname === location.pathname ||
            (typeof promptMessage === 'function'
              ? promptMessage(loc, location)
              : promptMessage)
          }
          when={!isSubmitting && dirty}
        />
      )}
      <Card
        overflow="initial"
        className={classNames('bg-neutral-100', className)}
        sectioned={sectioned}
      >
        {typeof children === 'function' ? children(formik) : children}
        {footerRenderProp({
          ...formik,
          resetContent,
          submitContent,
          submitSuccessMessage,
          onReset,
        })}
      </Card>
    </Form>
  );
};

/**
 * @description This component serves as an adapter between the Formik component and the underlying
 * pebble based Form component
 *
 * @see https://pebble.istreamplanet.net/#/Components/Form
 */
export const TestableFormCardAdapter = ({
  children,
  className,
  enableReinitialize = true,
  errorCallback = (): void => {},
  errorTimeout = 0,
  footerRenderProp = defaultFooterRenderProp,
  initialStatus = {},
  initialValues,
  location,
  onReset = (): void => {},
  onSubmit,
  promptMessage = 'You have unsaved changes. Are you sure you want to leave?',
  resetContent = 'Reset',
  sectioned = false,
  setInitValue,
  submitContent = 'Save',
  submitSuccessMessage = 'Saved',
  successCallback = (): void => {},
  successTimeout = 5000,
  validate,
  validateOnBlur,
  validateOnChange,
}: TestableFormCardAdapterOptions): JSX.Element => (
  <Formik
    enableReinitialize={enableReinitialize}
    initialStatus={initialStatus}
    initialValues={initialValues}
    onSubmit={generateHandleSubmit({
      errorCallback,
      errorTimeout,
      initialValues,
      initialStatus,
      setInitValue,
      successCallback,
      successTimeout,
      onSubmit,
    })}
    validate={validate}
    validateOnBlur={validateOnBlur}
    validateOnChange={validateOnChange}
  >
    {generateFormRenderProp({
      children,
      className,
      footerRenderProp,
      location,
      promptMessage,
      resetContent,
      sectioned,
      submitContent,
      submitSuccessMessage,
      onReset,
    })}
  </Formik>
);

interface TestableFormCardAdapterOptions extends RouteComponentProps {
  /**
   * Classname applied to the form's Card component containing the rest of the form's contents
   */
  className?: string;
  /**
   * Children node(s) wrapped within FormCard
   */
  children?: JSX.Element | JSX.Element[] | string;
  /**
   * Exposed Formik flag that resets the form if initialValues passed
   * changes based on deep equality comparison, defaults to true
   *
   * @see https://jaredpalmer.com/formik/docs/api/formik#enablereinitialize-boolean
   *
   * @default {bool} true
   */
  enableReinitialize?: boolean;
  /**
   * Callback function that is called when form submission fails
   * Will be passed object params
   * @param {object} param
   * @param {object} param.error - The intercepted error object
   * @param {object} param.values - The form values payload
   * @param {object} param.actions - The "FormikBag" object containing injected props and methods
   *    @see https://jaredpalmer.com/formik/docs/api/formik#onsubmit-values-values-formikbag-formikbag-void
   * @returns {null}
   */
  errorCallback?: Function;
  /**
   * Number of milliseconds an error indicator should be displayed to the user
   * will display error indicator until user interaction if not specified
   */
  errorTimeout?: number;
  /**
   * Function that allows the developer to define their own footer markup, if not provided
   * the default renderProp function will be invoked with the same documented params
   *
   * @param {object} param
   * @param {boolean} param.dirty - Formik status flag showing if the form is dirty when true
   * @param {object} param.error - Error object that is set on the Formik status object when errors occur
   * @param {object} param.errors - The Formik errors object which exposes existing errors in the form
   * @param {Function} param.footerRenderProp - User provided render prop that will be invoked when supplied
   * @param {boolean} param.isSubmitting - Formik boolean flag that indicates if the form is being submitted
   * @param {object} param.touched - Formik object that maps the touched fields in the form
   * @param {string|object} param.resetContent - Inner content given to the default reset button
   * @param {string|object} param.submitContent - Inner content given to the default submit button
   * @param {string} param.submitSuccessMessage - Success message displayed in the default button block
   * @param {object} param.success - The success object written to the Formik form's status object
   * @returns {Element} - JSX for what will work as the footer for the FormCard
   */
  footerRenderProp?: Function;
  /**
   * Arbitrary value for the initial status of the form
   * @see https://jaredpalmer.com/formik/docs/api/formik#initialstatus-any
   */
  initialStatus?: object;
  /**
   * Initial field values of the form
   * @see https://jaredpalmer.com/formik/docs/api/formik#initialvalues-values
   */
  initialValues: object;
  /**
   * Custom action that happens on form reset
   */
  onReset?: Function;
  /**
   * Function that is called on form submission (form needs to pass validate function provided).
   * This should return the values of the form submitted (or updated based on the function).
   * If `setInitValue` is not set, the form will use the return of this as the form's new values
   */
  onSubmit: Function;
  /**
   * Message to prompt to the user if they are navigating away from the form.
   * Use conditional when updating path param and do not want prompt to be triggered.
   * Pass false to suppres the message entirely
   * @see https://reacttraining.com/react-router/core/api/Prompt/message-func
   * @default {string} You have unsaved changes. Are you sure you want to leave?
   */
  promptMessage?: string | Function | boolean;
  /**
   * Text or node given to the reset button component
   */
  resetContent?: JSX.Element | JSX.Element[] | string;
  /**
   * Setter function that will allow the developer to reset initial values
   * based on successful submission. If this is not set, the form will use the
   * return value of the onSubmit as the form's new values
   */
  setInitValue?: Function;
  /**
   * Auto-wrap children in a padded section
   *   @see https://pebble.istreamplanet.net/#/Components/Card
   * @default false
   */
  sectioned?: boolean;
  /**
   * Text or node given to the submit button component
   */
  submitContent?: JSX.Element | JSX.Element[] | string;
  /**
   * Message displayed to the user next to the bottom button group upon submit success
   * @default {string} Changes saved
   */
  submitSuccessMessage?: string;
  /**
   * Callback that is invoked on submit success
   * Will be passed object params
   * @param {object} param
   * @param {object} param.result - What is returned from the onSubmit function provided
   * @param {object} param.values - The form values payload
   * @param {object} param.actions - The "FormikBag" object containing injected props and methods
   *   @see https://jaredpalmer.com/formik/docs/api/formik#onsubmit-values-values-formikbag-formikbag-void
   * @returns {null}
   */
  successCallback?: Function;
  /**
   * Number of milliseconds a success indicator should be displayed to the user.
   * If successCallback cause the page to navigate away from the form, set this to 0
   * @default {number} 5000
   */
  successTimeout?: number;
  /**
   * Form validate function
   * @see https://jaredpalmer.com/formik/docs/api/formik#validate-values-values-formikerrors-values-promise-any
   */
  validate?: (
    values: unknown,
  ) => void | object | Promise<FormikErrors<unknown>>;
  /**
   * Flag that when true will run validate on blur events
   * For most validation, this should be set to true. Exceptions include expensive calls like API lookups
   * @see https://jaredpalmer.com/formik/docs/api/formik#validateonblur-boolean
   * @default {bool} true
   */
  validateOnBlur?: boolean;
  /**
   * Flag that when true will run validate on change events
   * @see https://jaredpalmer.com/formik/docs/api/formik#validateonchange-boolean
   * @default {bool} true
   */
  validateOnChange?: boolean;
}

TestableFormCardAdapter.displayName = 'FormCard';

const FormCardWithRouter = withRouter(TestableFormCardAdapter);
FormCardWithRouter.displayName = 'FormCardWithRouter';
export default FormCardWithRouter;
