# LockDown Release Versions

## c3 microcloud version: 5.0.0

  packages:
    atheros-clk:5.15.0-56-generic
      downloadFiles:
        https://debrepo.critical-links.com/pool/clk/a/atheros-clk/atheros-clk_5.15.0-56-generic_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-generic_5.15.0.56.54_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56_5.15.0-56.62_all.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56-generic_5.15.0-56.62_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-generic_5.15.0.56.54_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-5.15.0-56-generic_5.15.0-56.62_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-generic_5.15.0.56.54_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-5.15.0-56-generic_5.15.0-56.62_amd64.deb
        https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-extra-5.15.0-56-generic_5.15.0-56.62_amd64.deb
    nodogsplash:5.0.0+clk
      downloadFiles:
        https://debrepo.critical-links.com/pool/multiverse/n/nodogsplash/nodogsplash_5.0.0+clk_amd64.deb
    softether:4.34.9745-rtm+clk
      downloadFiles:
        https://debrepo.critical-links.com/pool/multiverse/s/softether/softether_4.34.9745-rtm+clk_amd64.deb
    squid:5.2-1ubuntu4+clk
      downloadFiles:
        https://debrepo.critical-links.com/pool/main/s/squid/squid_5.2-1ubuntu4+clk_amd64.deb
    squid-common:5.2-1ubuntu4+clk
      downloadFiles:
        https://debrepo.critical-links.com/pool/main/s/squid-common/squid-common_5.2-1ubuntu4+clk_amd64.deb
    hostapd:2.10+clk
      downloadFiles:
        https://debrepo.critical-links.com/pool/main/h/hostapd/hostapd_2.10+clk_amd64.deb
    c3-dynamic-caching:1.0.9
- https://debrepo.critical-links.com/pool/clk/c3/c3-dynamic-caching/c3-dynamic-caching_1.0.9_amd64.deb
    c3-lexactivator-api:1.0.21
- https://debrepo.critical-links.com/pool/clk/c3/c3-lexactivator-api/c3-lexactivator-api_1.0.21_amd64.deb
    c3-system-core:1.0.12
- https://debrepo.critical-links.com/pool/clk/c3/c3-system-core/c3-system-core_1.0.12_amd64.deb
    c3-system-tailor:1.0.1
- https://debrepo.critical-links.com/pool/clk/c3/c3-system-tailor/c3-system-tailor_1.0.1_amd64.deb
    c3-updater:1.0.2
      downloadFiles:
        https://debrepo.critical-links.com/pool/clk/c3/c3-updater/c3-updater_1.0.2_amd64.deb
  dockerStack:
    c3-microcloud-backend:1.0.36
      image:
        hub.critical-links.com/c3-microcloud-backend:1.0.36    c3-microcloud-frontend:1.0.19
      image:
        hub.critical-links.com/c3-microcloud-frontend:1.0.19    c3-microcloud-cloud-client:1.0.7
      image:
        hub.critical-links.com/c3-microcloud-cloud-client:1.0.7    c3-system-service-syncthing:1.23
      image:
        hub.critical-links.com/c3-system-service-syncthing:1.23    c3-system-service-kiwix:1.0.3
      image:
        hub.critical-links.com/c3-system-service-kiwix:1.0.3    c3-system-service-mongo:4.4
      image:


## c3 microcloud version: 5.0.1

### packages

#### atheros-clk:5.15.0-56-generic

- https://debrepo.critical-links.com/pool/clk/a/atheros-clk/atheros-clk_5.15.0-56-generic_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56_5.15.0-56.62_all.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-extra-5.15.0-56-generic_5.15.0-56.62_amd64.deb

#### nodogsplash:5.0.0+clk

- https://debrepo.critical-links.com/pool/multiverse/n/nodogsplash/nodogsplash_5.0.0+clk_amd64.deb

#### softether:4.34.9745-rtm+clk

- https://debrepo.critical-links.com/pool/multiverse/s/softether/softether_4.34.9745-rtm+clk_amd64.deb

#### squid:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid/squid_5.2-1ubuntu4+clk_amd64.deb

#### squid-common:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid-common/squid-common_5.2-1ubuntu4+clk_amd64.deb

#### hostapd:2.10+clk

- https://debrepo.critical-links.com/pool/main/h/hostapd/hostapd_2.10+clk_amd64.deb

