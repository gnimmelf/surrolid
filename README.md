# TODO

## High pri

- [] lib/db.ts: Check usage of arguments to surql statements instead of concatenating string-snippets

  - [] Split table user into account + profile
  - [] ServiceProvider: Plit service into account ("auth") + profile + etc

- [x] Check / sanitize db io for XSS injecton
- [x] isLoading feedback
- [x] Form submit: Buttons under form, use type="submit"
- [] Form: slot for buttons, include `errors.formErros` in Form component
- [] Form: Success feedback, eg. last updated / saved

  - [] Maybe a db event table => Account history

- [] Check session timeout
- [] Account page

  - [x] Password-change

    - [] Require old pass to change pass

- [] Transactional emails

  - [] Reset password email w/ magic link
  - [] Signup email

## Other

- [] Payment integrations (stripe/klarna/vipps)
- [x] A field-component that shows errors (src/components/Field.tsx) and has a slot / accepts children for form elements
- [] Contact
- [] Subcription
- [x] Zod => TS, defer types from Zod schemas
- [x] Zod: Extract and import schema-types used more than once, eg `email` and `pass`

## Try

- [] [Material components](https://suid.io/getting-started/installation)
- [] [Particles](https://github.com/matteobruni/tsparticles/tree/main/components/solid)

# SurrealDB

Sombody else's notes:
https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b

## Server

```
surreal start -u admin -p gnimmelf --log=full file://database --bind 0.0.0.0:8055
```

## Sql

```
surreal sql --conn http://localhost:8055 -u admin -p gnimmelf --ns intergate  --db test --pretty
```

## Setup

**Schemas**

See `/surrealql/table-*`

**Enable scope authentication directly in SurrealDB**

See `/surrealql/scope-*`

## Testing

```
curl --request POST \
  --url http://localhost:8000/signin \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"ns": "intergate","db": "test","sc": "account","email": "flemming@intergate.io","pass": "flemming"}'
```
