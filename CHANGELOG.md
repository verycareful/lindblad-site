# Changelog

All notable changes to this repository will be documented in this file.


## [R.1.11.2] - 2026-06-02

### Changed
- Hero eyebrow updated to `RELEASE R.1.11.2 · 1296 TESTS · 102 SUITES · ALL PASSING` (restored to all-passing after the R.1.11.1 partial-pass status).
- Nav wordmark tag updated to `R.1.11.2`; footer build string updated to `BUILD R.1.11.2 · 1296/1296 · 102 SUITES`.
- Quick-start ctest mockup updated to `100% tests passed · 1296/1296 across 102 suites` (dropped the R.1.11.1 MPS Simon failure note).
- Licensing copy (PATH A list, §3 Redistribution card, licensing hero) clarified to cover LICENSE v2.3 §3.1 and §3.2: private sharing of copies, modified or unmodified, for non-commercial use; public redistribution remains prohibited.

## [R.1.10.8] - 2026-05-28

### Changed
- Hero eyebrow updated to `RELEASE R.1.10.8 · 1077 TESTS · 85 SUITES · ALL PASSING`.
- Nav wordmark tag updated to `R.1.10.8`; footer build string updated to `BUILD R.1.10.8 · 1077/1077 · 85 SUITES`.
- License page eyebrow updated to `§ LINDBLAD SOFTWARE LICENSE v2.3`; license overview blurb and FAQ snippet updated to `v2.3`.
- GitHub forks notice updated to `SLA v2.3`.
- CITATION code block license field updated to `Lindblad-SLA-2.3`.
- Footer SLA tag updated to `Lindblad SLA v2.3`.
- Contact addresses (CTA, contact page, FAQ, contact form mailto, footer link) migrated from `qpp.support@proton.me` to `lindblad.software@proton.me`.

## [R.1.4.1] - 2026-05-12

### Changed
- Updated all version references and content strings to upstream Lindblad R.1.4.1 (233 tests · 36 suites · all passing).
- Hero eyebrow updated to `RELEASE R.1.4.1 · 233 TESTS · 36 SUITES · ALL PASSING`.
- FetchContent `GIT_TAG` comment updated to `R.1.4.1`.
- Quick-start footer label and release-notes link updated to `R.1.4.1`.
- Footer banner updated to `BUILD R.1.4.1 · 233/233 · 36 SUITES`.
- Algorithm catalogue updated to explicitly list the `distributed` variant under the Bernstein-Vazirani family description.

## [R.1.3.2] - 2026-05-11

### Changed
- Updated all version references and content strings to upstream Lindblad R.1.3.2 (223 tests · 35 suites · all passing).
- Hero eyebrow updated to `RELEASE R.1.3.2 · 223 TESTS · 35 SUITES · ALL PASSING`.
- FetchContent `GIT_TAG` comment updated to `R.1.3.2`.
- Quick-start footer label and release-notes link updated to `R.1.3.2`.
- FAQ benchmark citation version updated to `R.1.3.2`.
- License page citation snippet version updated to `R.1.3.2`.

## [R.1.3.1] - 2026-05-09

### Added
- HTML entry points and `styles/tokens.css` design token system from Claude designer output.
- `LicenseSplit` section (§05/06) and `CTA` section (§06/06) on home page, ported from original HTML source.
- Theme persistence: inline script in every HTML `<head>` applies saved theme before CSS renders, eliminating flash on page navigation.
- `white-space: nowrap` on `.tag` to prevent long labels (e.g. SEARCH & ESTIMATION) from wrapping.

### Changed
- Updated all version references and content strings to upstream Lindblad R.1.3.1 (223 tests · 35 suites).
- QuickStart section replaced with FetchContent CMake example + clone/build step cards, matching original HTML design.
- Differentiators cards updated to original `FEATURE / 01` layout with blue code label and rule separator.
- Contact form: removed redundant academic inquiry type (access is automatic).
- Contact layout: explicit two-column grid so info cards always appear on the right.
- Algorithms page hero accent colour changed from blue to orange for consistency.
- All code blocks converted to `dangerouslySetInnerHTML` so syntax-highlight spans render as HTML.
- `vite.config.ts` updated to multi-page build config with `base: './'`.

### Fixed
- Theme toggle overwrote localStorage with `"dark"` on every page load before reading the saved value; initialiser now reads localStorage directly.
- Benchmarks page replaced with "in progress" placeholder (full content preserved as `BenchmarksPageFull`).
- FAQ accordion no longer pre-expands any item.


## [R.1.2.2] - 2026-05-09

### Changed
- Aligned frontend release strings and metadata to external Lindblad release R.1.2.2 (frontend now references upstream release tag).


## [R.1.0.1] - 2026-05-05

### Changed
- Removed legacy HTML entry points and JSX component files (now fully migrated to TypeScript + Vite).
- Cleaned up old website layout folder and styles directory (consolidated into Vite build).


## [R.1.0.0] - 2026-05-05

### Added
- Repository-ready TypeScript and Vite rebuild for the Lindblad website.
- Root README with local development and build instructions.
- Root gitignore rules for generated assets, dependencies, env files, and workflow scratch state.
- Initial public TypeScript site scaffold for the Lindblad marketing pages.
- Multi-page React entrypoints for overview, algorithms, benchmarks, contact, and license pages.
