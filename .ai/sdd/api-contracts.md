POST /auth/register
Request:
{
  "email": "string",
  "password": "string"
}
Response: User

POST /auth/login
Request:
{
  "email": "string",
  "password": "string"
}
Response:
{
  "accessToken": "string"
}

POST /links
Auth: Bearer
Request:
{
  "originalUrl": "string"
}
Response: ShortLink

GET /links
Auth: Bearer
Response: ShortLink[]

GET /links/:id/stats
Auth: Bearer
Response:
{
  "totalClicks": number,
  "events": ClickEvent[]
}

GET /r/:shortCode
Response: Redirect (302)
