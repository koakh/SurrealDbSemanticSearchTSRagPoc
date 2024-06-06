# cryptlex-lexactivator-importer

## Command Line Help

```shell
$ lexactivator-importer 
lexactivator-importer v1.0.5
Node.js script that imports/generates licenses into your cryptlex server. 

                 use: lexactivator-importer mode data/licenseTemplate.json data/data.csv|json simulateMode
                mode: import or generate
        simulateMode: true or false: OPTIONAL argument, default is false (non simulate)

           import ex: lexactivator-importer import data/batch-template.json data/sample.csv true
         generate ex: lexactivator-importer generate data/batch-template.json data/sample.json true

  extra metaDataKeys: declare a environment variable with "export CONFIG_EXTRA_METADATA_FIELDS='key1,key2'"
                    : or run command with "CONFIG_EXTRA_METADATA_FIELDS='key1,key2' lexactivator-importer args..."

using metadataFields: customConfig,beginDateId,monthDurationId,serialId,customerId,orderId,contractId,subscriptionGracePeriodId,cloudServerId
```

> Tip: to extend metaDataKeys use environment variable `CONFIG_EXTRA_METADATA_FIELDS` ex `CONFIG_EXTRA_METADATA_FIELDS='key1,key2`, where `key1,key2` is the new metaDataKeys
