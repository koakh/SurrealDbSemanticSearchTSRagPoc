# How to test activate license on non Supported devices

to test license activate protection, we must have a published release with same majorMinor in cryptlex

for ex if we are in a c3 5.1 or are trying to activate the license on a c3 iso 5.1, first we must have some published 5.1 releases on cryptlex, else it will not find any, and what occur is it use the latest found for ex 5.0.3, and this will prevent us to activate an non published (not released version), and will fail even if we have support enabled and not expired, the reason is one, we are try to activate a non published release

currently we are in 5.0.3 and don't have any 5.1.x releases published, to test the protection first we need to create create and publish some higher majorMinor (5.1) releases for ex 5.1.0, 5.1.1 etc, in this case the `latestSupportedVersion` will be `5.1.1` in cases of a supported license

in case of non supported or expired support will be `5.0.3`, and this will prevent us to install the higher majorMinor `5.1` and above when we only have access to `5.0` patch versions

## Warning

one expired or unsupported license can only be activated with a release **lower or equal to the license created data**

## Change current version and check if changes are applied

change current version to `5.1.1`

```shell
$ sudo nano /var/lib/c3/version.json
```

```json
{
  ...
  "majorMinor": "5.1",
  ...
  "version": "5.1.1"
  ...
}
```

```shell
$ sudo service c3-system-core restart

$ curl -k -s --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_CONFIG_GET","payload": {"body": {"id": "VERSION"}}}' \
  | jq ".releaseChannel, .version, .majorMinor"

# outcome
"Dev"
"5.1.1"
"5.1"
```

## Create some release versions to test

go to cryptlex and create two releases `5.1.0` and `5.1.1`

![image](../../assets/images/2022-12-22-11-20-48.png)

don't forget to change version on moked update.json that you upload ex

```shell
$ nano /tmp/update.json

$ cat  /tmp/update.json | jq .version
"5.1.0"

$ cat  /tmp/update.json | jq .version
"5.1.1"
```

## Deactivate license

if device is already activated please deactivate it first (remove current license)

```shell
$ curl -k --request POST \
  --url https://c3edu.online:8430/license/deactivate \
  --header 'authorization: Bearer WygP1mAJzjYSTBJMy5GXhugeQHEyoj4Tz4vNAJDxn9K1AQpPoe1DtnvELIRIIt5H' \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"skipFullActivation": true}'
```

## Test Activate License on a 5.1.1 version

### Test 1

with a non licensed device, try to activate a **supported license** (support is active and non expired)

```shell
# use your own key here
$ KEY="FF828282828282AA"
$ curl -k -s --request POST \
  --url https://c3edu.online:8430/license/activate \
  --header 'authorization: Bearer WygP1mAJzjYSTBJMy5GXhugeQHEyoj4Tz4vNAJDxn9K1AQpPoe1DtnvELIRIIt5H' \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"licenseKey": "'${KEY}'"}' \
  | jq
```

it should work and device will be activated

now use above request at **Deactivate license** to deactivate it again

### Test 2

with a non licensed device, try to activate a **non supported or expired support license** (support is active and expired, or not enabled)

it should work and device will be activated, because when we are with support active and non expired **we don't have any restriction**

now use above request at **Deactivate license** sectin to deactivate it again

```shell
# use your own key here
$ KEY="FF828282828282AA"
$ curl -k -s --request POST \
  --url https://c3edu.online:8430/license/activate \
  --header 'authorization: Bearer WygP1mAJzjYSTBJMy5GXhugeQHEyoj4Tz4vNAJDxn9K1AQpPoe1DtnvELIRIIt5H' \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"licenseKey": "'${KEY}'"}' \
  | jq
# outcome
{
  "error": "You are not eligible for version 5.1 without a valid support contract. The latest version that you can install is 5.0"
}
```

test done, we can't activate a unsupported release like 5.1.x in a unsupported license.
