import React from 'react'
import style from './Header.module.css'
import {Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
//import hat from '../../Images/hat.png'

function Header(){
    return(
        <Navbar expand="lg" className={style.Navbar_defaults}>
            <div className={style.Navbar_offset}></div>
            <Navbar.Brand className={style.Navbar_title} href="#home">Logali</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#">Como funciona?</Nav.Link>
            <Nav.Link href="#link">Fale Conosco</Nav.Link>
            <NavDropdown title="Usuário" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Cadastrar-se</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Entrar</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Serviços</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Avaliações</NavDropdown.Item>
            </NavDropdown>
            </Nav>

    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
  </Navbar.Collapse>
</Navbar>
    );
}

export default Header