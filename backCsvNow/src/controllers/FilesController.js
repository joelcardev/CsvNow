var { getUserById } = require("../Services/UsersService");

var { saveFile, getFilesByUser } = require("../Services/FileService");

module.exports = {
  async store(req, res) {
    try {
      let datas = req.body;

      let i = 0;
      if (!datas) {
        return res.status(400).json({
          errors: `File not found to save.`,
        });
      }

      if (!datas.idUser) {
        return res.status(400).json({
          errors: `Id user not found.`,
        });
      }

      const user = getUserById(datas.idUser);

      if (!user) {
        return res.status(400).json({
          errors: "User not found.",
        });
      }

      let fileSave = saveFile(datas);

      return res.status(200).send(fileSave);
    } catch (error) {
      return res.json(error);
    }
  },
  async getUserById(req, res) {
    try {
      const userId = req.query.idUser;

      if (!userId) {
        return res.status(400).json({
          errors: "id user not found.",
        });
      }

      let files = await getFilesByUser(userId);

      if (!files) {
        return res.status(400).json({
          errors: "files not found to user.",
        });
      }

      return res.status(200).send(files);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getFileByParams(req, res) {
    try {
      const userId = req.params.idUser;

      if (!userId) {
        return res.status(400).json({
          errors: "id user not found.",
        });
      }

      return res.status(200).send(userId);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
