import React, { Component } from 'react';
//import '../Components/css/App.css';
import api from '../Components/Assets/api';

class Login extends Component {

  handleLogin = async () => {
    const response = await api.post('/logali/app/login', {
      usuario: document.getElementById('userInput').value , senha : document.getElementById('senhaInput').value
    });
    if (response.status !== 200) {
      throw Error(response.body.message)
      // Adicionar rota pra pagina de perfil;

    }
    else {
      alert('Erro no login' + response.Error);
    }
  
  }

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
        <button onClick={this.handleLogin}> Entrar</button>
        <br/>
     { /*  <Link to="/register" className="btn">Não tem uma conta? Cadastre-se!</Link> */  }
      </div>
    );
  }
}

export default Login;
