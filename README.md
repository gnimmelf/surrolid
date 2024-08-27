# Solid JS Web-components using surrealDB

## Usage

1. Include files

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/themes/light.css"
/>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/themes/dark.css"
/>

<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/shoelace.js"
></script>
<script type="module" src="https://intergate.io/cdn/social-widgets.js"></script>
```
2. Set css vars

```html
<style>
  :root {
    --bg-color: var(--sl-color-emerald-950);
    --border-color: var(--sl-color-emerald-100);
  }
</style>
```

3. Use custom- / web-component

```html
<membership-widget
  datapoint="https://data.intergate.io/"
  title="My membership"
  namespace="intergate"
  database="test"
  scope="account"
></membership-widget>
```

# Roadmap

## TODO!

- [x] Make auto-login (`authenticate` with `localStorage.accessToken`) suspend before first render of login-form

- [ ] Replace Service-classes obersevable reactivity pattern. Use of SolidJs' `from` and the `Observable` abstract class is:

  -  Cumbersome, and type definitions are hard to implement

  - [ ] Use `createStore` instead? - Maybe inject into each service from `ServiceProvider`?

## Libs

- [x] Use Javascript sdk from Surreal.

  - [x] Works clientside?

- [ ] Replace Vite with Bun? - I hate Vite & love Bun... but:

  - Wait for better SolidJs support in bun: https://bun.sh/guides/ecosystem/solidstart

- [x] Require a zod-schema per fetch to parse `result.data` against (`safeParse` / `parse`)

- [x] I18n (@solid-primitives/i18n) - Return key if no translation found!

  - Check alternative https://github.com/the-cookbook/solid-intl


## Styling

- [x] Get rid of Unocss. Overkill for this scope.


- [x] Use Shoelace-style dark theme by default

  - [ ] Create proper shoelace theme

## Forms

- [ ] Form: slot (renderprop) for buttons, include `errors.formErros` in Form component

- [ ] Form: Success feedback, eg. last updated / saved (Maybe use this to "trigger" whole-store-change reactivity?)

  - [ ] Try Shoelace-style Toast?

- [x] Form: Feedback translation


## Surreal

- [x] Split table user into account + profile

- [ ] Maybe a db event table => Account history

- [ ] Make a ping call once db-connection is set up

  - [ ] Check session timeout. - How?

- [ ] transactional email w/ magic link

  -[ ] Reset password
  -[ ] Change e-mail

- [ ] Use arguments to surql statements instead of concatenating string-snippets

  - Is this really moot, because the sql enpoint is always open...?

## Other

- [ ] Solid POD for account info?
- [ ] Payment integrations (stripe/klarna/vipps)
- [ ] Contact
- [ ] Subcription

# Notes

- Zod / TS

  - https://scastiel.dev/zod-typescript

- SurrealDB:

  - https://github.com/kearfy/demo-nextjs-surrealdb/blob/main/tables/post.surql
  - https://github.com/theopensource-company/kards-social
  - https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b

# Localhost

## Server

```
surreal start -u admin -p gnimmelf --log=full file://database --bind 0.0.0.0:8055
```

## Client

```
surreal sql --conn wss://localhost:8055 -u admin -p gnimmelf --ns intergate  --db test --pretty
```

## Setup

**Schemas**

See `/surrealql/table-*`

**Enable scope authentication directly in SurrealDB**

See `/surrealql/scope-*`

## Testing

Lacking, as allways on learning-projects like this...