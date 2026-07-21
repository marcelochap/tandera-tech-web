# Research & Technical Decisions: Google Login

## 1. Connecting Frontend to MongoDB
**Decision**: Introduce a lightweight Node.js/Express backend API.
**Rationale**: Pure HTML/JS on the frontend cannot securely connect to MongoDB directly without exposing credentials. The "market best practice" is to have a backend server that handles MongoDB connections (`mongoose` or native driver), verifies credentials securely, and returns a session token.
**Alternatives considered**: Firebase/Supabase (too far from the requested MongoDB), MongoDB Realm/App Services (might be overkill for a simple Node integration if they want standard MongoDB).

## 2. Google Identity Implementation
**Decision**: Use Google Identity Services (GIS) on the frontend + `google-auth-library` on the backend.
**Rationale**: The GIS button handles the popup and user consent securely on the client, returning a JWT. The frontend sends this JWT to our Express backend, which cryptographically verifies it using Google's public keys. This prevents token spoofing.
**Alternatives considered**: OAuth2.0 manual flow (too complex, redirect-heavy, less optimal UX compared to GIS One-Tap/Button).

## 3. Dynamic IP Redirection Logic
**Decision**: Backend stores the exact IP/URL routing in the MongoDB `User` document.
**Rationale**: When a user logs in, the backend checks MongoDB for their email, returns their specific `server_ip`, and creates a secure session token. This centralizes configuration and prevents clients from guessing or enumerating IPs on the frontend.
**Alternatives considered**: Hardcoding in frontend (not scalable, insecure).

## 4. Frontend Security Mitigation
**Decision**: Use `DOMPurify` (or similar native sanitization) for Email/Password inputs, and use `sessionStorage` for tokens (with a caveat).
**Rationale**: The user requested minimum protection against XSS. Sanitizing inputs before sending to the backend is a good first step, although real prevention happens on the backend. `sessionStorage` is used for the prototype as agreed in the Constitution.
