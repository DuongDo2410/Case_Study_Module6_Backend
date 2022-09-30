const Image = require("../../models/image")
const District = require("../../models/district")
const City = require("../../models/city");

const DistrictController = {
    addDistrict: async (req, res) => {
        let data =  req.body;
        let a = await District.create(data);
        res.status(200).send(a);
    },

    getAllDistrict: async (req, res) => {
        try {
            let districts = await District.find();
            res.status(200).send(districts);
        }catch (err) {
            res.status(500).send(err.message)
        }
    },

    getDistrictByIdCity: async (req, res) => {
        try {
            let data = req.body;
            let districts = await District.find(data);
            res.status(200).send(districts);
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
}
module.exports = DistrictController;