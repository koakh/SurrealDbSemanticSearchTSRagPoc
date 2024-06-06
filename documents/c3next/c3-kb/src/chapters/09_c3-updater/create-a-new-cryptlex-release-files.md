# Create a New Cryptlex Release File

- [Create a New Cryptlex Release File](#create-a-new-cryptlex-release-file)
  - [Assumptions](#assumptions)
  - [Test Latest and Greatest Debian Packages and Docker Images](#test-latest-and-greatest-debian-packages-and-docker-images)
    - [Check if docker stack is running and stable](#check-if-docker-stack-is-running-and-stable)
      - [Check Running Stack](#check-running-stack)
    - [Update C3 System to Latest and Greatest Debian Packages and Docker Images](#update-c3-system-to-latest-and-greatest-debian-packages-and-docker-images)
  - [Pre-Requisites](#pre-requisites)
    - [Checkout related projects](#checkout-related-projects)
  - [Release files](#release-files)
    - [Create/Bring update.json release file](#createbring-updatejson-release-file)
    - [Create/Bring docker-compose.ymp release file](#createbring-docker-composeymp-release-file)
    - [Create update.tgz release file](#create-updatetgz-release-file)
  - [Publish Release 5.0.3 on Stable Channel](#publish-release-503-on-stable-channel)
    - [Create Stable Release Version 5.0.3 on Cryptlex](#create-stable-release-version-503-on-cryptlex)
    - [Bring release files from C3 to development machine](#bring-release-files-from-c3-to-development-machine)
    - [Upload release files to Stable Release Version 5.0.3 on Cryptlex](#upload-release-files-to-stable-release-version-503-on-cryptlex)
  - [Test Release](#test-release)
    - [1. delete old release path](#1-delete-old-release-path)
    - [2. confirm that we are in `stable` `releaseChannel`, and are in a lower version ex `5.0.3` (lower than `5.0.4`)](#2-confirm-that-we-are-in-stable-releasechannel-and-are-in-a-lower-version-ex-503-lower-than-504)
    - [3. disable forcePreUpdate](#3-disable-forcepreupdate)
    - [4. force a c3-updater preUpdate to check that we don't have errors](#4-force-a-c3-updater-preupdate-to-check-that-we-dont-have-errors)
    - [5. confirm currentVersion and future version](#5-confirm-currentversion-and-future-version)
    - [6. test update process](#6-test-update-process)
    - [7. confirm updated debian packages and docker images](#7-confirm-updated-debian-packages-and-docker-images)

## Assumptions

- we assume we have a c3 5.0 bare metal or virtual machine to follow this tutorial
- currently we have a `dev` `releaseChannel` version `5.0.0`
- we want to create and published a new version `5.0.0` on `releaseChannel` `stable` based on our `dev` `releaseChannel` version `5.0.0`
- we will **update our C3 debian packages and docker images** and do all tests to assure that everything works in tandem and without issues

## Test Latest and Greatest Debian Packages and Docker Images

first things first, before we create a release, we **must test all candidate packages and images in a c3 5.0 test environment**, this is the **only way we can assure that all debian packages and docker images are working in tandom**, after full tests we are ready to create a stable release version that will be public and used by our clients, this step is the **most important step off all**, because it's here, that we test that everything works and are ready for "ship" a new release for production.

there is a lot's of ways we can update our system, but the easier way we can update our system is to use the `c3-updater` and thrust it to update our system to latest `dev` `releaseChannel` packages and images, this is the case that we want, create a `stable` release based on our `dev` `releaseChannel` version `5.0.0`

### Check if docker stack is running and stable

when launch `c3-updater` preUpdate process, **we need docker stack running with all containers running and stable**, the reason is that we need to have **access to running containers** to get some data, like `runningUuid` etc

#### Check Running Stack

we can check if we have a stable running stack with:

```shell
$ docker ps --format 'table {{.Names}}\t{{.Status}}' | grep "c3-microcloud\|c3-system-service\|c3-monitoring"
NAMES                         STATUS
c3-microcloud-cloud-client      Up About an hour
c3-microcloud-frontend          Up 22 hours
c3-microcloud-backend           Up 22 hours
c3-system-service-kiwix         Up 22 hours
c3-system-service-mongo         Up 6 hours
c3-system-service-syncthing     Up 22 hours (healthy)
```

> we can see that we have a stable stack, since containers are not restarting and are stable for 59m

### Update C3 System to Latest and Greatest Debian Packages and Docker Images

to work with `dev` `releaseChannel`, and `forcePreUpdate`, one must opt to `dev` `releaseChannel` and `forcePreUpdate` with [following instructions](change-release-channel.md)

after opt in to `dev` and `forcePreUpdate` we can start `preUpdate`, and `Update` our system.

to start `preUpdate` going to following [https://c3edu.online/update/?showDebug=true](https://c3edu.online/update/?showDebug=true)

> Note: we opted to pass `?showDebug=true` query parameters to url, to se some console logs

![image](../../assets/images/2022-05-31-15-09-33.png)

if we have updates, we need to **click to update**, to update our system,
if we have **update button disable** is a signal that we don't have updates are our system is already updated,
we can **proceed to test our system**, here we must **assume that we have problems**, and not the way arround

after **carefully testing**, and ensuring that the entire system is working flawless we can advance to **create a new releases**,
but one **final warning, stable releases can't be deleted**, and we must be prudent before release a new one

## Pre-Requisites

### Checkout related projects

```shell
$ cd ~
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-updater.git
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-iso.git
# switch branch
$ git switch iso5
```

## Release files

currently cryptlex `c3-updater` releases have tree main files, and this is the files that define what will be updated, and how

- `update.json` - main c3-updater update and state file, this is the file where we define versions
- `docker-compose.yml` - docker-composer stack file, this is the file related
- `update.tgz` - scripts and extra files, like seeds and other stuff that don't fit anywhere

both files will be downloaded into `c3-updater` path `/usr/share/c3-updater/release/`

```shell
/usr/share/c3-updater/release/
├── docker-compose.yml
├── update.json
└── update.tgz
```

### Create/Bring update.json release file

here we have two options, the firts is using the `update.json` file from the root of the `c3-updater` project

1. to have a working `update.json` release file **we can bring one from published cryptlex version** or use `~/c3-updater/update.json` and use it as a base template

2. if we want to start from a **published cryptlex version**, we can download it from cryptlex and replace current `~/c3-updater/update.json` template file

![image](../../../../assets/images/2022-05-31-15-47-46.png)

copy `update.json` download url and paste in bellow variable, like we see in above image

```shell
# enter path
$ cd ~/c3-updater
# define env variables
$ URL="https://releases.cryptlex.com/v3/276050c3-000b-4b74-ae39-14deb456ee8e/425223b8-1201-422d-b6d0-4a8558769794/update.json"
$ LICENSE_KEY="FF828282828282AA"
# optional update release local template file
$ curl ${URL}?key=${LICENSE_KEY} -o ./update.json
# edit file
$ nano `~/c3-updater/update.json`
```

here we opted to download `update.json` from `5.0.3` dev release channel to our `c3-updater` dev path

### Create/Bring docker-compose.ymp release file

1. to have a working `docker-compose.yml` release file **we can bring one from published cryptlex version** or use currently used `/srv/docker/system/docker-compose.yml` and use it as a base template.

2. if we want to start from a **published cryptlex version**, we can download it from cryptlex and replace current `~/docker-compose.yml` template file

![image](../../assets/images/2022-05-31-15-47-46.png)

copy `docker-compose.yml` download url and paste in bellow variable, like we see in above image

```shell
# enter path
$ cd ~/c3-updater
# define env variables
$ URL="https://releases.cryptlex.com/v3/276050c3-000b-4b74-ae39-14deb456ee8e/425223b8-1201-422d-b6d0-4a8558769794/docker-compose.yml"
$ LICENSE_KEY="FF828282828282AA"
# optional update release local template file
$ curl ${URL}?key=${LICENSE_KEY} -o ./docker-compose.yml
```

here we opted to download `docker-compose.yml` from `5.0.3` dev release channel to our `c3-updater` dev path

### Create update.tgz release file

this is a optional step, and is only used if we required, but here is where we have samba and mongo seeds to populate database

in the case we are migrating a `dev` release `5.0.3` to a `stable` release we already `/home/c3/c3-updater/update/5.0.3` in place, and we build the updated.tgz when we push files to our local machine with `./pushToRemoteRepo.sh`

## Publish Release 5.0.3 on Stable Channel

### Create Stable Release Version 5.0.3 on Cryptlex

we can create releases in [cryptlex dashboard](https://criticallinks.cryptlex.app/), but in dashboard we can't define the `createdAt` date

> currently we need to create releases in lower dates to be catched by old licenses

```shell
$ TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJhY2NvdW50OnJlYWQiLCJhY2NvdW50OndyaXRlIiwiYWN0aXZhdGlvbjpyZWFkIiwiYW5hbHl0aWNzOnJlYWQiLCJldmVudExvZzpyZWFkIiwiaW52b2ljZTpyZWFkIiwibGljZW5zZTpyZWFkIiwibGljZW5zZTp3cml0ZSIsImxpY2Vuc2VQb2xpY3k6cmVhZCIsImxpY2Vuc2VQb2xpY3k6d3JpdGUiLCJwYXltZW50TWV0aG9kOnJlYWQiLCJwYXltZW50TWV0aG9kOndyaXRlIiwicGVyc29uYWxBY2Nlc3NUb2tlbjp3cml0ZSIsInByb2R1Y3Q6cmVhZCIsInByb2R1Y3Q6d3JpdGUiLCJyZWZlcnJhbHM6cmVhZCIsInJlZmVycmFsczp3cml0ZSIsInJlbGVhc2U6cmVhZCIsInJlbGVhc2U6d3JpdGUiLCJyb2xlOnJlYWQiLCJyb2xlOndyaXRlIiwidGFnOnJlYWQiLCJ0YWc6d3JpdGUiLCJ0cmlhbEFjdGl2YXRpb246cmVhZCIsInRyaWFsQWN0aXZhdGlvbjp3cml0ZSIsInRyaWFsUG9saWN5OnJlYWQiLCJ0cmlhbFBvbGljeTp3cml0ZSIsInVzZXI6cmVhZCIsInVzZXI6d3JpdGUiLCJ3ZWJob29rOnJlYWQiLCJ3ZWJob29rOndyaXRlIl0sInN1YiI6IjFhMmNjYmVmLTdhZGUtNGYwMC05MWJmLWRhMTI0ZDFlNWI3ZCIsImVtYWlsIjoibWFyaW8ubW9udGVpcm9AY3JpdGljYWwtbGlua3MuY29tIiwianRpIjoiZTljMzFkYTUtMTQwNy00Y2Y5LWFlN2QtOWVkNjExMTAyZmQ2IiwiaWF0IjoxNTY4OTkyNjg1LCJ0b2tlbl91c2FnZSI6InBlcnNvbmFsX2FjY2Vzc190b2tlbiIsInRlbmFudGlkIjoiMjc2MDUwYzMtMDAwYi00Yjc0LWFlMzktMTRkZWI0NTZlZThlIiwiZXhwIjoxODUzMTAzNjAwLCJpc3MiOiJodHRwczovL2FwaS5jcnlwdGxleC5jb20vIiwiYXVkIjoiaHR0cHM6Ly9hcGkuY3J5cHRsZXguY29tIn0.oU2AbFjV448-ijD9HGSUOuISEw_qIMQ6wokrbuCpi0MuU_3Z4nC-zc1D223TM7WcTggg9mPgdCBnY4pgube8fMMBiEgf5UVScO2oV94BrRUZUuwLbnDY-JdvNk2GDPtYjLIUO1MmSrmIQc1PEEeX5bBWEJRXg4JXAXfqgdCReaL0O4nyY6IcytIJvRcxDrTZwJX75oDKuhd7abb6eF5UVWBvWCscM-DbDtkpXNmIFF6SS9Za39g4WOk5fq23fAto-ItHk-OmeZSZPJd3Sm-nQYeeIde4tX5I0dfLoItC9mBgMJwvwibpmWJyg_Ao7hFnDHvEKXRf_zM4hpvjUDzZuw"
$ PRODUCT_ID="ad41970a-7f15-45d4-a6ff-1e7432ce1d8c"
$ CREATED_AT="2019-01-01T00:00:00.00Z"
$ VERSION="5.0.3"
$ CHANNEL="stable"
# fire request
$ curl --request POST \
  --url https://api.cryptlex.com/v3/releases \
  --header "authorization: Bearer ${TOKEN}" \
  --header "content-type: application/json" \
  --data "{\"productId\": \"ad41970a-7f15-45d4-a6ff-1e7432ce1d8c\",\"name\": \"C3 5 - ${VERSION}\",\"version\": \"${VERSION}\",\"createdAt\": \"${CREATED_AT}\",\"channel\": \"${CHANNEL}\",\"platform\": \"linux\",\"notes\": null}" | jq
# outcome
{
  "published": false,
  "private": false,
  "productId": "ad41970a-7f15-45d4-a6ff-1e7432ce1d8c",
  "tenantId": "276050c3-000b-4b74-ae39-14deb456ee8e",
  "name": "C3 5 - 5.0.3",
  "channel": "stable",
  "version": "5.0.3",
  "platform": "linux",
  "notes": "",
  "totalFiles": 0,
  "files": [],
  "id": "426b4677-a6f6-4a6c-a14a-89386d1d60f4",
  "createdAt": "2019-01-01T00:00:00Z",
  "updatedAt": "2022-05-31T15:39:22.2985922Z"
}
```

Note: we need release `"id": "426b4677-a6f6-4a6c-a14a-89386d1d60f4"`

open created release on [cryptlex dashboard](https://criticallinks.cryptlex.app/products/ad41970a-7f15-45d4-a6ff-1e7432ce1d8c/releases/426b4677-a6f6-4a6c-a14a-89386d1d60f4)

we can se the new release created ready for upload release files

![image](../../assets/images/2022-05-31-16-42-16.png)

### Bring release files from C3 to development machine

```shell
$ cd ~/c3-updater
$ nano pushReleaseToDevMachine.sh
```

change host ip to your local development machine ip ex `HOST="192.168.1.100"`

now push files to development machine `/tmp` path

```shell
$ ./pushReleaseToDevMachine.sh
```

### Upload release files to Stable Release Version 5.0.3 on Cryptlex

go to [cryptlex dashboard release file](https://criticallinks.cryptlex.app/products/ad41970a-7f15-45d4-a6ff-1e7432ce1d8c/releases/426b4677-a6f6-4a6c-a14a-89386d1d60f4)

![image](../..//assets/images/2022-05-31-16-48-22.png)

upload files from development machine `/tmp` path, and publish

done we have a new stable 5.0.3 release published

## Test Release

before assume that everything is ok, is better to re-confirm that release don't have any problems

let assume that we bump a new release version `5.0.4` on `stable` `releaseChannel` like we see in bellow image

![image](../../assets/images/2022-06-01-15-52-20.png)

this current `5.0.4` version just have a `c3-microcloud-backend` `1.0.36` to `1.0.37` and `c3-system-core` update from `1.0.12` to `1.0.13`

before advance we can confirm current **installed debian packages** and **running docker image** versions with:

```shell
$ sudo apt-cache policy c3-system-core
[sudo] password for c3: 
c3-system-core:
  Installed: 1.0.12
  Candidate: 1.0.13

$ docker run -it --rm hub.critical-links.com/c3-microcloud-backend:1.0.36 cat /uuid
e125404f-4644-42a5-bb61-eb4037ec9ef7
```

now we can start test phase, for this we must do some steps:

### 1. delete old release path

```shell
$ sudo rm /usr/share/c3-updater/release -r
```

### 2. confirm that we are in `stable` `releaseChannel`, and are in a lower version ex `5.0.3` (lower than `5.0.4`)

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

or in frontend

![image](../../assets/images/2022-06-01-16-24-40.png)

### 3. disable forcePreUpdate

remove `"forcePreUpdate": true` or change to false ex `"forcePreUpdate": false`

### 4. force a c3-updater preUpdate to check that we don't have errors

in one window launch tail

```shell
# window #1
$ tail -f /var/log/c3-updater.log
```

in other window launch c3-updater preUpdate

```shell
$ curl -k --request POST \
  --url https://c3edu.online:8460/api/pre-update \
  --header 'authorization: Bearer H8Z41EQVuePtZSOMMwfoZu8couRrhaGiDlWnkuucVEpHsPpnGOE3b8GRAjzKM6vF' \
  --header 'content-type: application/json' \
  --data '{}' | jq
# outcome
....c3-updater state object
```

```shell
# window #1 outcome
[2022-06-01 16:29:11] DEBUG - pre-update phase done
[2022-06-01 16:29:11] INFO - "POST /api/pre-update HTTP/2.0" 200 11030 "curl/7.81.0" 36312.506678
[2022-06-01 16:29:11] DEBUG - send frame=Headers { stream_id: StreamId(1), flags: (0x4: END_HEADERS) }
[2022-06-01 16:29:11] DEBUG - send frame=Data { stream_id: StreamId(1) }
[2022-06-01 16:29:11] DEBUG - send frame=Data { stream_id: StreamId(1), flags: (0x1: END_STREAM) }
```

we can see `pre-update phase done`, this means that preUpdate was done without errors, we are good

### 5. confirm currentVersion and future version

```shell
$ sudo cat /usr/share/c3-updater/release/update.json | jq ".currentVersion, .version"
"5.0.3"
"5.0.4"
```

we can re-confirm that we are in `5.0.3` and ready to update to `5.0.4`

### 6. test update process

now that we are good to go, we can test a real update process in frontend

first check that we have a new release and have **GO TO C3-UPDATER** button enabled

click **GO TO C3-UPDATER** to jump into c3-updater standalone frontend

![image](../../assets/images/2022-06-01-16-35-44.png)

in c3-updater standalone frontend click update ro proceed with update process

![image](../../assets/images/2022-06-01-16-37-07.png)

if everything works has expected we can see **GO TO C3** button enabled and a success message

![image](../../assets/images/2022-06-01-16-38-33.png)

click **GO TO C3** to return to c3, and go to update page and check that we are in version `5.0.4`

### 7. confirm updated debian packages and docker images

```shell
# check local image
$ docker run -it --rm hub.critical-links.com/c3-microcloud-backend:1.0.37 cat /uuid
9cbd932d-749e-441f-9f2a-ae20a8df51b9
# check running image
$ docker exec -it c3-microcloud-backend cat /uuid
9cbd932d-749e-441f-9f2a-ae20a8df51b9

# check installed version
$ sudo apt-cache policy c3-system-core
c3-system-core:
  Installed: 1.0.13
  Candidate: 1.0.13
```
