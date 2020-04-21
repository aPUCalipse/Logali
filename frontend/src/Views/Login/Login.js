import React, { Component } from 'react';
import {navigate, A} from 'hookrouter';

import {Row, Col, Form, Button} from 'react-bootstrap'

import api from '../../Components/Assets/api';

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            login: "",
            password: "",
            typeUser: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.login = this.login.bind(this)
    }

    handleInputChange(event){
        const id = event.target.id
        const value = event.target.value

        this.setState({
            [id]: value
        })
    }

    async login(){
        try{
            if(!this.state.login || this.state.login.length < 1){
                alert("O login deve ser preenchido")
                return
            }

            if(!this.state.password){
                alert("A senha deve ser preenchida")
                return 
            } else if(this.state.password.length < 8){
                alert("A senha deve conter no minimo 8 carateres")
                return 
            }

            if(!this.state.typeUser || this.state.typeUser.length < 1){
                alert("O tipo de usuario deve ser preenchido")
                return
            }

            const requestLogin = await api.post("/logali/app/scheduling/select", this.state)

            if(this.state.typeUser === '1'){
                navigate("/agendar")
            } else if(this.state.typeUser === '2') {
                navigate("/agendamentos")
            }
        } catch (err) {
            console.log("EROORR")
            console.log(err)


            if(err && err.response && err.response.data && err.response.data.message){
                alert(err.response.data.message)
            } else {
                alert(`Algo Inesperado Ocorreu: \n ${err}`)
            }
        }
    }

    render() {
        return (
            <div>
                <Form as={Row}>
                    <Form.Group as={Col} md={12}>
                        <Form.Label>Login:</Form.Label>
                        <Form.Control type="text" placeholder="Digite o login" id="login" value={this.state.login} onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group as={Col} md={12}>
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" placeholder="Digite seu nome" id="password" value={this.state.password} onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group as={Col} md={12} name="typeUser">
                        <Form.Label>Tipo de usuario</Form.Label>
                        <Form.Control as="select"custom id="typeUser" value={this.state.typeUser} onChange={this.handleInputChange}>
                            <option name="optionTypeUser" value="">Selecione como deseja logar</option>
                            <option name="optionTypeUser" value="1">Técnico</option>
                            <option name="optionTypeUser" value="2">Cliente</option>
                        </Form.Control>
                    </Form.Group>

                    <Col md={12}>
                        <A href="/register">Não tem uma conta? Junte-se a Nós</A>
                    </Col>

                    <Col md={12}>
                        <Button variant="success" onClick={this.login}>Logar</Button>
                    </Col>
                </Form>
            </div>
        );
    }
}

export default Login;
