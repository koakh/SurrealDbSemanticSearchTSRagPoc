# Infraestucture Global SSH Key

## Configure Server

to protect our servers, first we must copy the shared key to server, for this we must have it in `~/.ssh/id_rsa_clkis`

### 1. First add host fqdn to `~/.ssh/config`, this way when we copy key to server, it pick the right one `id_rsa_clkis`

in the above example replace `SERVER_FQND` and `SERVER_USER`, for the right ones

ex 

```shell
$ SERVER_USER=clkuser
$ SERVER_FQND=hub.critical-links.com
```

```shell
# edit ssh config
$ sudo nano ~/.ssh/config
```

```shell
Host SERVER_FQND
HostName SERVER_FQND
Port 22
IdentityFile ~/.ssh/id_rsa_clkis
User SERVER_USER
AddKeysToAgent yes
```

### 2. Next copy key to server

```shell
# copy jey to server
$ ssh-copy-id ${SERVER_FQND}
Number of key(s) added: 3
``` 

Now try logging into the machine, with: `ssh ${SERVER_FQND}`
and check to make sure that only the key(s) you wanted were added.


### 3. Test connection without password

```shell
$ ssh ${SERVER_FQND}
```

if work, **lock down server, protecting disabling password authentication**

### 4. Disabling password authentication on server

```shell
$ sudo nano /etc/ssh/sshd_config
```

add to bottom of file

```shell
# custom changes
PasswordAuthentication no
```

### 5. Restart SSH Server

```shell
$ sudo service ssh restart
```

### 6. Test SSH connection again, after lock down server

```shell
# test login, this time should enter without request any password
$ ssh ${SERVER_FQND}
```

done

## Configure Client

This **How to** explain how to connect to Critical-Links CLKIS Servers, using SSH Keys

for protection, server fqdns and ips are ommited, if your want to connect, just ask for it to any administrator like out **fearful colleague H**

### Instructions

Download [config](../../downloads/global-ssh-key/config) and [id_rsa_clkis](../../downloads/global-ssh-key/id_rsa_clkis)

```shell
# enter user .ssh folder
$ cd ~/.ssh
$ wget https://kb.critical-links.com/downloads/global-ssh-key/config
$ wget https://kb.critical-links.com/downloads/global-ssh-key/id_rsa_clkis
# change permissions
$ sudo chmod 600 ~/.ssh/config
$ sudo chmod 600 ~/.ssh/id_rsa_clkis
```

if have keys in your **local user .ssh folder** and need to copy to any machine or vm use bellow commands:

```shell
$ HOST=clkuser@192.168.90.122
$ scp ~/.ssh/config ${HOST}:/home/clkuser/.ssh
$ scp ~/.ssh/id_rsa_clkis ${HOST}:/home/clkuser/.ssh
$ ssh ${HOST}
# change permissions
$ sudo chmod 600 ~/.ssh/config
$ sudo chmod 600 ~/.ssh/id_rsa_clkis
```

### Test connection to a protected server

```shell
# user ommited
ssh staging.c3cloudcontrol.com
when ask for password use
ZHWNy33R...............
```

> `ZHWNy33R...............` last part of key ios ommited, please use our [vault](https://critical-links.server:9443/), and get it at [ssh key](https://critical-links.server:9443/app/passwords/view/1511403d-768a-4b90-942d-63619377ecef)

done! you should have access to our pass-wordless server

### using with SCP

> tip: to use scp to copy files

```shell
# test scp
$ scp -i ~/.ssh/id_rsa_clkis file user@host:/path
```


### SSH Tunnel: TLDR

> tip: change port `22` with port `443` to use https

> tip: free reserved servre port range for `[SSH-Tunnel]` is `ports=40000:65535/tcp`

```shell
# in c3
$ ssh -f -N clkjump@cloudvpn.critical-links.com -R 46770:localhost:22
# in other host connect with
$ ssh c3@cloudvpn.critical-links.com -p 46770
```

### SSH Tunnel: Using createTunnel.sh

One line tunnel (pre configured for quick access to c3)

- enter in c3 ssh
- set `GIT_USERNAME` variable ex `GIT_USERNAME=mariomonteiro`
- launch bellow command

```shell
$ GIT_USERNAME="mariomonteiro"
# change port to afree one
$ SERVER_PORT="40028"
# change port to destination service port ex ssh
$ LOCAL_PORT="22"
$ curl -O -L -u ${GIT_USERNAME} \
    'https://bitbucket.org/criticallinksteam/clkis/downloads/createTunnel.sh' \
    -H 'cache-control: no-cache' \
    > createTunnel.sh && \
    sudo chmod a+x createTunnel.sh && \
    ./createTunnel.sh ${SERVER_PORT} ${LOCAL_PORT}
```

test ssh with

```shell
$ ssh c3@staging.c3cloudcontrol.com -p ${SERVER_PORT}
```

### Bore Tunnel

```shell
# using tunnel helper alias
$ tunnel
$ LPORT=443 tunnel
$ RPORT=60443 tunnel
$ LPORT=443 RPORT=60443 tunnel
# or using tunnel helper script
$ sudo ./tunnel.sh
$ sudo LPORT=443  ./tunnel.sh
$ sudo RPORT=60433 ./tunnel.sh
$ sudo LPORT=443 RPORT=60433 ./tunnel.sh

# minimal example
$ curl https://public.critical-links.com/tunnel | sudo bash
# minimal example passing implicit port 22
$ curl https://public.critical-links.com/tunnel | sudo LPORT=22 bash
# minimal example passing implicit port 443
$ curl https://public.critical-links.com/tunnel | sudo LPORT=443 bash

# full example passing implicit port 22
$ curl --proto '=https' --tlsv1.2 -sSf https://public.critical-links.com/scripts/bore.sh | sudo LPORT=22 bash
# after launch we receive tunnel output ex
2023-09-14T14:42:34.240068Z  INFO bore_cli::client: connected to server remote_port=64000
2023-09-14T14:42:34.240169Z  INFO bore_cli::client: listening at hub.critical-links.com:64000
# now in client test with
$ ssh c3@hub.critical-links.com -p 61742

# full example passing implicit port 22 and with desired allocated remote port
$ curl --proto '=https' --tlsv1.2 -sSf https://public.critical-links.com/scripts/bore.sh | sudo LPORT=443 RPORT=64000 bash
# after launch we receive tunnel output ex
2023-09-14T14:42:34.240068Z  INFO bore_cli::client: connected to server remote_port=64000
2023-09-14T14:42:34.240169Z  INFO bore_cli::client: listening at hub.critical-links.com:64000
# now in client test in browser with
# https://hub.critical-links.com:64000

# use systemd service
# start service
$ sudo systemctl status bore-client
# status service
$ sudo systemctl status bore-client
# stop service
$ sudo systemctl status bore-client
# enable and start service
$ sudo systemctl enable --now bore-client
# disable  service
$ sudo systemctl disable bore-client
```
