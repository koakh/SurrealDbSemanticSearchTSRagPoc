# Build c3-iso

this kb explain **how to build a c3-iso syncronized with our release system**, currently we have to match c3-system-core `version.json` file with iso, for this we must follow some strick and "easy steps"

> note: we use a c3 as development machine

## Checkout c3-Iso Project

```shell
$ cd ~
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-iso.git
$ cd c3-iso
# stitch branch
$ git swith iso5
```

> if not imported gpg keys before proceed with it and read the `README.md`

## Fixed releases liveCycle

currently we are working with current **fixed releases liveCycle**, and in this strategy we don't need to **up or bump versions** of docker image and debian package versions anymore, because we are "freezed" in same versions until we finished the release.

With this we start to thrust in c3-updater "black magic" to figure out versions changes based on **md5** and **sha256** without ever touch versions

but if one need to create a release, please follow [this link](../09_c3-updater/create-a-cryptlex-new-release-files.md) to create the release version

> if we change up or bump the release version ex 5.0.3, we must change some things in bellow files

- `c3-iso/staticfiles/srv/docker/system/docker-compose.yml`

```yaml
# sync version: 5.0.3
```

`build.conf`

```shell
# version ex 5.0.1 must match staticfiles/var/lib/c3/version.json
major_release='5'
minor_version='0'
patch_version='3'
```

and whenever we create a brand new release, we must update bellow files and up all software version

- `c3-iso/staticfiles/srv/docker/system/docker-compose.yml`

```yaml
  hub.critical-links.com/c3-microcloud-backend:1.0.35
  ...
  hub.critical-links.com/c3-microcloud-frontend:1.0.18
  ...
  hub.critical-links.com/c3-microcloud-cloud-client:1.0.6

  ...
  hub.critical-links.com/c3-system-service-syncthing:1.0.3
  ...
  hub.critical-links.com/c3-system-service-kiwix:1.0.2
```

- `c3-iso/bringImages.sh`

```shell
BACKEND_VERSION="1.0.35"
FRONTEND_VERSION="1.0.18"
CLOUD_CLIENT="1.0.6"
SYNCTHING_VERSION="1.0.3"
KIWIX_VERSION="1.0.2"
```

- `c3-iso/staticfiles/var/lib/c3/version.json`

> version.json is more tricky

## c3-system-core version

`c3-system-core/version/version.json` is a bit more tricker, we can edit it mannually but it will be to **tedius or error prone**, we can use a more "clever" strategy, that is use the `c3-updater` to update our c3 to **latest and greatest versions**, and after this update proccess we extract/copy the `version.json` file from `/var/lib/c3/version.json` to `/home/clkuser/c3-iso/staticfiles/var/lib/c3/version.json`, in the end we have `c3-updater` generated file for us, without human errors.

if we use **same c3 to build iso as the one we use to update our system** we can do just:

1. update our c3 to latest and greatest in <https://c3edu.online/update/> or <https://c3edu.online:8610>

2. copy version file to iso, this will happen on `build.sh` and its called using script `bringC3SystemCoreFiles.sh`

3. disable `c3-system-core` encription `version.json`, this will decrypt our `version.json` this way it can be used in iso, follow link [Disable version encription](../03_c3-system-core/faq.md#disable-version-encription)

step 3 is very important, because we can't use encrypted values from one c3 to other c3, we must uise plain text values else we will have empty string values on encrypted properties like `version`, `majorMinor` and `releaseChannel`

bad iso values

```json
{
  "majorMinor": "»U2FsdGVkX1/ZzhjU0xPykxof/KzSPOuaZ0anzEfdwkE=",
  "version": "»U2FsdGVkX19fA0QNDfZoQbjSyUyOdEsWhwkSEaxICrM=",
  "releaseChannel": "»U2FsdGVkX18f/Qsi7RIoy5Ik3bVNr6gOO5dYzr5xdik="
}
```

good iso values

```json
{
  "majorMinor": "5.0.3",
  "version": "5.0",
  "releaseChannel": "Stable"
}
```

always double check it after `build.sh` request

bring c3-system-core version file from current c3 device, WARNING this file must be updated to have updated installedMd5? if previously bring files, you can opt to skip (Yes/No)

## Build Iso

```shell
# enter path
$ cd /home/clkuser/c3-iso/

# build
$ sudo ./build.sh

# say yes to pull docker images, this will bring all docker images to use in offline while install iso
don\'t forget to change/update docker-compose.yaml service and bringImages.sh versions
> bring docker images? if previously download images, answear no, else it clean up downloaded images and pull+download again, this phase is only required when we need to update+pull+download again (Yes/No)

> TIP: always change version on `build.conf` before build iso
continue building iso 5.0.3 (Yes/No/Cancel)
```

> tip: remeber while build the iso, don't push new images or ubuntu packages to repos else hash will not match, why?

go drink a coffee (tip: assault H bunker), or better work in other stuff, this will need some extra time

```shell
# outcome
xorriso : UPDATE :  86.30% done, estimate finish Fri May 27 11:46:44 2022
xorriso : UPDATE :  94.96% done
ISO image produced: 1617970 sectors
Written to medium : 1617970 sectors at LBA 0
Writing to 'stdio:/home/c3/c3-iso/build/C3-5.0.3-C3TEST-20220527.iso' completed successfully.

###################################################################


ISO has been created!!!
```

## Publish Iso to Download server

```shell
$ ./pushIsoToServer.sh
> upload iso 5.0.3 to hub.critical-links.com:8443 staticServer? (Yes/No) 
# say yes, and move on

# use links ssh-key here
Enter passphrase for key '/home/clkuser/.ssh/id_rsa_clkis': 

download urls
  https://downloads.critical-links.com/C3-5.0.3-C3TEST-20210811.iso
  https://downloads.critical-links.com/C3-5.0.3-C3TEST-20210811.iso.txt
  https://downloads.critical-links.com/C3-5.x.x-latest.iso
  https://downloads.critical-links.com/C3-5.x.x-latest.iso.txt

> upload iso 5.0.3 to links-server kvm/iso? (Yes/No)
```

## Test Iso

**install the iso and test drive it**, confirm that the latest stuff is working, use c3-updater preUpdate to confirm that the system is updated, in case taht no one push some packages or images in meanwhile, if so, if we have new stuff, feel free to update it

## Problems and Solutions

### GPG Key problem

```shell
$ sudo ./build.sh
....
gpg: all values passed to '--default-key' ignored
gpg: no default secret key: No secret key
gpg: signing failed: No secret key
```

> Please read the REAME file at c3-iso/README

### posix_openpt (19: No such device)

> one an ignore this erro, and let iso build

```shell
$ sudo ./build.sh
....
E: Can not write log (Is /dev/pts mounted?) - posix_openpt (19: No such device)
```
