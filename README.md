[![NPM](https://img.shields.io/npm/v/pebble-formik.svg)](https://www.npmjs.com/package/@istreamplanet/pebble-formik)

# Pebble-Formik

[Pebble](https://pebble.istreamplanet.net/) form components wrapped in a [Formik](https://formik.org/docs/overview) Formik-friendly wrapper.

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

FormCard was designed to be an all-in-one form wrapper, including a prompt message if the user tries to navigate away from the form and a submit and reset button in the footer.

### [FormGroup](https://github.com/istreamlabs/pebble-formik/blob/main/src/FormGroup.tsx)

FormGroup creates a visual grouping of your form components and has options for a title: `string | node`, and a subtitle: `string`. If you pass in `true` for the `collapsible` prop, the group turns into a [collapsible panel](https://pebble.istreamplanet.net/#/Components/CollapsiblePanel).

### Form Components

Form components are just Pebble components in a Formik wrapper, where Pebble has `value` these get their values through the `name` prop. Match the key of the value you want to the `name`.

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

## How to Release

### Release an Update

Package releases should be done through the following commands:

Release a patch update:

```shell
$ npm version patch -m "release package %s because reasons"
```

Release a minor update:

```shell
$ npm version minor -m "release package %s because reasons"
```

Alpha pre-release minor update:

```shell
$ npm version pre-minor -m "release package %s as alpha because reasons" --preid=alpha
```

The following will then happen:

* Execute a coverage test run to make sure everything is okay
* Bump the version number in package.json accordingly (see examples)
* Add a tag in git with that version number
* Push to git origin including tags

From there the CI machine takes over and for every tagged commit the following happens:

* NPM publish is run, this in turn will trigger our prepack that cleans and builds the package
* The newly minted package is published with the next tag. This is done to prevent prerelease packages from being installed by default.

### Tag "latest" on npm

To promote the new package to the latest tag and make it the preferred default install:

1. Log into with `npm login [username]` but if rumors are true, that could increase a lot in the future.
2. Apply the latest tag `npm dist-tag add @istreamplanet/pebble-formik@[version number] latest`
## License

Copyright &copy; 2021 iStreamPlanet Co., LLC

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
