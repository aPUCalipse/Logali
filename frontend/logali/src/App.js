import React, { Component } from 'react';
import './Components/css/App.css';
import {Link} from "react-router-dom";

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
        <Link to="/login" className="btn">Fazer Login</Link>
        <br/> 
        <Link to="/register" className="btn">Fazer  Cadastro</Link>   
      </div>
    );
  }
}

export default App;
