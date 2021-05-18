import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik'
import FieldDateTimeAdapter, {
  generateFieldDateTimeRenderProp,
  generateOnChangeHandler,
} from './FieldDateTime';

describe('FieldDateTime', () => {
  beforeEach(jest.clearAllMocks);

  it('passes props as expected', () => {
    const props = {
      className: 'someClass',
      disabled: false,
      helpText: '',
      id: 'someId',
      label: 'someLabel',
    };
    const { getByPlaceholderText, getByLabelText } = render(
      <FieldDateTimeAdapter {...props} />,
      {
        wrapper: ({children}) => (
          <Formik>
            {children}
          </Formik>
        )
      }
    );

    expect(getByLabelText('someLabel')).toBeInTheDocument();
  });

  describe('generateFieldDateTimeRenderProp', () => {
    let props;
    let field;
    let form;

    beforeEach(() => {
      props = {
        className: 'someClass',
        disabled: false,
        helpText: '',
        id: 'someId',
        label: 'someLabel',
      };
      field = {
        name: 'someName',
        value: '',
      };
      form = {
        errors: {},
        setFieldValue: jest.fn(),
        touched: {},
      };
    });

    it.todo('passes props as expected');
    it.todo('will not apply onChange passed as prop');
    it.todo('will be invalid with expected conditions');
    it.todo('will be invalid when submitted');
    it.todo('will remain valid even if touched references field but errors does not');
    it.todo('will remain valid even if errors references field but touched does not');
  });

  describe('generateOnChangeHandler', () => {
    it('works as expected', () => {
      const name = 'someName';
      const setFieldValue = jest.fn();
      const value = 'someValue';
      generateOnChangeHandler({ name, setFieldValue })(value);
      expect(setFieldValue).toHaveBeenCalledWith(name, value);
    });

    it('will call user supplied onChange if defined', () => {
      const name = 'someName';
      const setFieldValue = jest.fn();
      const value = 'someValue';
      const onChange = jest.fn();

      generateOnChangeHandler({ name, setFieldValue, onChange })(value);
      expect(onChange).toHaveBeenCalledWith(value);
    });
  });
});
