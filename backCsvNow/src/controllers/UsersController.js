module.exports = {
  async store(req, res) {
    try {
      return res.status(200).send(0);
    } catch (error) {
      return res.json(error);
    }
  },

  async getUserById(req, res) {
    try {
      let { email, password } = req.body;

      return res.status(200).send(email);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
