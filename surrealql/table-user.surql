DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE id = $auth.id,
    FOR create, delete NONE;
DEFINE FIELD email ON user TYPE string ASSERT is::email($value);
DEFINE FIELD pass ON user TYPE string ASSERT $value = /.*{4,80}/;
DEFINE FIELD firstName ON user TYPE string ASSERT $value == "" OR $value = /[ \p{L}'-]{3,40}/;
DEFINE FIELD lastName ON user TYPE string ASSERT $value == "" OR $value = /[ \p{L}'-]{3,40}/;
DEFINE FIELD address ON user TYPE string ASSERT $value == "" OR $value = /[ 0-9\p{L}',\.-]{3,60}/;
DEFINE FIELD phone ON user TYPE string ASSERT $value == "" OR $value = /^([\+][1-9]{2})?([0-9]{8})$/;

DEFINE INDEX idx_user ON user COLUMNS email UNIQUE;
