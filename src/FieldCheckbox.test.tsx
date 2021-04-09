import { generateFieldCheckboxRenderProp, generateOnChangeHandler } from './FieldCheckbox';

import { FieldCheckbox } from '@istreamplanet/pebble';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@istreamplanet/pebble');

describe('FieldCheckbox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    FieldCheckbox.mockReturnValue(<div />);
  });

  describe('FieldCheckboxAdapter', () => {
    let props: any;
    let args: any;
    let field: any;
    let form: any;
    let meta: {
      value: '',
      initialTouched: false,
      touched: false
    }

    beforeEach(() => {
      props = {
        className: 'someClass',
        disabled: false,
        helpText: '',
        label: 'someLabel',
        toggle: false,
      };
      field = {
        name: 'someName',
        value: 'someValue',
      };
      form = {
        setFieldValue: jest.fn(),
        setFieldTouched: jest.fn(),
        errors: {},
        touched: {},
        values: {},
      };
    });

    it('passes props as expected', () => {
      render(generateFieldCheckboxRenderProp({ ...props, ...args })({ field, form, meta }));
      expect(FieldCheckbox).toHaveBeenCalledTimes(1);

      const landedProps = FieldCheckbox.mock.calls[0][0];

      for (const key in props) {
        expect(landedProps[key]).toEqual(props[key]);
      }
    });

    it('marks checkbox as invalid as expected based on errors and touched state', () => {
      form = { ...form, errors: { [field.name]: 'bad!' }, touched: { [field.name]: true } };
      render(generateFieldCheckboxRenderProp(props)({ field, form, meta }));
      expect(FieldCheckbox).toHaveBeenCalledTimes(1);

      const { isInvalid, validationText } = FieldCheckbox.mock.calls[0][0];

      expect(isInvalid).toEqual(true);
      expect(validationText).toEqual(form.errors[field.name]);
    });

    it('will be invalid when submitted', () => {
      form = {
        ...form,
        errors: { [field.name]: 'bad!' },
        touched: {},
        submitCount: 1
      };
      render(generateFieldCheckboxRenderProp(props)({ field, form, meta }));
      expect(FieldCheckbox).toHaveBeenCalledTimes(1);

      const { isInvalid, validationText } = FieldCheckbox.mock.calls[0][0];

      expect(isInvalid).toEqual(true);
      expect(validationText).toEqual(form.errors[field.name]);
    });

    it('will not apply onChange when passed', () => {
      props = { ...props, onChange: jest.fn() };
      render(generateFieldCheckboxRenderProp({ ...props, ...args })({ field, form, meta }));
      expect(FieldCheckbox).toHaveBeenCalledTimes(1);

      const landedProps = FieldCheckbox.mock.calls[0][0];

      expect(landedProps.onChange).not.toEqual(props.onChange);
    });
  });

  describe('generateOnChangeHandler', () => {
    let name: string;
    let setFieldValue: Function;
    let onChange: Function;

    beforeEach(() => {
      name = 'role';
      setFieldValue = jest.fn();
      onChange = jest.fn();
    });

    it('will set the passed value to the field properly', () => {
      const value = false;
      generateOnChangeHandler({ name, setFieldValue })(value);
      expect(setFieldValue).toHaveBeenCalledWith(name, value);
    });

    it('will call user supplied onChange if defined', () => {
      const value = false;

      generateOnChangeHandler({ name, setFieldValue, onChange })(value);
      expect(onChange).toHaveBeenCalledWith(value);
    });
  });
});
