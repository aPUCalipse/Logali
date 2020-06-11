//react e bootstrap
import React from 'react'

import { Row, Col } from 'react-bootstrap'

//Imagens
import location from '../../Images/location.svg'

//stylesheet
import style from './HomePage.module.css'

//layout padronizado
import MainLayout from '../MainLayout/MainLayout'

//testando módulo de cep
import cep from 'cep-promise'

//verificação de sessão
import { isLoggedIn } from "../../Functions/verifySession"

import { getLocation } from "../../Functions/geolocation"

isLoggedIn()
setInterval(function () { getLocation() }, 10000);

function HomePage() {
    return (
        <div>
            <MainLayout>
                <Row>
                    <Col md={6}>
                        <img className={style.Image_location_svg} src={location}></img>
                    </Col>

                    <Col md={6}>
                        <h2 className={style.Main_text_spotlight}>Faça seus agendamentos de serviços de forma fácil e rápida! É só clicar Logo Ali!</h2>
                    </Col>
                </Row>
            </MainLayout>
        </div>
    )
}

export default HomePage