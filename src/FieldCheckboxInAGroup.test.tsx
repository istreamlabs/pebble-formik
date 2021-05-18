import React from 'react';
import { render } from '@testing-library/react';
import { FieldCheckbox } from '@istreamplanet/pebble';
import { generateFieldCheckboxRenderProp, generateFieldOnChangeHandler } from './FieldCheckboxInAGroup';

jest.mock('@istreamplanet/pebble');

describe('FieldCheckboxInAGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    FieldCheckbox.mockReturnValue(<div />);
  });

  describe('FieldCheckboxInAGroup', () => {
    let props;
    let args;
    let field;
    let form;

    beforeEach(() => {
      props = {
        className: 'someClass',
        disabled: false,
        helpText: '',
        id: 'someId',
        label: 'someLabel',
        toggle: false,
      };
      args = {
        name: 'someName',
        groupName: 'someGroupName',
      };
      field = {
        value: [],
      };
      form = {
        setFieldValue: jest.fn(),
        setFieldTouched: jest.fn(),
        errors: {},
        touched: {},
      };
    });

    it('passes props as expected', () => {
      render(generateFieldCheckboxRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldCheckbox).toHaveBeenCalled();
      const landedProps = FieldCheckbox.mock.calls[0][0];

      for (const key in props) {
        expect(landedProps[key]).toEqual(props[key]);
      }
    });

    it('marks checkbox as invalid when itself is not valid', () => {
      form = { ...form, errors: { [args.name]: 'bad!' }, touched: { [args.name]: true } };
      render(generateFieldCheckboxRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldCheckbox).toHaveBeenCalled();
      const { isInvalid, validationText } = FieldCheckbox.mock.calls[0][0];
      expect(isInvalid).toEqual(true);
      expect(validationText).toEqual(form.errors[args.name]);
    });

    it('marks checkbox as invalid when submitted', () => {
      form = {
        ...form, errors: { [args.name]: 'bad!' }, touched: {}, submitCount: 1
      };
      render(generateFieldCheckboxRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldCheckbox).toHaveBeenCalled();
      const { isInvalid, validationText } = FieldCheckbox.mock.calls[0][0];
      expect(isInvalid).toEqual(true);
      expect(validationText).toEqual(form.errors[args.name]);
    });

    it('marks checkbox as invalid when group is invalid', () => {
      form = { ...form, errors: { [args.groupName]: 'bad!' }, touched: { [args.groupName]: true } };
      render(generateFieldCheckboxRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldCheckbox).toHaveBeenCalled();
      const { isInvalid } = FieldCheckbox.mock.calls[0][0];
      expect(isInvalid).toEqual(true);
    });
  });

  describe('generateFieldOnChangeHandler', () => {
    let name;
    let form;
    let value;
    let field;

    beforeEach(() => {
      name = 'role';
      field = { value: [] };
      form = { setFieldValue: jest.fn(), setFieldTouched: jest.fn() };
      value = 'admin';
    });

    it('will deselect value properly', () => {
      field = { value: [value] };
      generateFieldOnChangeHandler({name, field, value, form})();
      expect(form.setFieldValue).toHaveBeenCalledWith(name, []);
    });

    it('will select value properly', () => {
      generateFieldOnChangeHandler({name, field, value, form})();
      expect(form.setFieldValue).toHaveBeenCalledWith(name, [value]);
    });
  });
});
