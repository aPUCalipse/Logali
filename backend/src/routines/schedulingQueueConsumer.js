const amqp = require('amqplib/callback_api')
const SchedulingCtrl = require('../controllers/schedulingCrtl')
const SchedulingModel = require('../model/scheduling')

module.exports = async function consumeFromQueueAccept(dbPool) {

    const schedulingCtrl = new SchedulingCtrl(dbPool)
    const schedulingModel = new SchedulingModel(dbPool)

    amqp.connect('amqp://localhost', async function (errorConnect, connection) {
        if (errorConnect) {
            throw errorConnect;
        }
        connection.createChannel(async function (errorCreateChannel, channel) {
            if (errorCreateChannel) {
                throw errorCreateChannel;
            }

            //passar nome da fila por parâmetro talvez
            var queue = 'scheduling-acept';

            channel.consume(
                //queue name
                queue,

                //action to consume data
                async function (msg) {
                    const response = {
                        message: null,
                        statusCode: 500
                    }

                    const message = JSON.parse(msg.content.toString())

                    let idScheduling = parseInt(message.idScheduling)
                    let idWorker = parseInt(message.idWorker)

                    try {
                        const respVal = await schedulingCtrl.verifyAcceptance(idScheduling, idWorker);
                        if (respVal.canAcept) {
                            const update = await schedulingModel.updateWorkerId(idWorker, idScheduling)
                            if (update) {
                                response.message = "Inserção da fila para o banco realizada com sucesso"
                                response.statusCode = 200
                            }
                        } else {
                            response.message = "Inserção da fila para o banco não realizada"
                            response.statusCode = 400;
                        }
                    } catch (err) {
                        console.log("Erro na persistência na fila de agendamentos -> " + err)
                    } finally {
                        return response;
                    }
                },

                //delete message from queue on read 
                { noAck: true }
            )
        });

    });

}