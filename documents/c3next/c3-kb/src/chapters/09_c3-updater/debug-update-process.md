# Debug Update Process

- [Debug Update Process](#debug-update-process)
  - [Paths](#paths)
  - [Usefull commands](#usefull-commands)
  - [C3-Updater Api/Token](#c3-updater-apitoken)
  - [Pre Requisites](#pre-requisites)
    - [Check if local repo is configured](#check-if-local-repo-is-configured)
    - [Set up clock (Usefull with VM and Snapshots)](#set-up-clock-usefull-with-vm-and-snapshots)
  - [Launch Pre-Update Process](#launch-pre-update-process)
    - [Clean Up process](#clean-up-process)
    - [Check if local services and dependency services are running](#check-if-local-services-and-dependency-services-are-running)
    - [Check C3 current Version](#check-c3-current-version)
    - [Change release channel on c3-system-core and c3-lexactivator-api](#change-release-channel-on-c3-system-core-and-c3-lexactivator-api)
      - [Change c3-system-core version](#change-c3-system-core-version)
      - [Change c3-lexactivator-api service](#change-c3-lexactivator-api-service)
    - [Check latest Cryptlex Release File](#check-latest-cryptlex-release-file)
    - [Fine tune c3-lexactivator-api service](#fine-tune-c3-lexactivator-api-service)
  - [Update Process](#update-process)
    - [Log pre update process](#log-pre-update-process)
  - [Check our c3-system-core updated version](#check-our-c3-system-core-updated-version)
  - [Check installed/running versions](#check-installedrunning-versions)
  - [Reboot](#reboot)
  - [Post Reboot](#post-reboot)
    - [Start checking services status](#start-checking-services-status)
    - [Check current updated kernel](#check-current-updated-kernel)

## Paths

- c3-updater - `/usr/share/c3-updater/`

> main c3-updater folder

- c3-updater/release files - `/usr/share/c3-updater/release`

> cryptlex release files, downloaded in pre update process

- c3-updater/archive - `/usr/share/c3-updater/archive`

> arquived release files, logs other files

- c3-updater/log - `/var/log/c3-update.log`

> current running log files

- local repository - `/usr/local/localrepo/`

> local debian repository, work together with online ubuntu repository

## Usefull commands

```shell
# service
$ sudo service c3-updater status | start | stop
# journal service
$ sudo journalctl -f -u c3-updater
```

## C3-Updater Api/Token

- <https://c3edu.online:8510/api>
- api key : `H8Z41EQVuePtZSOMMwfoZu8couRrhaGiDlWnkuucVEpHsPpnGOE3b8GRAjzKM6vF`

## Pre Requisites

### Check if local repo is configured

```shell
# check sources.list
$ sudo nano /etc/apt/sources.list
```

```conf
# local repository
deb [trusted=yes] file:/usr/local/localrepo/ ./
# online repository
# deb [trusted=yes] https://hub.critical-links.com:8443/repo50/ ./
```

> must have above lines, if not add above lines and run `sudo apt update`

### Set up clock (Usefull with VM and Snapshots)

we require the clock setuped, because if not it fails in some points like `apt update` in ubuntu remote repo, local repo etc

```shell
# enable, start ntp
$ sudo systemctl enable ntp
$ sudo systemctl start ntp
$ sudo timedatectl set-ntp on
```

## Launch Pre-Update Process

with curl

```shell
$ curl -k \
  -H "Content-Type: application/json" \
  -H "authorization: Bearer H8Z41EQVuePtZSOMMwfoZu8couRrhaGiDlWnkuucVEpHsPpnGOE3b8GRAjzKM6vF"
  -X POST https://127.0.0.1:8460/api/pre-update | jq
```

in c3-updater frontend

- [c3-updater frontend](https://c3edu.online/update/?showDebug=true)

> Note `showDebug=true` is optional and is used to dee console.log's

### Clean Up process

```shell
# clean up local deb repository
$ sudo rm /usr/local/localrepo/pool/ -R
# clean up docker images
$ docker image prune
# remove release files
$ rm /usr/share/c3-updater/release -r
```

### Check if local services and dependency services are running

```shell
$ sudo service c3-updater status | grep Active
Active: active (running)
$ sudo service c3-system-core status | grep Active
Active: active (running)
$ sudo service c3-lexactivator-api status | grep Active
Active: active (running)
```

### Check C3 current Version

```shell
$ cat /var/lib/c3/version.json | jq -r .version
# outcomme
5.0.0
```

### Change release channel on c3-system-core and c3-lexactivator-api

> Note: we have one places to change release channel, one is used globally that is the c3-system-core, the other is used only by c3-lexactivator-api with cryptlex new release events detection, ex when c3-lexativator-api boots need to be inited and connected to a channel, and after it, c3-lexactivator-api receive event from cryptlex and foword event to c3-system-core, and c3-updater, in the case of c3-updater it will start auto preUpdate in background, and enable release on c3-frontend

> to work constently we must change both properties and environment variables in c3-system-core version file, and c3-lexactivator-api service

> TIP/TLDR main url requires last slash ex <https://c3edu.online/update/>

#### Change c3-system-core version

see notes here [Change release channel on c3-system-core and forcePreUpdate c3-updater](change-release-channel.md#change-release-channel-on-c3-system-core-and-forcepreupdate-c3-updater)

#### Change c3-lexactivator-api service

see notes here [Change releaseChannel (LEGACY C3 4.x version) and releaseUpdateInterval on c3-lexactivator-api](change-release-channel.md#change-releasechannel-legacy-c3-4x-version-and-releaseupdateinterval-on-c3-lexactivator-api)

### Check latest Cryptlex Release File

```shell
# env vars
$ CHANNEL="dev"
$ PLATFORM="linux"
$ PRODUCT_ID="ad41970a-7f15-45d4-a6ff-1e7432ce1d8c"
$ LICENSE_KEY="AA282828282828FF"
# request
$ curl -s "https://api.cryptlex.com/v3/releases/latest?channel=${CHANNEL}&platform=${PLATFORM}&productId=${PRODUCT_ID}&key=${LICENSE_KEY}" | jq -r .version
# outcome
5.0.2
```

### Fine tune c3-lexactivator-api service

edit `c3-lexactivator-api.service` and uncomment bellow environment variables

```shell
# edit service
$ sudo nano /etc/systemd/system/c3-lexactivator-api.service
```

```shell
# optional
Environment=SHOW_ALL_SERVER_SYNC_EVENTS=1
# optional
Environment=SHOW_ACTIVATE_DEACTIVATE_LOGS=1
# recommended
Environment=RELEASE_UPDATE_CHANNEL=DEV
# recommended
Environment=RELEASE_UPDATE_INTERVAL=180000
```

```shell
# reload daemon
$ sudo systemctl daemon-reload
# restart service
$ sudo service c3-lexactivator-api restart
# optional show service journal
$ sudo journalctl -f -u c3-lexactivator-api
```

- `RELEASE_UPDATE_CHANNEL` this will change c3-updater release channel
- `RELEASE_UPDATE_INTERVAL` this will make release update faster, this way we can debug automatically pre-update process launched by `c3-lexactivator` to `c3-updater`

if we watch `c3-lexactivator-api` logs, we will see that `c3-lexactivator-api` detects a new release, log message is  `releaseUpdate status update: a new release update is available for the app`

after this fired event, we can see that `/usr/share/c3-updater/release` is populated with release files and `c3-updater` automatically starts pre-updater process

```shell
$ tree /usr/share/c3-updater/
└── release
    ├── docker-compose.yml
    ├── update.json
    └── update.tgz
```

> `/usr/share/c3-updater/release/update.json` is the main update file, one can inspect it to check update steps, and packages

```shell
# inspect update file
$ cat /usr/share/c3-updater/release/update.json | jq .version,.progress
"5.0.1"
{
  "currentStep": 0,
  "message": "pre-update phase completed without errors",
  "steps": 8
}
```

## Update Process

### Log pre update process

> when new releases are launched, `c3-lexactivator-api` will communicate with `c3-system-core` to announce a new release is released, and `c3-system-core` will fire a request to `c3-updater` to start pre update background process, this will download all required files, debs and docker images

```shell
# # variables common to all terminal windows
$ C3_UPDATER_API_URL="https://c3edu.online:8510"
$ C3_UPDATER_API_KEY="H8Z41EQVuePtZSOMMwfoZu8couRrhaGiDlWnkuucVEpHsPpnGOE3b8GRAjzKM6vF"
$ C3_SYSTEM_CORE_URL="https://c3edu.online:8410"
# # development environment
# # $ C3_SYSTEM_CORE_API_KEY="did2l4BR0AhQNaAe1XJE6XUbTyvkhEM2F7cacBWkG6FdzLvRpDUDqevts0pKevhH"
# # production environment
$ C3_SYSTEM_CORE_API_KEY="UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj"
# # cryptlex release channel: stable,beta,alpha,dev
$ CHANNEL="dev"
```

```shell
# terminal 1: view log
$ sudo tail -f /usr/share/c3-updater/log/update.log

# terminal 2 watch progress with cat file
# note release/update.json only exists when c3-system-core launch pre update progress and pre update starts, in this process we download cryptlex release files for latest version
$ watch "cat /usr/share/c3-updater/release/update.json | jq -r .progress"
# or
# terminal 2 watch progress with curl
$ watch "curl -k -H \"authorization: Bearer ${C3_UPDATER_API_KEY}\" ${C3_UPDATER_API_URL}/api/state | jq -r .progress"

# terminal 3: watch docker stack
$ watch docker ps --format "{{.Image}},{{.Names}},{{.Ports}}"

# terminal 4: launch pre update
$ curl -k -H "Content-Type: application/json" -d "{\"releaseChannel\": \"${CHANNEL}\", \"forcePreUpdate\": true}" -H "authorization: Bearer ${C3_UPDATER_API_KEY}" -X POST ${C3_UPDATER_API_URL}/api/pre-update | jq
```

after pre update one will see bellow response in **terminal 2** related to **watch progress**

```json
{
  "currentStep": 0,
  "message": "pre-update phase completed without errors",
  "steps": 8
}
```

```shell
# terminal 4: launch update
$ curl -k -H "Content-Type: application/json" -d "{\"channel\": \"${CHANNEL}\"}" -H "authorization: Bearer ${C3_UPDATER_API_KEY}" -X POST ${C3_UPDATER_API_URL}/api/update | jq

# or using c3-system-core ACTIONS

# terminal 4: launch pre update
$ curl -k --request POST --url "${C3_SYSTEM_CORE_URL}/api/action" --header "authorization: Bearer ${C3_SYSTEM_CORE_API_KEY}" --header "content-type: application/json" --header "user-agent: curl" --data "{\"action\": \"ACTION_UPDATE_C3UPDATER_START_PRE_UPDATE\",\"payload\": {\"body\": {\"channel\":\"${CHANNEL}\"}}}" | jq

# terminal 4: launch pre update
$ curl -k --request POST --url "${C3_SYSTEM_CORE_URL}/api/action" --header "authorization: Bearer ${C3_SYSTEM_CORE_API_KEY}" --header "content-type: application/json" --header "user-agent: curl"   --data "{\"action\": \"ACTION_UPDATE_C3UPDATER_START_UPDATE\",\"payload\": {\"body\": {\"channel\":\"${CHANNEL}\"}}}" | jq

```

after update one will see bellow response in **terminal 2** related to **watch progress**

```json
{
  "currentStep": 8,
  "message": "update phase completed without errors. reboot required...",
  "steps": 8
}
```

some output from **terminal 1** log

```shell
[2021-05-06 15:41:55] DEBUG - ------------------------------------------------------------------------------------------------------------------------
[2021-05-06 15:41:55] DEBUG - start update phase...
[2021-05-06 15:41:55] DEBUG - ------------------------------------------------------------------------------------------------------------------------
[2021-05-06 15:41:55] DEBUG - progress 1/3 : start installing 'atheros-clk' version '5.4.0-72-generic'
[2021-05-06 15:41:55] DEBUG - run pre-install command: 'sudo apt install linux-image-generic=5.4.0.72.75 -y'
[2021-05-06 15:47:40] DEBUG - run pre-install command: 'sudo apt install linux-headers-generic=5.4.0.72.75 -y'
[2021-05-06 15:47:40] DEBUG - run pre-install command: 'sudo apt install linux-generic=5.4.0.72.75 -y'
[2021-05-06 15:47:41] DEBUG - install package result: '0'
[2021-05-06 15:47:48] DEBUG - progress 2/3 : start installing 'c3-lexactivator-api' version '1.0.19'
[2021-05-06 15:47:48] DEBUG - stopping running service: 'c3-lexactivator-api', result: '0'
[2021-05-06 15:48:21] DEBUG - install package result: '0'
[2021-05-06 15:48:21] DEBUG - service 'c3-lexactivator-api', service status: 'active', service active: 'true'
[2021-05-06 15:48:21] DEBUG - service 'c3-lexactivator-api', service respose: 'pong'
[2021-05-06 15:48:24] DEBUG - progress 3/3 : start installing 'c3-system-core' version '1.0.9'
[2021-05-06 15:48:24] DEBUG - stopping running service: 'c3-system-core', result: '0'
[2021-05-06 15:48:51] DEBUG - install package result: '0'
[2021-05-06 15:48:51] DEBUG - service 'c3-system-core', service status: 'active', service active: 'true'
[2021-05-06 15:48:51] DEBUG - service 'c3-system-core', service respose: 'pong'
```

some output from **terminal 4** watch docker stack

> here we will see the current updated running stack with new update versions

```shell
hub.critical-links.com/c3-microcloud-cloud-client:1.0.2,c3-microcloud-cloud-client,0.0.0.0:8050->80/tcp
hub.critical-links.com/c3-microcloud-frontend:1.0.14,c3-microcloud-frontend,0.0.0.0:8040->80/tcp
hub.critical-links.com/c3-microcloud-backend:1.0.27,c3-microcloud-backend,0.0.0.0:8420->8420/tcp
hub.critical-links.com/c3-system-service-syncthing:1.0.2,c3-system-service-syncthing,0.0.0.0:8384->8384/tcp, 21027/udp, 22000/tcp
hub.critical-links.com/c3-system-service-kiwix:1.0.0,c3-system-service-kiwix,80/tcp, 0.0.0.0:8080->8080/tcp
linuxserver/code-server:version-v3.9.0,c3-system-code-server,0.0.0.0:8090->8443/tcp
mongo:4.0,c3-system-service-mongo,0.0.0.0:27017->27017/tcp
```

well done seems we have updated our system

## Check our c3-system-core updated version

```shell
# show current version
$ cat /var/lib/c3/version.json | jq
```

```json
{
  "version": "5.0.0.1",
  "majorMinor": "5.0",
  "installedAt": "2021-05-06 15:48:56",
  "updateFile": "./archive/5.0.0.1_2021-05-06_15-48-56/update.log",
  "logFile": "./archive/5.0.0.1_2021-05-06_15-48-56/update.log",
  "packages": {
    "atheros-clk": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Clk",
      "systemService": false,
      "version": "5.4.0-72-generic"
    },
    "c3-dynamic-caching": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Clk",
      "systemService": false,
      "version": "1.0.9"
    },
    "c3-lexactivator-api": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Clk",
      "systemService": true,
      "version": "1.0.19"
    },
    "c3-microcloud-backend": {
      "installedAt": "",
      "packageType": "Clk",
      "systemService": false,
      "version": "1.0.25"
    },
    "c3-microcloud-cloud-client": {
      "installedAt": "",
      "packageType": "Clk",
      "systemService": false,
      "version": "1.0.2"
    },
    "c3-microcloud-frontend": {
      "installedAt": "",
      "packageType": "Clk",
      "systemService": false,
      "version": "1.0.13"
    },
    "c3-system-code-server": {
      "installedAt": "",
      "packageType": "ThirdParty",
      "systemService": false,
      "version": "version-v3.9.0"
    },
    "c3-system-core": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Clk",
      "systemService": true,
      "version": "1.0.9"
    },
    "c3-system-service-kiwix": {
      "installedAt": "",
      "packageType": "ThirdParty",
      "systemService": false,
      "version": "1.0.0"
    },
    "c3-system-service-mongo": {
      "installedAt": "",
      "packageType": "ThirdParty",
      "systemService": false,
      "version": "4.0"
    },
    "c3-system-service-syncthing": {
      "installedAt": "",
      "packageType": "ThirdParty",
      "systemService": false,
      "version": "1.0.2"
    },
    "c3-updater": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Clk",
      "systemService": true,
      "version": "1.0.0"
    },
    "ct-firmware": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Clk",
      "systemService": false,
      "version": "10.1.467-ct-21"
    },
    "nodogsplash": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Multiverse",
      "systemService": true,
      "version": "5.0.0+clk"
    },
    "squid": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Main",
      "systemService": true,
      "version": "4.10-1ubuntu1.1+clk"
    },
    "squid-common": {
      "installedAt": "2021-05-06 15:48:56",
      "packageType": "Main",
      "systemService": false,
      "version": "4.10-1ubuntu1.1+clk"
    }
  }
}
```

## Check installed/running versions

```shell
# show running docker images
$ docker ps --format "{{.Image}}"
hub.critical-links.com/c3-microcloud-cloud-client:1.0.2
hub.critical-links.com/c3-microcloud-frontend:1.0.14
hub.critical-links.com/c3-microcloud-backend:1.0.27
hub.critical-links.com/c3-system-service-syncthing:1.0.2
hub.critical-links.com/c3-system-service-kiwix:1.0.0
linuxserver/code-server:version-v3.9.0
mongo:4.0
```

```shell
# show installed/updated outside world services/packages
$ sudo apt-cache policy \
  c3-updater \
  c3-system-core \
  c3-lexactivator-api \
  c3-dynamic-caching \
  ct-firmware \
  atheros-clk \
  nodogsplash \
  squid \
  squid-common

atheros-clk:
  Installed: 5.4.0-72-generic
  Candidate: 5.4.0-72-generic
c3-dynamic-caching:
  Installed: 1.0.9
  Candidate: 1.0.9
c3-dynamic-caching:
  Installed: 1.0.9
  Candidate: 1.0.9
c3-lexactivator-api:
  Installed: 1.0.19
  Candidate: 1.0.19
c3-system-core:
  Installed: 1.0.9
  Candidate: 1.0.9
c3-updater:
  Installed: 1.0.0
  Candidate: 1.0.0
ct-firmware:
  Installed: 10.1.467-ct-21
  Candidate: 10.1.467-ct-21
nodogsplash:
  Installed: 5.0.0+clk
  Candidate: 5.0.0+clk
squid:
  Installed: 4.10-1ubuntu1.1+clk
  Candidate: 4.10-1ubuntu1.3
squid-common:
  Installed: 4.10-1ubuntu1.1+clk
  Candidate: 4.10-1ubuntu1.3
```

## Reboot

in this update we see **reboot required**, this will happen sometimes, in this case is related to kernel update, it's optionally, we can work without problems, but let reboot it, to double check that everything will work as expected

```json
{
  "currentStep": 3,
  "message": "update phase completed without errors. reboot required...",
  "steps": 3
}
```

```shell
# reboot c3 system
$ sudo reboot
```

## Post Reboot

after reboot we can test drive our system, to assure that everthing is rock solid as expected

### Start checking services status

```shell
# c3-updater
$ sudo service c3-updater status
● c3-updater.service - Critical Links c3-updater
  Loaded: loaded (/lib/systemd/system/c3-updater.service; enabled; vendor preset: enabled)
  Active: active (running) since Thu 2021-05-06 16:17:14 UTC; 1min 54s ago
# c3-system-core
$ sudo service c3-system-core status
● c3-system-core.service - Critical Links C3 System Core
  Loaded: loaded (/etc/systemd/system/c3-system-core.service; enabled; vendor preset: enabled)
  Active: active (running) since Thu 2021-05-06 16:17:19 UTC; 2min 7s ago
# c3-lexactivator-api
$ sudo service c3-lexactivator-api status
● c3-lexactivator-api.service - Critical Links cryptlex lexactivator API
  Loaded: loaded (/etc/systemd/system/c3-lexactivator-api.service; enabled; vendor preset: enabled)
  Active: active (running) since Thu 2021-05-06 16:17:24 UTC; 2min 16s ago
# nodogsplash
$ sudo service nodogsplash status
  ● nodogsplash.service - NoDogSplash Captive Portal
  Loaded: loaded (/lib/systemd/system/nodogsplash.service; disabled; vendor preset: enabled)
  Active: inactive (dead)
# squid
$ sudo service squid status
● squid.service - Squid HTTP Proxy version 4.x with CLK Youtube Videos Caching
  Loaded: loaded (/lib/systemd/system/squid.service; enabled; vendor preset: enabled)
  Active: active (running) since Thu 2021-0May 10 11:27:57 c3 c3-system-core[886]:  [INFO] 10:27:57 c3Updater pre-update response, version: 5.0.0.2, preUpdateCompleted: true, installedCompleted: false, requireReboot: fa>
May 10 11:28:27 
### Start checking docker stack

```shell
# show running docker images
$ docker ps --format "{{.Image}}"
hub.critical-links.com/c3-microcloud-cloud-client:1.0.2
hub.critical-links.com/c3-microcloud-frontend:1.0.14
hub.critical-links.com/c3-microcloud-backend:1.0.27
hub.critical-links.com/c3-system-service-syncthing:1.0.2
hub.critical-links.com/c3-system-service-kiwix:1.0.0
linuxserver/code-server:version-v3.9.0
mongo:4.0
```

### Check current updated kernel

```shell
# we note that we upgrade kernel
$ uname -a
Linux c3 5.4.0-72-generic #80-Ubuntu SMP Mon Apr 12 17:35:00 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```
