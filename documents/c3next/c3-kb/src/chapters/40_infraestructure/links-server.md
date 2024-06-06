# Critical-Links Server

## TLDR

to use `critical-links.server` domain, one must add it to hosts file, this is the address of our vpn links-server, or use it's internal ip `192.168.90.10`

> all links bellow that use domain `critical-links.server` are just using an alias to `192.168.90.10`, optional one can use alias or ip, you choose, **but always is required a vpn connection to access our private network**

### Change Hosts File

```shell
# edit hosts
$ sudo nano /etc/hosts
# add
192.168.90.10  critical-links.server
```

## Static Server Urls

- <https://critical-links.server:8443/kb>

- <https://critical-links.server:8443/storybook>

> above url is our temporary c3 5.0 package server

- <https://hub.critical-links.com:8443/downloads>
- <https://downloads.critical-links.com/C3-5.x.x-latest.iso>

> above url is our temporary downloads folder to share contents like isos, and other resources

## PassBolt

- <https://critical-links.server:9443/>

> above url is our passbolt site to private secrets, where we store all passwords and credentials

- Tip: don't forget to install [Passbolt Extension](https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf)

### Current Users/ Create Users

#### helder.pereira

- USERNAME="helder.pereira@critical-links.com"
- FIRSTNAME="Helder"
- LASTNAME="Pereira"
  
#### mario.monteiro

- USERNAME="mario.monteiro@critical-links.com"
- FIRSTNAME="Mário"
- LASTNAME="Monteiro"

#### andre.gomes

- USERNAME="andre.gomes@critical-links.com"
- FIRSTNAME="André"
- LASTNAME="Gomes"

#### andre.marques

- USERNAME="andre.marques@critical-links.com"
- FIRSTNAME="André"
- LASTNAME="Gomes"

#### nuno.bento

- USERNAME="nuno.bento@critical-links.com"
- FIRSTNAME="Nuno"
- LASTNAME="Bento"
  
#### daniel.ramos

- USERNAME="daniel.ramos@critical-links.com"
- FIRSTNAME="Daniel"
- LASTNAME="Ramos"

#### luis.silva

- USERNAME="luis.silva@critical-links.com"
- FIRSTNAME="Luís"
- LASTNAME="Silva"

```shell
# create command
$ docker-compose exec passbolt su -m -c "/var/www/passbolt/bin/cake \
  passbolt register_user \
  -u "${USERNAME}" \
  -f "${FIRSTNAME}" \
  -l "${LASTNAME}" \
  " -s /bin/sh www-data
```
