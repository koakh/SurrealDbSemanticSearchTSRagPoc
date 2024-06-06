# Docker Images

check versions
```
npm run docker:registry:versions
```

Build
```shell
npm run docker:build:cloud-client
npm run docker:build:syncthing
npm run docker:build:kiwix
```

Push
```
npm run docker:push:cloud-client
npm run docker:push:syncthing
npm run docker:push:kiwix
```

To develop, check development environment

## Syncthing

`/home/syncthing/config` - stores syncthing config and index.db

`/home/syncthing/data` - stores cloud content