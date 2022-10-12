const Rating = require ("../../../models/rating");
const Home = require ("../../../models/home");
const {loginWithGoogle} = require("../userController");

const ratingController ={
    ratingHome: async (req, res) => {
        try {
            let data = req.body;
            let idHome = req.body.id;
            let idUser = req.decoded.id;
            let checkHome = await Home.findById(idHome);
            if (!checkHome) {
                res.status(404).send({errorMessage: "Home not found!!"});

            } else {
                let rating = await Rating.findOne({idHome: idHome, idUser: idUser});
                if (rating){
                    await Rating.updateOne({_id : rating._id}, {rating: data.rating})
                }else {
                    let newRate = {idHome: idHome, idUser: idUser,rating:data.rating}
                    await Rating.create(newRate)
                }
                let ratingHouse = data.rating;
                checkHome.ratingCount +=1;
                checkHome.rating= Math.floor((+ratingHouse + checkHome.rating * checkHome.ratingCount) / (++checkHome.ratingCount));
                await checkHome.save();
                res.status(200).send(data);
            }

        } catch (err) {
            res.status(500).send({
                error: err.message,
            });
        }
    },

}
module.exports = ratingController;