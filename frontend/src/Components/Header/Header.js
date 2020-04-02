import React from 'react'
import style from './Header.module.css'
import {Container, Row, Col} from 'react-bootstrap'
//import hat from '../../Images/hat.png'

function Header(){
    return(
        <div className={style.Header_Container}>
            <Container>
                <Row>
                    <Col md={6}>
                        <p className={style.Header_Title}>Logali</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header