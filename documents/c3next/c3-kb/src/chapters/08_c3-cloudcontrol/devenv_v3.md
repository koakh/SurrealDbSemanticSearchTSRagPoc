# Development Environment

## Local development

1. Clone `c3 cloud control` and `clkis` project into your pc.

    The `clkis` project is responsible for the c3cloud deployment and image building

    ```sh
    # set GIT_USERNAME environment variable
    GIT_USERNAME=nunobe
    git clone https://${GIT_USERNAME}@bitbucket.org/criticallinksteam/c3ccontrol.git
    git clone https://${GIT_USERNAME}@bitbucket.org/criticallinksteam/clkis.git
    ```
2. Install npm modules.
    ```sh
    cd frontend/
    npm i
    cd ../backend/
    npm i
    ```
3. Start c3cloud dependencies.

    It is required the our **websocketserver**, a **mongodb instance** and a **server** with the docker exposed to the internet with ssl keys.

    3.1. Start docker-compose.yml

    3.2. install docker on your computer & [enable remote comunication](asd)

4. Finnaly, start backend and frontend.

    Open two terminals and run `npm start` on each project (backend & frontend)

### Custom arguments

1. Define your variables:
- Tenant
    - **TENANT_CLOUD_ADDRESS**  - default: 'c3cloudcontrol.com',
    - **TENANT_CLOUD_ADDRESS_DEFAULT**  - default: 'public.c3cloudcontrol.com',
- Ceph
    - **CEPH_API_URL** - default: '192.168.90.103',
    - **CEPH_API_PORT** - default: '8080',
    - **CEPH_API_USER** - default: 'admin',
    - **CEPH_API_PASS** - default: 'Str0ngP@sswOrd2122',
    - **CEPH_FS_NAME** - default: 'cephfs',

    change each variable you need in `backend.conf` or `.env`

### 

1. Setup your hosts file: `sudo nano /etc/hosts`
```sh

```

## Create images

```sh
# check node version
nvm use v9.11.2
# update image versions
cd c3ccontrol/
./set-version.sh 3.0.1
# build frontend image
cd frontend/
npm run build:prod
# build backend image
cd backend/
npm run build
sudo dockerbuild.sh
```

nvm use v9.11.2