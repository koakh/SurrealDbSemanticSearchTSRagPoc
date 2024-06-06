# How to test new Cryptlex release event / new releaseAvailable

to test cryptlex new release update event, and test our internal c3-system-core and c3-lexactivator-api `releaseAvailable`, we have to options

option 1. **keep current untouched version and release channel in defaults**, and wait for a **new release**, this is not ideal, why? because we can wait a few months for this event occur.......when a new release has "shipped"

option 2. in this option we force a new **release detection**, to make this happen quickly we must **downgrade our current version** to simulate that we are in a **lower version** and revert it again after the tests are completed

## Pre Requisites

1. connect to C3 via SSH
2. open [C3 Micro Cloud Dashboard](https://c3edu.online/dashboard)

## Check Current releaseAvailable on frontend

![image](../../assets/images/2022-12-20-11-26-04.png)

> we can see that we are in release **5.0.2** and are up to dated

## Change C3 Environment for Test Phase

### 1. Check current version and release channel

```shell
$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_CONFIG_GET","payload": {"body": {"id": "VERSION"}}}' \
  | jq ".releaseChannel, .version, .majorMinor"

# outcome
"Stable"
"5.0.3"
"5.0"
```

we are in `5.0.3`, now we must change it to a lower version for ex `5.0.2`

### Change to a lower version and stable releaseChannel

edit c3 version file and change bellow properties to setup current `version` and `releaseChannel` for tests

```shell
$ sudo nano /var/lib/c3/version.json
```

```json
{
  ...
  "majorMinor": "5.0",
  ...
  "releaseChannel": "Stable",
  ...
  "version": "5.0.2"
  ...
}
```

### Restart C3-System-Core Service

after this changes we must restart `c3-system-core` to apply changes and encrypt decrypted value

```shell
$ sudo service c3-system-core restart
```

### Confirm that we have downgrade and change releaseChannel changes applied

```shell
$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_CONFIG_GET","payload": {"body": {"id": "VERSION"}}}' \
  | jq ".releaseChannel, .version, .majorMinor"

# outcome
"Stable"
"5.0.2"
"5.0"
```

done we have downgraded the version, we can now lower the `RELEASE_UPDATE_INTERVAL`

### Change Lexactivator-Api Service Environment Variables

```shell
$ sudo nano /etc/systemd/system/c3-lexactivator-api.service
```

uncomment `Environment=SHOW_ALL_SERVER_SYNC_EVENTS=1` and add `Environment=RELEASE_UPDATE_INTERVAL="180000"` after it,
to lower release update interval, with this, we don't need to wait for 1h, and wait only 3m, cool

```config
[Service]
...
Environment=SHOW_ALL_SERVER_SYNC_EVENTS=1
Environment=RELEASE_UPDATE_INTERVAL="180000"
```

now reload daemon service and restart service

```shell
$ sudo systemctl daemon-reload
$ sudo service c3-lexactivator-api restart
$ sudo service c3-lexactivator-api status
● c3-lexactivator-api.service - Critical Links cryptlex lexactivator API
     Loaded: loaded (/etc/systemd/system/c3-lexactivator-api.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2022-12-15 12:12:58 WET; 37s ago
    Process: 100752 ExecStartPre=/bin/sleep 15 (code=exited, status=0/SUCCESS)
   Main PID: 101227 (c3-lexactivator)
      Tasks: 12 (limit: 9403)
     Memory: 46.4M
        CPU: 1.698s
     CGroup: /system.slice/c3-lexactivator-api.service
             └─101227 /usr/share/c3-lexactivator-api/c3-lexactivator-api

Dec 15 12:12:58 c3 c3-lexactivator-api[101227]:     Api Key WygP1mAJzj...
Dec 15 12:13:03 c3 c3-lexactivator-api[101227]: (node:101227) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable>
Dec 15 12:13:03 c3 c3-lexactivator-api[101227]: (Use `c3-lexactivator-api --trace-warnings ...` to show where the warning was create>
Dec 15 12:13:03 c3 c3-lexactivator-api[101227]:   c3-lexactivator-api connected to c3-system-core
Dec 15 12:13:03 c3 c3-lexactivator-api[101227]:   c3-system-core service running [https://127.0.0.1:8410]
Dec 15 12:13:03 c3 c3-lexactivator-api[101227]:   current c3 version [v5.0.2]
Dec 15 12:13:03 c3 c3-lexactivator-api[101227]:   cryptlex release channel [stable], release update interval [180000]
```

we clearly see `current c3 version [v5.0.2]` and `cryptlex release channel [stable], release update interval [180000]`, that means that we are in right version, releaseChannel stable and lowered the release update interval to minimum of 180000ms (3m)

### Watch c3-lexactivator-api logs

open a new shell window and launch bellow command to see the server sync `c3-lexactivator-api` logs, and watch logs and wait for 3m or less......
we will see a line like the above `releaseUpdate status update: a new release update is available for the app`

```shell
$ sudo journalctl -f -u c3-lexactivator-api

# outcome
Dec 20 11:36:18 c3 c3-lexactivator-api[67623]:   update c3-system-core releaseAvailable to [true]
...
Dec 20 11:41:11 c3 c3-lexactivator-api[67623]: serverSync status code: [0], LexStatusCode: [LA_OK]
Dec 20 11:44:09 c3 c3-lexactivator-api[67623]: releaseUpdate status update: a new release update is available for the app
...
```

seems everything work as expected, c3-lexactivator-api update c3-system-core

### Check C3-System-Core Release Status

```shell
$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"action": "ACTION_UPDATE_RELEASE_AVAILABLE_STATUS_GET"}' \
  | jq

# outcome
{
  "releaseAvailable": true,
  "releaseChannel": "STABLE"
}
```

we clear in above response that we have a new `releaseAvailable`, this confirms that `releaseAvailable` is working

### Check Frontend Release Status

![image](../../assets/images/2022-12-20-11-46-51.png)

## Revert C3 Environment to Latest State

## Revert current version and stable releaseChannel

here we want to revert the current version to the same values that we have before start tests, in this case we have to change to bellow properties

```shell
$ sudo nano /var/lib/c3/version.json
```

```json
{
  ...
  "majorMinor": "5.0",
  ...
  "releaseChannel": "Stable",
  ...
  "version": "5.0.3"
  ...
}
```

confirm that everthing match

```shell
$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_CONFIG_GET","payload": {"body": {"id": "VERSION"}}}' \
  | jq ".releaseChannel, .version, .majorMinor"

# outcome
"Stable"
"5.0.3"
"5.0"  
```

### Revert Lexactivator-Api Service Environment Variables

> **this step is optional**, we can leave it, will help in next tests and prevent us to change it again back and forword

```shell
$ sudo nano /etc/systemd/system/c3-lexactivator-api.service
```

comment both lines

```config
[Service]
...
# Environment=SHOW_ALL_SERVER_SYNC_EVENTS=1
# Environment=RELEASE_UPDATE_INTERVAL="180000"
```

now reload daemon service and restart service

```shell
$ sudo systemctl daemon-reload
$ sudo service c3-lexactivator-api restart
```

Done we have finished the test