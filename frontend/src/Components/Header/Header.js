import React from 'react'
import style from './Header.module.css'
import { Navbar, Nav, Button } from 'react-bootstrap'

import ButtonUi from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Fab from '@material-ui/core/Fab';
import Star from '@material-ui/icons/Star';

import { navigate, A } from 'hookrouter';
//import hat from '../../Images/hat.png'

function Header() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [name, setName] = React.useState(null);
  const [rateAVG, setRateAVG] = React.useState(null);

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function checkIsLogged() {
    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem("userData"))
      if (userData) {
        if (userData.name) {
          setName(userData.name)
        }

        if (userData.rateAVG) {
          setRateAVG(userData.rateAVG)
        }
      }

      if (userData && userData.isLogged) {
        if (userData.typeUser === '1') {
          document.getElementById('agendamentosCliente').removeAttribute('style')
        } else if (userData.typeUser === '2') {
          document.getElementById('agendamentosTecnico').removeAttribute('style')
        }
        document.getElementById('logout').removeAttribute('style')
      }
      else {
        document.getElementById('register').removeAttribute('style')
        document.getElementById('login').removeAttribute('style')
      }

    }, 10);
  }

  function logout(event) {
    handleClose(event)
    const userData = {
      idUser: null,
      typeUser: null,
      isLogged: false
    }

    localStorage.setItem("userData", JSON.stringify(userData))
    navigate("/")
  }
  return (
    <Navbar expand="lg" className={style.Navbar_defaults}>
      <div className={style.Navbar_offset}></div>
      <Navbar.Brand className={style.Navbar_title} href="/">Logali</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <div id="register" style={{ display: 'none' }}>
            <Nav.Link href="/register">Cadastrar-se</Nav.Link>
          </div>
          <div id="login" style={{ display: 'none' }}>
            <Nav.Link href="/login">Logar</Nav.Link>
          </div>
          <div id="agendamentosCliente" style={{ display: 'none' }}>
            <Nav.Link href="/agendar">Meus Agendamentos</Nav.Link>
          </div>
          <div id="agendamentosTecnico" style={{ display: 'none' }}>
            <Nav.Link href="/agenda" >Meus Agendamentos</Nav.Link>
          </div>

        </Nav>
        <Nav>
          <div id="logout" style={{ display: 'none' }}>
            <ButtonUi
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className={style.userButton}
            >
              <div className={style.userTextStyle}>
                <Fab size="medium" className={style.peopelIcon}>
                  <div className={style.starIconText}>{rateAVG}</div>
                  <Star className={style.starIcon} />
                </Fab>
                {name}
              </div>
            </ButtonUi>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={() => { navigate("/perfil") }}>Meu Perfil</MenuItem>
                        <MenuItem onClick={logout}>Sair</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Nav>
      </Navbar.Collapse>
      {checkIsLogged()}
    </Navbar >
  );
}

export default Header