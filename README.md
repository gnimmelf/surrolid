# SurrealDB

## Server

```
surreal start -u admin -p gnimmelf --log=full file://surrealData.db
```

## Sql

```
surreal sql --conn http://localhost:8000 -u admin -p gnimmelf --ns intergate  --db test --pretty
```

## Setup

```
DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD pass ON user TYPE string;
DEFINE INDEX idx_user ON user COLUMNS email UNIQUE;
```

### SCOPE

```
-- Enable scope authentication directly in SurrealDB
-- With encryption
DEFINE SCOPE account
	SESSION 24h
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;

CREATE user SET email='flemming@intergate.io', pass = crypto::argon2::generate($pass);
```

```
-- Enable scope authentication directly in SurrealDB
-- No encryption
DEFINE SCOPE account
	SESSION 24h
	SIGNUP ( CREATE user SET email = $email, pass = $pass )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND pass = $pass )
;

CREATE user SET email='flemming@intergate.io', pass = 'flemming';
```

```
curl --request POST \
  --url http://localhost:3000/surrealdb/signin \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"ns": "intergate","db": "test","sc": "allusers","email": "flemming@intergate.io","pass": "flemming"}'
```
