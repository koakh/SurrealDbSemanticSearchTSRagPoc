# Development Environment

## TOC

- [Development Environment](#development-environment)
  - [TOC](#toc)
  - [Install Prerequisites](#install-prerequisites)
  - [Bootstrap Project](#bootstrap-project)
  - [Build Project](#build-project)
  - [Bundle Project and make Hybrid debian 4.5 and 5.x versions](#bundle-project-and-make-hybrid-debian-45-and-5x-versions)
  - [Test Bundle](#test-bundle)
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
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-lexactivator.git
# enter paths
$ cd ~/c3-lexactivator/lerna-monorepo
# optional change npm registry: this pre-configured in ISO 5.0 to work with private registry, and have `.npmrc` local, so next step's are optinal (set registry and login) and can and should be skipped
$ npm set registry "npm.critical-links.com"
# use our vault passbolt to get your credentials
$ npm login
# install dependencies
$ npx lerna bootstrap
lerna notice cli v3.22.1
lerna info Bootstrapping 4 packages
lerna info Installing external dependencies
lerna info Symlinking packages and binaries
lerna success Bootstrapped 4 package
```

## Build Project

```shell
# enter cryptlex-lexactivator-api path
$ cd ~/c3-lexactivator/lerna-monorepo/packages/cryptlex-lexactivator-api
# build project
$ npm run build-ts
```

## Bundle Project and make Hybrid debian 4.5 and 5.x versions

> Note: everytime we **make debian**, we first build bundle, in this case the above bundle commands are not required, we only mention it, to be clear that this a two process stage, and we can bundle it, without using `make deb`

```shell
# make bundle and debians for 4.5 and 5.x releases
$ ./bundle-and-builddeb-in-c3.sh
# bundle project
bundle lexactivator-api binary
ℹ nexe 4.0.0-rc.1
✔ Already downloaded...
✔ Compiling result
✔ Entry: 'dist/server.js' written to: bin/lexactivator-api
✔ Finished in 4.468s
start copying file(s) to ./bin
cp .prod.env ./bin
copying project file .prod.env to ./bin
copying project dir config to ./bin
copying build file ../cryptlex-lexactivator-bridge/node_modules/@cryptlex/lexactivator/build/Release/lexactivator.node to ./bin/build
copying native file ../cryptlex-lexactivator-bridge/node_modules/@cryptlex/lexactivator/libLexActivator.so to ./bin
done!
# enter home
$ cd ~/c3-lexactivator
# confirm that debian was deployed
$ ls -la ../*lex*.deb
-rw-r--r-- 1 c3 c3 16031228 Feb 15 17:46 ../c3-lexactivator-api_1.0.15_amd64.deb
-rw-r--r-- 1 c3 c3 16461240 Feb 15 17:48 ../lexactivator-api_1.0.15_amd64.deb
# check md5
$ md5sum ../c3-lexactivator-api_1.0.15_amd64.deb
0812c1e04d64cf59a7d2085c3da17208  ../c3-lexactivator-api_1.0.15_amd64.deb
$ md5sum ../lexactivator-api_1.0.15_amd64.deb
dbc4e0750393ecc67c6c991523467824  ../lexactivator-api_1.0.15_amd64.deb
```

## Test Bundle

```shell
# test binaries
$ cd bin
$ ./lexactivator-api
...Error: listen EADDRINUSE: address already in use :::8030
# back path
$ cd ..
```

if we see above message `Error: listen EADDRINUSE: address already in use :::8030`, is the proof that binary is bundle has expected and binary is working


## Test builded debian installation

```shell
# install debian on c3 5.0
$ sudo dpkg -i ../c3-lexactivator-api_1.0.15_amd64.deb
```

> Note: test debian loccally and assert that everything is working has expected

## Deploy builded debian into temporary package server

before we publish, we must up the versions of the package in bellow files

> Note: change versions in both files for `4.5` and `5.x`

`debian-4.0/changelog`

change `1.0.15` to `1.0.16`

```shell
lexactivator-api (1.0.16) unstable; urgency=low
```

`debian-5.0/changelog`

```shell
c3-lexactivator-api (1.0.15) unstable; urgency=low
```

`scriptlets-4.5/lexactivator-api.changelog`

add bellow block to increase from `1.0.15` to `1.0.16`

```shell
if version_gt "1.0.16" $1; then
    echo "Upgrading lexactivator-api from $1 to 1.0.16"
fi
```

`scriptlets-4.5/lexactivator-api.post.changelog`

add bellow block to increase from `1.0.15` to `1.0.16`

```shell
if version_gt "1.0.16" $1; then
    echo "POST-INSTALL script for lexactivator-api from $1 to 1.0.16"
    # always restart service to force refresh license
    systemctl restart c3-cloud-client || true
fi
```

`scriptlets-5.0/c3-lexactivator-api.changelog`

add bellow block to increase from `1.0.15` to `1.0.16`

```shell
if version_gt "1.0.15" $1; then
    echo "Upgrading c3-lexactivator-api from $1 to 1.0.15"
fi
```

`scriptlets-5.0/c3-lexactivator-api.post.changelog`

add bellow block to increase from `1.0.15` to `1.0.16`

```shell
if version_gt "1.0.15" $1; then
    echo "POST-INSTALL script for c3-lexactivator-api from $1 to 1.0.15"
    # always restart service to force refresh license
    systemctl restart c3-cloud-client || true
fi
```

`lerna-monorepo/packages/cryptlex-lexactivator-api/package.json`

increase version from `1.0.15` to `1.0.16`

```json
{
  "name": "cryptlex-lexactivator-api",
  "version": "1.0.16",
```

`lerna-monorepo/packages/cryptlex-lexactivator-bridge/lib/lib.js`

increase version from `0.1.27` to `0.1.28`

```javascript
const version = '0.1.28';
```

now make debian again, this time tagged with a new upVersion `1.0.16`

```shell
# make bundle and debians for 4.5 and 5.x releases
$ ./bundle-and-builddeb-in-c3.sh
```

## Publish debian in Package Server

> Note: to connect to `hub.critical-links.com` we must add our ssh-key, please follow this [link](https://clkteam.atlassian.net/wiki/spaces/CKB/pages/179863553/Remote+SSH+Config+CLKIS+SSH+Key)

> UPDATED: now one can use `pushDebToServer.sh` deploy debian packages to **Package Server**

```shell
# vars
$ TARGET_HOST="clkuser@hub.critical-links.com"
$ REPO_PATH="/usr/share/le-httpserver/public/repo50"
$ TARGET_PATH="${REPO_PATH}/pool/clk/c3/c3-lexactivator-api"
# check repository debians
$ ssh -t ${TARGET_HOST} "ls ${TARGET_PATH}"
c3-lexactivator-api_1.0.15_amd64.deb

# push new builded debian, only 5.0 version
$ scp ../c3-lexactivator-api_1.0.15_amd64.deb ${TARGET_HOST}:${TARGET_PATH}

# now we must update Package files with
$ ssh -t ${TARGET_HOST} "cd ${REPO_PATH} && ./genPackages.sh"
# will appera something like
dpkg-scanpackages: info: Wrote 9 entries to output Packages file.
```

done we have published the builded debian in Package Server
