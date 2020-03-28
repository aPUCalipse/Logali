import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import cadastro from './Views/Register';

function App() {

  // const api
  // function handleLogin(){
  //   if (document.getElementById('userInput').Value != '' && document.getElementById('senhaInput').Value != '') {
  //     const response = api.post('/Login', {user: document.getElementById('userInput').Value, senha: document.getElementById('senhaInput').Value});
  //      if (response.data == "1") {
  //          alert('', 'Logado com sucesso!');
  //      }
  //    }
  //  }

  return (
    <div className="App">
      <form form id="loginUser" name="LoginUser" enctype="multipart/form-data" class="col-md-8 form-control-feedback">

        <h1 class="heading-cadastro">Login</h1>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Usuário: </label>
            <input type="text" name="user" class="form-control" id="userInput" placeholder="Digite seu Usuário" required="required" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="senha">Senha: </label>
            <input type="password" name="senha" class="form-control" id="senhaInput" placeholder="Digite sua senha" required="required" />
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

export default App;
