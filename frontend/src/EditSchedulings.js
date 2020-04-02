import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import axios from 'axios';

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
        color: 'rgba(0.0, 0, 0.2, 0.7)',
        size: '10px',
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

function MyVerticallyCenteredModal(props,mode) {
    const classes = useStyles();
    const [typeScheduling, setTypeScheduling] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [dateTime] = date + " " + time; 
    const [userId] = useState('1');
    const [id] = useState('0');
    const [observation, setObservation] = useState('');
    const [count, setCount] = useState('0');
    const [responseGet, setResponseGet] = useState("");
    

    function onChange(e){
        console.log(e.target);
        if(e.target.value==""){
            console.log("ola");
            e.target.helperText="Incorrect entry.";
            return  <TextField error id="standard-error" label="Campo obrigatório" defaultValue="Hello World" />;
        }
        else
            setTypeScheduling(e);
    }

    async function handleGetScheduling() {
       
        const response = await axios.get('http://localhost:8000/logali/app/scheduling/getId', {id:"1"},
        )
          .then(function (response) {
            setTypeScheduling(response.data.data[0].id);
            setDate( response.data.data[0].date.split("T"));
            setTime(response.data.data[0].time)
            setObservation(response.data.data[0].observation)
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log(response);
    };
    useEffect(() => {
        if(count == 0){
            handleGetScheduling();
            setCount(count+1);
            console.log(count);
        }
        
        console.log(count);
    })
    // async function handleGetScheduling() {
    //     const response = await axios.get('http://localhost:8000/logali/app/scheduling/getId', {id:"1"},
    //     )
    //       .then(function (response) {
    //         setResponse(response);
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //       setResponse(response);
    //       console.log(response);
    // };

    var postData = {
        id,
            typeScheduling,
            date,
            time,
            observation
      };
      
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "PUT"
        }
      };
      
    
    async function handleEditScheduling(e) {
        e.preventDefault();
        const response = await axios.put('http://localhost:8000/logali/app/scheduling/update', postData,
        axiosConfig)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          console.log(response);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className={classes.header} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar
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
                                <TextField id="standard-basic" name="typeScheduling" helperText="" required className={classes.body} onChange={e => setTypeScheduling(e)} label="Servi&ccedil;o" color="#45B39D" value={typeScheduling}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="standard-basic"
                                    label="Data"
                                    name="data"
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    required
                                    defaultValue = {date[0]}
                                    value={responseGet.dateTime}
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
                                    defaultValue = {time}
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
                                <p className={classes.title}>Observa&ccedil;&atilde;o</p>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextareaAutosize id="standard-basic" name="observation" onChange={e => setObservation(e.target.value)} className={classes.body} label="Observação" color="#45B39D"  defaultValue={observation} value={observation}>{observation}</TextareaAutosize>
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
                <Fab variant="extended" color="primary" aria-label="add" type="submit" onClick={e => handleEditScheduling(e)} className={classes.save}>
                    <SaveRoundedIcon className={classes.icon} />
                    Salvar
            </Fab>
            </Modal.Footer>
        </Modal>
    );
}

function EditScheduling() {
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
    function eventEdit(){
       // handleGetScheduling();
        setModalShow(true);
       
    }
  
    
    return (
        <>
            <Fab color="primary" className={classes.icon} onClick={() => eventEdit()} aria-label="edit">
                <EditIcon />
            </Fab>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default EditScheduling;