import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Address() {
        return (
            <div id="enderecoCliente" style={{ display: "none" }} >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="state">Estado: </label>
                    </div>
                    <div className="form-group col-md-3">
                        <select name="estado" placeholder="Estado" id="inputEstado" value={this.state.estadoOption} onChange={this.handleEstadoChange}>
                            <option value="" disabled defaultValue hidden>Estado</option>
                            <option value="AC" >Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AM">Amazonas</option>
                            <option value="AP">Amapá</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RO">Rondônia</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SE">Sergipe</option>
                            <option value="SP">São Paulo</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="city">Cidade: </label>
                        <input type="text" name="city" className="form-control" id="cidadeInput" placeholder="Digite sua cidade" autoComplete="off" />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="bairro">Bairro: </label>
                        <input type="text" name="bairro" className="form-control" id="bairroInput" placeholder="Digite seu bairro" autoComplete="off" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="cep">Código Postal: </label>
                        <input type="text" name="cep" className="form-control" id="cepInput" placeholder="Digite seu CEP" autoComplete="off" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="street">Rua: </label>
                        <input type="text" name="street" className="form-control" id="ruaInput" placeholder="Digite sua rua" autoComplete="off" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="name">Número: </label>
                        <input type="number" name="name" className="form-control" id="numberInput" placeholder="Digite o número da casa" autoComplete="off" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="complemento">Complemento: </label>
                        <input type="text" name="name" className="form-control" id="complementoInput" placeholder="Há complemento?" autoComplete="off" />
                    </div>
                </div>
            </div>
        );
    }
export default Address;