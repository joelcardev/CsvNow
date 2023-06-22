var { users }  = require("../data/database");

function getUserById(userId) {
   
  
  if (userId == null) {
    return null;
  }

  let user = users.find((user) => user.idUser == userId);

  if (!user) {
    return null;
  }

  return user;
}

module.exports = {
    getUserById
};
