#### Install the Packages

```shell
npm install
```

#### Run unit tests

```shell
npm test
```

## How to Release

### Release an Update

Package releases should be done through the following commands:

Release a patch update:

```shell
npm version patch -m "release package %s because reasons"
```

Release a minor update:

```shell
npm version minor -m "release package %s because reasons"
```

Alpha pre-release minor update:

```shell
npm version pre-minor -m "release package %s as alpha because reasons" --preid=alpha
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

1. Log into with `npm login [username]`.
2. Apply the latest tag `npm dist-tag add @istreamplanet/pebble-formik@[version number] latest`
