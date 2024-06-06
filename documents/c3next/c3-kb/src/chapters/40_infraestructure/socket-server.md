# Socket Server

## Some usefull Requests

```shell
$ DATE_GTE="2022-07-20T09:53:57.806Z"
```

### getPersistedServerSessions

```shell
$ curl -k --request POST \
  --url https://wss.c3cloudcontrol.com:8448/persisted/server-sessions \
  --header 'authorization: Bearer xqaTGS1Df46lHS6B378n3Omp1SC6EhLrHvaCck4byvO8Lqkz8lNaYG2v1lprVSoi' \
  --header 'user-agent: vscode-restclient' \
  --data '{"matchRanges": {"createdDate": {"gte": "'${DATE_GTE}'"}}}' \
  | jq
```

```json
{
  "lastCreatedDateSession": "2022-07-20T09:53:57.806Z",
  "lastUpTimeSessionMs": 3891671,
  "sumUpTimeSessionMs": 705662703,
  "avgUpTimeSessionMs": 3986794.9322033897,
  "minUpTimeSessionMs": 29,
  "maxUpTimeSessionMs": 328950809,
  "totalConnectedDevicesInSessions": 7482,
  "totalNumOfDisconnectedConnectionsInSessions": 21228,
  "firstStartDate": "2022-07-13T09:46:06.776Z",
  "lastShutdownDate": "2022-07-20T10:58:49.403Z",
  "totalServerSessions": 178,
  "avgConnectedDevices": 42.03370786516854,
  "avgNumOfDisconnectedConnections": 119.25842696629213,
  "lastUpTimeSession": {
    "hours": 1,
    "minutes": 4,
    "seconds": 51,
    "ms": 3891671
  },
  "sumUpTimeSession": {
    "hours": 4,
    "minutes": 1,
    "seconds": 2,
    "ms": 705662703
  },
  "avgUpTimeSession": {
    "hours": 1,
    "minutes": 6,
    "seconds": 26,
    "ms": 3986794.9322033897
  },
  "minUpTimeSession": {
    "hours": 0,
    "minutes": 0,
    "seconds": 0,
    "ms": 29
  },
  "maxUpTimeSession": {
    "hours": 19,
    "minutes": 22,
    "seconds": 30,
    "ms": 328950809
  }
}
```

### getPersistedClientConnections

```shell
$ curl -k --request POST \
  --url https://wss.c3cloudcontrol.com:8448/persisted/client-connections \
  --header 'authorization: Bearer xqaTGS1Df46lHS6B378n3Omp1SC6EhLrHvaCck4byvO8Lqkz8lNaYG2v1lprVSoi' \
  --header 'content-type: application/json' \
  --data '{"matchRanges": {"createdDate": {"gte": "'${DATE_GTE}'"}},"sort": {"upTimePercentage": -1},"paging": {"page": 1,"perPage": 100}}' \
  | jq | more
```

```json
{
  "page": 1,
  "perPage": 100,
  "prePage": null,
  "nextPage": 2,
  "totalRecords": 467,
  "totalPages": 5,
  "data": [
    {
      "_id": "f7db5cb452287413",
      "parent": "62d7d0b50b102d97b67cc0fa",
      "clientType": "c3-cloud-client",
      "clientId": "f7db5cb452287413",
      "cloudAddress": "c3cloudcontrol.com",
      "createdDate": "2022-07-20T09:53:59.426Z",
      "licenseState": {
        "key": "LICENSE_IS_GENUINELY_ACTIVATED",
        "licenseKey": "f7db5cb452287413",
        "licenseActivated": true,
        "trialActivated": false,
        "licenseType": "node-locked",
        "metadata": {
          "license": [
            {
              "customConfig": "-"
            },
            {
              "beginDateId": "2022-05-13"
            },
            {
              "monthDurationId": "120"
            },
            {
              "serialId": "I-00001-0001"
            },
            {
              "customerId": "Critical Links Engineering"
            },
            {
              "orderId": "RO-000001"
            },
            {
              "contractId": "000001"
            },
            {
              "subscriptionGracePeriodId": "30"
            },
            {
              "cloudServerId": "c3cloudcontrol.com"
            }
          ],
          "product": []
        }
      },
      "syncthing": {
        "connected": true,
        "deviceId": "AHH2NGO-5YSCHL4-QP7Q5SS-RTWQIHU-LZ3FYYL-QBJZQLQ-BWMX2IQ-4EZ3XQT",
        "name": "32d0a2f9a780",
        "startTime": "2022-07-18T11:09:07Z",
        "version": "v1.19.2",
        "os": "linux"
      },
      "sumSessionsMs": 4039975,
      "avgSessionsMs": 4039975,
      "minSessionsMs": 4039975,
      "maxSessionsMs": 4039975,
      "totalSessions": 1,
      ...
```

### getPersistedClientConnectionsCsv

```shell
$ curl -k --request POST \
  --url https://wss.c3cloudcontrol.com:8448/csv/client-connections \
  --header 'authorization: Bearer xqaTGS1Df46lHS6B378n3Omp1SC6EhLrHvaCck4byvO8Lqkz8lNaYG2v1lprVSoi' \
  --header 'content-type: application/json' \
  --data '{"matchRanges": {"createdDate": {"gte": "'${DATE_GTE}'"}},"sort": {"upTimePercentage": 1},"paging": {"page": 1,"perPage": 999999999}}' \
  -o /tmp/file.csv
```

check file

```shell
$ nano /tmp/file.csv
```

### Send ACTIONS to Unlicensed Devices

this commands only are implemented in ISO 5.0.3 (c3-cloud-client 1.0.9)  and 5.1.0 (c3-cloud-client 1.1.0)

```shell
# enter device
$ ssh c3@c3edu.online

# check latest connection clientId
$ cd /srv/docker/system
$ docker-compose logs -f c3-microcloud-cloud-client | grep "socketClient client connecting:"
c3-microcloud-cloud-client     | [INFO] 10:29:23 socketClient client connecting: https://wss.c3cloudcontrol.com:8448 with clientId: @6cc2688c4a714b18a8f39178046ef8ee

# compose clientId from machineId
$ CLIENT_ID="@$(cat /etc/machine-id)"

# prepare accessToken
$ ACCESS_TOKEN="xqaTGS1Df46lHS6B378n3Omp1SC6EhLrHvaCck4byvO8Lqkz8lNaYG2v1lprVSoi"

# send ACTION_ACK_OK: check connection with client
$ curl -s --request POST \
  --url "https://wss.c3cloudcontrol.com:8448/io/client/client-channel/${CLIENT_ID}" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{	"action": "ACTION_ACK_OK" }' | jq

# send ACTION_SHELL_SERVICE_ENABLE_TUNNEL_AUTOSSH : create tunnel
$ curl --request POST \
  --url "https://wss.c3cloudcontrol.com:8448/io/client/client-channel/${CLIENT_ID}" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
	"action": "ACTION_SHELL_SERVICE_ENABLE_TUNNEL_AUTOSSH",
	"payload": {
      "body": {
        "name": "ssh",
        "remotePort": "62062",
        "localPort": "22"
      }
	}
}' | jq
```
