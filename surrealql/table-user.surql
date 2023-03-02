DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;
DEFINE FIELD email ON user TYPE string ASSERT is::email($value);
# `pass` needs some validation TLC:
DEFINE FIELD pass ON user TYPE string ASSERT string::length(string::trim($value)) > 3 AND is::alphanum($value);
DEFINE FIELD firstName ON user TYPE string ASSERT is::alpha($value);
DEFINE FIELD lastName ON user TYPE string ASSERT is::alpha($value);
# `phone` needs some validation TLC:
DEFINE FIELD phone ON user TYPE string ASSERT is::alphanum($value);
DEFINE FIELD address ON user TYPE string ASSERT is::alphanum($value);

DEFINE INDEX idx_user ON user COLUMNS email UNIQUE;

