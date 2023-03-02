# TODO

## High pri

- [] Check / sanitize db io for XSS injecton
- [] Suspense spinner when fetching
- [] Form submit: Buttons under form, use type="submit"
- [] Check session timeout
- [] Account

  - [x] Password-change

    - [] Require old pass to change pass

  - [] Transactional emails

## Other

- [x] A field-component that shows errors (src/components/Field.tsx) and has a slot / accepts children for form elements
- [] Contact
- [] Subcription
- [] Zod => TS, defer types from Zod schemas
- [] Zod: Extract and import schema-types used more than once, eg `email` and `pass`

## Try

- [] [Material components](https://suid.io/getting-started/installation)
- [] [Particles](https://github.com/matteobruni/tsparticles/tree/main/components/solid)

# SurrealDB

Sombody else's notes:
https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b

## Server

```
surreal start -u admin -p gnimmelf --log=full file://surrealData.db --bind 0.0.0.0:8055
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
