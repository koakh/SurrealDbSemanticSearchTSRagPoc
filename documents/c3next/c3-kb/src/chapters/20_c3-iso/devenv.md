# Development Environment

- [Development Environment](#development-environment)
  - [Clone project](#clone-project)
  - [Prerequisistes](#prerequisistes)
    - [Generate and Export critical-links.gpg](#generate-and-export-critical-linksgpg)
  - [Build C3-Iso](#build-c3-iso)
    - [Det Deployed/Published versions](#det-deployedpublished-versions)
    - [Update docker-compose and bringImages.sh image version's](#update-docker-compose-and-bringimagessh-image-versions)
  - [Push ISO to Public Http Server](#push-iso-to-public-http-server)
  - [Problems](#problems)
    - [Kernel has been updated to version 5.4.0.... Package atheros-clk](#kernel-has-been-updated-to-version-540-package-atheros-clk)
  - [Test Docker Stack with saved Images](#test-docker-stack-with-saved-images)

## Clone project

```shell
# enter c3 shell
$ ssh c3@c3edu.online
# clone project
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-iso.git
# fill username and password request, and enter project path
$ cd c3-iso
# switch branch
$ git switch iso5
```

## Prerequisistes

### Generate and Export critical-links.gpg

> this step is only required in a fresh c3 setup, we can skip it if we already generate and export key previously

```shell
# install required packages
$ sudo apt install syslinux-utils dpkg-dev genisoimage gnupg rng-tools build-essential gnupg -y

# check version
$ gpg --version
gpg (GnuPG) 2.2.19
libgcrypt 1.8.5
Copyright (C) 2019 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: /home/c3/.gnupg
Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2

# first get the gpgpass used in iso, we use that pass bellow to generate key with `gpg --gen-key`
$ cat build.conf | grep gpgpass
gpgpass='clkisokey'

# make folder to prevent problems
$ sudo mkdir /root/.gnupg

$ sudo gpg --gen-key
Real name: Critical-Links
Email address: support@critical-links.com
pass: clkisokey
```

Note: when appears `Warning: You have entered an insecure passphrase. A passphrase should contain at least 1 digit or special character`. select `<Take this one anyway>` and proceed

```shell
# change ownership
$ sudo chmod 700 /root/.gnupg

$ sudo gpg --list-keys
gpg: /root/.gnupg/trustdb.gpg: trustdb created
gpg: key EC614FDA93F8859F marked as ultimately trusted
gpg: directory '/root/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/root/.gnupg/openpgp-revocs.d/60B645DA3D46D7A7A119B6A5EC614FDA93F8859F.rev'
public and secret key created and signed.

pub   rsa3072 2021-02-15 [SC] [expires: 2023-02-15]
60B645DA3D46D7A7A119B6A5EC614FDA93F8859F
uid                      Critical-Links <support@critical-linkx.com>
sub   rsa3072 2021-02-15 [E] [expires: 2023-02-15]

# export key (ket id from above lines)
$ sudo sh -c "gpg --export 60B645DA3D46D7A7A119B6A5EC614FDA93F8859F > critical-links.gpg"
# check file
$ file critical-links.gpg
critical-links.gpg: PGP/GPG key public ring (v4) created Mon Feb 15 13:37:37 2021 RSA (Encrypt or Sign) 3072 bits MPI=0xc1cb5c74affc7f1f...
$ file critical-links-secret.gpg
critical-links-secret.gpg: PGP Secret Key - 4096b created on Tue Jan 12 18:11:29 2021 - RSA (Encrypt or Sign) e=65537 hashed AES with 128-bit key Salted&Iterated S2K SHA-1```

## Import keys

```shell
# to prevent bellow errors on build we must import gpg keys
# gpg: all values passed to '--default-key' ignored
# gpg: signing failed: Bad passphrase
# gpg: signing failed: Bad passphrase

# IMPORT GPG KEYS
$ sudo gpg --import critical-links.gpg
gpg: key F9AF31576BD5C0DD: "Critical-Links <support@critical-linkx.com>" not changed
gpg: Total number processed: 1
gpg:              unchanged: 1

$ sudo sh -c "gpg --export AEA27BE8760E05156D912E2CBA07C6EE50012978 > critical-links.gpg"
$ sudo gpg --import critical-links.gpg
gpg: key BA07C6EE50012978: "Critical-Links <support@critical-links.com>" not changed
gpg: Total number processed: 1
gpg:              unchanged: 1
# use passwor clkisokey
$ sudo gpg --import critical-links-secret.gpg
gpg: key 1634459A68E6BB7E: public key "Critical Links <support@critical-links.com>" imported
gpg: key 1634459A68E6BB7E: secret key imported
gpg: Total number processed: 1
gpg:               imported: 1
gpg:       secret keys read: 1
gpg:   secret keys imported: 1
```

## Build C3-Iso

```shell
# enter c3 shell
$ ssh c3@c3edu.online
$ cd c3-iso
$ git switch iso5
```

### Det Deployed/Published versions

> UPDATE: use new script to get current private docker registry image versions

before we update `docker-compose.yml` and `bringImages.sh` we must know what are the latest and greates versions of our docker images

```shell
# get current deployed docker imags versions
$ ./getRegistryVersions.sh
{
  "name": "c3-microcloud-backend",
  "tags": [
    "1.0.17",
    ...
  ]
}
```

### Update docker-compose and bringImages.sh image version's

edit `staticfiles/srv/docker/system/docker-compose.yml`
and update image versions to the latest stable ex.:

```shell
# get latest remote hub version (deprecated better used ./getRegistryVersions.sh leave her for reference of how to get local images)
$ cd ~/c3-backend
$ npm run docker:registry:versions
{
  "name": "c3-microcloud-backend",
  "tags": [
    "1.0.17",
    ...
  ]
}
# get latest remote hub version (deprecated better used ./getRegistryVersions.sh leave her for reference of how to get local images)
$ cd ~/c3-frontend
$ npm run docker:registry:versions
{
  "name": "c3-microcloud-frontend",
  "tags": [
    "1.0.3",
    ...
  ]
}
# get latest remote hub version (deprecated better used ./getRegistryVersions.sh leave her for reference of how to get local images)
$ cd ~/c3-cloud-client/
$ npm run docker:registry:versions
{
  "name": "c3-microcloud-cloud-client",
  "tags": [
    "1.0.0",
    ...
  ]
}

$ cd ~/c3-iso/
# edit docker-compose.yml and changes versions to the latest
$ nano staticfiles/srv/docker/system/docker-compose.yml
```

```yaml
version: '3.7'

services:
  c3-microcloud-backend:
    image: hub.critical-links.com/c3-microcloud-backend:1.0.17

  c3-microcloud-frontend:
    image: hub.critical-links.com/c3-microcloud-frontend:1.0.3

  c3-microcloud-cloud-client:
    image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.0    
```

now change `bringImages.sh` versions to match `docker-compose.yml` versions

```shell
# edit docker-compose.yml and changes versions to the latest
$ sudo nano bringImages.sh
```

```conf
BACKEND_VERSION="1.0.18"
FRONTEND_VERSION="1.0.4"
CLOUD_CLIENT="1.0.0"
```

test `bringImages.sh`

```shell
# before bring docker images from our repo, host must be authorized, login, and get password from our vault passbolt
$ docker login hub.critical-links.com -u c3
$ bringImages.sh
# confirm saved images location
$ ls staticfiles/srv/dockerImages/staticfiles/srv/dockerImages
```

now we an build iso with, this will launch ask to `bringImages.sh` before `build.sh`

```shell
# build iso
$ sudo ./build.sh
....
gpg: using "AEA27BE8760E05156D912E2CBA07C6EE50012978" as default secret key for signing
isohybrid: Warning: more than 1024 cylinders: 1970
isohybrid: Not all BIOSes will be able to boot this device

ISO has been created!!!
```

## Push ISO to Public Http Server

```shell
$ ./pushIsoToServer.sh
> upload iso to links-server? (Yes/No) scp to clkuser@192.168.90.10:/usr/share/le-httpserver/public/downloads/
https://downloads.critical-links.com/C3-5.0.0-C3TEST-20210212.iso
https://downloads.critical-links.com/C3-5.x.x-latest.iso
```

> Note for above ISO [link url](https://downloads.critical-links.com/C3-5.0.0-C3TEST-20210212.iso)

## Problems

### Kernel has been updated to version 5.4.0.... Package atheros-clk

```shell
$ sudo ./build.sh
Building dependencies tree...
###################################################################
Kernel has been updated to version 5.4.0.66.69. Package atheros-clk, is currently built for version 5.4.0-65.
```

to build `atheros-clk` we must clone and make debian package

```shell
# enter c3
$ ssh c3@c3edu.online

# prerequirments
$ sudo apt install debhelper dh-systemd  -y

# start install/updating kernel sources
$ sudo apt install linux-generic
The following NEW packages will be installed:
  linux-headers-5.4.0-66 linux-headers-5.4.0-66-generic linux-image-5.4.0-66-generic linux-modules-5.4.0-66-generic

$ sudo apt-cache policy linux-generic
linux-generic:
  Installed: 5.4.0.66.69
  Candidate: 5.4.0.66.69  

# required to reboot
$ sudo reboot

# after reboot confirm we are running in newest kernel
$ uname -r
5.4.0-66-generic

# tip: kernel version comes form Makefile `KVER:=$(shell uname -r)` and in other spot from
$ dpkg -l linux-generic | sed -n 's/^ii  linux-generic  \([^ ]\+\).*/\1/p'
# sometimes it won't match....we have a kernel version in package atheros dependencies and other in ateros package :(, this is a big unsolved problem
# ...
# done, now we can build package

# clone project if not already clones before
$ git clone https://bitbucket.org/criticallinksteam/atheros-clk_5.4
# enter path
$ cd atheros-clk_5.4
# make package
$ make deb
...
dpkg-deb: building package 'atheros-clk' in '../atheros-clk_5.4.0-66-generic_amd64.deb'.
...
```

done, now we can retry to build iso, this time without `atheros-clk` problems

## Test Docker Stack with saved Images

```shell
# enter c3 shell
$ ssh c3@c3edu.online
# first bringImages
$ sudo ./bringImages.sh 
backend.tgz  cloud-client.tgz  code-server.tgz  frontend.tgz  mongo.tgz  syncthing.tgz
done
# entar path
$ cd ~/c3-iso/staticfiles/srv/docker/system
# stop stack if is running
$ sudo docker-compose down
# delete all images
$ sudo docker image rm $(docker images -f "dangling=true" -q) -f
# check if as any images
$ sudo docker images
# we shouln't see any image
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
# now load images
$ gunzip -c ../../dockerImages/backend.tgz | sudo docker load || true
$ gunzip -c ../../dockerImages/frontend.tgz | sudo docker load || true
$ gunzip -c ../../dockerImages/cloud-client.tgz | sudo docker load || true
$ gunzip -c ../../dockerImages/mongo.tgz | sudo docker load || true
$ gunzip -c ../../dockerImages/syncthing.tgz | sudo docker load || true
$ gunzip -c ../../dockerImages/code-server.tgz | sudo docker load || true
# check loaded images
$ docker images --format 'table {{.Repository}}\t{{.Tag}}'
REPOSITORY                                          TAG
hub.critical-links.com/c3-microcloud-cloud-client   1.0.0
mongo                                               4.0
hub.critical-links.com/c3-microcloud-frontend       1.0.4
hub.critical-links.com/c3-microcloud-backend        1.0.18
linuxserver/code-server                             version-v3.8.1
syncthing/syncthing                                 1.13
# start stack with loaded images, should run without any download
$ sudo docker-compose up
# done we should have a running stack with our loaded images
```

> Note: images tag's must match `docker-compose.yaml` tag version