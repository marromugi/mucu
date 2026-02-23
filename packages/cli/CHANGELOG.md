# mucu

## 0.2.0

### Minor Changes

- 3304dcb: Add automatic path alias detection from tsconfig.json/jsconfig.json. The CLI now automatically detects existing path aliases from your TypeScript/JavaScript configuration and uses them during component initialization, with an interactive prompt to customize if needed.

## 0.1.2

### Patch Changes

- dea37d6: ### Bug Fixes
  - Bundle registry into dist and resolve dependencies across all sections. Registry path was resolved relative to source directory, causing ENOENT when installed from npm. Now registry files are copied into dist/ at build time via a post-build script. Also fix resolver and copyComponentToProject to look up utilities and styles in addition to items when resolving registryDependencies.

  ### Build
  - Add repository field to package metadata to enable proper repository references for package management and tooling.

## 0.1.1

### Patch Changes

- 667c0bf: ### Features & Improvements
  - Add comprehensive unit test coverage for `add` and `init` commands
  - Add npm provenance configuration for enhanced security in package publishing

  ### Tests
  - Add full test suite for the `add` command functionality
  - Add full test suite for the `init` command functionality
  - Ensure command implementations work as expected

  This release includes new test infrastructure to improve code quality and maintainability, along with security enhancements for npm package distribution.
