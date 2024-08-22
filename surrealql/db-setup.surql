# ACCOUNT

REMOVE TABLE account;

DEFINE TABLE account SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;

DEFINE FIELD email
    ON account
    TYPE string
    ASSERT string::is::email($value);

DEFINE FIELD pass
    ON account
    TYPE string
    PERMISSIONS
        FOR select, create NONE
        FOR update, delete
            WHERE $scope = 'account' && id = $auth.id
    VALUE crypto::argon2::generate($after);;

DEFINE INDEX idx_account
    ON account
    COLUMNS email UNIQUE;

DEFINE SCOPE account
  SESSION 24h
  SIGNUP {
    LET $account = CREATE account CONTENT {
      email: $email,
      pass: $pass
    };
    IF ($account.id) THEN {
      CREATE profile CONTENT {
        owner: $account.id,
        firstName: "",
        lastName: "",
        address: "",
        phone: ""
      };
      CREATE mailqueue CONTENT {
        owner: $account.id,
        email: $account.email,
        templateKey: "welcome"
      };
    } END;

    RETURN $account;
  }
  SIGNIN ( SELECT * FROM account WHERE email = $email AND crypto::argon2::compare(pass, $pass)	);

# PROFILE

REMOVE TABLE profile;

DEFINE TABLE profile SCHEMAFULL
    PERMISSIONS
        FOR select
            WHERE owner = $auth.id,
        FOR update
            WHERE $scope = 'account' && owner = $auth.id
        FOR create, delete NONE;

DEFINE FIELD owner
    ON TABLE profile TYPE string
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