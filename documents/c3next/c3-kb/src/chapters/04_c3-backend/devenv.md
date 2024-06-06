# Development Environment

- [Development Environment](#development-environment)
  - [Install Prerequisites](#install-prerequisites)
  - [Bootstrap Project](#bootstrap-project)
    - [Open remote connections om LDAP c3 [Optional]](#open-remote-connections-om-ldap-c3-optional)
  - [Build Project](#build-project)
    - [Build docker images](#build-docker-images)
    - [Test and use builded docker image](#test-and-use-builded-docker-image)
    - [Push local builded image to remote private registry](#push-local-builded-image-to-remote-private-registry)
    - [Update c3 stack docker images](#update-c3-stack-docker-images)

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

```shell
# clone project into c3 home path
$ git clone https://bitbucket.org/criticallinksteam/c3-backend
# fill username and password request, and enter project path
$ cd c3-backend
# change to dev branch
$ git checkout dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
Switched to a new branch 'dev'
# now launch bundle-app.sh script, this will bundle binaries and compile node
$ ./bundle-app.sh
# when arrive at this step, make some coffe, it will takes time
✔ Node source extracted to: /home/c3/.nexe/10.19.0
Compiling Node.......
# after compile node it build the bundle
bundle c3-backend binary
ℹ nexe 4.0.0-rc.1
✔ Already downloaded...
✔ Compiling result
✔ Entry: 'dist/main.js' written to: bin/c3-backend
✔ Finished in 5.986s
start copying file(s) to ./bin
  copying project file .prod.env to ./bin
cp config ./bin -r
  copying project dir config to ./bin
cp assets ./bin -r
  copying project dir assets to ./bin
  copying native file node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node to ./bin/node_modules/bcrypt/lib/binding/napi-v3
  copying native file node_modules/engine.io-parser to ./bin/node_modules
  copying native file node_modules/rxjs/operators to ./bin/node_modules/rxjs
```

configure env variables, nad test binary

```shell
$ cd bin
$ nano .env
```

```shell
HTTPS_SERVER_PORT='8421'
MONGO_URI='clkuser:clkpasssword_secured_c3b4fe2398a5cc@127.0.0.1/c3-backend'
```

```shell
$ cd bin
$ source runLocal.sh
[Nest] 278466   - 02/22/2021, 6:14:52 PM   [MainBootstrap] c3-backend v0.0.4 server started
[Nest] 278466   - 02/22/2021, 6:14:52 PM   [MainBootstrap]   server api: 'https://c3edu.online:8421/v1' +1ms
[Nest] 278466   - 02/22/2021, 6:14:52 PM   [MainBootstrap]   server docs: 'https://c3edu.online:8421/api' +1ms
...
```

### Open remote connections om LDAP c3 [Optional]

To use local c3-backend, we need to change the .env file in the local backend:

```shell
# LDAP
LDAP_URL='c3edu.online:389'
```

> Note: It's necessary to map `c3` ip to `c3edu.online` in your host file.

Then, it's necessary to add the eth0 interface in tha samba configuration file

```shell
# access c3
$ ssh c3@c3edu.online
# open smb.conf file
$ sudo nano /etc/samba/smb.conf

# add eth0
[global]
  interfaces = lo br0 docker0 eth0

# restart the service
$ sudo systemctl restart samba-ad-dc
```

> Done!

## Build Project

```shell
# build project
$ npm run build
```

### Build docker images

to build docker images one can launch the npm script

```shell
# this will re-bundle binaries and build docker image
$ npm run docker:build
Successfully built 74716897f7b9
Successfully tagged c3-microcloud-backend:latest
# check builded docker image
$ docker images  | grep c3-microcloud-backend | grep latest
c3-microcloud-backend                               latest              74716897f7b9        52 seconds ago      381MB
hub.critical-links.com/c3-microcloud-backend        latest              0f14a3699d27        5 days ago          381MB
```

we can see that we have a new docker `c3-microcloud-backend` image

### Test and use builded docker image

before we push (optional) our builded docker image to private our private registry `hub.critical-links.com`, we must assert that builded image is running without problems, for this we can launch it

```shell
# enter docker stack path
$ cd /srv/docker/system
# edit docker-compose.yml
$ sudo nano docker-compose.yml
```

change remote `image: hub.critical-links.com/c3-microcloud-backend:1.0.16` with local `image: c3-microcloud-backend:latest`, with this we opt-in to use local builded image

```yaml
services:
  c3-microcloud-backend:
    # image: hub.critical-links.com/c3-microcloud-backend:1.0.16
    image: c3-microcloud-backend:latest
```

```shell
# down stack
$ docker-compose down
# up stack
$ tail -f /var/log/docker/c3-microcloud-backend.log
```

> Note: to use remote image again, revert the above process

### Push local builded image to remote private registry

first we need to know what is the latest version that exists in registry, and patch it

```shell
$ cd ~/c3-backend
# get versions
$ npm run docker:registry:versions
{
  "name": "c3-microcloud-backend",
  "tags": [
    ...
    "1.0.16",
    ...
  ]
}
# currently we are in 1.0.16, we must push our new version as 1.0.17
$ ./dockerpush.sh c3-microcloud-backend 1.0.17
push : [hub.critical-links.com/c3-microcloud-backend:latest]
The push refers to repository [hub.critical-links.com/c3-microcloud-backend]
```

### Update c3 stack docker images

```shell
# enter docker stack path
$ cd /srv/docker/system
# edit docker-compose.yml
$ sudo nano docker-compose.yml
```

change remote `image: image: hub.critical-links.com/c3-microcloud-backend:1.0.17`

- with local `image: c3-microcloud-backend:latest`, with this we opt-in to use local builded image
- with remote registry image `image: image: hub.critical-links.com/c3-microcloud-backend:1.0.17`

```yaml
services:
  c3-microcloud-backend:
    # change version from 1.0.16 to 1.0.17
    # image: hub.critical-links.com/c3-microcloud-backend:1.0.16
    image: hub.critical-links.com/c3-microcloud-backend:1.0.17
```

```shell
# down stack
$ docker-compose down
# up stack
$ tail -f /var/log/docker/c3-microcloud-backend.log 
```

done we now are using remote docker image