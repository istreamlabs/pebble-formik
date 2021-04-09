import ErrorSummary from './ErrorSummary';
import React from 'react';
import { render } from '@testing-library/react';

describe('ErrorSummary', () => {
  let formErrors: object;
  let touched: object;
  let submitError: { errorMessage?: string; requestID?: string };

  beforeEach(() => {
    formErrors = {};
    submitError = {};
    touched = {};
  });

  describe('submit errors', () => {
    it('will not render if there are no submit errors', () => {
      const { getByText } = render(<ErrorSummary submitError={submitError} />);
      expect(() => { getByText('request id'); }).toThrow();
    });

    it('renders requestID and Message', () => {
      submitError = {
        requestID: '1234-5678-8765-4321',
        errorMessage: 'An Error Message'
      };
      const { getByText } = render(<ErrorSummary submitError={submitError} />);
      expect(getByText('1234-5678-8765-4321')).toBeDefined();
      expect(getByText('An Error Message')).toBeDefined();
    });
  });

  describe('form errors', () => {
    it('will not render if both touched and errors are empty', () => {
      const { getByText } = render(<ErrorSummary formErrors={formErrors} touched={touched} />);
      expect(() => { getByText('email'); }).toThrow();
    });

    it('will not render if errors prop is empty', () => {
      touched = { email: true };
      const { getByText } = render(<ErrorSummary formErrors={formErrors} touched={touched} />);
      expect(() => { getByText('email'); }).toThrow();
    });

    it('will not render if no error fields overlap with touched fields', () => {
      touched = { email: true };
      formErrors = { roles: 'At least one role is required!' };
      const { getByText } = render(<ErrorSummary formErrors={formErrors} touched={touched} />);
      expect(() => { getByText('email'); }).toThrow();
      expect(() => { getByText('roles'); }).toThrow();
    });

    it('will render error value items properly', () => {
      touched = { email: true };
      formErrors = { email: 'A valid email is required!' };
      const { getByText } = render(<ErrorSummary formErrors={formErrors} touched={touched} />);
      expect(getByText(formErrors.email)).toBeDefined();
    });

    it('will render nested error value items properly', () => {
      touched = { nested: { email: true } };
      formErrors = { 'nested.email': 'A valid email is required!' };
      const { getByText } = render(<ErrorSummary formErrors={formErrors} touched={touched} />);
      expect(getByText(formErrors['nested.email'])).toBeDefined();
    });
  });

  describe('both errors', () => {
    it('will not render if both have nothing', () => {
      const { getByText } = render(<ErrorSummary submitError={submitError} formErrors={formErrors} touched={touched} />);
      expect(() => { getByText('email'); }).toThrow();
      expect(() => { getByText('request id'); }).toThrow();
    });

    it('will render error value items properly', () => {
      touched = { email: true };
      formErrors = { email: 'A valid email is required!' };
      submitError = {
        requestID: '1234-5678-8765-4321',
        errorMessage: 'An Error Message'
      };
      const { getByText } = render(<ErrorSummary touched={touched} formErrors={formErrors} submitError={submitError} />);
      expect(getByText('1234-5678-8765-4321')).toBeDefined();
      expect(getByText('An Error Message')).toBeDefined();
      expect(getByText(formErrors.email)).toBeDefined();
    });
  });
});
