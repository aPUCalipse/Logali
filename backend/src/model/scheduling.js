const Moment = require("moment");

class Scheduling {
  constructor(dbPool) {
    this.dbPool = dbPool;
  }

  async create(userId, typeScheduling, dateTime, observation) {
    try {
      const query =
        `INSERT INTO logali.scheduling ` +
        `(userId, typeSchedulingId, statusSchedulingId, dateTime, observation, createdAt) VALUES ` +
        `(
                '${userId}', 
                '${typeScheduling}', 
                '1', 
                '${dateTime.format("YYYY-MM-DD HH:mm:ss")}', 
                '${observation}', 
                '${Moment().format("YYYY-MM-DD HH:mm:ss")}'
            )`;

      const resp = await this.dbPool.query(query);
      return resp;
    } catch (err) {
      throw new Error(`Erro ao inserir agendamento -> ${err}`);
    }
  }

  async delete(idScheduling) {
    try {
      const now = Moment().format("YYYY-MM-DD HH:mm:ss");
      const query =
        `UPDATE logali.scheduling ` +
        `SET ` +
        `deletedAt = '${now}' ` +
        `WHERE id = '${idScheduling}' `;

      const resp = await this.dbPool.query(query);
      if (resp && resp.affectedRows >= 1) {
        return resp;
      } else {
        throw new Error(`O id Enviado não existe no banco`);
      }
    } catch (err) {
      console.log(err);
      throw new Error(`Erro excluir agendamento -> ${err}`);
    }
  }

  async hasSameScheduling(userId, typeScheduling, dateTime) {
    try {
      const query =
        `SELECT 1 ` +
        `FROM logali.scheduling ` +
        `WHERE 1=1 ` +
        `AND userId = '${userId}' ` +
        `AND typeSchedulingId = '${typeScheduling}' ` +
        `AND dateTime = '${dateTime.format("YYYY-MM-DD HH:mm:ss")}' ` +
        `AND deletedAt is null`;

      const resp = await this.dbPool.query(query);
      return resp.pop();
    } catch (err) {
      throw new Error(`Erro na validação de agendamento -> ${err}`);
    }
  }

  async getSchedulingByIdAndIdUser(id, idUser) {
    try {
      const query =
        `SELECT ` +
        `workerId ` +
        `FROM logali.scheduling ` +
        `WHERE 1=1 ` +
        `AND id = '${id}' ` +
        `AND userId = '${idUser}' ` +
        `AND deletedAt is null`;

      const resp = await this.dbPool.query(query);

      return resp.pop();
    } catch (err) {
      throw new Error(`Erro ao atualizar agendamento -> ${err}`);
    }
  }

  async update(id, dateTime, observation) {
    try {
      const now = Moment().format("YYYY-MM-DD HH:mm:ss")
      const query =
        `UPDATE logali.scheduling ` +
        `SET ` +
        `dateTime = '${dateTime.format("YYYY-MM-DD HH:mm:ss")}' ` +
        (observation ? `, observation = '${observation}' ` : ` `) +
        ` , updatedAt = '${now}' ` +
        `WHERE id = '${id}' ` +
        `AND deletedAt is null`;

      console.log(query);

      const resp = await this.dbPool.query(query);

      if (resp && resp.affectedRows >= 1) {
        return resp;
      } else {
        throw new Error(`O id Enviado não existe no banco`);
      }
    } catch (err) {
      throw new Error(`Erro ao atualizar agendamento -> ${err}`);
    }
  }

  async validateUserId(userId) {
    const response = {
      isValid: false,
      user: "",
    };

    try {
      const searchUserQuery = `SELECT * FROM logali.user WHERE id = '${userId}' `;

      const searchUser = await this.dbPool.query(searchUserQuery);

      if (searchUser.length > 0) {
        response.isValid = true;
        response.user = searchUser.pop();
      }

      return response;
    } catch (err) {
      throw new Error(`Erro ao pesquisar endereço -> ${err}`);
    }
  }

  async searchEnd(addressId) {
    try {
      const queryAddress = `SELECT * FROM logali.address WHERE id = '${addressId}' `;
      const address = await this.dbPool.query(queryAddress);

      return address.pop();
    } catch (err) {
      throw new Error(`Erro ao pesquisar endereço -> ${err}`);
    }
  }

  async getSimplifyedById(id) {
    try {
      const query =
        `` +
        `SELECT *   ` +
        `FROM logali.scheduling s ` +
        `where s.id = ${id} ` +
        `AND deletedAt is null`;

      const resp = await this.dbPool.query(query);

      return resp.pop();
    } catch (err) {
      console.log(err);
      throw new Error(`Erro ao pesquisar agendamento -> ${err}`);
    }
  }
  async cancelAcept(id) {
    try {
      const now = Moment().format("YYYY-MM-DD HH:mm:ss")
      const query = `` +
        `UPDATE logali.scheduling ` +
        `SET workerId = null, ` +
        `statusSchedulingId = 1 ` +
        `, updatedAt = '${now}' ` +
        `where id = ${id} ` +
        `AND deletedAt is null`

      const resp = await this.dbPool.query(query);

      return resp
    } catch (err) {
      console.log(err)
      throw new Error(`Erro ao pesquisar agendamento -> ${err}`)
    }
  }

