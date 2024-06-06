# Cryptlex Lexactivator license rules

## Internal Links

- [Support Contract and Software Updates](https://clkteam.atlassian.net/wiki/spaces/PDoc/pages/2025160705/Support+Contract+and+Software+Updates)

## License Metadata Keys and It's Use

### C3LexactivatorBridge Metadata Keys

valid default metaData keys are defined in:

- `c3-lexactivator/lerna-monorepo/packages/cryptlex-lexactivator-bridge/lib/config.js`,
- or in `CRYPTLEX_METADATA_KEYS`, or in systemd service `debian-5.0/deploy/c3-lexactivator-api.service` for ex `Environment=CRYPTLEX_METADATA_KEYS_LICENSE=customConfig,beginDateId,monthDurationId,serialId,customerId,orderId,contractId,subscriptionGracePeriodId,cloudServerId`, to override binary defaults

`c3-lexactivator/lerna-monorepo/packages/cryptlex-lexactivator-bridge/lib/config.js`

```ts
CRYPTLEX_METADATA_KEYS: {
  product: [],
  license: [
    'customConfig',
    'beginDateId',
    'monthDurationId',
    'serialId',
    'customerId',
    'orderId',
    'contractId',
    'subscriptionGracePeriodId',
    'cloudServerId'
  ]
}
```

metadata keys

- customConfig
- beginDateId
- monthDurationId
- serialId
- customerId
- orderId
- contractId
- subscriptionGracePeriodId
- cloudServerId

### Example of a license with suport enabled

>  both props `beginDateId` and `monthDurationId` are required to enable suport

```shell
$ curl -k --request GET \
  --url https://c3edu.online:8430/state \
  --header 'authorization: Bearer WygP1mAJzjYSTBJMy5GXhugeQHEyoj4Tz4vNAJDxn9K1AQpPoe1DtnvELIRIIt5H' \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  | jq
```

```json
{
  "expiryDate": 0,
  "expirationDate": "unlimited",
  "licenseKey": "AA282828282828FF",
  "product": {
    "id": "ad41970a-7f15-45d4-a6ff-1e7432ce1d8c",
    "version": "v1.0"
  },
  "key": "LICENSE_IS_GENUINELY_ACTIVATED",
  "message": "License is genuinely activated",
  "licenseType": "node-locked",
  "daysLeft": "unlimited",
  "gracePeriodExpiryDate": 1664462365,
  "metadata": {
    "license": [
      {
        "customConfig": "modern-robotics"
      },
      {
        "beginDateId": "2020-01-01"
      },
      {
        "monthDurationId": "48"
      }
    ],
    "product": []
  },
  "client": {
    "userName": "Mário Monteiro",
    "email": "marioammonteiro@gmail.com",
    "company": ""
  },
  "licenseActivated": true,
  "trialActivated": false,
  "internalGracePeriod": {
  },
  "support": {
    "enabled": true,
    "expired": false,
    "monthDuration": "48",
    "beginDate": "2020-01-01 00:00:00",
    "expirationDate": "2024-01-01 00:00:00"
  }
}
```
