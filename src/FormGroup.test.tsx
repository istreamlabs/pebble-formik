import FormGroup, { generateValidationMarkup } from './FormGroup';

import { Block } from '@istreamplanet/pebble';
import React from 'react';
import { render } from '@testing-library/react';

describe('FormGroup', () => {
  it('renders properly with title passed as a string', () => {
    const title = 'title';
    const { getByText } = render(<FormGroup title={title}>stuff</FormGroup>);
    expect(getByText(title)).toBeDefined();
  });

  it('renders properly with title passed as a node', () => {
    const titleText = 'title';
    const title = (<Block>{titleText}</Block>);
    const { getByText } = render(<FormGroup title={title}>stuff</FormGroup>);
    expect(getByText(titleText)).toBeDefined();
  });

  it('renders description when passed', () => {
    const description = 'some stuff';
    const { getByText } = render(<FormGroup description={description}>stuff</FormGroup>);
    expect(getByText(description)).toBeDefined();
  });

  it('renders children passed into it', () => {
    const childText = 'child';
    const child = <Block>{childText}</Block>;
    const { getByText } = render(<FormGroup>{child}</FormGroup>);
    expect(getByText(childText)).toBeDefined();
  });

  it('renders validation error message when relevant', () => {
    const validationErrors = 'something wrong!';
    const { getByText } = render(<FormGroup validationErrors={validationErrors}>stuff</FormGroup>);
    expect(getByText(validationErrors)).toBeDefined();
  });

  describe('generateValidationMarkup', () => {
    it('renders null with no params passed', () => {
      const { getByText } = render(generateValidationMarkup({}) || <></>);
      expect(() => { getByText('something'); }).toThrow();
    });

    it('renders error text when passed string', () => {
      const error = 'Something wrong!';
      const { getByText } = render(generateValidationMarkup(error) || <></>);
      expect(getByText(error)).toBeDefined();
    });

    it('renders error text when passed populated array', () => {
      const errors = ['something', 'bad'];
      const { getByText } = render(generateValidationMarkup(errors) || <></>);
      expect(getByText(errors[0])).toBeDefined();
      expect(getByText(errors[1])).toBeDefined();
    });

    it('does not render text when passed empty array', () => {
      const errors = [] as string[];
      const { getByText } = render(generateValidationMarkup(errors) || <></>);
      expect(() => { getByText('something'); }).toThrow();
    });

    it.todo('tests collapsible prop');
    it.todo('tests collapsibleLabel prop');
    it.todo('tests collapsibleTopBorder prop');
  });
});
