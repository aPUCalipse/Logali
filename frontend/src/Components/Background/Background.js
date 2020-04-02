import React from 'react'
import style from './Background.module.css'
import {Container, Row, Col} from 'react-bootstrap'


function Background(props){
    return(
        <div className={style.Background_Container}>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <img 
                            className={style.Background_Image}
                            src={props.image} 
                            alt={props.description} 
                            height={props.height}
                            width={props.width}
                        />
                        <div className={style.Background_Spotlight}>{props.spotlight}</div>
                        <div className={style.Background_Common_Text}>{props.common_text}</div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Background