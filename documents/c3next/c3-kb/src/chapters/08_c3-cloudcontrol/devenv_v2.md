# Development Environment V2

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
3. Launch c3cloud frontend.

    ```shell
    $ cd c3ccontrol/frontend
    $ npm start
    ```

    <https://localhost:4200>

    - admin
    - root

4. Launch c3cloud dependencies.

    > assuming docker and docker-compose are installed
    
    Launch backend, mongodb and syncthing as containers.

    Open `backend/package.json` and set the following line
    ```json
    {
        "scripts": {
            "production": "nodemon -L --exitcrash --inspect=0.0.0.0:9230 main.js --ignore './uploads/'",
        }
    }
    ```

    Then, check `docker-compose.yml` file and launch it.

    ```sh
    docker-compose up -d && docker-compose logs -f
    ```


## Create images

```sh
# check node version
nvm use v9.11.2
# update image versions
cd c3ccontrol/
./set-version.sh 2.7.1
# build frontend image
cd frontend/
npm run build:prod
sudo ./dockerbuild.sh
# build backend image
cd backend/
sudo ./dockerbuild.sh
```

