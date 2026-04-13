# Implementation Plan: Dynamic History Fetch

**Branch**: `003-dynamic-history-fetch` | **Date**: 2026-04-13 | **Spec**: [spec.md](./spec.md)

## Summary

The `historico.html` page must dynamically fetch history data based on the explicit camera selected in the `dashboard.html`. It will extract the selected Camera ID and Name from URL Query Parameters, resolving the API request securely against the `userServerIp` saved in session storage. A secure fallback to session storage decryption protects the UI when accessed improperly.

## Technical Context

**Language/Version**: HTML5 / Vanilla ES6 Javascript
**Primary Dependencies**: Chart.js 
**Storage**: Client-side `sessionStorage` (for configuration variables)
**Testing**: Manual Visual Testing
**Project Type**: Frontend Client Application
**Constraints**: Follow the Tandera Tech Theme (Visual Excellence) and restrict any dependencies. Vanilla HTML/JS only. Data fetched directly using standard Web APIs.
**Scale/Scope**: Single page refactor (`historico.html`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Google-First Identity**: N/A (Feature runs strictly post-login).
- **Template Consistency**: Retains the existing dark visual template and UI patterns of `historico.html` while dynamically updating the titles.
- **Visual Excellence**: Preserves interactive hover effects and responsive behavior mapped in Vanilla CSS.
- **Secure Token Management**: History securely uses XOR cipher decryption logic identical to `dashboard.html` to execute fallbacks, preventing sensitive hardware IP/IDs from logging statically.
- **Progressive Enhancement**: In event of network failure or missing ID, graceful error boundaries will return user to Dashboard instead of crashing the JS thread.

## Project Structure

### Documentation (this feature)

```text
specs/003-dynamic-history-fetch/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Output
├── data-model.md        # Output 
├── quickstart.md        # Output 
└── tasks.md             # Pending 
```

### Source Code (repository root)

```text
src/
└── historico.html       # Single target file
```

**Structure Decision**: Due to the vanilla nature of the frontend, changes are strictly localized to `historico.html`'s inline JS module.

