/*
repository is the layer that access the database

EX:
function selectUserById(userId){
  const {rows} = db.query("SELECT * FROM users WHERE id = $1;", [userId])
}
*/
