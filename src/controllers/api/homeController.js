const Home = require("../../models/home");
const ImageController = require("./imageController")

const HomeController = {
    addHome: async (req, res) => {
        try {
            const data = req.body;
            let arrIdImage = await ImageController.addImage(data.image);
            data.idImage = arrIdImage;
            let home = await Home.create(data);
            res.status(200).send({home});
        }catch (err) {
            res.status(500).send({
                error: err.message
            });
        }
    }
}
module.exports = HomeController;