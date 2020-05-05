import React from 'react'
import style from './Header.module.css'
import {Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
//import hat from '../../Images/hat.png'

function Header(){
    function checkIsLogged(){
      setTimeout(() => {
        console.log("to aqui")
        const userData = JSON.parse(localStorage.getItem("userData"))
        if(userData && userData.isLogged){
          if(userData.typeUser === '1'){
            document.getElementById('agendamentosCliente').removeAttribute('style')
          } else if(userData.typeUser === '2') {
            document.getElementById('agendamentosTecnico').removeAttribute('style')
          }
        }
      }, 10);
    }
    return(
        <Navbar expand="lg" className={style.Navbar_defaults}>
            <div className={style.Navbar_offset}></div>
            <Navbar.Brand className={style.Navbar_title} href="/">Logali</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/register">Cadastrar-se</Nav.Link>
                <Nav.Link href="/login">Logar</Nav.Link>
                <div id="agendamentosCliente" style={{display: 'none'}}>
                  <Nav.Link href="/agendar">Meus Agendamentos</Nav.Link>
                </div>
                <div id="agendamentosTecnico" style={{display: 'none'}}>
                  <Nav.Link href="/agenda">Meus Agendamentos</Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
            {checkIsLogged()}
        </Navbar>
    );
}

export default Header