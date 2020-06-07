import React from 'react'
import style from './Header.module.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import {Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
//import hat from '../../Images/hat.png'

function Header(){
    function checkIsLogged(){
      setTimeout(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        if(userData && userData.isLogged){
          if(userData.typeUser === '1'){
             document.getElementById('agendamentosCliente').removeAttribute('style')
          } else if(userData.typeUser === '2') {
            document.getElementById('agendamentosTecnico').removeAttribute('style')
          }
           document.getElementById('logout').removeAttribute('style')
        }
        else{
          document.getElementById('register').removeAttribute('style')
          document.getElementById('login').removeAttribute('style')
        }

      }, 10);
    }

    function logout(){
      const userData = {
        idUser: null,
        typeUser: null,
        isLogged: false
    }

    localStorage.setItem("userData", JSON.stringify(userData))
    }
    return(
        <Navbar expand="lg" className={style.Navbar_defaults}>
            <div className={style.Navbar_offset}></div>
            <Navbar.Brand className={style.Navbar_title} href="/">Logali</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <div id="register" style={{display: 'none'}}>
                  <Nav.Link href="/register">Cadastrar-se</Nav.Link>
                </div>
                <div id="login" style={{display: 'none'}}>
                  <Nav.Link href="/login">Logar</Nav.Link>
                </div>
                <div id="agendamentosCliente" style={{display: 'none'}}>
                  <Nav.Link href="/agendar">Meus Agendamentos</Nav.Link>
                </div>
                <div id="agendamentosTecnico" style={{display: 'none'}}>
                  <Nav.Link href="/agenda" >Meus Agendamentos</Nav.Link>
                </div>
               
              </Nav>
              <Nav>
              <div id="logout" style={{display: 'none'}}>
                <Tooltip title="Sair">
                  <Nav.Link  href= "/" className="justify-content-end" onClick={()=>logout()} className={style.Navbar_logout}><ExitToAppIcon fontSize="medium" /> </Nav.Link>
                  </Tooltip>
                </div>
              </Nav>
            </Navbar.Collapse>
            {checkIsLogged()}
        </Navbar>
    );
}

export default Header