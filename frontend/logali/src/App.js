import React, { Component } from 'react';
import './Components/css/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import cadastro from './Views/Register';

class App extends Component {

  // const api
  // function handleLogin(){
  //   if (document.getElementById('userInput').Value != '' && document.getElementById('senhaInput').Value != '') {
  //     const response = api.post('/Login', {user: document.getElementById('userInput').Value, senha: document.getElementById('senhaInput').Value});
  //      if (response.data == "1") {
  //          alert('', 'Logado com sucesso!');
  //      }
  //    }
  //  }
  render() {
    return (
      <div className="App">
        <form id="loginUser" name="LoginUser" encType="multipart/form-data" className="col-md-8 form-control-feedback">

          <h1 className="heading-cadastro">Login</h1>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Usuário: </label>
              <input type="text" name="user" className="form-control" id="userInput" placeholder="Digite seu Usuário" required="required" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="senha">Senha: </label>
              <input type="password" name="senha" className="form-control" id="senhaInput" placeholder="Digite sua senha" required="required" />
            </div>
          </div>
        </form>
        <button > Entrar</button>
        <Router>
          <nav>
            <Link to="/cadastro/" className="btn">Não tem uma conta? Cadastre-se!</Link>
            <Route path="/cadastro/" component={cadastro} />
          </nav>
        </Router>
      </div>
    );
  }
}

export default App;
