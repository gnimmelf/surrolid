# ACCOUNT

REMOVE TABLE account;

DEFINE TABLE account SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete
        WHERE id = $auth.id
    FOR create NONE;

DEFINE FIELD email
    ON account
    TYPE string
    ASSERT string::is::email($value);

DEFINE FIELD pass
    ON account
    TYPE string
    VALUE crypto::argon2::generate($after);

DEFINE INDEX idx_account
    ON account
    COLUMNS email UNIQUE;

DEFINE SCOPE account
  SESSION 24h
  SIGNUP {
    LET $account = array::first(CREATE account CONTENT {
        email: $email,
        pass: $pass
    });
    IF ($account.id) THEN {
        CREATE profile CONTENT {
            owner: $account.id,
            firstName: "",
            lastName: "",
            address: "",
            phone: ""
        };
    } END;
    RETURN $account; // <= Important
  }
  SIGNIN ( SELECT * FROM account WHERE email = $email AND crypto::argon2::compare(pass, $pass)	);

# PROFILE

REMOVE TABLE profile;

DEFINE TABLE profile SCHEMAFULL
    PERMISSIONS
        FOR select, update
            WHERE owner = $auth.id
        FOR create, delete NONE;

DEFINE FIELD owner
    ON TABLE profile
    TYPE record(account)
    PERMISSIONS
        FOR update NONE;

DEFINE FIELD firstName
    ON profile
    TYPE string;

DEFINE FIELD lastName
    ON profile
    TYPE string;

DEFINE FIELD address
    ON profile
    TYPE string;

DEFINE FIELD phone
    ON profile
    TYPE string;