  async cancelAcept(id) {
    try {
      const query =
        `` +
        `UPDATE logali.scheduling ` +
        `SET workerId = null, ` +
        `statusSchedulingId = 1 ` +
        `where id = ${id} ` +
        `AND deletedAt is null`;

      const resp = await this.dbPool.query(query);

      return resp;
    } catch (err) {
      console.log(err);
      throw new Error(`Erro ao pesquisar agendamento -> ${err}`);
    }
  }

  async getId(id) {
    try {
      const query =
        `` +
        `SELECT ` +
        //dados do cliente
        `s.userId 'idClient', ` +
        `uc.name 'clientName', ` +
        //dados do endereço do cliente
        `ad.geoLocX,  ` +
        `ad.geoLocY,  ` +
        `ad.zipCode,  ` +
        `ad.number,  ` +
        `ad.street,  ` +
        `ad.complement,  ` +
        `ad.neighborhood,  ` +
        `ad.city,  ` +
        `ad.state, ` +
        //dados do tipo de agendamento
        `s.typeSchedulingId, ` +
        `ts.name 'nametypeSchedulig', ` +
        //dados do status do agedamento
        `s.statusSchedulingId, ` +
        `ss.name 'nameStatusScheduling', ` +
        //dados do técnico
        `s.workerId 'idWorker', ` +
        `uw.name 'workerName', ` +
        //dados do agendamento
        `s.id 'schedulingId', ` +
        `s.\`dateTime\`, ` +
        `s.observation, ` +
        `s.createdAt ` +
        `FROM logali.scheduling s ` +
        //join para coletar dados do cliente
        `join logali.user uc ` +
        `on uc.id = s.userId ` +
        //join para coletar dados do técnico se existir
        `left join logali.user uw ` +
        `on uw.id = s.workerId ` +
        //join para coletar dados do status do agendamento
        `join logali.statusscheduling ss ` +
        `on ss.id = s.statusSchedulingId ` +
        //join para coletar dados do tipo do agendamento
        `join logali.typescheduling ts ` +
        `on ts.id = s.typeSchedulingId ` +
        //join para coletar dados do endereço do cliente
        `join logali.address ad ` +
        `on ad.id = uc.addressId ` +
        `where s.id = ${id} ` +
        `AND deletedAt is null`;

      const resp = await this.dbPool.query(query);

      return resp.pop();
    } catch (err) {
      console.log(err);
      throw new Error(`Erro ao pesquisar agendamento -> ${err}`);
    }
  }

  async select(page, pageSize, idTypeScheduling, idStatusScheduling, idUser) {
    try {
      let query =
        `` +
        `SELECT ` +
        `s.userId 'idClient', ` +
        `uc.name 'clientName', ` +
        `s.typeSchedulingId, ` +
        `ts.name 'nametypeSchedulig', ` +
        `s.statusSchedulingId, ` +
        `ss.name 'nameStatusScheduling', ` +
        `s.workerId 'idWorker', ` +
        `uw.name 'workerName', ` +
        `uw.rateAVG, ` +
        `s.id 'schedulingId', ` +
        `s.\`dateTime\`, ` +
        `s.observation, ` +
        `s.createdAt ` +
        `FROM logali.scheduling s ` +
        `join logali.user uc ` +
        `on uc.id = s.userId ` +
        `left join logali.user uw ` +
        `on uw.id = s.workerId ` +
        `join logali.statusscheduling ss ` +
        `on ss.id = s.statusSchedulingId ` +
        `join logali.typescheduling ts ` +
        `on ts.id = s.typeSchedulingId ` +
        `join logali.address ad ` +
        `on ad.id = uc.addressId ` +
        `where 1=1 ` +
        `and uc.id = ${idUser} ` +
        `AND deletedAt is null `;

      if (idTypeScheduling) {
        query += `and s.typeSchedulingId = ${idTypeScheduling} `;
      }

      if (idStatusScheduling) {
        query += `and s.statusSchedulingId = ${idStatusScheduling} `;
      }

      query += `limit ${this.getPageByPaginatio(page, pageSize)}`;
      const resp = await this.dbPool.query(query);
      return resp;
    } catch (err) {
      throw new Error(`Erro ao selecionar agendamentos -> ${err}`);
    }
  }

  getPageByPaginatio(page, pageSize) {
    const init = page * pageSize - pageSize;
    const end = pageSize;

    return `${init},${end}`;
  }

