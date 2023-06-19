# Huldra Release Guidelines

## Introduction and Terminology

- A (pre-/regular/patch) release is only made when the code is “production-ready” 
- The code is considered "production-ready" whenever it can also be shared publicly [in the public repo](https://github.com/simula/huldra)
- We adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), and use numeric values for all major, minor, patch, and pre-release identifiers

<!---
We do not use "alpha", "beta", etc. strings in pre-release versions, and instead use numeric values after the hyphen 
-->

### Pre-Releases

- A "pre-release" can be used when a regular release is not ready (i.e., updates to the codebase are not necessarily aligned with planned milestones and associated issues)
- **Source branch:** pre-releases are made from `main`
- **Version tag:**  pre-releases use version tags in `vX.Y.Z-T` format[^1]

[^1]: Releases are are referred to in `[X.Y.Z(-T)] - yyyy-mm-dd` format in the CHANGELOG, where `yyyy`, `mm`, and `dd` are the year, month, day of release respectively.

### Regular Releases

- **Source branch:** regular releases are made from `main`.
- **Version tag:**  regular releases use version tags in `vX.Y.Z` format[^1]

### Hotfix and Patch Releases

- **Source branch:** patch releases can be made from `dev` as well as `main` (changes do not need to be deployed in `main` at the time of release).
- **Version tag:**  patch releases use version tags in `vX.Y.Z` format, where only `Z` should be updated compared to an **existing** tag `vX.Y.-`[^1]

## Checklist

- Update codebase in the source branch (`dev` or `main`)
- Go through the issues tagged with the relevant milestone, make sure all are closed
- Go through all closed PRs associated with the release
- Update internal notes on dependencies and/or installation and/or configuration if necessary
- Check and update VERSION.md
- Update CHANGELOG.md
- [If source branch is `dev`] Merge `dev` into `main`[^2]
- [If necessary] make further changes in `main`
- Make the release from `main` using an appropriate version tag
- [If applicable] Close the relevant milestone
- Inform the team about the new release

[^2]: If necessary, leave out features. Use "squash and merge" to combine all commits into one.
