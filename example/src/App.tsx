import '@istreamplanet/pebble/dist/Styles/foundation.scss';

import { ErrorMessage, Form, Formik } from 'formik';
import { FieldText, FieldTextDebounce } from 'pebble-formik'

const App = () => {
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: any = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FieldText size="large" type="email" name="email" placeholder="address" prefix="https://"/>
            <FieldTextDebounce name="debounce" label="debounced" />
            <ErrorMessage name="email" component="div" />
            <FieldText name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App
