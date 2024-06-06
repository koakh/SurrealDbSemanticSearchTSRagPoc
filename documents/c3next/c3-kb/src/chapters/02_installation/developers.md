# Developers

## TOC

- [Developers](#developers)
  - [TOC](#toc)
  - [C3 Urls](#c3-urls)
    - [ISO](#iso)
  - [Pre Install](#pre-install)
  - [Post Install](#post-install)
    - [Add Docker Hub Credentials](#add-docker-hub-credentials)
      - [Use Login](#use-login)
      - [Create file in Place](#create-file-in-place)
    - [Disable Firewall](#disable-firewall)
    - [Get ip from virtual machine/bare metal](#get-ip-from-virtual-machinebare-metal)
    - [VScode](#vscode)
  - [Configure Third Party Software](#configure-third-party-software)
    - [Git](#git)
    - [Caching your git password (optional)](#caching-your-git-password-optional)
    - [Working with Git Merge and Exclude Version Files](#working-with-git-merge-and-exclude-version-files)
  - [Configure SSH-Key](#configure-ssh-key)
  - [Post Install Health checks](#post-install-health-checks)
    - [Open above links to assure that everything's works has expected](#open-above-links-to-assure-that-everythings-works-has-expected)
    - [Test authentication/ldap connection with](#test-authenticationldap-connection-with)
    - [Development Extensions](#development-extensions)
      - [Installation](#installation)
    - [Test backend connection with core and lexactivator, and the above token](#test-backend-connection-with-core-and-lexactivator-and-the-above-token)
    - [Test frontend and ldap authentication](#test-frontend-and-ldap-authentication)
  - [How to Build and Develop Backend](#how-to-build-and-develop-backend)
    - [Build backend Bundle](#build-backend-bundle)
      - [Develop Backend](#develop-backend)
    - [Using local C3 Develop Ide/VsCode](#using-local-c3-develop-idevscode)
  - [Update debian Packages from Local or Online Repo](#update-debian-packages-from-local-or-online-repo)

## C3 Urls

- [frontend: c3edu.online](c3edu.online)

- [code: https://code.c3edu.online](https://code.c3edu.online)

- pass: `clk#DEV#28`

- [syncthing: https://syncthing.c3edu.online](https://syncthing.c3edu.online)

- user: `syncthing`
- pass: `SyncthinG5435`

- [grafana: https://grafana.c3edu.online](https://grafana.c3edu.online)

- user: `admin`
- pass: `CYiMAhWKdZsuzjAL6PIOL7yV6VkFGNWO`

- [prometheus: https://prometheus.c3edu.online](https://prometheus.c3edu.online)

### ISO

- [Latest and greatest](https://downloads.critical-links.com/C3-5.x.x-latest.iso)

## Pre Install

- For development purposes the minimal required specs for build and bundle stuff is

- `>= 2GB` of memory, adviced to use 4Gb
- `>= 30GB` of disk space, adviced to use 40Gb or more if will use snapshots

bellow are some catched errors, of a **machine with low specs** trying to build a docker image

```shell
FATAL ERROR: MarkCompactCollector: young object promotion failed Allocation failed - JavaScript heap out of memory
```

## Post Install

### Add Docker Hub Credentials

to **push and pull images** from our private `hub.critical-links.com` registry,
first we need to create the `config.json` in place or use login with user `c3`
in both cases a file will be created in `/home/c3/.docker/config.json`

> Note: when we say push, we are say push develop images to private registry

#### Use Login

```shell
# use password JipjpH6YNG3W5Q08qd96ZWTaWUEHCHiz
$ docker login hub.critical-links.com --username c3
```

#### Create file in Place

create the file

```shell
$ nano /home/c3/.docker/config.json
```

paste bellow contents

```json
{
  "auths": {
    "hub.critical-links.com": {
      "auth": "YzM6SmlwanBINllORzNXNVEwOHFkOTZaV1RhV1VFSENIaXo="
    }
  }
}
```

test it with a simple pull for ex

```shell
$ docker pull hub.critical-links.com/c3-microcloud-cloud-client:1.0.6
```

### Disable Firewall

> NOTE: after install one must disable firewall, that will be enable by default, this prevent all kind of communications like ssh, c3-lexactivator-api, ldap and other services

![image](../../assets/images/2021-03-05-12-01-34.png)

![image](../../assets/images/2021-03-05-12-39-50.png)

```shell
$ sudo systemctl stop ufw && sudo systemctl stop disable
$ sudo nano /etc/c3-system-core/firewall/ufw.json
{
  "enabled": false,
  "services": [
    {
```

> Note: change `"enabled": false` in `ufw.json` will prevent future c3-system-core updates/install enable firewall, even if service is stopped it will lock your communications

### Get ip from virtual machine/bare metal

```shell
# get ip
$ ip addr show eth0
  2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:b0:65:b8 brd ff:ff:ff:ff:ff:ff
    inet 192.168.90.152/24 brd 192.168.90.255 scope global dynamic eth0
```

advice always map `c3` ip to `c3edu.online` in your host file

```shell
# in your host machine
$ sudo nano /etc/hosts
# add to hosts file
192.168.90.152  c3edu.online
# optional if want to use code and syncthing subdomains
192.168.90.152  code.c3edu.online
192.168.90.152  syncthing.c3edu.online
```

test open urls:

- <https://c3edu.online>
- <https://code.c3edu.online>
- <https://syncthing.c3edu.online>

> assure that every domain opens with it's service

### VScode

```shell
# create vscode in sudoers.d
$ sudo visudo /etc/sudoers.d/vscode
```

```conf
c3 ALL=(ALL) NOPASSWD: /usr/local/localrepo/updateRepo.sh, /usr/bin/apt, /usr/bin/apt-cache, /usr/bin/systemctl, /usr/sbin/service, /usr/bin/dpkg-scanpackages, /home/c3/.cargo/bin/cargo, /usr/bin/docker, /usr/local/bin/docker-compose
```

## Configure Third Party Software

### Git

```shell
# config git global env
$ git config --global user.name "mariomonteiro"
$ git config --global user.email "mario.monteiro@critical-links.com"
```

### Caching your git password (optional)

```shell
# Set git to use the credential memory cache
$ git config --global credential.helper cache
# Set the cache to timeout after 1 hour (setting is in seconds)
$ git config --global credential.helper 'cache --timeout=3600'
```

### Working with Git Merge and Exclude Version Files

this snippet is used to prevent **merge version files**, or files included in `.gitattributes`, this will keep our local branch version

```shell
# before merge branchs's always check if `merge.ours.driver` is `true`
$ git config --global merge.ours.driver
# no output when is not defined, true if is setted to true

# used for merge branchs and prevent replace versions problem
$ git config --global merge.ours.driver true
```

## Configure SSH-Key

to connect to critical-links **internal servers**, like `hub.critical-links.com` etc,
first we must configure ssh connection adding `ssh-key` to out development c3,
this connections are use in many cases, for ex in scripts to push debian files to our internal debian server,
in the case of `c3-system-core`, the script is `c3-system-core/pushDebToServer.sh`, and without this configuration we can't establish the connection

script location <https://downloads.critical-links.com/scripts/addSshKey.sh>

to add ssh-key to our development c3 use one of the bellow snippets

```shell
# option #1: one liner without variables
$ curl -H "Authorization: Basic Y2xrdGVhbTpjbGsjMjg=" -s "https://downloads.critical-links.com/scripts/addSshKey.sh" -o "/tmp/addSshKey.sh" && sudo chmod +x "/tmp/addSshKey.sh" && sudo "/tmp/addSshKey.sh"

# option #2: with variables
$ SCRIPT_FILENAME="addSshKey.sh" 
$ SCRIPT_URL="https://downloads.critical-links.com/scripts/${SCRIPT_FILENAME}"
$ curl -H 'Authorization: Basic Y2xrdGVhbTpjbGsjMjg=' -s "${SCRIPT_URL}" -o "/tmp/${SCRIPT_FILENAME}" \
  && sudo chmod +x "/tmp/${SCRIPT_FILENAME}" \
  && sudo "/tmp/${SCRIPT_FILENAME}"
```

now test connection, should connect without ask for password

```shell
$ ssh clkuser@hub.critical-links.com
# outcome
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-91-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
New release '22.04.2 LTS' available.
Run 'do-release-upgrade' to upgrade to it.

  _____
 / ___/___  _  _ _____ _   ___  ___
| |   / _ \| \| |_   _/ \ | _ )/ _ \
| |__| (_) | .` | | |/ _ \| _ \ (_) |
 \____\___/|_|\_| |_/_/ \_|___/\___/

Welcome!
```

as a recover one can use

```shell
$ curl -H "Authorization: Basic Y2xrdGVhbTpjbGsjMjg=" -s "https://downloads.critical-links.com/scripts/ssh.tgz" -o "/tmp/ssh.tgz"
$ tar xvf /tmp/ssh.tgz -C /
```

## Post Install Health checks

### Open above links to assure that everything's works has expected

### Test authentication/ldap connection with

```bash
# enter in c3
$ ssh c3@c3edu.online
# get token
$ ACCESS_TOKEN=$(curl -k -q --request POST --url https://localhost:8420/v1/auth/login \
  --header 'content-type: application/json' \
  --data '{"username": "c3","password": "root"}' \
  | jq -r ".accessToken" )
# should return access token, assuring that ldap connection is working
$ echo ${ACCESS_TOKEN}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImMzIiwic....  
```

### Development Extensions

- [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

> above extension is essencial if we want to develop in c3 our other ssh devices

#### Installation

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```shell
ext install ms-vscode-remote.remote-ssh
```

### Test backend connection with core and lexactivator, and the above token

```bash
$ curl -k -q -X GET "https://c3edu.online:8420/v1/shared/http/test-http-service" \
    --header "content-type: application/json" \
    --header "authorization: bearer ${ACCESS_TOKEN}" \
    | jq
```

positive response

```json
{
  "core": {
    "hostname": "c3",
    "address": "172.16.0.1",
    "netmask": "255.255.255.0"
  },
  "lex": {
    "status": "launch restart lexactivator-api service"
  }
}
```

> Note: don't send another request until `lexactivator-api` service has been restarted, else it will fail because the service is restarting.

### Test frontend and ldap authentication

Go to <https://c3edu.online/> and login with c3/root

## How to Build and Develop Backend

> this is a example of one can develop and build backend service images

### Build backend Bundle

> if want develop/build **bundle debian packages** and **docker images** , is advised to **compile node**, this is a long process of **~45m**

```shell
# enter c3 via ssh
$ ssh c3@c3edu.online
```

#### Develop Backend

to continue go to [Backend Development Environment](../04_c3-backend/devenv.md), and assure that everything works as expected

### Using local C3 Develop Ide/VsCode

we optionally can use the <https://code.c3edu.online>, to develop, test, build, deploy, and other cool stuff

> password `clk#DEV#28`

> Note: internal vscode-server path `/config/workspace/` is the external c3 home path located at `/home/c3`, we just bind both paths

- open <https://code.c3edu.online> and open folder `/config/workspace/c3-backend/`

> open folder with `ctrl+l` `ctrl+o`

![image](../../assets/images/2021-02-12-17-06-49.png)

- open terminal window and connect to host via ssh, this way we use same os with already installed dependencies, compiled node etc

> open console with `ctrl+j`

```shell
# connect to host
$ ssh c3@172.16.0.1
# change to c3-backend folder
$ cd c3-backend
```

> Note: now we can use same c3 context, we can build, deploy, push and all the other stuff but inside vscode terminal, connected to host c3

## Update debian Packages from Local or Online Repo

```shell
# edit sources.list
$ sudo nano /etc/apt/sources.list
```

`sources.list`

```shell
# local repository
# deb [trusted=yes] file:/usr/local/localrepo/ ./
# online repository
deb [trusted=yes] https://hub.critical-links.com:8443/repo50/ ./
```

```shell
# update repo
$ sudo apt update
# update some packages
$ sudo apt install c3-lexactivator-api c3-system-core
# tip when we use same versions, we must use the force, like Luke use the `--reinstall` flag baby
$ sudo apt install c3-lexactivator-api c3-system-core --reinstall
```

> if get bellow error on update use `sudo apt update --fix-missing`

```shell
Err:1 https://hub.critical-links.com:8443/repo50 ./ c3-system-core 1.0.11
  File has unexpected size (13268700 != 13240300). Mirror sync in progress? [IP: 88.157.198.4 8443]
  Hashes of expected file:
   - SHA256:9124d4a439010886da5d46026877d000ff7c282571e23ee4f1ef6d21641c55c9
   - SHA1:0cd333b007ff34a67d27714496691c231048fdf1 [weak]
   - MD5Sum:0eecc1737d0ea684e98c58938d8ca258 [weak]
   - Filesize:13240300 [weak]
E: Failed to fetch https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-system-core/
```
