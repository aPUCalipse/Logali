import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useState, Component } from 'react';
import {navigate, A} from 'hookrouter';
import {Row, Col, Form, Button, Container} from 'react-bootstrap'
import axios from 'axios';

import style from './Login.module.css'

const FormLogin = () => {
    const { addToast } = useToasts()

    const [loginData, setInputValues] = useState({
        login: "",
        password: "",
        typeUser: ""
    });
      
    const handleInputChange = event => {
        const { id, value } = event.target;
        setInputValues({ ...loginData, [id]: value });
    };

    const login = async () =>{
        try{
            if(!loginData.login || loginData.login.length < 1){
                addToast(
                    'O login deve ser preenchido', 
                    { 
                        appearance: 'error',
                        autoDismiss: true
                    }
                )
                return
            }

            if(!loginData.password){
                addToast(
                    'A senha deve ser preenchida', 
                    { 
                        appearance: 'error',
                        autoDismiss: true
                    }
                )
                return 
            }

            if(!loginData.typeUser || loginData.typeUser.length < 1){
                addToast(
                    'O tipo de usuario deve ser preenchido', 
                    { 
                        appearance: 'error',
                        autoDismiss: true
                    }
                )
                return
            }

            const dataRequestLogin = {
                "login" : loginData.login,
                "senha": loginData.password,
                "tipoUsuario": loginData.typeUser
            }

            const resp = await axios.post(
                'http://localhost:8000/logali/app/login',
                dataRequestLogin
            )

            const userData = {
                idUser: resp.data.idUser,
                isLogged: true
            }

            localStorage.setItem("userData", JSON.stringify(userData))

            addToast(
                'Tudo certo, você será redirecionado...', 
                { 
                    appearance: 'success',
                    autoDismiss: true,
                    onDismiss: () => {
                        if(loginData.typeUser === '1'){
                            navigate("/")
                            // navigate("/agendamentos")
                        } else if(loginData.typeUser === '2') {
                            navigate("/agendar")
                        }
                    }
                }
            )
        } catch (err) {
            console.log("EROORR")
            console.log(err)


            if(err && err.response && err.response.data && err.response.data.message){
                addToast(
                    err.response.data.message, 
                    { 
                        appearance: 'error',
                        autoDismiss: true
                    }
                )
            } else {
                addToast(
                    `Algo Inesperado Ocorreu: \n ${err}`, 
                    { 
                        appearance: 'error',
                        autoDismiss: true
                    }
                )
            }
        }
    }

    return (
        <div className={style.backgound}>
            <Container>
                <div className={style.greenBox}>
                    <div className={style.boxLogin}>
                        <Form as={Row}>
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Login:</Form.Label>
                                <Form.Control type="text" placeholder="Digite o login" id="login" onChange={handleInputChange}/>
                            </Form.Group>

                            <Form.Group as={Col} md={12}>
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control type="password" placeholder="Digite seu nome" id="password" onChange={handleInputChange}/>
                            </Form.Group>

                            <Form.Group as={Col} md={12} name="typeUser">
                                <Form.Label>Tipo de usuario</Form.Label>
                                <Form.Control as="select"custom id="typeUser" onChange={handleInputChange}>
                                    <option name="optionTypeUser" value="">Selecione o tipo de usuario</option>
                                    <option name="optionTypeUser" value="1">Técnico</option>
                                    <option name="optionTypeUser" value="2">Cliente</option>
                                </Form.Control>
                            </Form.Group>

                            <Col md={12}>
                                <A href="/register  ">Não tem uma conta? Junte-se a Nós</A>
                            </Col>

                            <Col md={12}>
                                <Button variant="success" onClick={login}>Logar</Button>
                            </Col>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

class Login extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <ToastProvider
                autoDismissTimeout={3500}
            >
                <FormLogin />
            </ToastProvider>
        )
    }
}

export default Login