#### c3-dynamic-caching:1.0.9

- https://debrepo.critical-links.com/pool/clk/c3/c3-dynamic-caching/c3-dynamic-caching_1.0.9_amd64.deb

#### c3-lexactivator-api:1.0.22

- https://debrepo.critical-links.com/pool/clk/c3/c3-lexactivator-api/c3-lexactivator-api_1.0.22_amd64.deb

#### c3-system-core:1.0.13

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-core/c3-system-core_1.0.13_amd64.deb

#### c3-system-tailor:1.0.1

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-tailor/c3-system-tailor_1.0.1_amd64.deb

#### c3-updater:1.0.2

- https://debrepo.critical-links.com/pool/clk/c3/c3-updater/c3-updater_1.0.2_amd64.deb

### dockerStack

- hub.critical-links.com/c3-microcloud-backend:1.0.37
- hub.critical-links.com/c3-microcloud-frontend:1.0.20
- hub.critical-links.com/c3-microcloud-cloud-client:1.0.8
- hub.critical-links.com/c3-system-service-syncthing:1.23
- hub.critical-links.com/c3-system-service-kiwix:1.0.3
- mongo:4.4

## c3 microcloud version: 5.0.2

### packages

#### atheros-clk:5.15.0-56-generic

- https://debrepo.critical-links.com/pool/clk/a/atheros-clk/atheros-clk_5.15.0-56-generic_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56_5.15.0-56.62_all.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-extra-5.15.0-56-generic_5.15.0-56.62_amd64.deb

#### nodogsplash:5.0.0+clk

- https://debrepo.critical-links.com/pool/multiverse/n/nodogsplash/nodogsplash_5.0.0+clk_amd64.deb

#### softether:4.34.9745-rtm+clk

- https://debrepo.critical-links.com/pool/multiverse/s/softether/softether_4.34.9745-rtm+clk_amd64.deb

#### squid:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid/squid_5.2-1ubuntu4+clk_amd64.deb

#### squid-common:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid-common/squid-common_5.2-1ubuntu4+clk_amd64.deb

#### hostapd:2.10+clk

- https://debrepo.critical-links.com/pool/main/h/hostapd/hostapd_2.10+clk_amd64.deb

#### 3-dynamic-caching:1.0.9

- https://debrepo.critical-links.com/pool/clk/c3/c3-dynamic-caching/c3-dynamic-caching_1.0.9_amd64.deb

#### c3-lexactivator-api:1.0.22

- https://debrepo.critical-links.com/pool/clk/c3/c3-lexactivator-api/c3-lexactivator-api_1.0.22_amd64.deb

#### c3-system-core:1.0.13

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-core/c3-system-core_1.0.13_amd64.deb

#### c3-system-tailor:1.0.1

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-tailor/c3-system-tailor_1.0.1_amd64.deb

#### c3-updater:1.0.3

- https://debrepo.critical-links.com/pool/clk/c3/c3-updater/c3-updater_1.0.3_amd64.deb

### dockerStack

- hub.critical-links.com/c3-microcloud-backend:1.0.38
- hub.critical-links.com/c3-microcloud-frontend:1.0.22
- hub.critical-links.com/c3-microcloud-cloud-client:1.0.8
- hub.critical-links.com/c3-system-service-syncthing:1.23
- hub.critical-links.com/c3-system-service-kiwix:1.0.3
- mongo:4.4

## c3 microcloud version: 5.0.3

### packages

#### atheros-clk:5.15.0-56-generic

- https://debrepo.critical-links.com/pool/clk/a/atheros-clk/atheros-clk_5.15.0-56-generic_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56_5.15.0-56.62_all.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-extra-5.15.0-56-generic_5.15.0-56.62_amd64.deb

#### nodogsplash:5.0.0+clk

- https://debrepo.critical-links.com/pool/multiverse/n/nodogsplash/nodogsplash_5.0.0+clk_amd64.deb

#### softether:4.34.9745-rtm+clk

- https://debrepo.critical-links.com/pool/multiverse/s/softether/softether_4.34.9745-rtm+clk_amd64.deb

#### squid:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid/squid_5.2-1ubuntu4+clk_amd64.deb

#### squid-common:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid-common/squid-common_5.2-1ubuntu4+clk_amd64.deb

#### hostapd:2.10+clk

