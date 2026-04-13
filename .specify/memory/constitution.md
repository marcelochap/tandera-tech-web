<!-- 
SYNC IMPACT REPORT
Version change: 0.0.0 → 1.0.0
Modified principles: None (Initial Setup)
Added sections: Core Principles, Technical Constraints, Development Workflow
Removed sections: None
Templates requiring updates: 
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs: None
-->

# Projeto Frontend Tandera Constitution

## Core Principles

### I. Google-First Identity
Authentication MUST prioritize Google OAuth2.0 to ensure a frictionless "One-Tap" login experience for users. Manual registration should be secondary.

### II. Template Consistency
The UI MUST strictly follow the existing webapp template's design system. Any additions (like login buttons or user profiles) MUST feel native to the aesthetic, using curated color palettes and smooth transitions.

### III. Visual Excellence (Antigravity Standard)
Every interaction MUST feel premium. Use vibrant gradients, glassmorphism, and subtle micro-animations (e.g., hover states on login buttons) to "wow" the user at first glance. No generic browser defaults.

### IV. Secure Token Management
Identity tokens and session data MUST be handled securely. Sensitive credentials should never be exposed in client-side logs or insecure storage. Use standard JWT and OAuth practices.

### V. Progressive Enhancement & Fallbacks
While Google Login is primary, the system SHOULD handle authentication failures gracefully with clear, user-friendly error messages that match the project's visual theme.

## Technical Constraints

- **Frontend**: Vanilla HTML/JavaScript/CSS (as per root instructions).
- **Identity**: Google Identity Services SDK.
- **Styling**: Modern CSS with CSS Variables for theme consistency.

## Development Workflow

- All features follow the Spec-Driven Development (SDD) process: Constitution → Specification → Plan → Tasks → Implementation.
- Each phase requires validation against this Constitution before proceeding to the next.

## Governance

- This Constitution supersedes ad-hoc development decisions.
- Amendments require a version bump and updates to all templates.
- PRs MUST be reviewed for consistency with Visual Excellence and Google-First principles.

**Version**: 1.0.0 | **Ratified**: 2026-04-13 | **Last Amended**: 2026-04-13
