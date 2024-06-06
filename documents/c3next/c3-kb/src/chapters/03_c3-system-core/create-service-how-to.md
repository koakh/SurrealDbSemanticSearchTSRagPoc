# Create Service HowTo

in this simple HowTo we will create a basic Actions service named `FoobarActionService`, with to basic actions one `ACTION_FOOBAR_OK` that will respond with a simple message, a `ACTION_FOOBAR_NOT_IMPL` not implemented action that with throw a `new Error(NOT_IMPLEMENTED)`

## Clone Template

```shell
# copy template
$ cp src/actions/service/@template /home/c3/c3-system-core/src/actions/service/foobar -R

# rename file name
$ mv src/actions/service/foobar/template-action-service.ts src/actions/service/foobar/foobar-action-service.ts
```

## Edit barrel file

```shell
# edit barrel file
$ code src/actions/service/foobar/index.ts
```

```shell
# change file name template...
export * from './template-action-service';
# ...to foobar
export * from './foobar-action-service';
```

## Add GenericEventAction's

```shell
# add GenericEventAction
$ code src/actions/types.ts
```

add `ACTION_FOOBAR_OK` and `ACTION_FOOBAR_NOT_IMPL`

> always use convention ACTION_${CATEGORY/SERVICE_NAME}_${ACTION_NAME}

```typescript
export enum GenericEventAction {
  ...
  // foobar
  ACTION_FOOBAR_OK = 'ACTION_FOOBAR_OK',
  ACTION_FOOBAR_NOT_IMPL = 'ACTION_FOOBAR_NOT_IMPL',
}
```

## Edit FoobarActionService

```shell
# now edit FoobarActionService
$ code src/actions/service/foobar/foobar-action-service.ts
```

> tip always remove ACTION_NOT_IMPLEMENTED from template, this is just a example, it is not to be used

now add `FoobarActionService` file

```typescript
import { ActionBaseClass, GenericEventActionMapObject, GenericEventActionPayload, NOT_IMPLEMENTED } from "@koakh/typescript-rest-actions-api";
import { GenericEventAction } from '../../types';

export class FoobarActionService extends ActionBaseClass {

  constructor() {
    super();
    this.initGenericEvenActionMap();
    // client type only: used this method ONLY in client types actions/client-type/*
    this.initGenericEventActionMapAll();
  }

  // init local module actions
  public initGenericEvenActionMap() {
    this.genericEventActionMap = new Map<GenericEventAction, GenericEventActionMapObject>([
      [GenericEventAction.ACTION_FOOBAR_OK, {
        func: this.genericEventActionServiceNameStubOK,
        body: {
          required: false,
        }
      }],
      [GenericEventAction.ACTION_FOOBAR_NOT_IMPL, {
        func: this.genericEventActionServiceNameStubKO,
        body: {
          required: false,
        }
      }],
    ]);
  }

  // init local module actions into final module genericEventActionMapAll
  public initGenericEventActionMapAll() {
    // combine all local module actions
    this.combineActions();
  }

  /**
   * ACTION_FOOBAR_SERVICE_STUB
   */
  public genericEventActionServiceNameStubKO = (payload: GenericEventActionPayload) => {
    return new Promise((_, reject) => {
      reject(new Error(NOT_IMPLEMENTED));
    })
  };

  /**
   * ACTION_FOOBAR_SERVICE_STUB
   */
  public genericEventActionServiceNameStubOK = (payload: GenericEventActionPayload) => {
    return new Promise((resolve, _) => {
      resolve({ message: 'ok' });
    })
  };
}
```

## Add now add `FoobarActionService` file to actionsBaseServices

we are done with `FoobarActionService`, but for this to work we need to add it to `actionsBaseServices` array

```shell
# edit main file
$ code src/main.ts
```

```typescript
private async initGenericActions() {
  const actionsBaseServices: ActionBaseInterface[] = [
    ...
    // add it
    new FoobarActionService(),
  ];
```

## Start and Test new Created Actions

```shell
# stop service first, only if is running
$ sudo service c3-system-core stop

# start core c3-system-core
$ npm run start

# launch test ACTION_FOOBAR_NOT_IMPL
$ curl --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_FOOBAR_NOT_IMPL"}'
# response
{
  "error": "current action is registered, but is not implemented! please implement a valid GenericEventActionFunction for it"
}

# launch test ACTION_FOOBAR_OK
$ curl --request POST \
  --url https://c3edu.online:8410/api/action \
  --header 'authorization: Bearer UFuii0U1NgVPB3P1nYx7fHuQdDGS6n92b4RheiQRNGurxB1mFzrHLj7mjO2ltNuj' \
  --header 'content-type: application/json' \
  --data '{"action": "ACTION_FOOBAR_OK"}'
# response
{
  "message": "ok"
}
```

done