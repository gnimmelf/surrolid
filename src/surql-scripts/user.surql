DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;
DEFINE FIELD email ON user TYPE string ASSERT is::email($value);
DEFINE FIELD pass ON user TYPE string ASSERT $value != NONE;
DEFINE FIELD firstName ON user TYPE string;
DEFINE FIELD lastName ON user TYPE string;
DEFINE FIELD phone ON user TYPE string;
DEFINE FIELD address ON user TYPE string;

DEFINE INDEX idx_user ON user COLUMNS email UNIQUE;

