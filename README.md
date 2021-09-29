[![NPM](https://img.shields.io/npm/v/pebble-formik.svg)](https://www.npmjs.com/package/@istreamplanet/pebble-formik)

# Pebble-Formik

[Pebble](https://pebble.istreamplanet.net/) form components wrapped in a [Formik](https://formik.org/docs/overview)-friendly wrapper.

## Development

See the [Development](https://github.com/istreamlabs/pebble-formik/blob/main/DEVELOPMENT.md) guide for instructions on how to run Pebble-Formik locally for development.

## Installation and Usage

To use Pebble-Formik, add the package to your package.json using your package manager of choice.

For yarn users:

```shell
yarn add @istreamplanet/pebble-formik @istreamplanet/pebble node-sass react-router-dom
```

For npm users:

```shell
npm install @istreamplanet/pebble-formik formik @istreamplanet/pebble node-sass react-router-dom --save
```

Include the Pebble foundation stylesheet in your layout template. This is usually added at the outer most content wrapper of an app:

```shell
import '@istreamplanet/pebble/dist/Styles/foundation.scss';
```

Import the components into your application:

```shell
import { FieldSelect, FormCard, FormLayoutRow } from '@istreamplanet/pebble-formik';
```

Then add them in your React component as you would any other:

**The [FormCard](https://github.com/istreamlabs/pebble-formik/blob/main/src/FormCard.tsx) component is a great all-in-one form wrapper component. Please try it before building a Formik form from scratch.**

```shell
const MyComponent = () => {
  const validate = (values) => ({
    foo: values > 10,
  });

  return (
    <Block>
      <FormCard initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        <FormLayoutRow>
          <FieldNumber id="foo" name="foo" label="Foo" />
        </FormLayoutRow>
      </FormCard>
    </Block>
  );
}
```

## Components

### [FormCard](https://github.com/istreamlabs/pebble-formik/blob/main/src/FormCard.tsx)

FormCard was designed to be an all-in-one form wrapper with a submit and reset button in the footer. It includes a prompt message if the user tries to navigate away from.

### [FormGroup](https://github.com/istreamlabs/pebble-formik/blob/main/src/FormGroup.tsx)

FormGroup creates a visual grouping of your form components and has options for a title: `string | node`, and a subtitle: `string`. If you pass in `true` for the `collapsible` prop, the group turns into a [collapsible panel](https://pebble.istreamplanet.net/#/Components/CollapsiblePanel).

### Form Components

Form components are just Pebble components in a Formik wrapper. Where Pebble components have `value` these get their values through the `name` prop. Match the key of the value you want to the `name`.

*Example*
```shell
// incoming data
{
  description: 'Cat is on a diet',
}

<FieldText name='description'>
```

* [FieldCheckbox](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldCheckbox.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldCheckbox)
* [FieldCheckboxInAGroup](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldCheckboxInAGroup.tsx)
* [FieldDateTime](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldDateTime.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldDateTime)
* [FieldNumber](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldNumber.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldNumber)
* [FieldRadioGroup](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldRadioGroup.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldRadioGroup)
* [FieldSelect](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldSelect.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldSelect)
* [FieldText](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldText.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldText)
* [FieldTextDebounce](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldTextDebounce.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldTextDebounce)
* [FieldToggle](https://github.com/istreamlabs/pebble-formik/blob/main/src/FieldToggle.tsx) / [PebbleComponent](https://pebble.istreamplanet.net/#/Components/FieldToggle)

### Error Components

Formats error messages in a standard, easy-to-read manner.

* [ErrorMessage](https://github.com/istreamlabs/pebble-formik/blob/main/src/ErrorMessage.tsx) : Has a `small` prop that fits on a single form row.
* [ErrorSummary](https://github.com/istreamlabs/pebble-formik/blob/main/src/ErrorSummary.tsx) : Is built in to the bottom of FormCard.

## License

Copyright &copy; 2021 iStreamPlanet Co., LLC

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
