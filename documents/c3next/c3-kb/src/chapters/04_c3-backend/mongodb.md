# MongoDB

## Security
1. **Connections localhost only** - mongodb port is not exposed to the internet
    ```yml
    docker-compose.yml
    ports:
        # localhost only
        - 127.0.0.1:27017:27017
        # exposed to the internet (DEV)
        # - 27017:27017
    ```
2. **Authentication** - mongodb requires valid authentication to connect.
    
    Dockerfile.mongodb
    ```
    FROM mongo:4.4
    ENV MONGO_INITDB_ROOT_USERNAME clkuser
    ENV MONGO_INITDB_ROOT_PASSWORD clkpasssword_secured_c3b4fe2398a5cc (hide password on kb?)
    ```

    Build docker image
    ```
    docker build . -f Dockerfile.mongodb -t c3-system-service-mongo
    ```
To connect do mongodb, we must provide the following URI:
```shell
mongodb://clkuser:clkpasssword_secured_c3b4fe2398a5cc@c3edu.online/c3-database
```

## Colections
### Contents

Content rules:
- There should be only one ROOT node
- Parent nodes must be "ROOT", "CONTENT_PACKAGE", "DIRECTORY",



```ts
export class Content {
  _id?: Types.ObjectId;

  name: string;
  description?: string;
  type: NodeType;
  parent?: Types.ObjectId; // ref: 'Content'
  grade?: string;
  subject?: string;
  tags?: string[];

  url?: String;
  thumbnail?: String;
  lockChanges?: Boolean;
  
  // TODO: owner... assume "cn" or "username" will not change and use it? or reference by id?
  // @Prop({ type: Types.ObjectId, ref: 'User' }) owner: Types.ObjectId;
  // @Prop({ type: String' }) owner: string

  // when NodeType is LINK
  linkTo?: Types.ObjectId;

  // Cloud
  folderId?: String;
  syncStatus?: SyncStatus;
}

enum NodeType {
  ROOT = 'ROOT',

  // represents the "main node" of the content
  CONTENT_PACKAGE = 'CONTENT_PACKAGE',

  // Content types
  LINK = 'LINK', // link to another content
  URL = 'URL', // literaly a url
  DIRECTORY = 'DIRECTORY',
  ARCHIVE = 'ARCHIVE', // our archive!
  WIKI = 'WIKI',

  // File types (extracted from mymetype)
  // - usefull - https://www.computerhope.com/issues/ch001789.htm
  IMAGE = 'IMAGE', // jpeg, png
  VIDEO = 'VIDEO', // mp4, mpeg, mov, ...
  AUDIO = 'AUDIO', // mp3, wav, ...
  TEXT = 'TEXT',
  PDF = 'PDF',
  DOC = 'DOC',
  PPT = 'PPT',
  XLS = 'XLS',

  // unknow type... to avoid
  UNKNOWN = 'UNKNOWN',

  // Legacy types. C3 4.X
  // now is: CONTENT_PACKAGE
  LEGACY_STRUCTURED_CONTENT = 'STRUCTURED_CONTENT',
  LEGACY_CONTENT = 'CONTENT',
  LEGACY_FILE = 'FILE', // too generic... cloud should send the "new node type"
}
```