  async viewScheduling(idWorker, filterType, filterStatus) {
    try {
      var query =
        `` +
        `SELECT ` +
        `s.userId 'idClient', ` +
        `uc.name 'clientName', ` +
        `uc.rateAVG, ` +
        `ad.geoLocX,  ` +
        `ad.geoLocY,  ` +
        `ad.zipCode,  ` +
        `ad.number,  ` +
        `ad.street,  ` +
        `ad.complement,  ` +
        `ad.neighborhood,  ` +
        `ad.city,  ` +
        `ad.state, ` +
        `s.typeSchedulingId, ` +
        `ts.name 'nametypeSchedulig', ` +
        `s.statusSchedulingId, ` +
        `ss.name 'nameStatusScheduling', ` +
        `s.id 'schedulingId', ` +
        `s.\`dateTime\`, ` +
        `s.observation, ` +
        `s.createdAt ` +
        `FROM logali.scheduling s ` +
        `join logali.user uc ` +
        `on uc.id = s.userId ` +
        `join logali.statusscheduling ss ` +
        `on ss.id = s.statusSchedulingId ` +
        `join logali.typescheduling ts ` +
        `on ts.id = s.typeSchedulingId ` +
        `join logali.address ad ` +
        `on ad.id = uc.addressId ` +
        `WHERE 1=1 ` +
        `AND s.workerId is null ` +
        `AND deletedAt is null `

      if (filterStatus) {
        query += `and s.statusSchedulingId = ${filterStatus} `;
      }

      if (filterType) {
        query += `and s.typeSchedulingId = ${filterType} `;
      }

      query += `union `;

      query +=
        `` +
        `SELECT ` +
        `s.userId 'idClient', ` +
        `uc.name 'clientName', ` +
        `uc.rateAVG, ` +
        `ad.geoLocX,  ` +
        `ad.geoLocY,  ` +
        `ad.zipCode,  ` +
        `ad.number,  ` +
        `ad.street,  ` +
        `ad.complement,  ` +
        `ad.neighborhood,  ` +
        `ad.city,  ` +
        `ad.state, ` +
        `s.typeSchedulingId, ` +
        `ts.name 'nametypeSchedulig', ` +
        `s.statusSchedulingId, ` +
        `ss.name 'nameStatusScheduling', ` +
        `s.id 'schedulingId', ` +
        `s.\`dateTime\`, ` +
        `s.observation, ` +
        `s.createdAt ` +
        `FROM logali.scheduling s ` +
        `join logali.user uc ` +
        `on uc.id = s.userId ` +
        `join logali.statusscheduling ss ` +
        `on ss.id = s.statusSchedulingId ` +
        `join logali.typescheduling ts ` +
        `on ts.id = s.typeSchedulingId ` +
        `join logali.address ad ` +
        `on ad.id = uc.addressId ` +
        `WHERE 1=1 ` +
        `AND s.workerId = ${idWorker} ` +
        `AND deletedAt is null `

      if (filterStatus) {
        query += `and s.statusSchedulingId = ${filterStatus} `;
      }

      if (filterType) {
        query += `and s.typeSchedulingId = ${filterType} `;
      }

      const resp = await this.dbPool.query(query);

      return resp;
    } catch (err) {
      console.log(err);
      throw new Error(`Erro ao pesquisar agendamento -> ${err}`);
    }
  }

  async getMaxPageOfView(pageSize, filterType, filterStatus, idWorker) {
    try {
      var query =
        `` +
        `SELECT ` +
        `count(*) as 'totalLines' ` +
        `FROM logali.scheduling s ` +
        `join logali.user uc ` +
        `on uc.id = s.userId ` +
        `join logali.statusscheduling ss ` +
        `on ss.id = s.statusSchedulingId ` +
        `join logali.typescheduling ts ` +
        `on ts.id = s.typeSchedulingId ` +
        `join logali.address ad ` +
        `on ad.id = uc.addressId ` +
        `WHERE 1=1 ` +
        `AND (s.workerId is null ` +
        `AND deletedAt is null ` +
        `OR s.workerId = ${idWorker}) `

      if (filterType) {
        query += `and s.typeSchedulingId = ${filterType} `;
      }

      if (filterStatus) {
        query += `and s.statusSchedulingId = ${filterStatus} `;
      }

      const resp = await this.dbPool.query(query);

      return Math.ceil(resp.pop().totalLines / pageSize);
    } catch (err) {
      console.log(err);
      throw new Error(`Erro ao pesquisar agendamento -> ${err}`);
    }
  }

