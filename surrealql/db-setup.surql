
# ACCOUNT
REMOVE TABLE account;

DEFINE TABLE account SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;

DEFINE FIELD email ON account TYPE string ASSERT is::email($value);
DEFINE FIELD pass ON account TYPE string
    PERMISSIONS
        FOR select, create NONE
        FOR update, delete WHERE $scope = 'account' && id = $auth.id
    VALUE crypto::argon2::generate($after);;

DEFINE INDEX idx_account ON account COLUMNS email UNIQUE;

DEFINE SCOPE account
  SESSION 24h
  SIGNUP {
    LET $account = CREATE account CONTENT {
      email: $email,
      pass: crypto::argon2::generate($pass)
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
        FOR select WHERE owner = $auth.id,
        FOR update WHERE $scope = 'account' && owner = $auth.id
        FOR create, delete NONE;

DEFINE FIELD owner ON TABLE profile TYPE string
  PERMISSIONS
    FOR update NONE;
DEFINE FIELD firstName ON profile TYPE string;
DEFINE FIELD lastName ON profile TYPE string;
DEFINE FIELD address ON profile TYPE string;
DEFINE FIELD phone ON profile TYPE string ;

# ENVIRONMENT
REMOVE TABLE envirnment;

DEFINE TABLE environment SCHEMAFULL PERMISSIONS
  FOR select,update, create, delete NONE;

DEFINE FIELD value ON TABLE environment TYPE string ASSERT $value != NONE;
DEFINE FIELD public ON TABLE environment TYPE bool ASSERT $value != NONE;

IF not(environment:mailchannelsSecret.id) THEN
  CREATE environment:clientId SET value = "test", public = false;
END;

IF not(environment:mailchannelsSecret.id) THEN
  CREATE environment:mailchannelsSecret SET value = "o%vFzf5s$SKuhv", public = false;
END;

IF not(environment:mailchannelsEndpoint.id) THEN
  CREATE environment:mailchannelsEndpoint SET value = "https://data.intergate.io/mailchannels", public = false;
END;

# MAILQUEUE
REMOVE TABLE mailqueue;

DEFINE TABLE mailqueue SCHEMAFULL PERMISSIONS
  FOR select,update, create, delete NONE;

DEFINE FIELD owner ON TABLE mailqueue TYPE string;
DEFINE FIELD email ON TABLE mailqueue TYPE string;
DEFINE FIELD templateKey ON TABLE mailqueue TYPE string;
DEFINE FIELD status ON TABLE mailqueue;

DEFINE EVENT sendmail ON TABLE mailqueue WHEN ($event = "CREATE") THEN {
  LET $clientId = SELECT value FROM environment:clientId;
  LET $secret = SELECT value FROM environment:mailchannelsSecret;
  LET $endPoint = SELECT value FROM environment:mailchannelsEndpoint;
  LET $status = SELECT * FROM http::post($endPoint.value, {
    dryRun: false,
    appId: 'membership',
    clientId: $clientId.value,
    secret: $secret.value,
    to: { email: $after.email },
    templateKey: "welcome",
  });
  UPDATE mailqueue SET status = $status[0].statusText WHERE owner = $after.owner;
}