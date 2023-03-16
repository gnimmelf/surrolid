# TODO

# High pri

- [] Use arguments to surql statements instead of concatenating string-snippets
- [] Require a zod-schema per fetch to parse `result.data` against (`safeParse` / `parse`)

- [] Form: slot (renderprop) for buttons, include `errors.formErros` in Form component
- [] Form: Success feedback, eg. last updated / saved (Maybe use this to "trigger" whole-store-change reactivity)
- [] Form: Feedback translation

### Db

- [x] Split table user into account + profile
- [] Maybe a db event table => Account history
- [] Require old pass to change pass

- [] Make a ping call once db-connection is set up

  - [] Check session timeout

## Other

- [] Transactional emails

  - [] Reset password email w/ magic link
  - [] Signup email

- [] Payment integrations (stripe/klarna/vipps)
- [] Contact
- [] Subcription

## Try

- [] [Material components](https://suid.io/getting-started/installation)
- [] [Particles](https://github.com/matteobruni/tsparticles/tree/main/components/solid)

# Notes

- Zod / TS

  - https://scastiel.dev/zod-typescript

- SurrealDB:

  - https://github.com/kearfy/demo-nextjs-surrealdb/blob/main/tables/post.surql
  - https://github.com/theopensource-company/kards-social
  - https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b

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
