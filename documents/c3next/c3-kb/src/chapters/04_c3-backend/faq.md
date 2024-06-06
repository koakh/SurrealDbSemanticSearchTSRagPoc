# FAQ

## Developer Credentials

- username: dev
- password qhA1Bpn5s5

## Backend Inter Service Communication

before we request c3-backend protected endpoints from client side apps like `c3-system-core`, we need first a valid token, the way we do is **request one before any request** with `dev` user like

```shell
$ curl -k -X POST \
  --url "https://c3edu.online/backend/v1/auth/login" \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"username": "dev","password": "qhA1Bpn5s5"}'
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInN1YiI6IkNOPWRldixPVT1DM0RldmVsb3BlcixPVT1QZW9wbGUsREM9YzNlZHUsREM9b25saW5lIiwicm9sZXMiOlsiQzNfQURNSU5JU1RSQVRPUiJdLCJwZXJtaXNzaW9ucyI6WyJSUF9BQ1RJVkVfRElSRUNUT1JZIiwiUlBfQU5BTFlUSUNTIiwiUlBfQVBQUyIsIlJQX0FVRElUIiwiUlBfQkFORFdJRFRIX0xJTUlUUyIsIlJQX0JBVFRFUlkiLCJSUF9CTEFDS19MSVNUSU5HIiwiUlBfQ0FDSElORyIsIlJQX0NMQVNTRVMiLCJSUF9DT05URU5UIiwiUlBfREFTSEJPQVJEIiwiUlBfRklSRVdBTEwiLCJSUF9HUE8iLCJSUF9JTlRFUk5FVF9BQ0NFU1MiLCJSUF9LSU9TSyIsIlJQX0xBTkRJTkdfUEFHRSIsIlJQX0xFU1NPTlMiLCJSUF9MSUNFTlNFIiwiUlBfTE9DQUxfQVJFQV9ORVRXT1JLIiwiUlBfTUFJTlRFTkFOQ0UiLCJSUF9NT05JVE9SSU5HIiwiUlBfUkVNT1RFX1NFUlZJQ0VTIiwiUlBfU0hBUkVTIiwiUlBfVElNRV9DT05GSUdVUkFUSU9OIiwiUlBfVVBEQVRFUiIsIlJQX1VTRVJTIiwiUlBfV0hJVEVMSVNUSU5HIiwiUlBfV0lSRUxFU1MiXSwibWV0YURhdGEiOnsicHJvZmlsZSI6IkMzQWRtaW5pc3RyYXRvciJ9LCJpYXQiOjE2MzY2NDU0NjEsImV4cCI6MzMxOTQyNDU0NjF9.MDGmtjN_7rywnFRgb76YlbgR3UO6wIkuian_gC_l6ns"
}
```

> side note, has a user of **Developer** group/role, our 'king' `dev` as some previleges, like something like our beloved eternal token have in the past, like 1000 year's live, **Long live the King!**, this way we can thrust that our token is some kind of eternal, one day will die, we know, once more we can say, **The King is dead. Long live the King!**

or using `c3-system-core` ACTION

```shell
$ curl -k --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_BACKEND_AUTH_GET_ACCESS_TOKEN","payload": {"body": {}}}'
```

## DEPRECATED: Backend Inter Service Communication: Eternal Token (Almost)

> WARN: **don't expose this TOKEN**, this is a major security risk, because below token is **valid for next 100 years**

```shell
# eternal token
$ TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImMzIiwic3ViIjoiQ049YzMsT1U9QzNBZG1pbmlzdHJhdG9yLE9VPVBlb3BsZSxEQz1jM2VkdSxEQz1vbmxpbmUiLCJyb2xlcyI6WyJDM19BRE1JTklTVFJBVE9SIiwiQzNfVEVBQ0hFUiIsIkMzX1BBUkVOVCIsIkMzX1NUVURFTlQiLCJET01BSU5fQURNSU5TIl0sImlhdCI6MTYxNDcwNTk2MywiZXhwIjo0NzcwNDY1OTYzfQ.TfjNfSrTZkGEYhWcoR_-bbL0sLOSakD-6XTOgnfdpz8"

# test token communication
$ curl -k "https://c3edu.online:8420/v1/admin/system/license/state" \
  -H  "accept: */*" \
  -H  "Authorization: Bearer ${TOKEN}" \
  | jq
```

```json
{
  "expiryDate": 0,
  "expirationDate": "unlimited",
  "trialStatus": 1,
  "key": "EITHER_TRIAL_HAS_NOT_STARTED_OR_HAS_BEEN_TAMPERED",
  "message": "Either trial has not started or has been tampered",
  "licenseActivated": false,
  "trialActivated": false,
  "internalGracePeriod": {
    "enabled": false
  },
  "support": {
    "enabled": false
  }
}  
```

## Invalidate Tokens

with `c3-backend`

```shell
$ ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
$ curl --request POST \
  --url "https://c3edu.online/backend/v1/auth/invalidate-secrets" \
  --header "authorization: Bearer ${ACCESS_TOKEN}" \
  --header "content-type: application/json"
```

with `c3-system-core`

```shell
$ curl -k --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_BACKEND_AUTH_INVALIDATE_SECRETS"}'
```
