import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import style from './Footer.module.css'

function Footer(){
    return(
        <div className={style.Footer_Container}>
            <Container>
                <Row>
                    <Col md={6}>
                        <p className={style.Footer_Copyright}>© Todos os direitos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer