import {default as FieldCheckbox} from './FieldCheckbox';
import FieldToggle from './FieldToggle';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('./FieldCheckbox');

describe('FieldToggle', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // TS complains about the type as it did not see it as a mock.
    (FieldCheckbox as unknown as jest.Mock).mockReturnValue(<div />)
  });

  it('calls FieldCheckbox', () => {
    render(<FieldToggle/>);
    expect(FieldCheckbox).toHaveBeenCalledWith({
      toggle: true
    }, {});
  });

  it('forces toggle to be true', () => {
    // allows us to set property as if we were consuming this in a JS project
    // and didn't have type safety.
    const Foo = FieldToggle as any;
    render(<Foo toggle={false}/>);
    expect(FieldCheckbox).toHaveBeenCalledWith({
      toggle: true
    }, {});
  });
});
