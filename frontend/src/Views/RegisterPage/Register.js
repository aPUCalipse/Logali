import React, { Component } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import style from './RegisterPage.module.css';
import api from '../../Components/Assets/api';
import "bootstrap/dist/css/bootstrap.min.css";
import { navigate, A } from 'hookrouter';

import cep from 'cep-promise'

//componentes 
import MainLayout from '../MainLayout/MainLayout'
import Address from '../../Components/Address/Address'

class Register extends Component {

    constructor(props) {
        super(props);
    }

    hideAddress() {
        const fiedsAddress = document.getElementsByName('enderecoCliente')

        for (let i = 0; i < fiedsAddress.length; i++) {
            fiedsAddress[i].setAttribute('style', 'display: none');
        }

        this.setState({
            selectedOption: 2
        });
    }

    showAddres() {
        const fiedsAddress = document.getElementsByName('enderecoCliente')

        for (let i = 0; i < fiedsAddress.length; i++) {
            fiedsAddress[i].removeAttribute('style');
        }

        this.setState({
            selectedOption: 1
        });
    }

    onBlurZipCode = async (element) => {
        const zipCode = element.target.value
        if (zipCode && zipCode.length === 8) {
            try {
                const response = await cep(zipCode)
                console.log(response)

                document.getElementById('numberInput').removeAttribute('disabled');
                document.getElementById('complementoInput').removeAttribute('disabled');

                if (response.street) {
                    document.getElementById('ruaInput').value = response.street
                } else {
                    document.getElementById('ruaInput').removeAttribute('disabled');
                }

                if (response.neighborhood) {
                    document.getElementById('bairroInput').value = response.neighborhood
                } else {
                    document.getElementById('bairroInput').removeAttribute('disabled');
                }

                if (response.city) {
                    document.getElementById('cidadeInput').value = response.city
                } else {
                    document.getElementById('cidadeInput').removeAttribute('disabled');
                }

                if (response.state) {
                    const optionsState = document.getElementsByName('optionStates')
                    for (let i = 0; i < optionsState.length; i++) {
                        if (optionsState[i].value === response.state) {
                            optionsState[i].setAttribute("selected", "true")
                            break
                        }
                    }
                } else {
                    document.getElementsByName('stateInput').removeAttribute('disabled');
                }
            } catch (err) {
                alert("Endereço não encontrado pelo CEP informado")
            }
        } else {
            alert("O cep deve conter 8 numeros")
        }
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
                    if (optionsState[i].selected) {
                        stateSelected = optionsState[i].value
                        break
                    }
                }

                const cep = document.getElementById('cepInput').value
                const rua = document.getElementById('ruaInput').value
                const numero = document.getElementById('numberInput').value
                const bairro = document.getElementById('bairroInput').value
                const cidade = document.getElementById('cidadeInput').value

                const fullAddresSplitedByPlus = `` +
                    `${cep.replace(" ", "+")}+` +
                    `${rua.replace(" ", "+")}+` +
                    `${numero.replace(" ", "+")}+` +
                    `${bairro.replace(" ", "+")}+` +
                    `${cidade.replace(" ", "+")}` +
                    `${stateSelected.replace(" ", "+")}` +
                    `Brasil`

                const APIResponse = await api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddresSplitedByPlus}&key=AIzaSyCkIMj_uHe2IZkO0jtrx-tYGPbcJyvr2jo`)

                const addressData = APIResponse.data.results.pop().geometry.location

                console.log(addressData)

                const geolocX = addressData.lat
                const geolocY = addressData.lng

                const response = await api.post(
                    '/logali/app/register/create',
                    {
                        nome: document.getElementById('nameInput').value,
                        senha: document.getElementById('senhaInput').value,
                        login: document.getElementById('userInput').value,
                        tipoUsuario: this.state.selectedOption,
                        cep: cep,
                        rua: rua,
                        numero: numero,
                        bairro: bairro,
                        cidade: cidade,
                        estado: stateSelected,
                        complemento: document.getElementById('complementoInput').value,
                        geolocX: geolocX,
                        geolocY: geolocX
                    });
                if (response.status !== 200) {
                    throw Error(response.body.message);

                }
                else {
                    alert("Usuário Cadastrado com sucesso");
                    navigate("/login")
                }
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
                <MainLayout>
                    <Card body>
                        <h1 className={style.title}>Cadastrar-se</h1>
                        <Form as={Row}>
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="text" placeholder="Digite seu nome" id="nameInput" required="required" autoComplete="off" />
                            </Form.Group>

                            <Form.Group as={Col} md={4}>
                                <Form.Label>Usuário:</Form.Label>
                                <Form.Control type="text" placeholder="Digite seu usuario" id="userInput" required="required" autoComplete="off" />

                            </Form.Group>

                            <Col md={4}></Col>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control type="password" placeholder="Digite sua senha" id="senhaInput" required="required" autoComplete="off" />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Confirmação de senha:</Form.Label>
                                <Form.Control type="password" placeholder="Digite a seha novamente" id="confirmaInput" required="required" autoComplete="off" />
                            </Form.Group>

                            <Col md={1} className="mb-3">
                                <Form.Check
                                    custom
                                    type={'radio'}
                                    id={`clienteRadio`}
                                    label={`Cliente`}
                                    name="tipoCliente"
                                    onClick={() => this.showAddres()}
                                />
                            </Col>

                            <Col md={11} className="mb-3">
                                <Form.Check
                                    custom
                                    type={'radio'}
                                    id={`prestadorRadio`}
                                    label={`Prestador de serviços`}
                                    name="tipoCliente"
                                    onClick={() => this.hideAddress()}
                                />
                            </Col>

                            <Address
                                onBlurZipCode={this.onBlurZipCode}
                            />

                            <Col md={10}></Col>
                            <Col md={1}>
                                <Button variant="success" onClick={this.handleRegister}>Registrar</Button>
                            </Col>
                        </Form>
                    </Card>
                </MainLayout>
            </div>
        );
    }
}

export default Register;
