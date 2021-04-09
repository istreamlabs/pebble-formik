import { render, screen } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';
import React from 'react';

describe('ErrorMessage', () => {
  it('message passed properly to Alert', () => {
    const message = 'Something went wrong';
    render(<ErrorMessage message={message} />);
    expect(screen.getAllByText(message)).toBeDefined();
  });

  it('requestID passed properly to Text', () => {
    const requestID = '123a';
    render(<ErrorMessage requestID={requestID} />);
    expect(screen.getAllByText(requestID)).toBeDefined();
  });
});
