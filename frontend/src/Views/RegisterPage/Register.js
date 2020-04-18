import React, { Component } from 'react';
import style from './RegisterPage.module.css';
import api from '../../Components/Assets/api';
import "bootstrap/dist/css/bootstrap.min.css";

//componentes 
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Address from '../../Components/Address/Address'

class Register extends Component {

    constructor(props) {
        super(props);
    }

    hideAddress() {
        document.getElementById('enderecoCliente').setAttribute('style', 'display: none');
        this.setState({
            selectedOption: 2
        });
    }

    showAddres() {
        document.getElementById('enderecoCliente').removeAttribute('style');
        this.setState({
            selectedOption: 1
        });
    }

    handleRegister = async () => {
        if (
            (document.getElementById('senhaInput').value === document.getElementById('confirmaInput').value)
        ) {
            if (
                    document.getElementById('clienteRadio').checked ||
                    document.getElementById('prestadorRadio').checked
            ) {
                const optionsState = document.getElementsByName('optionStates')

                console.log(optionsState)
                console.log(optionsState.length)

                let stateSelected = null

                for (let i = 0; i < optionsState.length; i++) {
                    if(optionsState[i].selected){
                        stateSelected = optionsState[i].value
                        break
                    }
                }

                const response = await api.post(
                    '/logali/app/register/create',
                    {
                        nome: document.getElementById('nameInput').value,
                        senha: document.getElementById('senhaInput').value,
                        login: document.getElementById('userInput').value,
                        tipoUsuario: this.state.selectedOption,
                        rua: document.getElementById('ruaInput').value,
                        numero: document.getElementById('numberInput').value,
                        bairro: document.getElementById('bairroInput').value,
                        cidade: document.getElementById('cidadeInput').value,
                        estado: stateSelected,
                        cep: document.getElementById('cepInput').value, 
                        complemento: document.getElementById('complementoInput').value, 
                        geolocX: -19.932661,
                        geolocY: -43.936254
                });
                if (response.status !== 200) {
                    throw Error(response.body.message);

                }
                else {
                    alert("Usuário Cadastrado com sucesso");
                }
                //           return body;
            }
            else {
                alert("Favor definir o tipo de usuário");
            }
        }
        else {
            alert("As Senhas não coincidem");
            console.log(document.getElementById('senhaInput').value + " / " + document.getElementById('confirmaInput').value);
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className={style.Margin}>
                    <div className={style.Register}>
                        <h1 className="heading - Cadastro">Cadastrar-se </h1>
                        <form id="cadastrarUser" name="LoginUser" encType="multipart/form-data" className="col-md-8 form-control-feedback">

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Nome: </label>
                                    <input type="text" name="name" className="form-control" id="nameInput" placeholder="Digite seu nome" required="required" autoComplete="off" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="user">Usuário: </label>
                                    <input type="text" name="user" className="form-control" id="userInput" placeholder="Digite seu usuário" required="required" autoComplete="off" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="senha">Senha: </label>
                                    <input type="password" name="senha" className="form-control" id="senhaInput" placeholder="Digite sua senha" required="required" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="senha">Confirme sua senha: </label>
                                    <input type="password" name="confirmaSenha" className="form-control" id="confirmaInput" placeholder="Confirme sua senha" required="required" />
                                </div>
                            </div>
                            <div className={style.Radio}>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label>
                                            <input type="radio" name="tipoCliente" id="clienteRadio" className="form-check-input" onClick={() => this.showAddres()} /> Cliente
                            </label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>
                                            <input type="radio" name="tipoCliente" id="prestadorRadio" className="form-check-input" onClick={() => this.hideAddress()} /> Prestador de serviços
                            </label>
                                    </div>
                                </div>
                            </div>
                            <Address />
                        </form>
                        <button className="btn btn-success" onClick={this.handleRegister}>Registre-se</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Register;
