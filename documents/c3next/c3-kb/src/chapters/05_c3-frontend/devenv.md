# Development Environment

## TOC

- [Development Environment](#development-environment)
  - [TOC](#toc)
  - [Install Prerequisites](#install-prerequisites)
  - [Bootstrap Project](#bootstrap-project)
  - [Build Project](#build-project)
  - [Start Project](#start-project)
    - [Fix public images PATH](#fix-public-images-path)
    - [Build docker images](#build-docker-images)
      - [Development Image](#development-image)
      - [Production Image](#production-image)
    - [Test and use builded docker image](#test-and-use-builded-docker-image)
      - [Development Image](#development-image-1)
      - [Production Image](#production-image-1)
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

```bash
# enter in c3
$ ssh c3@c3edu.online
# clone repository. Replace username with your own
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-frontend.git
# enter path
$ cd c3-frontend
# switch repo
$ git switch develop
# optional change npm registry: this pre-configured in ISO 5.0 to work with private registry, and have `.npmrc` local, so next step's are optinal (set registry and login) and can and should be skipped
$ npm set registry "https://npm.critical-links.com"
# use npmdocker | 123123321
$ npm login
# install dependencies
$ npm i
```

## Build Project

```shell
# build project
$ npm run build
The build folder is ready to be deployed.
You may serve it with a static server
```

## Start Project

to prevent `Error: ENOSPC: System limit for number of file watchers reached, watch`

follow bellow steps

```shell
# insert the new value into the system config
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
fs.inotify.max_user_watches=524288
net.ipv4.ip_forward = 1
fs.inotify.max_user_watches = 524288
# check that the new value was applied
$ cat /proc/sys/fs/inotify/max_user_watches
524288
```

now we can run development server without watch problems

```shell
# start development server
$ npm run start
```

now check <https://c3edu.online:8440>

### Fix public images PATH

> this public path, is a apache configuration on port 443, and it won't work with other ports in react like 3000, 8441, or others, as we see in bellow image, we can't access public assets

![image](../../../assets/images/2022-03-29-12-28-49.png)

to fix and use `/public` on development environment one must do

```shell
# enter frontend project root
$ cd /home/c3/c3-frontend
# hardcode a usefull symbolic link and test
$ ln -s /data/public public/public
```

> after create symbolic link, we seee images appear, _it's a kind of magic_

> UPDATE 2022-09-08 17:06:42: warning about above symbolic link stuff, it can cause problems building docker image

```shell
$ npm run docker:build:prod
Failed to compile.
...
ENOENT: no such file or directory, stat '/app/public/public'
...
ELOOP: too many symbolic links encountered, stat '/home/c3/c3-frontend/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/public/lms/lessons/62dfc0f4e813ef000df4624b/banner.png'
```

### Build docker images

#### Development Image

to build docker images one can launch the npm script

> development image is used [Remote - Containers](https://code.visualstudio.com/docs/remote/containers)

```shell
# build development docker image
$ npm run docker:build:dev
Successfully built b302ed4d0d84
# check builded docker image
$ docker images | grep  b302ed4d0d84
<none>                                          <none>              b302ed4d0d84        About a minute ago   836MB
```

we can see that we have a new untagged docker image

to connect to development image connected to [Remote - Containers](https://code.visualstudio.com/docs/remote/containers): 

- open project in vscode

![image](../../assets/images/2021-02-17-18-00-18.png)

- ctrl+shift+p and choose **Remote-Containers: Rebuild and reopen in Container**

![image](../../assets/images/2021-02-17-18-03-21.png)

- optional open terminal window and watch build process, after build we are attached do docker image and we can develop connected to remote container

#### Production Image

to build docker images one can launch the npm script

```shell
# build production docker image
$ npm run docker:build:prod
Successfully built a432f3fcafd2
Successfully tagged c3-microcloud-frontend:latest
# check builded docker image
$ docker images  | grep c3-microcloud-frontend | grep latest
c3-microcloud-frontend                          latest              a432f3fcafd2        About a minute ago   30.1MB
```

we can see that we have a new docker `c3-microcloud-frontend` image

### Test and use builded docker image

#### Development Image

```shell
# enter path
$ ~/c3-frontend
# rum development image
$ tail -f /var/log/docker/c3-microcloud-frontend.log 
# or
$ npm run docker:run:dev
```

#### Production Image

before we push (optional) our builded docker image to private our private registry `hub.critical-links.com`, we must assert that builded image is running without problems, for this we can launch it

```shell
# enter path
$ ~/c3-frontend
# rum development image
$ docker-compose -f docker-compose.prod.yml up
# or
$ npm run docker:run:prod
```

### Push local builded image to remote private registry

first we need to know what is the latest version that exists in registry, and patch it

```shell
$ cd ~/c3-frontend
# get versions
$ npm run docker:registry:versions
{
  "name": "c3-microcloud-frontend",
  "tags": [
    ...
    "latest",
    "1.0.3"
  ]
}
# currently we are in 1.0.3, we must push our new version as 1.0.04
$ ./dockerpush.sh c3-microcloud-frontend 1.0.4
push : [hub.critical-links.com/c3-microcloud-frontend:latest]
The push refers to repository [hub.critical-links.com/c3-microcloud-frontend]
```

### Update c3 stack docker images


```shell
# enter docker stack path
$ cd /srv/docker/system
# edit docker-compose.yml
$ sudo nano docker-compose.yml
```

change remote `image: image: hub.critical-links.com/c3-microcloud-frontend:1.0.3`

- with local `image: c3-microcloud-frontend:latest`, with this we opt-in to use local builded image
- with remote registry image `image: image: hub.critical-links.com/c3-microcloud-frontend:1.0.4`

```yaml
services:
  c3-microcloud-frontend:
    # change version from 1.0.03 to 1.0.4
    # image: image: hub.critical-links.com/c3-microcloud-frontend:1.0.3
    image: hub.critical-links.com/c3-microcloud-backend:1.0.17
```

```shell
# down stack
$ docker-compose down
# up stack
$ tail -f /var/log/docker/c3-microcloud-frontend.log
```

done we now are using remote docker image