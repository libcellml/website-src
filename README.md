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
At this time, we do not have any formalised testing of the website.
Because of this, we need to manually check the functionality of the website for breakages before promotion to _production_.

## About

This website is developed using Vue 3 and Vite.
Checkout [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more on Vue 3 and Vite.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
