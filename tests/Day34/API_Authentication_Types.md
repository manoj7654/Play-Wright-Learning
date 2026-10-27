# REST API Authentication --- Types

## Authentication Types

1.  No Auth
2.  Basic Auth
3.  API Key
4.  Bearer Token (JWT)
5.  OAuth 2.0

## 1. No Auth

No authentication is required. Anyone can access the API endpoint.

### Example Request

``` http
GET /public/data HTTP/1.1
Host: api.example.com
```

### Best For

  Use Case        Examples
  --------------- -------------------------------
  Public APIs     Weather data, public holidays
  Open Data       Government datasets
  Health Checks   Monitoring endpoints

## 2. Basic Auth

Uses a username and password encoded with Base64.

### Example Request

``` http
GET /data HTTP/1.1
Host: api.example.com
Authorization: Basic dXNlcjpwYXNz
```

**Tip:** Base64(`username:password`) = `dXNlcjpwYXNz`

### Best For

  Use Case                  Examples
  ------------------------- --------------------------
  Simple Internal Systems   Admin panels
  Quick Testing             Development environments
  Legacy Systems            Older APIs

## 3. API Key

A unique key is sent with each request to identify the client.

### Example Request

``` http
GET /data HTTP/1.1
Host: api.example.com
X-API-Key: your_api_key_123
```

**Tip:** API keys are usually sent in headers (`X-API-Key`) or as query
parameters (`?api_key=xxx`).

### Best For

  Use Case                Examples
  ----------------------- --------------------
  Public APIs             Weather, news APIs
  Dashboards              Analytics services
  Rate-Limited Services   Payment gateways

## 4. Bearer Token (JWT)

A token (usually JWT) is sent in the `Authorization` header as a Bearer
token.

### Example Request

``` http
GET /data HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9
```

**Tip:** Tokens expire. Refresh the token or log in again when needed.

### Best For

  Use Case       Examples
  -------------- -----------------------------
  Mobile Apps    iOS/Android applications
  SPAs           React, Vue, Angular apps
  Secured APIs   Banking, healthcare systems

## 5. OAuth 2.0

Delegated authorization. It allows access to user data without sharing
passwords.

### Example Request

``` http
GET /user/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer ya29.a0AfH6SMD...
```

### OAuth 2.0 Flows

  Flow                 Use Case              Status
  -------------------- --------------------- -------------
  Authorization Code   Web and server apps   Recommended
  Client Credentials   Server-to-server      Recommended

### Best For

  Use Case             Examples
  -------------------- --------------------------
  Social Login         Google, Facebook, GitHub
  Third-party Access   Microsoft, Twitter
  Enterprise SSO       Okta, Auth0

## Quick Comparison Table

  ----------------------------------------------------------------------------
  Feature          No Auth     Basic Auth  API Key     Bearer      OAuth 2.0
                                                       Token       
  ---------------- ----------- ----------- ----------- ----------- -----------
  Security Level   None        Low         Medium      High        Very High

  Ease of          Very Easy   Easy        Medium      Medium      Complex
  Implementation                                                   

  User Login       No          Yes         No          Yes         Yes
  Required                                                         

  Token Expiry     N/A         N/A         Usually No  Yes         Yes

  Refresh Tokens   N/A         N/A         No          Yes         Yes

  Rate Limiting    No          No          Yes         Yes         Yes
  Support                                                          

  Best For         Public data Internal    Public APIs Secured     User data
                               tools                   APIs        access
  ----------------------------------------------------------------------------

------------------------------------------------------------------------

**Source:** The uploaded document, *REST API Authentication --- Types*.
