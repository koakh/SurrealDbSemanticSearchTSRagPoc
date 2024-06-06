# Development Environment

## TOC

- [Development Environment](#development-environment)
  - [TOC](#toc)
  - [Install Prerequisites](#install-prerequisites)
  - [Bootstrap Project](#bootstrap-project)
  - [Build Project](#build-project)
  - [Bundle Project](#bundle-project)
  - [Test Bundle](#test-bundle)
  - [Make Debian Package](#make-debian-package)
  - [Test builded debian installation](#test-builded-debian-installation)
  - [Deploy builded debian into temporary package server](#deploy-builded-debian-into-temporary-package-server)
  - [Publish debian in Package Server](#publish-debian-in-package-server)

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

```bash
# enter in c3
$ ssh c3@c3edu.online
# clone repository
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-system-core.git
# enter paths
$ cd c3-system-core
# install dependencies
$ npm i
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
bundle c3-system-core binary
ℹ nexe 4.0.0-rc.1
✔ Already downloaded...
✔ Compiling result
✔ Entry: 'dist/main.js' written to: bin/c3-system-core
✔ Finished in 5.589s
start copying file(s) to ./bin
copying project file .prod.env to ./bin
copying project dir config to ./bin
copying project dir public to ./bin
copying project dir views to ./bin
done!
```

## Test Bundle

```shell
# test binaries
$ cd bin
$ ./c3-system-core
...
Error: listen EADDRINUSE: address already in use :::8010
# back path
$ cd ..
```

if we see above message `Error: listen EADDRINUSE: address already in use :::8010`, is the proof that binary is bundle has expected and binary is working

## Make Debian Package

> Note: everytime we make debian, we first build bundle, in this case the above bundle commands are not required, we only mention it, to be clear that this a two process stage, and we can bundle it, without using `make deb`

```shell
# make debian
$ make deb
# confirm that debian was deployed
$ ls -la ../*.deb
-rw-r--r-- 1 c3 c3 13141428 Feb 15 15:46 ../c3-system-core_1.0.2_amd64.deb
# check md5
$ md5sum ../c3-system-core_1.0.2_amd64.deb
ef1a4a01b606738d892685bd745d6556  ../c3-system-core_1.0.2_amd64.deb
```

## Test builded debian installation

```shell
# install debian
$ sudo dpkg -i ../c3-system-core_1.0.2_amd64.deb
```

> Note: test debian loccally and assert that everything is working has expected

## Deploy builded debian into temporary package server

before we publish, we must up the versions of the package in bellow files

`debian/changelog`

change `1.0.2` to `1.0.3`

```shell
c3-system-core (1.0.2) unstable; urgency=low
```

`scriptlets/c3-system-core.changelog`

add bellow block to increase from `1.0.2` to `1.0.3`

`scriptlets/c3-system-core.post.changelog`

```shell
if version_gt "1.0.3" $1; then
    echo "Upgrading c3-system-core from $1 to 1.0.3"
fi
```

add bellow block to increase from `1.0.2` to `1.0.3`

```shell
if version_gt "1.0.3" $1; then
    echo "POST-INSTALL script for c3-system-core from $1 to 1.0.3"
    # system service
    systemctl restart c3-system-core
fi
```

now make debian again, this time tagged with a new upVersion `1.0.3`

```shell
# make debian
$ make deb
```

## Publish debian in Package Server

> UPDATED: now one can use `pushDebToServer.sh` deploy debian packages to **Package Server**

```shell
# vars
$ TARGET_HOST="clkuser@hub.critical-links.com"
$ REPO_PATH="/usr/share/le-httpserver/public/repo50"
$ TARGET_PATH="${REPO_PATH}/pool/clk/c3/c3-system-core"
# check repository debians
$ ssh -t ${TARGET_HOST} "ls ${TARGET_PATH}"
c3-system-core_1.0.3_amd64.deb

# push new builded debian
$ scp ../c3-system-core_1.0.3_amd64.deb ${TARGET_HOST}:${TARGET_PATH}

# now we must update Package files with
$ ssh -t ${TARGET_HOST} "cd ${REPO_PATH} && ./genPackages.sh"
# will appera something like
dpkg-scanpackages: info: Wrote 9 entries to output Packages file.
```

done we have published the builded debian in Package Server
