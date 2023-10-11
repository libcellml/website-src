[![Selenium tests](https://github.com/libcellml/website-src/actions/workflows/test-with-selenium.yml/badge.svg)](https://github.com/libcellml/website-src/actions/workflows/test-with-selenium.yml)

# libCellML Website Source

This repository is the source code for the libCellML website.
There are two branches _staging_ and _production_.
The _staging_ branch is the source of the **staging.libcellml.org** website.
The _production_ branch is the source of the **libcellml.org** website.
The _staging_ branch is for proposing new changes and all external pull requests should use this branch as the base.
The _production_ branch should only be updated through pull requests from the _staging_ branch, or occassionally through _hotfix_ branches.

## Continuous Deployment

When a pull request is merged into either _staging_ or _production_ GitHub actions builds and deploys a new website.

## Pull requests

All external pull requests should use _staging_ as the base.
Pull requests targetting _staging_ are only given a light review, this is only really to check for malicious intent.
Once a _staging_ pull request has been merged care needs to be taken to test the website for breakages.

### Testing

We have started adding tests using [Selenium](https://www.selenium.dev/).
The tests are run through Python using the Python package _unittest_.
To run the tests create a Python virtual environment and execute the following commands:

```
  pip3 install selenium webdriver-manager
  python3 tests/selenium/install_driver.py
  python3 tests/selenium/run_all_tests.py
```

These commands assume the virtual environment is active, and that the commands are being executed from the root directory of the website source.

The tests do not cover all the functionality of the website, at this time.
It is unlikely that the tests will pick up regressions in the website.
Because of this, we should manually check the functionality of the website for breakages before promotion to _production_ after the tests have run.

## About

This website is developed using Vue 3 and Vite.
Checkout [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more on Vue 3 and Vite.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
