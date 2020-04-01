import React, { Component } from 'react';
import '../Components/css/App.css';
import api from '../Components/Assets/api';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "cliente",
            estadoOption: 'Estado'
        };
    }

    hideAddress() {
        document.getElementById('enderecoCliente').setAttribute('style', 'display: none');
        this.setState({
            selectedOption: 'prestador'
          }); 
    }

    showAddres() {
        document.getElementById('enderecoCliente').removeAttribute('style');
        this.setState({
            selectedOption: 'cliente'
          });
    }

    handleEstadoChange(event){
        this.setState({
            estadoOption: event.target.value
        });
    }

    handleRegister = async () => {
        if ((document.getElementById('senhaRInput').value === document.getElementById('confirmaInput').value)) {
            if (document.getElementById('prestadorRadio').checked || document.getElementById('prestadorRadio'.checked)) {
                const response = await api.post('/logali/app/register', {
                    nome: document.getElementById('nameInput').value, senha: document.getElementById('senhaRInput').value, login: document.getElementById('userRInput').value,
                    tipoUsuario: this.state.selectedOption, rua: document.getElementById('ruaInput').value, numero: document.getElementById('numberInput').value,
                    bairro: document.getElementById('bairroInput').value, cidade: document.getElementById('cidadeInput').value, estado: this.state.estadoOption,
                    cep: document.getElementById('cepInput').value
                });
                const body = await response.json();
                if (response.status !== 200) throw Error(body.message);
                alert("Usuário Cadastrado com sucesso");
                //           return body;
            }
            else {
                alert("Favor definir o tipo de usuário");
            }
        }
        else {
            alert("As Senhas não coincidem");
            console.log(document.getElementById('senhaRInput').value + " / " + document.getElementById('confirmaInput').value);
        }
    }

    render() {
        return (
            <div className="Resgister">
                <h1 className="heading-cadastro">Cadastrar-se </h1>
                <form id="cadastrarUser" name="LoginUser" encType="multipart/form-data" className="col-md-8 form-control-feedback">

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Nome: </label>
                            <input type="text" name="name" className="form-control" id="nameInput" placeholder="Digite seu nome" required="required" autoComplete="off" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="user">Usuário: </label>
                            <input type="text" name="user" className="form-control" id="userRInput" placeholder="Digite seu usuário" required="required" autoComplete="off" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="senha">Senha: </label>
                            <input type="password" name="senha" className="form-control" id="senhaRInput" placeholder="Digite sua senha" required="required" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="senha">Confirme sua senha: </label>
                            <input type="password" name="confirmaSenha" className="form-control" id="confirmaInput" placeholder="Confirme sua senha" required="required" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>
                                <input type="radio" name="tipoCliente" id="clienteRadio" className="form-check-input" onClick={() => this.showAddres()} /> Cliente
                    </label>
                            <label>
                                <input type="radio" name="tipoCliente" id="prestadorRadio" className="form-check-input" onClick={() => this.hideAddress()} /> Prestador de serviços
                    </label>
                        </div>
                    </div>

                    <div id="enderecoCliente" style={{ display: 'none' }}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="state">Estado: </label>
                                <select name="estado" placeholder="Estado" id="inputEstado" value={this.state.estadoOption} onChange={this.setState({estadoOption: Sele.value})}>
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
                        </div>
                        <div className="form-row">
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
                                <input type="number" name="name" className="form-control" id="complementoInput" placeholder="Há complemento?" autoComplete="off" />
                            </div>
                        </div>
                    </div>


                </form>
                <button onClick={this.handleRegister}>Registre-se</button>
            </div>
        );
    }
}

export default Register;
