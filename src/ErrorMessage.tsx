import { Alert, Block, Text } from '@istreamplanet/pebble';

import React from 'react';

/**
 * @description Displays the metadata and data from an error response received from an api call
 */
const ErrorMessage = ({
  children,
  message = '',
  requestID = '',
  small,
}: ErrorMessageOptions): JSX.Element => {
  if (small) {
    return (
      <Block
        displayBlock
        border={{ side: 'all', color: 'yellow-light', size: '1px' }}
        className="shadow-1"
        padding="3"
        background="yellow-lighter"
      >
        <Text bold>{message}</Text>
        <div>
          {'request id: '}
          <Text appearance="mono">{requestID}</Text>
        </div>
      </Block>
    );
  }

  return (
    <Block
      radius="3"
      background="neutral-200"
      padding={[4, 5]}
      direction="column"
    >
      <Alert type="warn" title={message}>
        {'request id: '}
        <Text appearance="mono">{requestID}</Text>
        {children}
      </Alert>
    </Block>
  );
};

interface ErrorMessageOptions {
  /**
   * Content to add to the body of the error message
   */
  children?: JSX.Element | JSX.Element[] | string;
  /**
   * The error message from the response that is passed to the Alert component
   * ref to Alert component: https://pebble.istreamplanet.net/#/Components/Alert
   */
  message?: string;
  /**
   * The request id for the error response being displayed
   */
  requestID?: string;
  /**
   * Show a smaller display version of the error
   */
  small?: boolean;
}

export default ErrorMessage;
