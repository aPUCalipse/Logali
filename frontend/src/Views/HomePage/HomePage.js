//react e bootstrap
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

//componentes 
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Background from '../../Components/Background/Background'

//Imagens
import mountain from '../../Images/mountain.jpg'

//stylesheet
import style from './HomePage.module.css'

//testando módulo de cep
import cep from 'cep-promise'

cep('05010000')
  .then(console.log)

function HomePage(){
    return(
        <div className={style.HomePage_Container}>
            <Container>
                <Row>
                    <Col md={12}>
                        <Header />
                        <Background 
                            className={style.Background_Image}
                            image={mountain} 
                            description="Man carrying boxes"
                            height="100%"
                            width="100%"
                            spotlight="Du. Du hast. Du Hast Mich."
                            // common_text="Hier Kommt Die Sonne, Eins Zwei Drei"
                        />
                        {/* <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '} */}
                        <Footer />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage