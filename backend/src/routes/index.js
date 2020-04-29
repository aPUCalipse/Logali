const SchedulingRouter = require('./scheduling')
const RegisterRouter = require('./register')
const RatingRouter = require('./rating')
const LoginRouter = require('./login')

const SchedulingQueueConsumer = require("../routines/schedulingQueueConsumer")
const appBaseRoute = "/logali/app"


class RouteService {
    constructor(expressInstance, dbPool) {
        this.app = expressInstance
        this.schedulingRouter = new SchedulingRouter(this.app, appBaseRoute, dbPool)
        this.registerRouter = new RegisterRouter(this.app,appBaseRoute,dbPool)
		this.loginRouter = new LoginRouter(this.app,appBaseRoute,dbPool)
        this.ratingRouter = new RatingRouter(this.app,appBaseRoute,dbPool)
        SchedulingQueueConsumer(dbPool)
    }

    init() {
        this.test()
        this.schedulingRouter.init()
        this.registerRouter.init()
		this.loginRouter.init()
    }

    test() {
        this.app.get(`${appBaseRoute}/isUp`, function (req, res) {
            try {
                res.status(200)
                res.send('Server is Up')
            } catch (err) {
                console.log(err)
                res.send(`Server has error \n\n ${err}`)
            }
        })

        this.app.post(`${appBaseRoute}/isUp`, function (req, res) {
            try {
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch (err) {
                console.log(err)
                res.send(`Server has error \n\n ${err}`)
            }
        })

        this.app.put(`${appBaseRoute}/isUp`, function (req, res) {
            try {
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch (err) {
                console.log(err)
                res.send(`Server has error \n\n ${err}`)
            }
        })

        this.app.delete(`${appBaseRoute}/isUp`, function (req, res) {
            try {
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch (err) {
                console.log(err)
                res.send(`Server has error \n\n ${err}`)
            }
        })
    }
}

module.exports = RouteService