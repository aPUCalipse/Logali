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
                        <select name="estado" placeholder="Estado">
                            <option name="optionStates" value="">Selecione o seu estado por favor</option>
                            <option name="optionStates" value="AC" >Acre</option>
                            <option name="optionStates" value="AL">Alagoas</option>
                            <option name="optionStates" value="AM">Amazonas</option>
                            <option name="optionStates" value="AP">Amapá</option>
                            <option name="optionStates" value="BA">Bahia</option>
                            <option name="optionStates" value="CE">Ceará</option>
                            <option name="optionStates" value="DF">Distrito Federal</option>
                            <option name="optionStates" value="ES">Espírito Santo</option>
                            <option name="optionStates" value="GO">Goiás</option>
                            <option name="optionStates" value="MA">Maranhão</option>
                            <option name="optionStates" value="MT">Mato Grosso</option>
                            <option name="optionStates" value="MS">Mato Grosso do Sul</option>
                            <option name="optionStates" value="MG">Minas Gerais</option>
                            <option name="optionStates" value="PA">Pará</option>
                            <option name="optionStates" value="PB">Paraíba</option>
                            <option name="optionStates" value="PR">Paraná</option>
                            <option name="optionStates" value="PE">Pernambuco</option>
                            <option name="optionStates" value="PI">Piauí</option>
                            <option name="optionStates" value="RJ">Rio de Janeiro</option>
                            <option name="optionStates" value="RN">Rio Grande do Norte</option>
                            <option name="optionStates" value="RO">Rondônia</option>
                            <option name="optionStates" value="RS">Rio Grande do Sul</option>
                            <option name="optionStates" value="RR">Roraima</option>
                            <option name="optionStates" value="SC">Santa Catarina</option>
                            <option name="optionStates" value="SE">Sergipe</option>
                            <option name="optionStates" value="SP">São Paulo</option>
                            <option name="optionStates" value="TO">Tocantins</option>
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
                        <input type="number" name="name" className="form-control" id="numberInput" placeholder="Digite o n�mero da casa" autoComplete="off" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="complemento">Complemento: </label>
                        <input type="text" name="name" className="form-control" id="complementoInput" placeholder="H� complemento?" autoComplete="off" />
                    </div>
                </div>
            </div>
        );
    }
export default Address;