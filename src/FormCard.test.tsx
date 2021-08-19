import {
  defaultFooterRenderProp as Footer,
  TestableFormCardAdapter,
  generateFormRenderProp,
  generateHandleSubmit
} from './FormCard';
import ReactRouter, { MemoryRouter } from 'react-router';

import { Formik } from 'formik';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('formik');

describe('FormCard', () => {
  describe('generateHandleSubmit', () => {
    const initialValues = { name: null };
    const args = {
      errorCallback: jest.fn(),
      errorTimeout: 6000,
      initialStatus: {default: 'status'},
      initialValues,
      onSubmit: jest.fn(),
      successCallback: jest.fn(),
      successTimeout: 5000,
    };
    const values = { name: 'moo' };
    const actions = {
      resetForm: jest.fn(),
      setErrors: jest.fn(),
      setStatus: jest.fn(),
    };
    const handler = (override?: any) => generateHandleSubmit({ ...args, ...override});

    beforeEach(() => {
      jest.resetAllMocks();
      jest.useFakeTimers();
    });

    it('success works as expected', async () => {
      args.onSubmit.mockResolvedValue('success');
      const onSubmit = handler();
      await onSubmit(values, actions);

      expect(args.onSubmit).toHaveBeenCalledWith({ values, initialValues });
      expect(clearTimeout).not.toHaveBeenCalled();
      expect(actions.setStatus).not.toHaveBeenCalledWith();
      expect(actions.resetForm).toHaveBeenCalledWith({
        status: {
          result: 'success',
          success: true,
        },
        values: 'success'
      });
      expect(setTimeout).toBeCalledWith(expect.any(Function), args.successTimeout)
      expect(args.successCallback).toHaveBeenCalledWith({ result: 'success', values, actions });
      expect(args.errorCallback).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(actions.setStatus).toHaveBeenCalledWith(args.initialStatus);
      expect(actions.setStatus).toHaveBeenCalledTimes(1);

      await onSubmit(values, actions);
      await onSubmit(values, actions);
      expect(clearTimeout).toHaveBeenCalledTimes(2);
      expect(actions.setStatus).toHaveBeenCalledTimes(1);
      jest.runAllTimers();
      expect(actions.setStatus).toHaveBeenCalledTimes(2);
    });

    it('success works as expected with setInit', async () => {
      args.onSubmit.mockResolvedValue('success');
      const setInitValue = jest.fn();
      const onSubmit = handler({ setInitValue });
      await onSubmit(values, actions);

      expect(args.onSubmit).toHaveBeenCalledWith({ values, initialValues });
      expect(clearTimeout).not.toHaveBeenCalled();
      expect(actions.setStatus).toHaveBeenCalledWith({ result: 'success', success: true });
      expect(setInitValue).toHaveBeenCalledWith('success');
      expect(actions.resetForm).not.toHaveBeenCalled();
      expect(setTimeout).toBeCalledWith(expect.any(Function), args.successTimeout)
      expect(args.successCallback).toHaveBeenCalledWith({ result: 'success', values, actions });
      expect(args.errorCallback).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(actions.setStatus).toHaveBeenCalledWith(args.initialStatus);
      expect(actions.setStatus).toHaveBeenCalledTimes(2);

      await onSubmit(values, actions);
      await onSubmit(values, actions);
      expect(clearTimeout).toHaveBeenCalledTimes(2);
      expect(actions.setStatus).toHaveBeenCalledTimes(4);
      jest.runAllTimers();
      expect(actions.setStatus).toHaveBeenCalledTimes(5);
    });

    it('failure works as expected', async () => {
      args.onSubmit.mockRejectedValue('failed');
      const onSubmit = handler();
      await onSubmit(values, actions);

      expect(args.onSubmit).toHaveBeenCalledWith({ values, initialValues });
      expect(clearTimeout).not.toHaveBeenCalled();
      expect(actions.setStatus).toHaveBeenCalledWith({ error: 'failed' });
      expect(actions.resetForm).not.toHaveBeenCalled();
      expect(setTimeout).toBeCalledWith(expect.any(Function), args.errorTimeout)
      expect(args.successCallback).not.toHaveBeenCalled();
      expect(args.errorCallback).toHaveBeenCalledWith({ error: 'failed', values, actions });

      jest.runAllTimers();

      expect(actions.setStatus).toHaveBeenCalledWith(args.initialStatus);
      expect(actions.setStatus).toHaveBeenCalledTimes(2);

      await onSubmit(values, actions);
      await onSubmit(values, actions);
      expect(clearTimeout).toHaveBeenCalledTimes(2);
      expect(actions.setStatus).toHaveBeenCalledTimes(4);
      jest.runAllTimers();
      expect(actions.setStatus).toHaveBeenCalledTimes(5);
    });

    it('success timeout does not occur when timeout duration not provided', async () => {
      args.onSubmit.mockResolvedValue('success');
      const onSubmit = handler({ successTimeout: 0 });
      await onSubmit(values, actions);

      expect(setTimeout).not.toBeCalled();

      jest.runAllTimers();

      expect(actions.setStatus).not.toHaveBeenCalledWith(args.initialStatus);
    });

    it('error timeout does not occur when timeout duration not provided', async () => {
      args.onSubmit.mockRejectedValue('failed');
      const onSubmit = handler({ errorTimeout: 0 });
      await onSubmit(values, actions);

      expect(setTimeout).not.toBeCalled();

      jest.runAllTimers();

      expect(actions.setStatus).not.toHaveBeenCalledWith(args.initialStatus);
    });

    it('setErrors is called if error matches', async () => {
      args.onSubmit.mockRejectedValue({ params: { name: 'name is incorrect' } });
      const onSubmit = handler();
      await onSubmit(values, actions);

      expect(actions.setErrors).toHaveBeenCalledWith({ name: 'name is incorrect' });
    });
  });

  describe('defaultFooterRenderProp', () => {
    it('shows the success message', () => {
      const { getByText } = render(
        <Footer
          dirty={false}
          errors={{}}
          isSubmitting={false}
          onReset={jest.fn()}
          resetContent="Reset"
          status={{error: undefined, success: true}}
          submitContent="Submit"
          submitSuccessMessage="Success"
          touched={{}}
        />
      );
      expect(getByText('Success')).toBeInTheDocument();
      expect(getByText('Reset').closest('button')).toBeDisabled();
      expect(getByText('Submit').closest('button')).toBeDisabled();
    });

    it('shows submit error if there is one', () => {
      const { getByText, queryByText } = render(
        <Footer
          dirty={true}
          errors={{}}
          isSubmitting={false}
          onReset={jest.fn()}
          resetContent="Reset"
          status={{error: { requestID: 'rid123', errorMessage: 'errorrorre'}, success: false}}
          submitContent="Submit"
          submitSuccessMessage="Success"
          touched={{}}
        />
      );
      expect(getByText('errorrorre')).toBeInTheDocument();
      expect(queryByText('Success')).toBeNull();
      expect(getByText('Reset').closest('button')).not.toBeDisabled();
      expect(getByText('Submit')).toBeInTheDocument();
    });
  });

  describe('FormCard (Component)', () => {
    it('calls Formik correctly', () => {
      (Formik as jest.Mock).mockImplementation(props => <div>{props.children({
        dirty: false,
        errors: {},
        handleReset: jest.fn(),
        handleSubmit: jest.fn(),
        isSubmitting: false,
        status: {},
      })}</div>)
      render(
        <TestableFormCardAdapter
          initialValues={{ ini: 'values' }}
          history={{} as any}
          location={{} as any}
          match={{} as any}
          onSubmit={jest.fn()}
        ></TestableFormCardAdapter>,
        { wrapper: MemoryRouter }
      );
      expect(Formik).toHaveBeenCalledWith({
        children: expect.any(Function),
        enableReinitialize: true,
        initialStatus: {},
        initialValues: { ini: 'values' },
        onSubmit: expect.any(Function),
        validate: undefined,
        validateOnBlur: undefined,
        validateOnChange: undefined,
      }, {});

    });
  });

  describe('generateFormRenderProp', () => {
    let props: any;
    let args: any;

    beforeEach(() => {
      props = {
        children: null,
        className: 'someClass',
        footerRenderProp: Footer,
        location: { pathname: '/fancyPath' },
        onReset: jest.fn(),
        promptMessage: 'do not leave!',
        resetContent: 'reset',
        submitContent: 'submit',
        submitSuccessMessage: 'yay!',
      };
      args = {
        dirty: false,
        errors: {},
        handleReset: jest.fn(),
        handleSubmit: jest.fn(),
        isSubmitting: false,
        status: {},
        touched: {},
      };
      jest.clearAllMocks();
    });

    it('renders submission success message when relevant', () => {
      args = { ...args, status: { success: true } };
      const { getByText } = render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      expect(getByText(props.submitSuccessMessage)).toBeDefined();
    });

    it('reset button is disabled when isSubmitting is true', () => {
      args = { ...args, dirty: true, isSubmitting: true };
      const { queryAllByRole } = render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      const resetButton = queryAllByRole('button')[0];
      expect(resetButton['disabled']).toEqual(true);
    });

    it('does not render Prompt component when promptMessage is not provided', () => {
      const spy = jest.spyOn(ReactRouter, 'Prompt');
      props = { ...props, promptMessage: undefined };
      render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      expect(spy).not.toHaveBeenCalled();
    });

    it('renders Prompt component when promptMessage is provided', () => {
      const spy = jest.spyOn(ReactRouter, 'Prompt');
      render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      expect(spy).toHaveBeenCalled();
    });

    it('displayMessage returns promptMessage when location pathname changes', () => {
      const spy = jest.spyOn(ReactRouter, 'Prompt');
      render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      const displayMessage = (spy.mock.calls[0][0].message as Function)({ pathname: '/newPath' });
      expect(displayMessage).toEqual(props.promptMessage);
    });

    it('displayMessage returns true when location pathname is the same', () => {
      const spy = jest.spyOn(ReactRouter, 'Prompt');
      render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      const promptMessage = (spy.mock.calls[0][0].message as Function)({ pathname: props.location.pathname });
      expect(promptMessage).toEqual(true);
    });

    it('displayMessage returns result of promptMessage when promptMessage is a function', () => {
      props.promptMessage = () => "Cool prompt message bro";
      const spy = jest.spyOn(ReactRouter, 'Prompt');
      render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      const promptMessage = (spy.mock.calls[0][0].message as Function)({ pathname: '/newPath' });
      expect(promptMessage).toEqual("Cool prompt message bro");
    });

    it('will render default footer when footerRenderProp not overridden', () => {
      const { getByText } = render(generateFormRenderProp(props)(args), { wrapper: MemoryRouter });
      expect(getByText(props.resetContent)).toBeDefined();
      expect(getByText(props.submitContent)).toBeDefined();
    });

    it('will invoke footerRenderProp with expected params when provided', () => {
      const footerRenderProp = jest.fn();
      const status = {
        success: { yay: 'yes' },
        error: { no: 'nay' },
      };
      render(generateFormRenderProp({
        ...props,
        footerRenderProp
      })({
        ...args,
        status
      }), { wrapper: MemoryRouter });
      expect(footerRenderProp).toHaveBeenCalledWith({
        ...args,
        onReset: props.onReset,
        resetContent: props.resetContent,
        status,
        submitContent: props.submitContent,
        submitSuccessMessage: props.submitSuccessMessage,
      });
    });
  });
});

