# FAQ

## Disable version encription

Note: optinally as a developer we can **disable c3-system-core version encription**. to disable encryption we must add  `Environment=ENCRYPTION_DISABLED_CONFIG=true` to `/etc/systemd/system/c3-system-core.service` and restart service, after this c3-syste-core don't use encryption

```shell
$ sudo nano /etc/systemd/system/c3-system-core.service
```

add bellow line after other Environment variables

```shell
Environment=ENCRYPTION_DISABLED_CONFIG=true
```

```shell
$ sudo systemctl daemon-reload && sudo systemctl restart c3-system-core
```

now sensitive properties are decrypted `releaseChannel`, `majorMinor` and `version`

confirm that everything is workin has expected

```shell
$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_CONFIG_GET","payload": {"body": {"id": "VERSION"}}}' \
  | jq ".releaseChannel, .version, .majorMinor"
# outcome
"Dev"
"5.0.3"
"5.0"
```
