# Development Environment

## Ready to Roll Projects

- c3-backend
- c3-cloud-client
- c3-frontend
- c3-iso
- c3-kb
- c3-lexactivator
- c3-system-core
- c3-updater

## Usefull Links

### C3 Versions Files

#### C3-Updater / Source of Thruth

- [c3-updater: update.json](https://bitbucket.org/criticallinksteam/c3-updater/src/master/update.json)

### Check Deployed ISOs and Packages

```shell
# check download filenames, like isos etc
$ ssh clkuser@hub.critical-links.com "tree /usr/share/le-httpserver/public/downloads -L 4"
# get deployed packages names
$ ssh clkuser@hub.critical-links.com "tree /usr/share/le-httpserver/public/repo50 -L 5"
```

#### ISO 5.0

- [c3-iso/src/iso5/bringImages.sh](https://bitbucket.org/criticallinksteam/c3-iso/src/iso5/bringImages.sh)
- [iso5/staticfiles/var/lib/c3/version.json](https://bitbucket.org/criticallinksteam/c3-iso/src/iso5/staticfiles/var/lib/c3/version.json)
- [iso5/staticfiles/var/lib/c3/instalation.json](https://bitbucket.org/criticallinksteam/c3-iso/src/iso5/staticfiles/var/lib/c3/instalation.json)
- [iso5/staticfiles/srv/docker/system/docker-compose.yml](https://bitbucket.org/criticallinksteam/c3-iso/src/iso5/staticfiles/srv/docker/system/docker-compose.yml)

## Setup Host Machine

### Hosts

```shell
# add c3 address to hosts
$ sudo nano /etc/hosts
192.168.90.198  c3edu.dev
```

> 192.168.90.198 is the c3 vm ip address

### Install Development Extensions

- [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

> above extension is essencial if we want to develop in c3 our other ssh devices
Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```shell
ext install ms-vscode-remote.remote-ssh
```

## Start Developing

![image](../../assets/images/2021-06-02-12-22-53.png)

1. open vscode and connect to c3 VM with **Remote-SSH: Connet to Host** to `c3@c3edu.dev`
2. open a project to work for ex `c3-backend` with Open Folder, or choose any given project
3. remember to prevent use more than one backend with same allocated port, one must stop service in docker stack for ex for `c3-backend`, stop backend on stack with `cd /srv/docker/system && docker-compose stop c3-microcloud-backend`
4. now we can run development backend with `npm run start:dev`

## Frontend changes

use config

```shell
HTTPS="true"
PORT="8440"
REACT_APP_BACKEND_URL="https://192.168.90.198:8420/v1/"
```
