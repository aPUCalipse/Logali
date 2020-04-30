import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import create from '../../Components/Routes/scheduling.js';
import EnhancedTable from './ViewSchedulings'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { Formik, Form, Field } from "formik";
import Select from '@material-ui/core/Select';
import {InputLabel, MenuItem} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as Yup from 'yup';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
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
    const [typeScheduling, setTypeScheduling] = useState(props.data==null?'':props.data.typeSchedulingId);
    const [date, setDate] = useState(props.data == null ?'':props.data.dateTime.split(' ')[0]);
    const [time, setTime] = useState(props.data == null ?'':props.data.dateTime.split(' ')[1]);

    const [dateTime] = date + ' ' + time; 
    const [userId] = useState('1');
    const [id] = useState(props.data == null ?'':props.data.id);
    const [observation, setObservation] = useState(props.data==null?'':props.data.observation);
    const [count, setCount] = useState('0');
    const [responseGet, setResponseGet] = useState("");
    
    const data = props

   
      
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "PUT"
        }
      };
    
    
    async function handleEditScheduling(e) {
        const user = JSON.parse(localStorage.getItem('userData'))
        var idUser = user.idUser
        var id = props.data.schedulingId
        console.log(id)
        var postData = {
                id,
                idUser,
                dateTime,
                observation
          };
        e.preventDefault();
        const response = await axios.put('http://localhost:8000/logali/app/scheduling/update', postData)
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
                                {/* <TextField 
                                    id="standard-basic" 
                                    name="typeScheduling" 
                                    helperText="" 
                                    required 
                                    className={classes.body} 
                                    onChange={e => setTypeScheduling(e.target.value)} 
                                    label="Servi&ccedil;o" 
                                    color="#45B39D" 
                                    value={typeScheduling}/> */}
                                     <InputLabel id="demo-simple-select-label" required>Servi&ccedil;o</InputLabel>
                                    <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.body}
                                required
                                onChange={e => setTypeScheduling(e.target.value)}
                                value={typeScheduling}
                                >
                                <MenuItem value={1}>Instalação</MenuItem>
                                <MenuItem value={2}>Manutenção em rede</MenuItem>
                                <MenuItem value={3}>BUG</MenuItem>
                                </Select>
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
                                    value={date}
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
                                    value={time}
                                />
                            </Grid>
                            <Divider variant="middle" />
                            <Grid item xs={12} sm={12}>
                                <p className={classes.title}>Observa&ccedil;&atilde;o</p>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextareaAutosize 
                                    id="standard-basic" 
                                    name="observation" 
                                    onChange={e => setObservation(e.target.value)} 
                                    className={classes.body} 
                                    label="Observação" 
                                    color="#45B39D"  
                                    defaultValue={observation} 
                                    value={observation}/>
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

export default props => {
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
        setModalShow(true);
    }
    return (
        <>
            <Tooltip title="Editar">
                <IconButton onClick={() => eventEdit()} aria-label="edit" disabled={props.disabled}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <MyVerticallyCenteredModal
                data = {props.data}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

