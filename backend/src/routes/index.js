
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
                res.send(`Server has error \n\n err`)
            }
        })

        this.app.post('/isUp', function (req, res) {
            try{
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch(err) {
                console.log(err)
                res.send(`Server has error \n\n err`)
            }
        })

        this.app.put('/isUp', function (req, res) {
            try{
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch(err) {
                console.log(err)
                res.send(`Server has error \n\n err`)
            }
        })

        this.app.delete('/isUp', function (req, res) {
            try{
                res.status(200)
                res.send(`Server is Up and you sent ${JSON.stringify(req.body)}`)
            } catch(err) {
                console.log(err)
                res.send(`Server has error \n\n err`)
            }
        })
    }
}

module.exports = RouteService