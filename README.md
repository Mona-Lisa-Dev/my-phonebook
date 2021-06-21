# my-phonebook

Phonebook application with authorization

```shell
Technologies: React | React Hooks | React Router | Code Splitting | Redux | Redux persist | SCSS modules | Axios | mobile-first adaptive site with authorization | Node.js
```

```shell
baseUrl = "https://my-phonebook-rest-api.herokuapp.com/api";
```

```js
/* /users/signup: */
{
      status: 'success',
      code: 201,
      data: {
        user: { id, name, email, subscription, avatarURL },
      },
}

/* /users/login: */
{
      status: 'success',
      code: 200,
      data: {
          token,
          user: { name, email, subscription }
          },
}

/* /users/current: */
{
      status: 'success',
      code: 200,
      data: {
        user: { name, email, subscription, avatarURL },
      },
}
```
