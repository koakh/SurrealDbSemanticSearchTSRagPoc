# Development Environment

## TOC

- [Development Environment](#development-environment)
  - [TOC](#toc)
  - [Install Prerequisites](#install-prerequisites)
  - [Bootstrap Project](#bootstrap-project)
    - [Develop environment](#develop-environment)
  - [Build Project](#build-project)
  - [Bundle Project](#bundle-project)
  - [Test Bundle](#test-bundle)
  - [Make Debian Package](#make-debian-package)
  - [Test builded debian installation](#test-builded-debian-installation)
  - [Deploy builded debian into temporary package server](#deploy-builded-debian-into-temporary-package-server)
  - [Publish debian in Package Server](#publish-debian-in-package-server)
    - [Build docker images](#build-docker-images)
    - [Test and use builded docker image](#test-and-use-builded-docker-image)
    - [Push local builded image to remote private registry](#push-local-builded-image-to-remote-private-registry)
    - [Update c3 stack docker images](#update-c3-stack-docker-images)
  - [Test Mount/ Unmount Archives](#test-mount-unmount-archives)

## Install Prerequisites

```shell
# update node for user c3, and install nvh
$ sudo npm install --global @shadowspawn/nvh
$ echo 'export NVH_PREFIX=$HOME/.nvh' >> /home/c3/.profile
$ echo 'export PATH=$NVH_PREFIX/bin:$PATH' >> /home/c3/.profile
$ source /home/c3/.profile
# login in npm.critical-links.com
$ npm login
Logged in as mario on npm.critical-links.com/.
# local c3 Instalation
$ nvh i v16.15.0
   installed : v16.15.0 (with npm 8.5.5)
# install tsc and nexe
$ sudo npm i -g tsc nexe@4.0.0-rc.1
```

> Note: using nvh we prevent using sudo to install global packages

## Bootstrap Project

> Note: `c3-cloud-client` has **leave all legacy code behind**, now we have **dual repository**, one **legacy and other next**, if implement something that must be in both repos, one must assure to replicate code in noth repos

- [next](https://bitbucket.org/criticallinksteam/c3-cloud-client)
- [legacy/deprecated](https://bitbucket.org/criticallinksteam/c3/)

```bash
# enter in c3
$ ssh c3@c3edu.online
# clone next repository
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-cloud-client.git
# enter paths
$ cd c3-cloud-client
# switch branch
$ git switch develop
# optional change npm registry: this pre-configured in ISO 5.0 to work with private registry, and have `.npmrc` local, so next step's are optinal (set registry and login) and can and should be skipped
$ npm set registry "https://npm.critical-links.com"
# use npmdocker | 123123321
$ npm login
# now install packages 
$ npm i
```

### Develop environment

Setup c3-cloud-client container

```shell
$ cd /srv/docker/system

# stop container
$ docker-compose stop c3-microcloud-cloud-client

# use DEV image and set DEV volumes path
$ sudo nano docker-compose.yml
  c3-microcloud-cloud-client:
    # DEV (npm run debug)
    image: hub.critical-links.com/c3-microcloud-cloud-client:dev
    ...
    volumes:
      # DEV (change code inside container)
      - /home/c3/c3-cloud-client:/usr/src/app

# restart container
$ docker-compose start c3-microcloud-cloud-client
```

Edit code from `/home/c3/c3-cloud-client/` and check if  restarts.

```shell
# Usefull. See logs as you develop
$ docker-compose logs -f --tail 50 c3-microcloud-cloud-client
```

## Build Project

```shell
# build project
$ npm run build
```

## Bundle Project

```shell
# bundle project
$ ./bundle-app.sh
bundle c3-cloud-client binary
ℹ nexe 4.0.0-rc.1
✔ Already downloaded...
✔ Compiling result
✔ Entry: 'dist/app.js' written to: bin/c3-cloud-client
✔ Finished in 4.057s
start copying file(s) to ./bin
  copying project file prod.env to ./bin
  copying project file archives/archives.env-c3 to ./bin
  copying project file scriptlets/postInstall.sh to ./bin
  copying project file scriptlets/postInstallServices.sh to ./bin
  copying project file scriptlets/postInstallSyncthing.sh to ./bin
  copying script file archives/scripts/all.sh to ./bin/scripts
  copying script file archives/scripts/list.sh to ./bin/scripts
  copying script file archives/scripts/mount.sh to ./bin/scripts
  copying script file archives/scripts/remount.sh to ./bin/scripts
  copying script file archives/scripts/status.sh to ./bin/scripts
  copying script file archives/scripts/umount.sh to ./bin/scripts
done!
```

## Test Bundle

```shell
# test binaries
$ cd bin
$ ./c3-cloud-client
...
Error: EACCES: permission denied, unlink '/var/log/c3-cloud-client.log'
# back path
$ cd ..
```

if we see above message `Error: EACCES: permission denied, unlink '/var/log/c3-cloud-client.log'`, is the proof that binary is bundle has expected and binary is working

## Make Debian Package

> Note: everytime we make debian, we first build bundle, in this case the above bundle commands are not required, we only mention it, to be clear that this a two process stage, and we can bundle it, without using `make deb`

```shell
# make debian
$ make deb
# confirm that debian was deployed
$ ls -la ../c3-cloud-client*.deb
-rw-r--r-- 1 c3 c3 24106584 Feb 17 12:43 ../c3-cloud-client_1.1.0_amd64.deb
# check md5
$ md5sum ../c3-cloud-client_1.1.0_amd64.deb
43964991d80c4eb57d15d964e319f3be  ../c3-cloud-client_1.1.0_amd64.deb
```

## Test builded debian installation

```shell
# install debian
$ sudo dpkg -i ../c3-cloud-client_1.1.0_amd64.deb
```

> Note: test debian loccally and assert that everything is working has expected

## Deploy builded debian into temporary package server

before we publish, we must up the versions of the package in bellow files

`debian/changelog`

change `1.1.0` to `1.1.1`

```shell
c3-cloud-client (1.1.0) unstable; urgency=low
```

`scriptlets/c3-cloud-client.changelog`

add bellow block to increase from `1.1.0` to `1.1.1`

`scriptlets/c3-cloud-client.post.changelog`

```shell
if version_gt "1.1.1" $1; then
  echo "Upgrading c3-cloud-client from $1 to 1.1.1"
fi
```

add bellow block to increase from `1.1.0` to `1.1.1`

```shell
if version_gt "1.1.0" $1; then
  echo "POST-INSTALL script for c3-cloud-client from $1 to 1.1.0"
fi
```

now make debian again, this time tagged with a new upVersion `1.1.11`

```shell
# make debian
$ make deb
```

## Publish debian in Package Server

> Note: currently in c3 5.0 we moved debian packages based binaries, to a docker image, this section is optional, only we it if like to make debian package for other purposes, feel free to skip to [Build docker images](#build-docker-images)
> Note: to connect to `hub.critical-links.com` we must add our ssh-key, please follow this [link](https://clkteam.atlassian.net/wiki/spaces/CKB/pages/179863553/Remote+SSH+Config+CLKIS+SSH+Key)
> UPDATED: now one can use `pushDebToServer.sh` deploy debian packages to **Package Server**

```shell
# vars
$ TARGET_HOST="clkuser@hub.critical-links.com"
$ REPO_PATH="/usr/share/le-httpserver/public/repo50"
$ TARGET_PATH="${REPO_PATH}/pool/clk/c3/c3-cloud-client"
# check repository debians
$ ssh -t ${TARGET_HOST} "ls ${TARGET_PATH}"
c3-cloud-client_1.1.0_amd64.deb

# push new builded debian
$ scp ../c3-cloud-client_1.1.1_amd64.deb ${TARGET_HOST}:${TARGET_PATH}

# now we must update Package files with
$ ssh -t ${TARGET_HOST} "cd ${REPO_PATH} && ./genPackages.sh"
# will appera something like
dpkg-scanpackages: info: Wrote 9 entries to output Packages file.
```

done we have published the builded debian in Package Server

### Build docker images

to build docker images one can launch the npm script

```shell
# this will re-bundle binaries and build docker image
$ npm run docker:build
Successfully built 535bc9302750
Successfully tagged c3-microcloud-cloud-client:latest
# check builded docker image
$ docker images  | grep c3-microcloud-cloud-client | grep latest
c3-microcloud-cloud-client                      latest              8f71d8fa0f91        19 seconds ago      166MB
```

we can see that we have a new docker `c3-microcloud-cloud-client` image

### Test and use builded docker image

before we push (optional) our builded docker image to private our private registry `hub.critical-links.com`, we must assert that builded image is running without problems, for this we can launch it

```shell
# enter docker stack path
$ cd /srv/docker/system
# edit docker-compose.yml
$ sudo nano docker-compose.yml
```

change remote `image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.16` with local `image: c3-microcloud-cloud-client:latest`, with this we opt-in to use local builded image

```yaml
services:
  c3-microcloud-cloud-client:
    # image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.16
    image: c3-microcloud-cloud-client:latest
```

```shell
# down stack
$ docker-compose down
# up stack
$ tail -f /var/log/docker/c3-microcloud-c.log 
```

> Note: to use remote image again, revert the above process

### Push local builded image to remote private registry

first we need to know what is the latest version that exists in registry, and patch it

```shell
$ cd ~/c3-backend
# get versions
$ npm run docker:registry:versions
{
  "name": "c3-microcloud-cloud-client",
  "tags": [
    ...
    "1.0.16",
    ...
  ]
}
# currently we are in 1.0.16, we must push our new version as 1.0.17
$ ./dockerpush.sh c3-microcloud-cloud-client 1.0.17
push : [hub.critical-links.com/c3-microcloud-cloud-client:latest]
The push refers to repository [hub.critical-links.com/c3-microcloud-cloud-client]
```

### Update c3 stack docker images

```shell
# enter docker stack path
$ cd /srv/docker/system
# edit docker-compose.yml
$ sudo nano docker-compose.yml
```

change remote `image: image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.17`

- with local `image: c3-microcloud-cloud-client:latest`, with this we opt-in to use local builded image
- with remote registry image `image: image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.17`

```yaml
services:
  c3-microcloud-cloud-client:
    # change version from 1.0.16 to 1.0.17
    # image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.16
    image: hub.critical-links.com/c3-microcloud-cloud-client:1.0.17
```

```shell
# down stack
$ docker-compose down
# up stack
$ tail -f /var/log/docker/c3-microcloud-cloud-client.log
```

done we now are using remote docker image

## Test Mount/ Unmount Archives

- archives/scripts/layers

> layers mount folder

- archives/scripts/mount

> final mount folder

- archives/scripts/syncthing/data

> archives folder

```shell
$ ARCHID="0342552"
$ cd archives/scripts
# mount archive
$ sudo ./mount.sh "${ARCHID}"
mounted archive 0342552
# inspect layers
$ tree layers -L 2
layers/
└── 0342552
    ├── layer001
    └── layer002
# inspect mount
$ tree mount/"${ARCHID}" -L 2
mount/0342552
├── Copy of index1861.html
├── cuentas.html
├── descarga12d8.html
├── descarga1532.html
├── descarga1c58.html
├── descarga340d.html
# umount archive
$ sudo ./umount.sh "${ARCHID}"
```
