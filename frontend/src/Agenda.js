import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Modal from '@material-ui/core/Modal';
import create from './Components/Routes/scheduling.js';
import EnhancedTable from './ViewSchedulings'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { Formik, Form, Field } from "formik";
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as Yup from 'yup';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 700,
        height: 600,
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        outline: 0
    },
    header: {
        backgroundColor: '#45B39D',
        color: 'white',
        // width: '100%',
        // padding: '1%',
        // margin: '1%'
    },
    body: {
        width: '80%',
        padding: '2%',
        margin: theme.spacing(1)

    },
    bar: {
        backgroundColor: '#45B39D'
    },
    title: {
        color: '#45B39D',
        size: '14px',
        margin: theme.spacing(2)
    },
    save: {
        backgroundColor: '#45B39D',
        margin: theme.spacing(1)
    },
    icon: {
        margin: theme.spacing(1),
        float: 'right',
        right: '0px'
    }
}));

function MyVerticallyCenteredModal(props) {
    const classes = useStyles();
    const [typeScheduling, setTypeScheduling] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [dateTime] = (date + time);
    const [userId] = useState('0');
    const [observation, setObservation] = useState('');
    // useEffect(() => {
    async function handleAddScheduling(e) {
        e.preventDefault();
        const response = await create.post('/create', {
            userId,
            typeScheduling,
            dateTime,
            observation

        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log(response);
    };
    let yup = require('yup');
    let validationSchema = yup.object().shape({
        service: Yup.string()
            .required('Required'),
        // date: Yup.date()
        //   .required('Required'),

        // CEP: Yup.number()
        //   .required('Required'),
        // street: Yup.string()
        //   .required('Required'),
        // neighborhood: Yup.string()
        //   .required('Required'),  
        //   number: Yup.number()
        //   .required('Required'),
        // city: Yup.string()
        //   .required('Required'),
        // state: Yup.string()
        //   .required('Required'),    
    })

    function handleChange(event) {
        validationSchema.isValid(event)
            .then(function (valid) {
                console.log(valid)
            })
    }
    // });

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className={classes.header} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agendamento
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik>
                    <Form>
                        <Grid container
                            spacing={0.5}
                            justify="center"
                            alignItems="center">
                            <Grid item xs={12} >
                                <TextField id="standard-basic" name="typeScheduling" required className={classes.body} onChange={e => setTypeScheduling(e.target.value)} label="Servi&ccedil;o" color="#45B39D" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="standard-basic"
                                    label="Data"
                                    name="data"
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    required

                                    className={classes.body}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="time"
                                    label="Hora"
                                    name="time"
                                    type="time"
                                    onChange={e => setTime(e.target.value)}
                                    required
                                    className={classes.body}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </Grid>
                            <Divider variant="middle" />
                            <Grid item xs={12} sm={12}>
                                <h3 className={classes.title}>Observa&ccedil;o</h3>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextareaAutosize id="standard-basic" name="observation" onChange={e => setObservation(e.target.value)} className={classes.body} label="Observação" color="#45B39D" />
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Fab variant="extended" color="primary" aria-label="add" type="submit" onClick={props.onHide} className={classes.save}>
                    <CloseIcon className={classes.icon} />
                    Fechar
            </Fab>
                <Fab variant="extended" color="primary" aria-label="add" type="submit" onClick={e => handleAddScheduling(e)} className={classes.save}>
                    <SaveRoundedIcon className={classes.icon} />
                    Salvar
            </Fab>
            </Modal.Footer>
        </Modal>
    );
}

function App() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <>
            <EnhancedTable/>
            <Fab color="primary" className={classes.icon} onClick={() => setModalShow(true)} aria-label="edit">
                <EditIcon />
            </Fab>

            <Fab color="primary"  className={classes.icon} onClick={() => setModalShow(true)} aria-label="add">
                <AddIcon />
            </Fab>
         
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default App;