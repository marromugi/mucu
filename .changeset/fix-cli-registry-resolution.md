---
"mucu": patch
---

### Bug Fixes
- Bundle registry into dist and resolve dependencies across all sections. Registry path was resolved relative to source directory, causing ENOENT when installed from npm. Now registry files are copied into dist/ at build time via a post-build script. Also fix resolver and copyComponentToProject to look up utilities and styles in addition to items when resolving registryDependencies.

### Build
- Add repository field to package metadata to enable proper repository references for package management and tooling.
