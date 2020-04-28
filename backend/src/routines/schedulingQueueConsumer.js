import schedulingCtrl from '../controllers/schedulingCrtl'
import schedulingModel from '../model/scheduling'

export function consumeFromQueueAccept(message){

    amqp.connect('amqp://localhost', function(errorConnect, connection) {
        if (errorConnect) {
            throw errorConnect;
        }
        connection.createChannel(function(errorCreateChannel, channel) {
            if (errorCreateChannel) {
                throw errorCreateChannel;
            }

            //passar nome da fila por parâmetro talvez
            var queue = 'scheduling-acept';
            let msg = message;

            channel.consume(
                //queue name
                queue, 

                //action to consume data
                function(msg){
                    const response = {
                        message: null,
                        statusCode: 500
                    }

                    let idScheduling = parseInt(JSON.parse(message).idScheduling)
                    let idWorker = parseInt(JSON.parse(message).idWorker)

                    try{
                        const respVal = await schedulingCtrl.verifyAcceptance(idScheduling, idWorker);
                        if(respVal.canAcept){
                            const update = await schedulingModel.updateWorkerId(idWorker, id)
                            if(update){
                                response.message = "Inserção da fila para o banco realizada com sucesso"
                                response.statusCode = 200
                            }
                        } else {
                            response.message = "Inserção da fila para o banco não realizada"
                            response.statusCode = 400;
                        }
                    }catch(err){
                        console.log("Erro na persistência na fila de agendamentos -> " + err)
                    }finally{
                        console.log("OLHA A MENSAGEMMM: " + msg.content.toString());
                        return response;
                    }
                },

                //delete message from queue on read 
                {noAck: true}
            )

            channel.close()
            connection.close()
        });

    });

}