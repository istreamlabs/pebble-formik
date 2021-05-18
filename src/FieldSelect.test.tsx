import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { FieldSelect } from '@istreamplanet/pebble';
import FieldSelectAdapter, { generateFieldSelectRenderProp, generateOnChangeHandler } from './FieldSelect';

jest.mock('@istreamplanet/pebble');

describe('FieldSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    FieldSelect.mockReturnValue(<div />);
  });

  describe('FieldSelectAdapter', () => {
    let props;
    let args;
    let field;
    let form;

    beforeEach(() => {
      props = {
        id: 'someId',
        label: 'someLabel',
        ariaLabel: 'someAriaLabel',
        ariaLabelledby: 'someAriaLabelledBy',
        autoFocus: false,
        className: 'someClass',
        closeMenuOnSelect: false,
        disabled: false,
        helpText: 'someHelpText',
        hideLabel: false,
        isReadOnly: false,
        loading: false,
        loadingMessage: 'is loading',
        menuIsOpen: false,
        menuPlacement: 'auto',
        menuPortalTarget: <div />,
        multiSelect: false,
        onFocus: jest.fn(),
        options: [],
        showCheckbox: false,
        width: 'someWidth',
      };
      args = {
        name: 'someName',
        type: 'text',
      };
      field = {
        value: 'someValue',
      };
      form = {
        errors: {},
        touched: {},
      };
    });

    it('renders without crashing', () => {
      const wrapper = shallow(<FieldSelectAdapter {...props} />);
      expect(wrapper).toHaveLength(1);
    });

    it('passes props as expected', () => {
      render(generateFieldSelectRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldSelect).toHaveBeenCalled();

      const landedProps = FieldSelect.mock.calls[0][0];

      for (const key in props) {
        expect(landedProps[key]).toEqual(props[key]);
      }
    });

    it('marks select as invalid as expected based on errors and touched state', () => {
      form = { ...form, errors: { [args.name]: 'bad!' }, touched: { [args.name]: true } };
      render(generateFieldSelectRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldSelect).toHaveBeenCalled();

      const { isInvalid, validationText } = FieldSelect.mock.calls[0][0];

      expect(isInvalid).toEqual(true);
      expect(validationText).toEqual(form.errors[args.name]);
    });

    it('will be invalid if empty and submitted', () => {
      form = {
        ...form,
        errors: { [args.name]: 'bad!' },
        touched: {},
        submitCount: 1
      };
      render(generateFieldSelectRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldSelect).toHaveBeenCalled();

      const { isInvalid, validationText } = FieldSelect.mock.calls[0][0];

      expect(isInvalid).toEqual(true);
      expect(validationText).toEqual(form.errors[args.name]);
    });

    it('will not apply onChange when passed', () => {
      props = { ...props, onChange: jest.fn() };
      render(generateFieldSelectRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldSelect).toHaveBeenCalled();

      const { onChange } = FieldSelect.mock.calls[0][0];

      expect(onChange).not.toEqual(props.onChange);
    });

    it('will not apply onBlur when passed', () => {
      props = { ...props, onBlur: jest.fn() };
      render(generateFieldSelectRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldSelect).toHaveBeenCalled();

      const { onBlur } = FieldSelect.mock.calls[0][0];

      expect(onBlur).not.toEqual(props.onBlur);
    });

    it('will apply onFocus when passed', () => {
      props = { ...props, onFocus: jest.fn() };
      render(generateFieldSelectRenderProp({ ...props, ...args })({ field, form }));
      expect(FieldSelect).toHaveBeenCalled();

      const { onFocus } = FieldSelect.mock.calls[0][0];

      expect(onFocus).toEqual(props.onFocus);
    });
  });

  describe('generateOnChangeHandler', () => {
    let name;
    let setFieldValue;
    let onChange;

    beforeEach(() => {
      name = 'role';
      setFieldValue = jest.fn();
      onChange = jest.fn();
    });

    it('will set the passed value to the field properly', () => {
      const value = { value: 'administrator', label: 'Administrator' };
      generateOnChangeHandler({ name, setFieldValue })(value);
      expect(setFieldValue).toHaveBeenCalledWith(name, value);
    });

    it('will call user supplied onChange if defined', () => {
      const value = 'some value';

      generateOnChangeHandler({ name, setFieldValue, onChange })(value);
      expect(onChange).toHaveBeenCalledWith(value);
    });
  });
});
