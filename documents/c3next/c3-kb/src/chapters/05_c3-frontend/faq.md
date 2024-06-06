# FAQ

## Remove License in Frontend

go to <https://c3edu.online/system/license/license-remove> and use password `clkpassremoval`

## Change Default Theme

```shell
# enabled c3 theme (enabled by default)
$ sudo rm /data/public/themes/default
$ sudo ln -s /data/public/themes/c3 /data/public/themes/default

# enabled modern-robotics theme
$ sudo rm /data/public/themes/default
$ sudo ln -s /data/public/themes/modern-robotics /data/public/themes/default

# tip: clear browser cache
```

## How to use System Date on frontend the Right Way

the rule of thumb to use frontend dates is **using the c3 system date** as the only source of true,
frontend date can be falsy date, date with other offset or some other unknow issue

to get c3 system date:

```shell
$ curl --request GET \
  --url http://c3edu.online/backend/v1/admin/system/time-configuration/-60 \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....' \
  --header 'content-type: application/json' \
  --data '{}'
# outcome
{
  "system": {
    "date": "2023-03-24T11:07:16.000Z",
    "timezone": {
      "id": "America/Mexico City",
      "offset": "-0600"
    }
  },
  "user": {
    "date": "2023-03-24T10:07:16.000Z",
    "timezone": {
      "offset": "-0100"
    }
  }
}
```

> note for parameter `-60`, this value is the frontend time zone offset, this value must be passed to backend endpoint to calculate the user date
> `user.date` is the user date calculated based on system date and user offset
>
> 