  async tekeLocScheduling(workerId) {
    try {
      var query =
        `SELECT ` +
        `geoLocX, geoLocY ` +
        `FROM logali.address ` +
        `join user ` +
        `on user.addressId = address.id ` +
        `WHERE ` +
        `user.id = ${workerId}`;

      console.log(query);

      const resp = await this.dbPool.query(query);

      return resp.pop();
    } catch (err) {
      console.log(err);
      throw new Error(`Erro ao pesquisar Técnico -> ${err}`);
    }
  }


  async getAddressIdByUserId(workerId) {
    try {
      var query =
        `SELECT ` +
        `addressId ` +
        `FROM logali.user ` +
        `JOIN logali.address on ` +
        `address.id = user.addressId ` +
        `WHERE user.id = ${workerId}`;

      const resp = await this.dbPool.query(query);
      return resp;
    } catch (err) {
      throw new Error(`Erro ao selecionar endereço -> ${err}`);
    }
  }



  async insertGeoLoc(geoLocX, geoLocY) {
    try {
      var query =
        `INSERT INTO logali.address ` +
        `(geoLocX, geoLocY, createdAt) VALUES ` +
        `(
                    '${geoLocX}',
                    '${geoLocY}',
                    '${Moment().format("YYYY-MM-DD HH:mm:ss")}'
                )`;

      const resp = await this.dbPool.query(query);
      return resp;
    } catch (err) {
      throw new Error(`Erro ao inserir Localização -> ${err}`);
    }
  }

  //async getAddressJustBeInserted() {
  //    try {
  //        var query =
  //            `SELECT ` +
  //            `MAX(id) ` +
  //            `FROM logali.address`;

  //        const resp = await this.dbPool.query(query);
  //        return resp;
  //    } catch (err) {
  //        throw new Error(`Erro ao selecionar endereço -> ${err}`);
  //    }
  //}


  async updateGeoLoc(insertedId, geoLocX, geoLocY) {
    try {
      var query =
        `UPDATE logali.address ` +
        `SET geoLocX = ${geoLocX} ,` +
        `geoLocY = ${geoLocY} ` +
        `WHERE address.id = ${insertedId}`;

      const resp = await this.dbPool.query(query);
      return resp;
    } catch (err) {
      throw new Error(`Erro ao atualizar localização do Usuário -> ${err}`);
    }
  }

  async insertUpdating(insertedId, workerId) {
    try {
      var query =
        `UPDATE logali.user ` +
        `SET addressId = ${insertedId} ` +
        `WHERE user.id = ${workerId}`;


      const resp = await this.dbPool.query(query);
      return resp;
    } catch (err) {
      throw new Error(`Erro ao atualizar localização do Usuário -> ${err}`);
    }
  }
  async updateWorkerId(WorkerId, id) {
    try {
      const now = Moment().format("YYYY-MM-DD HH:mm:ss")
      const query =
        `UPDATE logali.scheduling ` +
        `SET ` +
        `WorkerId = '${WorkerId}' ,` +
        `statusSchedulingId = '2' ` +
        `, updatedAt = '${now}' ` +
        `WHERE id = '${id}' ` +
        `AND deletedAt is null `

      console.log(query);

      const resp = await this.dbPool.query(query);

      if (resp && resp.affectedRows >= 1) {
        return resp;
      } else {
        throw new Error(
          `Não foi possível atualizar o agendamento. Provavelmente ele foi excluído ou não existe.`
        );
      }
    } catch (err) {
      throw new Error(`Erro ao atualizar agendamento -> ${err}`);
    }
  }

  async closeScheduling(WorkerId, idScheduling) {
    try {
      const now = Moment().format("YYYY-MM-DD HH:mm:ss")
      const query =
        `UPDATE logali.scheduling ` +
        `SET ` +
        `updatedAt = '${now}' ` +
        `,statusSchedulingId = 5 ` +
        `WHERE id = ${idScheduling} ` +
        `AND workerId = ${WorkerId}`

      const resp = await this.dbPool.query(query)
      if (resp && resp.affectedRows >= 1) {
        return resp
      } else {
        throw new Error(`O não foi encontrado um agendamento com esses parâmetros`)
      }
    } catch (err) {
      console.log(err)
      throw new Error(`Erro encerrar agendamento -> ${err}`)
    }
  }

  async startScheduling(workerId, idScheduling) {
    try {
      const now = Moment().format("YYYY-MM-DD HH:mm:ss")
      const query =
        `UPDATE logali.scheduling ` +
        `SET ` +
        `updatedAt = '${now}' ` +
        `,statusSchedulingId = 3 ` +
        `WHERE id = ${idScheduling} ` +
        `AND workerId = ${workerId}`

      const resp = await this.dbPool.query(query)
      if (resp && resp.affectedRows >= 1) {
        return resp
      } else {
        throw new Error(`O não foi encontrado um agendamento com esses parâmetros`)
      }
    } catch (err) {
      console.log(err)
      throw new Error(`Erro encerrar agendamento -> ${err}`)
    }
  }

}

module.exports = Scheduling;
