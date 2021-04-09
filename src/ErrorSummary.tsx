import { Block, Heading, List, ListItem, Text } from '@istreamplanet/pebble';

import React from 'react';

/**
 * @description Component that displays validation and/or submission errors that currently exist
 * in a form's state
 */
const ErrorSummary = ({
  submitError,
  formErrors = {},
  touched = {},
  className,
}: ErrorSummaryOptions): JSX.Element | null => {
  const errorItems = Object.entries(formErrors).reduce<string[]>(
    (acc, [key, value]) => {
      // Walks formErrors, checking the keys (can be nested `main.sub`),
      // for matches in touched
      if (key.split('.').reduce((obj, val) => obj && obj[val], touched)) {
        acc.push(value);
      }
      return acc;
    },
    [],
  );

  if (!submitError && errorItems.length < 1) {
    return null;
  }

  const extraPadding = formErrors && errorItems.length > 0 ? 'mb-3' : '';
  return (
    <Block
      className={className}
      flex
      width="100"
      direction="column"
      radius="2"
      background="red-lighter"
      paddingHorizontal="3"
      paddingVertical="2"
      border={{ side: 'all', color: 'red-light' }}
    >
      {submitError && (
        <>
          <Heading element="4" size="5" className="mb-2">
            {submitError.errorMessage || ''}
          </Heading>
          <p className={extraPadding}>
            request id: <code>{submitError.requestID}</code>
          </p>
        </>
      )}
      {errorItems.length > 0 && (
        <>
          <Heading element="4" size="5" className="mb-2">
            Validation Errors
          </Heading>
          <List className="ml-5">
            {errorItems.map((item, i) => (
              <ListItem key={`error-${i}`}>
                <Text>{item}</Text>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Block>
  );
};

interface ErrorSummaryOptions {
  /**
   * Object that stores state of the most recent form submission failure
   */
  submitError?: { errorMessage?: string; requestID?: string };
  /**
   * Object that stores state of which fields have errors, whereas
   * the key is the field name and the value is the error message
   * defaults to empty object when not provided
   */
  formErrors?: object;
  /**
   * Object that stores state of which fields that have been touched whereas
   * the key is the field name and the value is true
   * defaults to empty object when not provided
   */
  touched?: object;
  /**
   * Classname prop applied/passed to the base Block component
   * ref to Block: https://pebble.istreamplanet.net/#/Components/Block
   */
  className?: string;
}

export default ErrorSummary;
