const Router = require("express")
const homeRouter = require("./homeRouter")
const dayRouter = require("./day")
const cityRouter = require("./city")
const districtRouter = require("./district")


const routes = Router.Router();

routes.use('/homes', homeRouter)
routes.use('/day', dayRouter)
routes.use('/city', cityRouter)
routes.use('/district', districtRouter)

module.exports = routes;