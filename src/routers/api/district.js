const Router = require("express")
const DistrictController = require("../../controllers/api/districtController")



const districtRouter = Router.Router();

districtRouter.post('', DistrictController.addDistrict);


module.exports = districtRouter;