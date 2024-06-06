# Faq

## How to get current installed/running packages/docker images

### Use c3-updater script

```shell
 /home/c3/c3-updater/getVersions.sh
debian packages
  atheros-clk:5.15.0-56-generic
  softether:4.34.9745-rtm+clk
  squid:5.2-1ubuntu4+clk
  squid-openssl:(none)
  squid-common:5.2-1ubuntu4+clk
  c3-dynamic-caching:1.0.9
  c3-lexactivator-api:1.0.21
  c3-system-core:1.0.12
  c3-system-tailor:1.0.1
  c3-updater:1.0.2
clk images
  c3-microcloud-backend:1.0.36 ==
      LOCAL_UUID: bcb325cc-e080-42f3-8a03-77296a076c1a
    RUNNING_UUID: bcb325cc-e080-42f3-8a03-77296a076c1a
  c3-microcloud-frontend:1.0.19 ==
      LOCAL_UUID: 36e41b14-afb5-4dcf-a611-82b2d0df276b
    RUNNING_UUID: 36e41b14-afb5-4dcf-a611-82b2d0df276b
  c3-microcloud-cloud-client:1.0.7 ==
      LOCAL_UUID: c7a80593-52c3-4a4e-9f2d-3107efdde1f6
    RUNNING_UUID: c7a80593-52c3-4a4e-9f2d-3107efdde1f6
  c3-system-service-syncthing:1.23 ==
      LOCAL_UUID: 96ddbe47-6bac-46b4-a9c7-48966d76874a
    RUNNING_UUID: 96ddbe47-6bac-46b4-a9c7-48966d76874a
  c3-system-service-kiwix:1.0.3 ==
      LOCAL_UUID: 2f4ef6d5-f7af-483e-ad7d-b50b6a317097
    RUNNING_UUID: 2f4ef6d5-f7af-483e-ad7d-b50b6a317097
third party images
  mongo:4.4
```

### Get installed/latest/tested packages Versions

or use manual commands

```shell
$ PACKAGE="atheros-clk" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 5.15.0-27-generic

$ PACKAGE="nodogsplash" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 5.0.0+clk

$ PACKAGE="softether" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 4.34.9745-rtm+clk

$ PACKAGE="squid" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 5.2-1ubuntu4+clk

$ PACKAGE="squid-common" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 5.2-1ubuntu4+clk
NOTE: deb has and extra `_amd64`

$ PACKAGE="c3-dynamic-caching" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 1.0.9

$ PACKAGE="c3-lexactivator-api" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 1.0.21

$ PACKAGE="c3-system-core" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 1.0.12

$ PACKAGE="c3-system-tailor" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 1.0.1

$ PACKAGE="c3-updater" && sudo apt-cache policy "${PACKAGE}" | grep Installed
Installed: 1.0.2
```

## Get installed/latest/tested docker image Versions

```shell
$ IMAGE="c3-microcloud-backend"
$ IN=$(docker ps --filter name="${IMAGE}" --format "{{.Image}}") && arrIN=(${IN//:/ }) && echo "${IMAGE}:${arrIN[1]}"
c3-microcloud-backend:1.0.36

$ IMAGE="c3-microcloud-frontend"
$ IN=$(docker ps --filter name="${IMAGE}" --format "{{.Image}}") && arrIN=(${IN//:/ }) && echo "${IMAGE}:${arrIN[1]}"
c3-microcloud-frontend:1.0.19

$ IMAGE="c3-microcloud-cloud-client"
$ IN=$(docker ps --filter name="${IMAGE}" --format "{{.Image}}") && arrIN=(${IN//:/ }) && echo "${IMAGE}:${arrIN[1]}"
c3-microcloud-cloud-client:1.0.7

$ IMAGE="c3-system-service-syncthing"
$ IN=$(docker ps --filter name="${IMAGE}" --format "{{.Image}}") && arrIN=(${IN//:/ }) && echo "${IMAGE}:${arrIN[1]}"
c3-system-service-syncthing:1.0.4

$ IMAGE="c3-system-service-kiwix"
$ IN=$(docker ps --filter name="${IMAGE}" --format "{{.Image}}") && arrIN=(${IN//:/ }) && echo "${IMAGE}:${arrIN[1]}"
c3-system-service-kiwix:1.0.3

$ IMAGE="mongo"
$ IN=$(docker ps --filter name="${IMAGE}" --format "{{.Image}}") && arrIN=(${IN//:/ }) && echo "${IMAGE}:${arrIN[1]}"
mongo:4.4
```
