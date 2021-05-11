import { generateFieldRadioGroupRenderProp, generateOnChangeHandler } from './FieldRadioGroup';

import { FieldRadioGroup } from '@istreamplanet/pebble';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@istreamplanet/pebble');

describe('FieldRadioGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    FieldRadioGroup.mockReturnValue(<div />);
  });

  describe('FieldRadioGroupAdapter', () => {
    let props;
    let field;
    let form;

    beforeEach(() => {
      props = {
        name: 'field group name',
        className: 'someClass',
        helpText: '',
        title: 'someTitle',
        radios: [
          {
            id: 'text',
            value: 'text',
            label: 'Text',
            helpText: '1 hour turn around'
          },
          {
            id: 'email',
            value: 'email',
            label: 'Email',
            helpText: '24 hour turn around'
          }
        ],
      };
      field = {
        value: '',
      };
      form = {
        setFieldValue: jest.fn(),
      };
    });

    it('passes props as expected', () => {
      render(generateFieldRadioGroupRenderProp(props)({ field, form }));
      expect(FieldRadioGroup).toHaveBeenCalled();

      const landedProps = FieldRadioGroup.mock.calls[0][0];

      for (const key in props) {
        expect(landedProps[key]).toEqual(props[key]);
      }
    });

    describe('generateOnChangeHandler', () => {
      let name;
      let setFieldValue;

      beforeEach(() => {
        name = 'method';
        setFieldValue = jest.fn();
      });

      it('will set the passed value to the field properly', () => {
        const value = 'text';
        generateOnChangeHandler({ name, setFieldValue })(value);
        expect(setFieldValue).toHaveBeenCalledWith(name, value);
      });
    });
  });
});
