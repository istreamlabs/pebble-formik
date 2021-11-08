import FieldNumberAdapter from './FieldNumber';
import { Formik } from 'formik'
import React from 'react';
import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('(Component) FieldNumber', () => {
  const render = (p) => {
    const props = {
      autoFocus: false,
      className: 'someClassName',
      clearBtnFunc: jest.fn(),
      disabled: false,
      helpText: 'foohelp',
      hideLabel: false,
      id: 'fooid',
      isReadOnly: false,
      label: 'barlabel',
      name: 'someName',
      onFocus: jest.fn(),
      placeholder: 'barph',
      prefix: 'somePrefix',
      size: 'medium',
      suffix: 'someSuffix',
      width: 100,
      ...p
    };
    return renderRTL(
      <FieldNumberAdapter {...props} />,
      {
        wrapper: ({children}) => (
          <Formik>
            {children}
          </Formik>
        )
      }
    );
  };

  beforeEach(jest.clearAllMocks);

  it('passes props as expected', () => {
    const { getByPlaceholderText, getByLabelText } = render();

    expect(getByLabelText('barlabel')).toBeInTheDocument();
    expect(getByPlaceholderText('barph')).toBeInTheDocument();
  });

  it('will call handlers on events', () => {
    const onFocus = jest.fn();
    const { getByPlaceholderText } = render({ onFocus });

    const input = getByPlaceholderText('barph');
    userEvent.click(input);

    expect(onFocus).toHaveBeenCalled();
  });
});
