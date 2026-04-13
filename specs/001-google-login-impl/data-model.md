# Data Model: Google Login & Redirection

## Entity: User
Represents a multi-tenant client or administrator capable of logging into the system.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | MongoDB primary identifier |
| `email` | String | Yes | Unique email address (used for both Google and Password login) |
| `passwordHash` | String | No | Bcrypt hashed password (null if user is strictly Google Login) |
| `name` | String | Yes | Display name for the dashboard |
| `serverIp` | String | Yes | The specific Node/Camera API URL to connect this user to (e.g., `https://api.tanderatech.com.br:3000`) |
| `createdAt` | Date | Yes | Audit timestamp |

## State Transitions
*   **Unauthenticated**: No session data in `sessionStorage`.
*   **Authenticated**: Successful validation of credentials via API. The backend returns a JWT containing the user's `email`, `name`, and `serverIp`. The frontend stores this JWT.
