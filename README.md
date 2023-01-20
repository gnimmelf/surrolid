# SurrealDB

Sombody else's notes:
https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b

## Server

```
surreal start -u admin -p gnimmelf --log=full file://surrealData.db
```

## Sql

```
surreal sql --conn http://localhost:8000 -u admin -p gnimmelf --ns intergate  --db test --pretty
```

## Setup

**Schemas**

```
DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD pass ON user TYPE string;
DEFINE FIELD firstName ON user TYPE string;
DEFINE FIELD lastName ON user TYPE string;
DEFINE FIELD phone ON user TYPE string;
DEFINE FIELD address ON user TYPE string;

DEFINE INDEX idx_user ON user COLUMNS email UNIQUE;
```

**Enable scope authentication directly in SurrealDB**

```
-- With pwd encryption
DEFINE SCOPE account
	SESSION 24h
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;

CREATE user SET email='flemming@intergate.io', pass = crypto::argon2::generate('flemming'), phone = '90066044;
```

```
-- No pwd encryption
DEFINE SCOPE account
	SESSION 24h
	SIGNUP ( CREATE user SET email = $email, pass = $pass )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND pass = $pass )
;

CREATE user SET email='flemming@intergate.io', pass = 'flemming';
```

## Testing

```
curl --request POST \
  --url http://localhost:8000/signin \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"ns": "intergate","db": "test","sc": "account","email": "flemming@intergate.io","pass": "flemming"}'
```
