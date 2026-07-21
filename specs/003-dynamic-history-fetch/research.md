# Phase 0: Outline & Research

## Research: Fetching Historical Data
- **Decision**: Fetch logic in `historico.html` will dynamically parse the `camera` and `name` from the URL string parameters, rather than hardcoding them.
- **Rationale**: The user requirement specifically demands matching the camera history to the button clicked in the Dashboard. The URL will contain `?camera=ID&name=Name` per the Dashboard specification. The API requires a dynamic URL containing the ID, e.g., `${baseURL}/blocks/camera/${cID}/date-range/summary?start=...&end=...`.
- **Alternatives considered**: Passing via `sessionStorage` or `localStorage`. Rejected because direct URL parameters allow users to bookmark or share links to specific camera histories.

## Research: Fallback
- **Decision**: If `camera` parameter is missing, decrypt the `tandera_cameras` from `sessionStorage` and pick the first available ID as a fallback, or redirect back to `dashboard.html`.
- **Rationale**: Outlined in the specification Requirements (FR-005, FR-006) to ensure the system is robust against broken links and unauthorized access.

## Research: Data Types
- **Decision**: Front-end only using Vanilla JS (ES Modules/Promises). No backend changes required.
- **Rationale**: The Tandera Frontend relies solely on standard HTML/JS. Data manipulation is handled natively to maintain the "Vanilla HTML/JavaScript/CSS" Constitution constraint.
