REMOVE TABLE account; REMOVE TABLE profile;

# ACCOUNT

DEFINE TABLE account SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;

DEFINE FIELD email ON account TYPE string ASSERT is::email($value);
DEFINE FIELD pass ON account TYPE string
    PERMISSIONS
        FOR select, create NONE
        FOR update, delete WHERE $scope = 'account' && id = $auth.id;

DEFINE INDEX idx_account ON account COLUMNS email UNIQUE;

DEFINE SCOPE account
	SESSION 24h
	SIGNUP ( CREATE account CONTENT { email: $email, pass: crypto::argon2::generate($pass) } )
	SIGNIN ( SELECT * FROM account WHERE email = $email AND crypto::argon2::compare(pass, $pass)	);


# PROFILE

DEFINE TABLE profile SCHEMAFULL
    PERMISSIONS
        FOR select WHERE id = $auth.id,
        FOR update WHERE $scope = 'account' && owner = $auth.id
        FOR create, delete NONE;

DEFINE FIELD owner ON TABLE profile TYPE string
  PERMISSIONS
    FOR update NONE;
DEFINE FIELD firstName ON profile TYPE string;
DEFINE FIELD lastName ON profile TYPE string;
DEFINE FIELD address ON profile TYPE string;
DEFINE FIELD phone ON profile TYPE string ;

# EVENT

DEFINE EVENT create_profile ON TABLE account WHEN ($event = "CREATE") THEN {
  CREATE profile CONTENT {
    # `$after` is values from the event-trigger, which is `account`
    owner: $after.id,
    firstName: "",
    lastName: "",
    address: "",
    phone: ""
  }
};