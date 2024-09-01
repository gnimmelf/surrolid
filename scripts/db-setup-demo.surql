// Remove pass encryption
DELETE FROM profile;
DELETE FROM account;

# DEMO_ACCOUNTS

REMOVE TABLE demo_accounts;
DEFINE TABLE demo_accounts SCHEMAFULL
  PERMISSIONS
    FOR select FULL
    FOR update
        WHERE owner = $auth.id;

DEFINE FIELD owner
    ON TABLE demo_accounts
    TYPE record(account)
    VALUE $value;

DEFINE FIELD email
    ON demo_accounts
    TYPE string
    ASSERT string::is::email($value);

DEFINE FIELD pass
    ON demo_accounts
    TYPE string
    VALUE $value;

# ACCOUT

REMOVE FIELD pass ON TABLE account;
DEFINE FIELD pass
    ON account
    TYPE string;

REMOVE SCOPE account;
DEFINE SCOPE account
  SESSION 24h
  SIGNUP {
    LET $account = array::first(CREATE account CONTENT {
        email: $email,
        pass: $pass
    });
    IF ($account.id) THEN {
        CREATE demo_accounts CONTENT {
            owner: $account.id,
            email: $email,
            pass: $pass,
        };
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

REMOVE EVENT update_demoaccounts ON TABLE account;

DEFINE EVENT update_demo_accounts
    ON TABLE account
    WHEN $event = "UPDATE"
    THEN {
        UPDATE demo_accounts SET
            email = $after.email,
            pass = $after.pass
        WHERE owner = $auth.id;
    };


