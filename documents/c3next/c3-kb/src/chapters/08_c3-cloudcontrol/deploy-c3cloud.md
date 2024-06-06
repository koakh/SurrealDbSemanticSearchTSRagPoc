# C3 Cloud Setup

## Setup main node

Choose a node will run the frontend & backend docker images of c3cloudcontrol.
For simplicity purpuses it will be installed in the `admin` node from "Ceph Cluster Setup".

## Install Docker (skip if is installed)

- [Get Docker CE for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

```sh
# install packages to allow apt to use a repository over HTTPS:
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# update
sudo apt-get update
# install Docker
sudo apt-get install docker-ce
# start Service
sudo systemctl start docker
# enable Service
sudo systemctl enable docker
# check version
docker --version
Docker version 18.06.1-ce, build e68fc7a
# add user to group
sudo groupadd docker
sudo usermod -aG docker $USER
```

## Install Docker Compose  (skip if is installed)

- [Install Docker Compose](https://docs.docker.com/compose/install/)

**Install Compose on Linux systems**

```sh
# get compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# apply executable permissions to the binary
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
docker-compose version 1.24.1, build 4667896b
```

> Log out and log back in so that your group membership is re-evaluated.

## Setup C3 Cloud

## Clone Project

> Replace `${GIT_USERNAME}` with your GIT username if not assigned environment variable

```sh
# set GIT_USERNAME environment variable
GIT_USERNAME=mariomonteiro
# create project dir
sudo mkdir /srv/docker/criticallinks/clkis -p
cd /srv/docker/criticallinks/clkis
# change ownership
sudo chown clkuser /srv/docker/criticallinks/clkis
# sparse checkout repository project folder `c3-cloudcontrol`
git init
# add origin
git remote add -f origin https://${GIT_USERNAME}@bitbucket.org/criticallinksteam/clkis.git
# enable sparseCheckout
git config core.sparseCheckout true
# add project dir(s)
echo "c3-cloudcontrol" > .git/info/sparse-checkout
# update your empty repo with the state from the remote
git pull origin master
# remove extra dirs created in vm (same project name used in sparse-checkout)
sudo rm vms -R
```

## Increasing the amount of inotify watchers

Syncthing requires this:

```sh
sudo echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Change backend and frontend Versions

```sh
# enter repo project
cd c3-cloudcontrol
# tag pull version use tag version or latest
VERSION=2.6.5
sudo sh -c "mkdir c3ccontrol/backend/ -p || true && echo ${VERSION} > c3ccontrol/backend/VERSION"
sudo sh -c "mkdir c3ccontrol/frontend/ -p || true  && echo ${VERSION} > c3ccontrol/frontend/VERSION"
```

## Change repo Stagging vars to production to prevent problem with cloudId

```sh
sudo nano common.env 

# backend
PORT_BACKEND_HTTPS=8443
# override default entitlement server url es.critical-links.com
# DOMAIN_ENTITLEMENTSERVER_URL=staging.c3cloudcontrol.com
# DOMAIN_ENTITLEMENTSERVER_PORT=444
SOCKET_HOST=wss.c3cloudcontrol.com
LEGACY_SOCKET_SERVER_ENABLED=true
```

```sh
sudo nano common.sh 
# different for cloud versions - use 2 or 3
export DOCKER_IMAGE_VERSION_MONGODB=2
```

## Setup ssl certificates

```sh
# install node and npm
sudo apt install nodejs npm -y
# check run node and npm with sudo
sudo node -v
v8.10.0
sudo npm -v
3.5.2

# install certboot
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt-get update -y
sudo apt-get install certbot -y

    # if above error occurs, launch next code lines, else skip to **Clone Repository**
        The following packages have unmet dependencies:
        certbot : Depends: python3-certbot (= 0.26.1-1+ubuntu18.04.1+certbot+2) but it is not going to be installed

    # fix adding universe repository
    sudo add-apt-repository universe
    # install fixed certboot
    sudo apt-get update && sudo apt-get upgrade
    sudo apt-get install certbot

```

### Clone Repository
```sh
cd /usr/share
# change to your git username
GIT_USERNAME=mariomonteiro
# change sys username ex: clkuser, c3...
SYS_USERNAME=clkuser
# clone repository
sudo git clone https://${GIT_USERNAME}@bitbucket.org/criticallinksteam/systemd-service-letsencrypt.git
sudo mv systemd-service-letsencrypt/ le-httpserver
cd le-httpserver
# create path for acme-challenge
mkdir public/.well-known/acme-challenge/ -p
sudo chown ${SYS_USERNAME}.${SYS_USERNAME} . -R
# install dependencies
npm install
```
Setup vars
```sh
# copy default .env
cp .env.default .env
nano .env
# set these
HTTP_PORT=80  
DOMAIN_URL=your domain here

# manual run - testing
sudo npm start
# stop if no errors are presented
```

### Create systemd service
```sh
sudo nano /lib/systemd/system/le-httpserver.service
```
```sh
[Unit]
Description=Lets Encrypt HTTP(S) Express App

[Service]
Type=simple
ExecStart=/usr/bin/node /usr/share/le-httpserver/app.js
WorkingDirectory=/usr/share/le-httpserver

# Required root user to open ports above 1024
User=root
Group=root

# Environment variables
# Environment=HTTP_PORT=80
# Environment=HTTPS_PORT=1443

# Allow many incoming connections
LimitNOFILE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```
```sh
# reload systemctl daemon
sudo systemctl daemon-reload
# start and test service
sudo systemctl start le-httpserver
# enable on boot
sudo systemctl enable le-httpserver
Created symlink /etc/systemd/system/multi-user.target.wants/le-httpserver.service → /lib/systemd/system/le-httpserver.service.
# check status
sudo systemctl status le-httpserver
```
### Generate certificate
```sh
sudo certbot certonly --manual -d staging.c3cloudcontrol.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Create a file containing just this data:

UeEHVsuu8Ryo7LlKauEXxSvHHHpUYadL6YKV99bwfDc.vtghPPjY2ExFO09dbssR8QaX-b_tL26igUmPDg6O-aQ

And make it available on your web server at this URL:

http://staging.c3cloudcontrol.com/.well-known/acme-challenge/aaaaaaaaaaaaaa
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
```sh
# in a new terminal
cd /usr/share/le-httpserver/public/.well-known/acme-challenge/
echo "UeEHVsuu8Ryo7LlKauEXxSvHHHpUYadL6YKV99bwfDc.vtghPPjY2ExFO09dbssR8QaX-b_tL26igUmPDg6O-aQ" > aaaaaaaaaaaaaa
# test using curl
curl -k https://staging.c3cloudcontrol.com:1443/aaaaaaaaaaaaaa 

# back to the first terminal, press ENTER
```
### Copy certificates
```sh
ls -la /etc/letsencrypt/live/staging.c3cloudcontrol.com/
cd /srv/docker/criticallinks/clkis/c3-cloudcontrol/volumes/shared/ssl/
cp /etc/letsencrypt/live/staging.c3cloudcontrol.com/privkey.pem server.key
cp /etc/letsencrypt/live/staging.c3cloudcontrol.com/cert.pem server.crt
```

## Start Service Stack

```sh
# login internal docker hub, else "no basic auth credentials"
docker login https://hub.critical-links.com -u clkteam -p lh0tGUZNv27R45NhDHJ38D2M1nZLoMHq
Login Succeeded
# start service stack
sudo ./dockercomposeup.sh
sudo ./dockercomposedown.sh
```
