import FieldText from './FieldText';
import { Formik } from 'formik'
import React from 'react';
import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('(Component) FieldNumber', () => {
  const render = (p = {}) => {
    const props = {
      autoFocus: false,
      className: 'someClass',
      clearBtnFunc: jest.fn(),
      disabled: false,
      helpText: 'someHelpText',
      hideLabel: false,
      id: 'someId',
      ignoreSpellCheck: false,
      isReadOnly: false,
      label: 'someLabel',
      name: 'someName',
      max: '100',
      maxLength: 100,
      min: '0',
      minLength: 0,
      multiple: true,
      onFocus: jest.fn(),
      pattern: new RegExp('\\w+'),
      placeholder: 'somePlaceholder',
      prefix: '',
      suffix: '',
      type: 'text' as any, //TODO: why is this needed 😡
      width: '1',
      ...p
    };
    return renderRTL(
      <FieldText {...props} />,
      {
        wrapper: ({children}) => (
          <Formik onSubmit={() => {}} initialValues={{}}>
            {children}
          </Formik>
        )
      }
    );
  };

  beforeEach(jest.clearAllMocks);

  it('passes props as expected', () => {
    const { getByPlaceholderText, getByLabelText } = render();

    expect(getByLabelText('someLabel')).toBeInTheDocument();
    expect(getByPlaceholderText('somePlaceholder')).toBeInTheDocument();
  });

  it('will call handlers on events', () => {
    const onFocus = jest.fn();
    const { getByPlaceholderText } = render({ onFocus });

    const input = getByPlaceholderText('somePlaceholder');
    userEvent.click(input);

    expect(onFocus).toHaveBeenCalled();
  });
});
