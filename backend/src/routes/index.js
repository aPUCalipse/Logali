
class RouteService{
    constructor(expressInstance){
        this.app = expressInstance
    }

    init(){
        this.test()
    }

    test(){
        this.app.get('/isUp', function (req, res) {
            try{
                res.status(200)
                res.send('Server is Up')
            } catch(err) {
                console.log(err)
            }
        })
    }
}

module.exports = RouteService