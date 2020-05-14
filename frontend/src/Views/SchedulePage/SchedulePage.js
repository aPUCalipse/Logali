import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import create from '../../Components/Routes/scheduling';
import EnhancedTable from './ViewSchedulings';
import EditScheduling from './EditSchedulings';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { Formik, Form, Field } from "formik";
import Select from '@material-ui/core/Select';
import {InputLabel, MenuItem} from '@material-ui/core';
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
        margin: theme.spacing(1)

    },
    bodyError:{
        width: '80%',
        color: 'red',
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
    const [modalShow, setModalShow] = React.useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.idUser;
    const [id] = useState('0');
    const [observation, setObservation] = useState('');
    const [count, setCount] = useState('0');
    const [end, setEnd] = useState('');
    const [validateType, setValidateType] = React.useState(false);
    const [validateDate, setValidateDate] = React.useState(false);
    const [validateTime, setValidateTime] = React.useState(false);
 



    async function handleAddScheduling(e) {
        e.preventDefault();
        
        const dateArray = date.split("-");
        console.log(dateArray)
        const dateTime=(dateArray[2] + "-" + dateArray[1] + "-" +  dateArray[0] + " " + time + ":00" );
       
        console.log(dateTime)
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
    

    function validate(e){
        if(typeScheduling == "" || date =="" || time == ""){
            if(typeScheduling == "")
                setValidateType(true)
            else
                setValidateType(false)
            if(date =="" )
                setValidateDate(true)
            else
                setValidateDate(false)
            if(time =="" )
                setValidateTime(true)
            else
                setValidateTime(false)    
        }else{
            handleAddScheduling(e);
            setValidateType(false);
            setValidateDate(false)
            setValidateTime(false)
        }
    }
   
      const objectData = {
          userId: userId
      }
      
      async function handleEndScheduling() {
          console.log("BATATA " + userId)     
          const response = await axios.post('http://localhost:8000/logali/app/scheduling/searchEnd', objectData)
          .then(function (response) {
            setEnd(response.data.data)
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error.response);
              });

          console.log(response);
          return response
        };
  
    useEffect(() => {
        if(end == null || end==''){
            handleEndScheduling();
        }
    })
 


    return (
       
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
             <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
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
                                <FormControl style={!validateType ? {display:'block'} : { display: 'none' }}>
                            <InputLabel id="demo-simple-select-label" required>Servi&ccedil;o</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.body}
                                required
                                onChange={e => setTypeScheduling(e.target.value)}
                                hide = {validateType}
                                >
                                <MenuItem value={1}>Instalação</MenuItem>
                                <MenuItem value={2}>Manutenção em rede</MenuItem>
                                <MenuItem value={3}>BUG</MenuItem>
                                </Select>
                                </FormControl>
                                <FormControl  style={validateType ? {display:'block'} : { display: 'none' }}error>
                                    <InputLabel required id="demo-simple-select-error-label">Servi&ccedil;o</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    className={classes.body}
                                    required
                                    onChange={e => setTypeScheduling(e.target.value)}
                                    >
                                    <MenuItem value="">
                                        <em></em>
                                    </MenuItem>
                                    <MenuItem value={1}>Instalação</MenuItem>
                                    <MenuItem value={2}>Manutenção em rede</MenuItem>
                                    <MenuItem value={3}>BUG</MenuItem>
                                    </Select>
                                    <FormHelperText>Campo obrigatório</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div style={!validateDate ? {display:'block'} : { display: 'none' }}>
                                <InputLabel id="demo-simple-select-error-label" required color="red" className={classes.body}>Data</InputLabel>
                                    <TextField
                                        id="standard-basic"
                                        name="data"
                                        type="date"
                                        onChange={e => setDate(e.target.value)}
                                        required
                                        className={classes.body}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div style={validateDate ? {display:'block'} : { display: 'none' }} className={classes.body} error>
                                    <InputLabel id="demo-simple-select-error-label" color="red" required className={classes.bodyError}>Data</InputLabel>
                                    <TextField
                                         id="standard-basic"
                                        type="Data"
                                        name="Data"
                                        onChange={e => setDate(e.target.value)}
                                        className={classes.bodyError}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <FormHelperText className={classes.bodyError}>Campo obrigatório</FormHelperText>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div style={!validateTime ? {display:'block'} : { display: 'none' }}>
                                <InputLabel id="demo-simple-select-error-label" color="red" required className={classes.body}>Hora</InputLabel>
                                    <TextField
                                        id="time"
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
                                </div>
                                <div style={validateType ? {display:'block'} : { display: 'none' }} className={classes.body} error>
                                    <InputLabel id="demo-simple-select-error-label" color="red" required className={classes.bodyError}>Hora</InputLabel>
                                    <TextField
                                        id="time"
                                        type="time"
                                        name="time"
                                        onChange={e => setTime(e.target.value)}
                                        className={classes.bodyError}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <FormHelperText className={classes.bodyError}>Campo obrigatório</FormHelperText>
                                </div>
                            </Grid>
                            {/* <Grid item xs={12} sm={12}>
                            <div style={!validateDateTime ? {display:'block'} : { display: 'none' }}>
                                <InputLabel id="demo-simple-select-label" className={classes.body}>Data e Hora</InputLabel>
                                <TextField
                                    id="datetime-local"
                                    type="datetime-local"
                                    onChange={e => setDateTime(e.target.value.replace("T"," "))}
                                    className={classes.body}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                </div>
                                <div style={validateType ? {display:'block'} : { display: 'none' }} className={classes.body} error>
                                    <InputLabel id="demo-simple-select-error-label" color="red" className={classes.bodyError}>Data e Hora</InputLabel>
                                    <TextField
                                        id="datetime-local"
                                        type="datetime-local"
                                        onChange={e => setDateTime(e.target.value)}
                                        className={classes.bodyError}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <FormHelperText className={classes.bodyError}>Campo obrigatório</FormHelperText>
                                </div>
                            </Grid> */}
                           
                           
                            <Grid item xs={12} sm={12}>
                                <InputLabel id="demo-simple-select-label" className={classes.body} >Observa&ccedil;&atilde;o</InputLabel>
                                <TextareaAutosize id="standard-basic" name="observation" onChange={e => setObservation(e.target.value)} className={classes.body} label="Observação" color="#45B39D" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={<Checkbox   name="checkedG" checked={true} color="primary"/>}
                                   
                                    label="Continuar com este endereço"
                                />
                                   
                                   <TextareaAutosize 
                                    id="standard-basic" 
                                    name="observation" 
                                    disabled  
                                    defaultValue={end} 
                                    value={
                                        'Rua '+ end.street + ', ' + end.number + ', bairro ' + end.neighborhood + '. ' + end.city + ' - ' + end.state
                                    } 
                                    className={classes.body} 
                                    color="#45B39D"/>
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
                <Fab variant="extended" color="primary" aria-label="add" type="submit" onClick={e => validate(e)} className={classes.save}>
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
    const [response, setResponse] = useState('');
    const handleDateChange = date => {
        setSelectedDate(date);
    };
    
    return (
        <>
            <EnhancedTable/>
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


/*
 * async function handleRating() {
    const response = await axios.post(
      'http://localhost:8000/logali/app/rotadela/metododela',
      {
        "worker": selected.idClient,
        "ratedId": selected.idWorker,
        "schedulingId": selected.schedulingId ,
        "rate":value,
        "observation": observation
      }
    )
      .then(function (response) {
        alert(response.data.message)
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });

      console.log(response);
      return response
    };
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 *
 */

