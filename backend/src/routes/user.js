const _ = require('lodash')
const UserCtrl = require("../controllers/userCtrl")
const baseModuleRoute = "/user"

class userRouter {
    constructor(app, appBaseRoute, dbPool) {
        this.app = app
        this.dbPool = dbPool
        this.baseRoute = appBaseRoute + baseModuleRoute

        this.response = {
            message: null,
            data: {}
        }
    }

    init() {
        this.app.post(`${this.baseRoute}/selectUser`, this.selectUser.bind(this))
        this.app.post(`${this.baseRoute}/takeDatas`, this.takeDatas.bind(this))
    }

    async selectUser(userId) {
        const response = {
            data: [],
            message: null,
            statusCode: 500
        }

        try {
            const user = new UserCtrl(this.dbPool)
            const response = await user.selectUser(userId)

            if (response) {
                response.message = 'Usuário encontrado com sucesso'
                response.data = user
                response.statusCode = 200
            } else {
                response.message = 'Usuário não encontrado.'
                response.statusCode = 404
            }
        }

        catch (err) {
            response.message = `Erro desconhecido ao pesquisar -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async takeDatas(req, res) {
        const response = _.clone(this.response);
        try { 
            const user = new UserCtrl(this.dbPool);

            if (!_.isEmpty(req.body)) {
                const validadeData = user.validatedParams(
                    req.body.userId)

                if (validadeData) {
                    const resp = await user.takeData(req.body.userId)
                    response.message = "Seleção realizada com sucesso";
                    response.data = resp.data;
                    res.status(200);
                } else {
                    response.message = `Erro ao selecionar dados -> ${resp.message}`;
                    response.data = validatedParams.data;
                    res.status(resp.statusCode);
                }
            }else {
                response.message = "Os parametros não foram enviados";
                response.data = req.body;
                res.status(400);
            }
        }catch(err){
            response.message = `Erro desconhecido ao pesquisar -> ${err.toString()}`
            res.status(500);
        }finally{
            res.send(response);
        }
    }
}

module.exports = userRouter