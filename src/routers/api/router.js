const Router = require("express")
const homeRouter = require("./homeRouter")


const routes = Router.Router();

routes.use('/homes', homeRouter)

module.exports = routes;