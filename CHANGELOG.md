# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- ESM + CommonJS dual output support
- TypeScript type exports (`Options`, `WarekiResult`, `DateInput`)
- Named export `wareki` (default export preserved)
- Date object input support
- JSDoc documentation
- GitHub Actions CI with matrix testing (Node.js 20, 22, 24)
- Codecov coverage reporting
- Pre-commit hooks with Husky + lint-staged

### Changed

- Migrated from npm to pnpm
- Replaced CircleCI with GitHub Actions
- Replaced ESLint + Prettier with oxlint + oxfmt
- Updated TypeScript target to ES2022
- Modernized build tooling

### Removed

- Babel configuration (unused)
- TSLint configuration (deprecated)
- Renovate configuration (using Dependabot)
