# FAQ

## Debug Activate / Deactivate

```shell
# legacy
# $ PORT="9052"
# next
$ PORT="8430"
$ LICENSE="62967cb886......"
$ API_KEY=WygP1mAJzjYSTBJMy5GXhugeQHEyoj4Tz4vNAJDxn9K1AQpPoe1DtnvELIRIIt5H

# get license state
$ curl -s -k "https://c3edu.online:${PORT}/licenseKey" | jq -r
{
  "key": "EITHER_TRIAL_HAS_NOT_STARTED_OR_HAS_BEEN_TAMPERED",
  "message": "Either trial has not started or has been tampered",
  "licenseActivated": false,
  "trialActivated": false
}

$ curl -s -k "https://c3edu.online:${PORT}/licenseKey" | jq -r .licenseKey,.key
# outcomme  
62967cb886......
LICENSE_IS_GENUINELY_ACTIVATED

# activate license
$ curl -k --request POST \
  --url "https://c3edu.online:${PORT}/license/activate" \
  --header 'content-type: application/json' \
  --header "authorization: Bearer ${API_KEY}" \
  --data '{ "licenseKey": "'${LICENSE}'" }' \
  | jq

# deactivate license
$ curl -k --request POST \
  --url "https://c3edu.online:${PORT}/license/deactivate" \
  --header 'content-type: application/json' \
  --header "authorization: Bearer ${API_KEY}" \
  | jq

# force update custom config
$ curl -k --request POST \
  --url "https://c3edu.online:${PORT}/update/custom-config" \
  --header 'content-type: application/json' \
  --header "authorization: Bearer ${API_KEY}" \
  --data '{ "forceUpdate": "true" }' \
  | jq

# test ls-api download
$ curl --request GET \
  --url https://es.critical-links.com:9443/download/custom-config/modern-robotics/modern-robotics_v1.0.tgz \
  --header 'Authorization: Bearer xqaTGS1Df46lHS6B378n3Omp1SC6EhLrHvaCck4byvO8Lqkz8lNaYG2v1lprVSoi' \
  -o /tmp/modern-robotics_v1.0.tgz
```

## Fix : Error: The system time has been tampered (backdated).

first `resetLicense` ask Mario next

```shell
$ sudo systemctl enable ntp \
  sudo systemctl start ntp \
  sudo systemctl status ntp \
  sudo timedatectl set-ntp on
```

wait for sync and ACTIVATE device, now it should response with

```json
{
  "statusValue": 0,
  "statusCode": "LA_OK"
}
```