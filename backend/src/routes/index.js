
class RouteService{
    constructor(expressInstance){
        this.app = expressInstance
    }

    init(){
        this.test()
    }

    test(){
        this.app.get('/canDoGetRequests', function (req, res) {
            try{
                res.status(200)
                res.send('Server is Up')
            } catch(err) {
                console.log(err)
            }
        })

        this.app.post('/canDoPostRequests', function (req, res) {
            try{
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch(err) {
                console.log(err)
            }
        })
    }
}

module.exports = RouteService