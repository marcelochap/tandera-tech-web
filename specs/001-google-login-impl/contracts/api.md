# API Contracts: Google Login & Auth

These are the REST endpoints exposed by the new Node.js backend.

## 1. Google Login Callback

**`POST /api/auth/google`**

Validates a Google JWT obtained from the frontend using the Google Identity Services client.

**Request Body (JSON)**:
```json
{
  "credential": "eyJhbGciOiJSUzI1NiIs..." // The JWT returned by google.accounts.id.prompt
}
```

**Response (200 OK)**:
```json
{
  "token": "eyJhbG...", // Internal Session JWT
  "user": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "serverIp": "https://api.tanderatech.com.br:3000"
  }
}
```

**Response (401 Unauthorized)**:
Returned if the token is invalid or the user is not found in the database.

## 2. Standard Email/Password Login

**`POST /api/auth/login`**

Validates standard credentials against the MongoDB `User` collection.

**Request Body (JSON)**:
```json
{
  "email": "jane@example.com",
  "password": "mySecurePassword"
}
```

**Response (200 OK)**:
Same structure as `/api/auth/google`.

**Response (401 Unauthorized)**:
Returned if credentials do not match.