- https://debrepo.critical-links.com/pool/main/h/hostapd/hostapd_2.10+clk_amd64.deb

#### c3-dynamic-caching:1.0.9

- https://debrepo.critical-links.com/pool/clk/c3/c3-dynamic-caching/c3-dynamic-caching_1.0.9_amd64.deb

#### c3-lexactivator-api:1.0.23

- https://debrepo.critical-links.com/pool/clk/c3/c3-lexactivator-api/c3-lexactivator-api_1.0.23_amd64.deb

#### c3-system-core:1.0.14

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-core/c3-system-core_1.0.14_amd64.deb

#### c3-system-tailor:1.0.1

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-tailor/c3-system-tailor_1.0.1_amd64.deb

#### c3-manual:1.0.3

- https://debrepo.critical-links.com/pool/clk/c3/c3-manual/c3-manual_1.0.3_amd64.deb

#### c3-updater:1.0.3

- https://debrepo.critical-links.com/pool/clk/c3/c3-updater/c3-updater_1.0.3_amd64.deb

### dockerStack

- hub.critical-links.com/c3-microcloud-backend:1.0.39
- hub.critical-links.com/c3-microcloud-frontend:1.0.23
- hub.critical-links.com/c3-microcloud-cloud-client:1.0.10
- hub.critical-links.com/c3-system-service-syncthing:1.23
- hub.critical-links.com/c3-system-service-kiwix:1.0.3
- mongo:4.4

## c3 microcloud version: 5.0.4

### packages

#### atheros-clk:5.15.0-56-generic

- https://debrepo.critical-links.com/pool/clk/a/atheros-clk/atheros-clk_5.15.0-56-generic_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56_5.15.0-56.62_all.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-headers-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-image-generic_5.15.0.56.54_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-5.15.0-56-generic_5.15.0-56.62_amd64.deb
- https://debrepo.critical-links.com/pool/main/l/linux-generic/linux-modules-extra-5.15.0-56-generic_5.15.0-56.62_amd64.deb

#### nodogsplash:5.0.0+clk

- https://debrepo.critical-links.com/pool/multiverse/n/nodogsplash/nodogsplash_5.0.0+clk_amd64.deb

#### softether:4.34.9745-rtm+clk

- https://debrepo.critical-links.com/pool/multiverse/s/softether/softether_4.34.9745-rtm+clk_amd64.deb

#### squid:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid/squid_5.2-1ubuntu4+clk_amd64.deb

#### squid-common:5.2-1ubuntu4+clk

- https://debrepo.critical-links.com/pool/main/s/squid-common/squid-common_5.2-1ubuntu4+clk_amd64.deb

#### hostapd:2.10+clk

- https://debrepo.critical-links.com/pool/main/h/hostapd/hostapd_2.10+clk_amd64.deb

#### c3-dynamic-caching:1.0.9

- https://debrepo.critical-links.com/pool/clk/c3/c3-dynamic-caching/c3-dynamic-caching_1.0.9_amd64.deb

#### c3-lexactivator-api:1.0.24

- https://debrepo.critical-links.com/pool/clk/c3/c3-lexactivator-api/c3-lexactivator-api_1.0.24_amd64.deb

#### c3-system-core:1.0.15

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-core/c3-system-core_1.0.15_amd64.deb

#### c3-system-tailor:1.0.1

- https://debrepo.critical-links.com/pool/clk/c3/c3-system-tailor/c3-system-tailor_1.0.1_amd64.deb

#### c3-manual:1.0.3

- https://debrepo.critical-links.com/pool/clk/c3/c3-manual/c3-manual_1.0.3_amd64.deb

#### c3-updater:1.0.3

- https://debrepo.critical-links.com/pool/clk/c3/c3-updater/c3-updater_1.0.3_amd64.deb

### dockerStack

- hub.critical-links.com/c3-microcloud-backend:1.0.40    c3-microcloud-frontend:1.0.23
- hub.critical-links.com/c3-microcloud-frontend:1.0.23    c3-microcloud-cloud-client:1.0.11
- hub.critical-links.com/c3-microcloud-cloud-client:1.0.11    c3-system-service-syncthing:1.23
- hub.critical-links.com/c3-system-service-syncthing:1.23    c3-system-service-kiwix:1.0.3
- hub.critical-links.com/c3-system-service-kiwix:1.0.3    c3-system-service-mongo:4.4
- mongo:4.4
