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
        typeKey: "welcome"
      };
    } END;

    RETURN $account;
  }
	SIGNIN ( SELECT * FROM account WHERE email = $email AND crypto::argon2::compare(pass, $pass)	);
