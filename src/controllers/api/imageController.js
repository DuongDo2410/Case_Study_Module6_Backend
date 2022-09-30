const Image = require("../../models/image")

const ImageController = {
    addImage: async (data, res) => {
        try {
            await Image.create(data.image);
        }catch (err) {
            res.status(404).send(err);
        }

    }
}
module.exports = ImageController;