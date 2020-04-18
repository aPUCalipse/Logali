//react e bootstrap
import React from 'react'
import {Jumbotron} from 'react-bootstrap'

//componentes 
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

//stylesheet
import style from './MainLayout.module.css'

function MainLayout(props){
    console.log(props)
    return(
        <div className={style.MainLayout_Container}>
            <Header />

            <Jumbotron className={style.jumbotron}>
                {props.children}
            </Jumbotron>

            <Footer />
        </div>
    )
}

export default MainLayout