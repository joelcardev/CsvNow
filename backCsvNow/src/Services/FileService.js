var { getUserById } = require("../Services/UsersService");
var { file } = require("../data/database");
const { default: FileSchema } = require("../models/fileModel");

function saveFile(datas) {
  debugger;
  if (datas == null) {
    return null;
  }

  const { idUser, data, nameFile } = datas;

  let fileAlreadyExists = file.find((item) => item.data == data);

  if (fileAlreadyExists) {
    return null;
  }

  let dataFinal = {
    id: file.length + 1,
    nameFile: nameFile,
    idUser: idUser,
    data: data,
  };

  file.push(dataFinal);

  return dataFinal;
}
function getFilesByUser(idUser) {
  const user = getUserById(idUser);

  if (!user) {
    return null;
  }

  let filteredFiles = file.filter((file) => file.idUser == idUser);

  return filteredFiles;
}

function getFileByParams(params) {
  if (params == null) {
    return null;
  }

  return null;
}

module.exports = {
  saveFile,
  getFileByParams,
  getFilesByUser,
};
