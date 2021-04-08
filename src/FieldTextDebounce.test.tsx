import FieldTextDebounceAdapter, { generateFieldTextDebounceRenderProp, generateOnDebounceHandler } from './FieldTextDebounce';

import { FieldTextDebounce } from '@istreamplanet/pebble';
import React from 'react';
import { render } from '@testing-library/react';

//import { shallow } from 'enzyme';

jest.mock('@istreamplanet/pebble');

describe('(Component) FieldTextDebounce', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    FieldTextDebounce.mockReturnValue(<div />);
  });

  // const props = {
  //   name: 'field name',
  //   autoFocus: false,
  //   className: 'someClass',
  //   clearBtnFunc: jest.fn(),
  //   disabled: false,
  //   hideLabel: false,
  //   id: 'someId',
  //   ignoreSpellCheck: false,
  //   isReadOnly: false,
  //   label: 'someLabel',
  //   max: '100',
  //   maxLength: 100,
  //   min: '0',
  //   minLength: 0,
  //   multiple: true,
  //   pattern: new RegExp('\\w+'),
  //   placeholder: 'somePlaceholder',
  //   helpText: 'someHelpText',
  //   onFocus: jest.fn(),
  //   prefix: '',
  //   suffix: '',
  //   type: 'text' as any,
  //   width: '1',
  //   field: {
  //     onDebounce: jest.fn(),
  //   },
  //   form: {
  //     errors: {},
  //     touched: {}
  //   }
  // };
  // // it('renders without crashing', () => {
  // //   const wrapper = shallow(<FieldTextDebounceAdapter {...props} />);
  // //   expect(wrapper).toHaveLength(1);
  // // });

  describe('generateFieldTextDebounceRenderProp', () => {
    let props: any;
    let args: any;

    beforeEach(() => {
      props = {
        autoFocus: false,
        className: 'someClass',
        clearBtnFunc: jest.fn(),
        disabled: false,
        hideLabel: false,
        id: 'someId',
        ignoreSpellCheck: false,
        isReadOnly: false,
        label: 'someLabel',
        max: '100',
        maxLength: 100,
        min: '0',
        minLength: 0,
        multiple: 'multiple',
        pattern: new RegExp('\\w+'),
        placeholder: 'somePlaceholder',
        helpText: 'someHelpText',
        onFocus: jest.fn(),
        prefix: '',
        suffix: '',
        type: 'text',
        width: '1',
      };
      args = {
        field: {
          onBlur: jest.fn(),
          onDebounce: jest.fn(),
          name: 'someName',
          value: 'someValue'
        },
        form: {
          errors: {},
          touched: {}
        }
      };
    });

    it('passes props as expected', () => {
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();

      const landedProps = FieldTextDebounce.mock.calls[0][0];

      for (const key in props) {
        expect(landedProps[key]).toEqual(props[key]);
      }

      for (const key in args.field) {
        expect(landedProps[key]).toBeDefined();
      }
    });

    it('will not accept onChange that is passed', () => {
      props = { ...props, onChange: jest.fn() };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      expect(props.onChange).not.toEqual(args.field.onChange);
    });

    it('will not accept onBlur that is passed', () => {
      props = { ...props, onBlur: jest.fn() };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      expect(props.onBlur).not.toEqual(args.field.onBlur);
    });

    it('will accept onFocus that is passed', () => {
      props = { ...props, onFocus: jest.fn() };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      const { onFocus } = FieldTextDebounce.mock.calls[0][0];
      expect(props.onFocus).toEqual(onFocus);
    });

    it('will be invalid when touched', () => {
      args = {
        ...args,
        form: {
          errors: {
            [args.field.name]: 'something wrong'
          },
          touched: {
            [args.field.name]: true
          }
        }
      };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      const { isInvalid } = FieldTextDebounce.mock.calls[0][0];
      expect(isInvalid).toEqual(true);
    });

    it('will be invalid when form submitted', () => {
      args = {
        ...args,
        form: {
          errors: {
            [args.field.name]: 'something wrong'
          },
          touched: {},
          submitCount: 1
        }
      };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      const { isInvalid } = FieldTextDebounce.mock.calls[0][0];
      expect(isInvalid).toEqual(true);
    });

    it('will be valid when errors and touched are empty', () => {
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      const { isInvalid } = FieldTextDebounce.mock.calls[0][0];
      expect(isInvalid).toEqual(false);
    });

    it('will be valid when errors is empty', () => {
      args = {
        ...args,
        form: {
          errors: {},
          touched: {
            [args.field.name]: true
          }
        }
      };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      const { isInvalid } = FieldTextDebounce.mock.calls[0][0];
      expect(isInvalid).toEqual(false);
    });

    it('will be valid when touched is empty', () => {
      args = {
        ...args,
        form: {
          errors: {
            [args.field.name]: 'something wrong'
          },
          touched: {}
        }
      };
      render(generateFieldTextDebounceRenderProp(props)(args));
      expect(FieldTextDebounce).toHaveBeenCalled();
      const { isInvalid } = FieldTextDebounce.mock.calls[0][0];
      expect(isInvalid).toEqual(false);
    });
  });

  describe('generateOnDebounceHandler', () => {
    let name: string;
    let setFieldValue: Function;
    let onDebounce: Function;

    beforeEach(() => {
      name = 'role';
      setFieldValue = jest.fn();
      onDebounce = jest.fn();
    });

    it('will set the passed value to the field and call onDebounce', () => {
      const value = 'test';
      generateOnDebounceHandler({ name, setFieldValue, onDebounce })(value);
      expect(setFieldValue).toHaveBeenCalledWith(name, value);
    });
  });
});
