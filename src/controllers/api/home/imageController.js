const Image = require("../../../models/image");

const ImageController = {
  addImage: async (data, res) => {
    try {
      let image = await Image.create(data.image);
      return image;
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
module.exports = ImageController;
