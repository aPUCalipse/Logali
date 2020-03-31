//react e bootstrap
import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

//componentes 
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Background from '../../Components/Background/Background'

//Imagens
import mountain from '../../Images/mountain.jpg'

//stylesheet
import style from './HomePage.module.css'

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