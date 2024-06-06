# Change release channel and release version

## Change release channel and forcePreUpdate c3-updater

### change releaseChannel

```shell
# edit version.json file
$ sudo nano /var/lib/c3/version.json
```

and change for ex `"releaseChannel": "»U2FsdGVkX19ddIofs5g/+PeeHhcTMdtcj0JHNXgMegk="` to `"releaseChannel": "Dev"`, turning encryption value into a decrypted value, `c3-system-core` will detect and encrypt it in restart

> valid values `Stable`, `Beta`, `Alpha`, `Dev`

> Please respect case sensitivity here, else it won't work has expected

after this changes we must restart `c3-system-core` to apply changes and encrypt decrypted value

```shell
$ sudo service c3-system-core restart
# check encrypted value
$ cat /var/lib/c3/version.json | grep releaseChannel
  "releaseChannel": "»U2FsdGVkX18OwRKWfpsAhKUXRfkUTUsN5qNRNTFuZZE=",
```

check c3-system-core response with current decrypted `releaseChannel` value

#### Using unprotected route

```shell
$ curl -k -s --request GET \
  --url https://c3edu.online:8410/api/version \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  | jq
# outcome
{
  "installedAt": "2023-03-27 16:50:33",
  "majorMinor": "5.0",
  "releaseChannel": "Dev",
  "seedVersions": {
    "c3Backend": 2,
    "ldapSamba": 2
  },
  "version": "5.0.0"
}

# snippet to get raw version value
$ CURRENT_VERSION=$(curl -k -s https://c3edu.online:8410/api/version --header 'content-type: application/json' --header 'user-agent: vscode-restclient' | jq -r .version)
$ echo $CURRENT_VERSION 
# outcome
5.0.0
```

#### Using protected ACTION

```shell
$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_CONFIG_GET","payload": {"body": {"id": "VERSION"}}}' \
  | jq ".releaseChannel, .version, .majorMinor"
# outcome
"Dev"
"5.0.0"
"5.0"
```

### change forcePreUpdate on c3-updater

change or add `forcePreUpdate` key to `config.json`, by default we ommit `forcePreUpdate` property it in default `config.json` file, to **prevent users to tamper values and violate some sensitive data properties**, when we say ommit we say that property is missing in `config.json`

```shell
# edit config.json file
$ sudo nano /etc/c3-updater/config.json

# add `"forcePreUpdate": true` if property is missing, else change it accourdly
```

change

```json
{"updateTgzMd5":"d393e24634e5b6a87969ca1085f5f9b6"}
```

to

```json
{"updateTgzMd5":"d393e24634e5b6a87969ca1085f5f9b6", "forcePreUpdate": true}
```

> don't change original `updateTgzMd5` value, keep it simple and just add `"forcePreUpdate": true` to `/etc/c3-updater/config.json`

## Change releaseChannel (LEGACY C3 4.x version) and releaseUpdateInterval on c3-lexactivator-api

NOTE: `RELEASE_UPDATE_CHANNEL` only worked in legacy lexactivator-api (C3 4.x), in new `c3-lexactivator-api` uses c3-system-core `releaseChannel` from `c3-system-core` version file, like is explained in above section

to reduce `RELEASE_UPDATE_INTERVAL`, uncomment `Environment=RELEASE_UPDATE_INTERVAL=180000`, this way we receive release updates in 180sec intervals vs 1h intervals, very useful for debug new release events

```conf
# edit service
$ sudo nano /etc/systemd/system/c3-lexactivator-api.service
```

```shell
# don't lower more than 3m to have time to do the preUpdate, else we have an preUpdate infinite loop
Environment=RELEASE_UPDATE_INTERVAL=180000
# Override Default Cryptlex Release Variables. STABLE,BETA,ALPHA,DEV
# this will work only for legacy, 5.x works with c3-system-core version file channel prop
# Environment=RELEASE_UPDATE_CHANNEL=DEV
```

```shell
# apply daemon-reload
$ sudo systemctl daemon-reload
# restart system service
$ sudo service c3-lexactivator-api restart
$ sudo service c3-lexactivator-api status
sudo service c3-lexactivator-api status
● c3-lexactivator-api.service - Critical Links cryptlex lexactivator API
     Loaded: loaded (/etc/systemd/system/c3-lexactivator-api.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2021-12-13 16:52:31 UTC; 7s ago
    Process: 2595325 ExecStartPre=/bin/sleep 15 (code=exited, status=0/SUCCESS)
   Main PID: 2595450 (c3-lexactivator)
      Tasks: 8 (limit: 9442)
     Memory: 40.5M
     CGroup: /system.slice/c3-lexactivator-api.service
             └─2595450 /usr/share/c3-lexactivator-api/c3-lexactivator-api

Dec 13 16:52:31 c3 systemd[1]: Started Critical Links cryptlex lexactivator API.
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]: init lexactivator bridge with metadata product keys: [], and license keys: [customConfig,beginDateId,monthD>
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]: c3-lexactivator-api started:
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]:   HTTP Service running on port [8030]
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]:   HTTPS Service running on port [8430], certificates: ./config/server.crt, ./config/server.key
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]:     Api Key WygP1mAJzj...
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]:   c3-system-core Service running [https://127.0.0.1:8410]
Dec 13 16:52:31 c3 c3-lexactivator-api[2595450]:   cryptlex Release Channel [dev], update interval [180000]
Dec 13 16:52:36 c3 c3-lexactivator-api[2595450]: c3-lexactivator-api connected to c3-system-core. current c3 version [v5.0.1], channel: [dev]
Dec 13 16:52:36 c3 c3-lexactivator-api[2595450]: init cryptlex-lexactivator-bridge v0.1.32

# optionally view logs/journal
$ sudo journalctl -f -u c3-lexactivator-api
```

> Note: we can see `cryptlex Release Channel [dev], update interval [180000]` that show's current channel and release update interval

## More Info on Post

please check full [post here](debug-update-process.md#change-release-channel-on-c3-system-core-and-c3-lexactivator-api) to get more info about debug process and channels

## Change c3-updater opt-in releaseVersion

currently c3-updater **always use the latest and greatest release version deployed on cryptlex**, ex
if we have deployed versions `5.0.0`, `5.0.1`, ..., `5.0.3`, `5.1.0`, the c3-updater uses the `5.1.0` release version as default

to opt-in and use other released version, one must change `c3-updater` config file and implicit opt-in to a desired release version, first add `releaseVersion` property with desired opt-in version ex `"releaseVersion": "5.0.1`

```shell
$ sudo nano /etc/c3-updater/config.json
```

```shell
{
  "releaseVersion": "5.0.1",
  "updateTgzMd5": "060eb4e512de703f14ce4a75bf8b21bf"
}
```

after change opt-in `releaseVersion`, one can use c3-updater to update it's system

> in the end don't forget to remove the `releaseVersion` property to use default behavior

```shell
$ sudo nano /etc/c3-updater/config.json
```

```shell
{
  "updateTgzMd5": "060eb4e512de703f14ce4a75bf8b21bf"
}
```
