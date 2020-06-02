const Chat = require('../model/chat')

class RegisterCtrl {
    constructor(dbPool) {
        this.register = new Register(dbPool)
    }

    validateParamsGet(sender, reciever) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                sender: nome,
                reciever: reciever,
            }
        }
        
        if (!sender) {
            validatedParams.isValid = false
            validatedParams.message = "O parâmetro sender está incorreto"
            validatedParams.statusCode = 400
        } else if (!reciever) {
            validatedParams.isValid = false
            validatedParams.message = "O parâmetro receptor está incorreto"
            validatedParams.statusCode = 400
        } 
        else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }

    async saveMessage(sender, reciever, message){
        const response = {
            message: null,
            statusCode: 500
        }
        try{
            const save = await this.chat.create(sender,reciever,message)
            response.message = save.message
            response.statusCode = 200
		}catch (err) {
            response.message = `Erro desconhecido ao gravar mensagem -> ${err.toString()}`
        } finally {
            return response
        }
	}

    async getMessages(DadosMensagem){
        const response = {
            data: null,
            message: null,
            statusCode: 500
        }

        try {
                const messages = await this.chat.getMessages(DadosMensagem.sender, DadosMensagem.reciever)
                response.message = messages.message
                response.statusCode = 200
                response.data = messages
        }
        catch (err) {
            response.message = `Erro desconhecido ao recuperar mensagens -> ${err.toString()}`
        } finally {
            return response
        }
	}
}