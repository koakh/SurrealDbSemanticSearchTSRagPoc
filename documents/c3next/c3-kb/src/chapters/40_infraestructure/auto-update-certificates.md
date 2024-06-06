# Auto update certificates

## How to update Online Certificates

C3 uses a **auto update certificate** cron job on `c3 4.x` and a scheduleJobs on c3-system-core `c3 5.x`, to **update the source online certificates** one must update the files on download server at <https://downloads.critical-links.com/certificates/>, after update certificate files, c3 devices will check if it's filesystem certificates are old, comparing it with new server certificates files, in case of local certificates are diferent or old it will update local certificates based on new onlione certificates

## Update server Certificates

to update source certificates on <https://downloads.critical-links.com/certificates/>

```shell
# enter in server
$ ssh root@hub.critical-links.com
# enter path
$ cd /srv/docker/caddy/volumes/caddy/public/downloads/certificates
$ mkdir -p .bak
# backup certificate (WARNING always increment)
$ mv c3edu.online.crt .bak/c3edu.online.crt_bak01
$ mv STAR_c3edu_online.zip .bak/STAR_c3edu_online_bak01.zip
# copy new certs
$ cp /tmp/STAR_c3edu_online.zip .
# unzip in place
$ unzip STAR_c3edu_online.zip
# copy to destination
$ sudo cp STAR_c3edu_online.crt c3edu.online.crt
```

> NOTE: `c3edu.online.key` is the same key that we use, just leave it, don't replace it, unless it is a new and from a new provider, some Joe waste 1h to figure what how to extract .key from .ca-bundle, dont'be a Joe and KISS follow this simple tut

## Test C3 5.0 Auto Update Certificates

```shell
# check log
$ sudo tail -f /var/log/c3-update-cronjob.log

# in other terminal manually launch script
# enter path
$ cd /usr/share/c3-system-core/scripts/scheduleJobs/
# launch script
$ ./schedulejob-update-certificates.sh
# should see this outcome in log terminal, in case of a successfully update certificate
deleted old /tmp/c3edu.online.crt
curl -k -s https://public.critical-links.com/certificates/c3edu.online.crt -o /tmp/c3edu.online.crt
c3edu.online.crt
    LOCAL_CRT_MD5: '3741c836976f0534b5045e6278e2b336'
   REMOTE_CRT_MD5: 'de1b095373ab4993217909247d41bb1d'
  CHANGED_CRT_MD5: 'true'
c3edu.online.key
    LOCAL_KEY_MD5: '3a4dbbe5f603729eb6b0c67f15f74228'
   REMOTE_KEY_MD5: '3a4dbbe5f603729eb6b0c67f15f74228'
  CHANGED_KEY_MD5: 'false'
backup certificate files, update certificate files, and restart apache2
```

if like to test with UI at <https://c3edu.online>

![image](../../assets/images/2022-11-10-16-46-20.png)

```shell
$ sudo nano /etc/c3-system-core/schedule-jobs/schedule-jobs.json
```

change `SCHEDULE_JOB_UPDATE_CERTIFICATES` from `"visibleOnFrontend": false` to `"visibleOnFrontend": true`

```json
{
  "key": "SCHEDULE_JOB_UPDATE_CERTIFICATES",
  "title": "Update Certificates",
  "description": "Update Certificates",
  "enabled": true,
  "userTask": false,
  "visibleOnFrontend": false,
  ...
```

after change test, revert changes in `SCHEDULE_JOB_UPDATE_CERTIFICATES`

## C3 4.x Auto Update Certificates

```shell
# enter in c3 via ssh
$ ssh c3@c3edu.online
# one line update certificate and add to cronjob
$ curl -ks https://public.critical-links.com/certificates/update-certificates.sh  | sudo sh
```

> above script will add auto update cronjob
> warn: don't launch this script more than one time, everytime script is launched it will add a new cronjob, to edit cronjob use `sudo crontab -e`
