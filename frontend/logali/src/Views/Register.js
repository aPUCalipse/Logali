import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function Register() {


    return (
        <div className="Resgister">
            <h1 class="heading-cadastro">Cadastrar-se </h1>
            <form form id="cadastrarUser" name="LoginUser" enctype="multipart/form-data" class="col-md-8 form-control-feedback">

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name">Nome: </label>
                        <input type="text" name="name" class="form-control" id="nameInput" placeholder="Digite seu nome" required="required" />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="user">Usuário: </label>
                        <input type="text" name="user" class="form-control" id="userInput" placeholder="Digite seu usuário" required="required" />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="senha">Senha: </label>
                        <input type="password" name="senha" class="form-control" id="senhaInput" placeholder="Digite sua senha" required="required" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="senha">Confirme sua senha: </label>
                        <input type="password" name="confirmaSenha" class="form-control" id="confirmaInput" placeholder="Confirme sua senha" required="required" />
                    </div>
                </div>

                <div class="form-row">
                <div class="form-group col-md-6">
                    <label>
                        <input type="radio" name="tipoCliente" value="cliente" checked={false} className="form-check-input" /> Cliente
                    </label>
                    <label>
                        <input type="radio" name="tipoCliente" value="cliente" checked={false} className="form-check-input" /> Prestador de serviços
                    </label>
                </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="cep">Código Postal: </label>
                        <input type="text" name="cep" class="form-control" id="cepInput" placeholder="Digite seu CEP" />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="street">Rua: </label>
                        <input type="text" name="street" class="form-control" id="ruaInput" placeholder="Digite sua rua"  />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="name">Número: </label>
                        <input type="number" name="name" class="form-control" id="numberInput" placeholder="Digite o número da casa"  />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="complemento">Complemento: </label>
                        <input type="number" name="name" class="form-control" id="complementoInput" placeholder="Há complemento?"  />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name">Estado: </label>
                            <select name="estado" placeholder="Estado" id="inputEstado" required>
                                <option value="" disabled selected hidden>Estado</option>
                                <option value="AC">Acre</option>
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
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="city">Cidade: </label>
                        <input type="text" name="city" class="form-control" id="cidadeInput" placeholder="Digite sua cidade"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="bairro">Bairro: </label>
                        <input type="text" name="bairro" class="form-control" id="bairroInput" placeholder="Digite seu bairro" />
                    </div>
                </div>



            </form>
            <button>Registre-se</button>
        </div>
    );
}

export default Register;
