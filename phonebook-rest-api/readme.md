```shell
baseUrl = "https://my-phonebook-api.herokuapp.com/";
```

```js
/* /users/signup: */
data: {
      status: 'success',
      code: 201,
      data: {
        user: { id, name, email, subscription, avatarURL },
      },
}

/* /users/login: */
data: {
      status: 'success',
      code: 200,
      data: {
          token,
          user: { name, email, subscription }
          },
}

/* /users/current: */
data: {
      status: 'success',
      code: 200,
      data: {
        user: { name, email, subscription, avatarURL },
      },
}
```
