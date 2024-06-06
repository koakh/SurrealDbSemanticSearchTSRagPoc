# Critical-Links Servers and Certificates

- [Critical-Links Servers and Certificates](#critical-links-servers-and-certificates)
  - [es.critical-links](#escritical-links)
    - [Current Services](#current-services)
      - [c3-cloudcontrol-socket-server](#c3-cloudcontrol-socket-server)
      - [c3-entitlementserver](#c3-entitlementserver)
      - [c3-ls-api](#c3-ls-api)
        - [Update certificates setup notes on 2022-11-10 14:57:36](#update-certificates-setup-notes-on-2022-11-10-145736)
          - [Disable c3-ls-api cronjob le-post-hook.sh](#disable-c3-ls-api-cronjob-le-post-hooksh)

## es.critical-links

### Current Services

#### c3-cloudcontrol-socket-server

- `/srv/docker/criticallinks/clkis/c3-cloudcontrol-socket-server`
  - <https://wss.c3cloudcontrol.com:8448/>
  - <https://es.critical-links.com:8448/>

> use let's encrypt certificates and cronjob
> 
#### c3-entitlementserver

> NOT USED ANYMORE

- `/srv/docker/criticallinks/clkis/c3-entitlementserver`
  - <https://es.critical-links.com>

> use let's encrypt certificates and cronjob

#### c3-ls-api

> USE OFICIAL certificates because of a old ubuntu issue, a long story, believe better is forget it.....

> USED in c3 4.x updater

- `/srv/docker/criticallinks/clkis/c3-ls-api/`
  - <https://es.critical-links.com:9443/>

notes at `notes/Let's Encrypt - Debug Certificates and use Comodo with c3 4.5.md`

##### Update certificates setup notes on 2022-11-10 14:57:36

```shell
# copy cert files to server
$ scp ~/Downloads/es_critical-links_com-out2022.zip clkuser@es.critical-links.com:/tmp/
$ scp ~/Downloads/es.critical-links.com_key-2022.zip clkuser@es.critical-links.com:/tmp/

# enter path
$ cd /srv/docker/criticallinks/clkis/c3-ls-api/volumes/app/config
# backup old dir
$ sudo mv es.critical-links.com/ es.critical-links.com_bef_update_10112022
# create a new one for new certificates
$ sudo mkdir es.critical-links.com
# move cert files to new dir
$ sudo mv /tmp/es_critical-links_com-out2022.zip es.critical-links.com
$ sudo mv /tmp/es.critical-links.com_key-2022.zip es.critical-links.com

# enter path
$ cd es.critical-links.com
# unzip cert files
$ sudo unzip es_critical-links_com-out2022.zip
Archive:  es_critical-links_com-out2022.zip
 extracting: es_critical-links_com.ca-bundle  
 extracting: es_critical-links_com.crt  
# unzip cert files private key
$ sudo unzip es.critical-links.com_key-2022.zip
$ mv es.critical-links.com_key.txt es_critical-links_com_key.txt
# create bundle script
$ nano bundle.sh
```

```shell
#!/bin/bash

cat es_critical-links_com.crt es_critical-links_com.ca-bundle > ssl-bundle.crt
openssl x509 -in ssl-bundle.crt -text -noout | grep "Issuer\|Not Before\|Not After"
```

```shell
# change onnwrship
$ sudo chmod +x bundle.sh
# bundle cert
$ ./bundle.sh
# outcome
        Issuer: C = GB, ST = Greater Manchester, L = Salford, O = Sectigo Limited, CN = Sectigo RSA Domain Validation Secure Server CA
            Not Before: Oct 12 00:00:00 2022 GMT
            Not After : Nov 11 23:59:59 2023 GMT
                CA Issuers - URI:http://crt.sectigo.com/SectigoRSADomainValidationSecureServerCA.crt
```

check if has good split, to prevent error `Error: error:0908F066:PEM routines:get_header_and_data:bad end line`, check notes link

```shell
$ nano ssl-bundle.crt
```

done

```config
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
```

double check `common.env`

```shell
# new buyed one
HTTP_SERVER_CERT=es.critical-links.com/ssl-bundle.crt
HTTP_SERVER_KEY=es.critical-links.com/es_critical-links_com_key.txt
```

check logs before restart stack

```shell
$ docker-compose logs -f --tail 100
```

restart stack and check that everything works

```shell
cd /srv/docker/criticallinks/clkis/c3-ls-api
$ docker-compose down && docker-compose up -d && docker-compose logs -f --tail 100
```

problems always arrise

`Error: error:0B080074:x509 certificate routines:X509_check_private_key:key values mismatch`

this is what happens when we use a wrong private key file `es_critical-links_com_key.txt`

###### Disable c3-ls-api cronjob le-post-hook.sh

> when we don't use let's encrypt certificates, obvious we don't need it's job in cron job and `le-post-hook.sh`

```shell
$ sudo nano /usr/share/le-httpserver/le-post-hook.sh
```

comment `c3-ls-api block` on `le-post-hook.sh`

```shell
# BOF c3-ls-api block

# WARN c3-ls-api dont use lets encrypt certificates, it requires payed ones, else gives problems with ubuntu and c3 4.x

# # c3-ls-api
# DOMAIN_PROJECT_NAME=c3-ls-api
# DOCKER_PATH=/srv/docker/criticallinks/clkis/${DOMAIN_PROJECT_NAME}
# TARGET_PATH=${DOCKER_PATH}/volumes/app/config
# mkdir ${TARGET_PATH} -p
# cp ${SOURCE_PATH}/cert.pem ${TARGET_PATH}/server.crt
# cp ${SOURCE_PATH}/privkey.pem ${TARGET_PATH}/server.key
# cp ${SOURCE_PATH}/fullchain.pem ${TARGET_PATH}/fullchain.pem
# # restart service, to update certificates
# docker-compose -f ${DOCKER_PATH}/docker-compose.yml restart

# echo "Check certificates ${DOMAIN_PROJECT_NAME}:"
# CERT=${TARGET_PATH}/server.crt
# openssl x509 -in ${CERT} -text -noout | grep 'Validity\|Not Before\|Not After'

# # relaunch docker service stack, after has been down in le-pre-hook.sh
# cd $DOCKER_PATH
# cd /srv/docker/criticallinks/clkis/c3-ls-api/
# docker-compose stop && docker-compose start

# EOF c3-ls-api block
```

now everything works as expected