DEFINE SCOPE account
	SESSION 24h
	SIGNUP ( CREATE user CONTENT {
		email: $email,
		pass: crypto::argon2::generate($pass),
		firstName: "",
		lastName: "",
		address: "",
		phone: ""
	})
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;