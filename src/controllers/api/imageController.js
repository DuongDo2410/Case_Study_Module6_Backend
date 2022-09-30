const Image = require("../../models/image")

const ImageController = {
    addImage: async (listImage) => {
        try {
            let image = await Image.create(listImage);
            return image;
        }catch (err) {
            console.log(err);
        }

    }
}
module.exports = ImageController;