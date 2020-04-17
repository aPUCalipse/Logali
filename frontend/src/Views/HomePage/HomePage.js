//react e bootstrap
import React from 'react'
import {Row, Col, Jumbotron} from 'react-bootstrap'

//componentes 
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

//Imagens
import location from '../../Images/location.svg'

//stylesheet
import style from './HomePage.module.css'

//testando módulo de cep
import cep from 'cep-promise'

cep('05010000')
  .then(console.log)

function HomePage(){
    return(
        <div className={style.HomePage_Container}>
            <Header />

            <Jumbotron className={style.jumbotron}>
                <Row>
                    <Col md={6}>
                        <img className={style.Image_location_svg} src={location}></img>
                    </Col>

                    <Col md={6}>
                        <h2 className={style.Main_text_spotlight}>Faça seus agendamentos de serviços de forma fácil e rápida! É só clicar Logo Ali!</h2>
                    </Col>      
                </Row>    
            </Jumbotron>

            <Footer />
        </div>
    )
}

export default HomePage