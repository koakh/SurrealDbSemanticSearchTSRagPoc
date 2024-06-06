# Introduction

This is a knowledge base for C3 5.x. The purpose of this knowledge base is to be a repository of notes, tips and tricks, to make development easier and bootstrap C3 5.x umbrella projects in a step by step way. **this will always be a work-in-progress project**.

## TLDR

### Uris

These URIs are only accessible when inside the local area network of a C3 device. The c3edu.online domain is directly managed by the C3 device Bind9 server.

- [FrontEnd](https://c3edu.online)
- [SyncThing UI](https://syncthing.c3edu.online)
- [VsCode Development Environment](https://code.c3edu.online)

### Service Ports

#### Internal Services

- C3 System Core: HTTP: 8010 / HTTPS: 8410
- C3 Backend: HTTP: 8020 / HTTPS: 8420
- C3 LexActivator-Api: HTTP: 8030 / HTTPS: 8430
- C3 Frontend: HTTP: 8040 / HTTPS: 8440
- C3 CloudClient: HTTP: 8050
- C3 Updater: HTTPS: 8460
- C3 System Tailor: HTTPS: 8470
- LDAP (Samba): 389

#### Third Party Services

- Kiwix: HTTP: 9010

### Quick Downloads

### ISO

- [Latest and greatest](https://downloads.critical-links.com/C3-5.x.x-latest.iso)
- [Latest and greatest: file source and md5](https://downloads.critical-links.com/C3-5.x.x-latest.iso.txt)

> Note: `C3-5.x.x-latest.iso.txt` contains release date and md5, useful to check date and md5 file integrity ex `614414f800678210f3cbe5c00d8ce06c build/C3-5.0.0-C3TEST-20210512.iso`

#### Current Debian's

- [c3-system-core](https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-system-core/c3-system-core_1.0.6_amd64.deb)

- [c3-lexactivator-api](https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-lexactivator-api/c3-lexactivator-api_1.0.17_amd64.deb)

- [c3-cloud-client](https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-cloud-client/c3-cloud-client_1.1.0_amd64.deb)

> UPDATE: start moving this to docker image, and use it docker stack

- [c3-dynamic-caching](https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-cloud-client/c3-dynamic-caching_1.0.9_amd64.deb)

> TIP: to update packages use bellow snippet

```shell
# ex with some package version
$ cd /tmp
$ wget https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-system-core/c3-system-core_1.0.11_amd64.deb
# install package
$ sudo dpkg -i c3-system-core_1.0.11_amd64.deb
```
