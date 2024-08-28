// Remove pass encryption
REMOVE TABLE account;
DELETE FROM profile;

DEFINE TABLE account SCHEMAFULL
  PERMISSIONS
    FOR select FULL
    FOR update
        WHERE id = $auth.id
    FOR create, delete NONE;

DEFINE FIELD email
    ON account
    TYPE string
    ASSERT string::is::email($value);

DEFINE FIELD pass
    ON account
    TYPE string
    VALUE $after;

DEFINE INDEX idx_account
    ON account
    COLUMNS email UNIQUE;

REMOVE SCOPE account;

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
  SIGNIN (SELECT * FROM account WHERE email = $email AND pass = $pass);

