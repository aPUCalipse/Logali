import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import create from '../../Components/Routes/scheduling.js';
// import EnhancedTable from './ViewSchedulings'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { Formik, Form, Field } from "formik";
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
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
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

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
    },
    avaliacao: {
        fontSize: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center'
    },
}));

    


export default props => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const {selected} = props

    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 40 }} />,
            label: 'Muito Insatisfeito(a)',
        },
        2: {
            icon: <SentimentDissatisfiedIcon style={{ fontSize: 40 }} />,
            label: 'Insatisfeito(a)',
        },
        3: {
            icon: <SentimentSatisfiedIcon style={{ fontSize: 40 }} />,
            label: 'Neutro',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon style={{ fontSize: 40 }} />,
            label: 'Satisfeito(a)',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon style={{ fontSize: 40 }} />,
            label: 'Muito Satisfeito(a)',
        },
    };

    function IconContainer(props) {
        const {...other } = props;
        return <span {...other}>{customIcons[selected && selected.rateAVG].icon}</span>;
    }

    IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
    };

    return (
        <Modal
        {...props}
       // size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header className={classes.header} closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Visualizar Perfil
      </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik>
                <Form>
                    <Grid container
                        spacing={0.5}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={9}>
                            <Typography paragraph><b>Nome:</b> {selected.workerName}</Typography>
                            <Typography paragraph><b>Nota:</b></Typography>
                            {selected.rateAVG == 0 ? 
                                <Typography paragraph className={classes.avaliacao}>Usuário não possui avaliação até o momento</Typography>:
                                <div style={{textAlign: 'center'}}>
                                    <Rating
                                        name="customized-icons"
                                        className={classes.avaliacao}
                                        size="large"
                                        value={selected && selected.rateAVG}
                                        getLabelText={(value) => customIcons[value].label}
                                        IconContainerComponent={IconContainer}
                                    />
                                    {selected.rateAVG != null && <Box className={classes.avaliacao} ml={2}>{customIcons[selected.rateAVG].label}</Box>}
                                </div>
                            }
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
        </Modal.Footer>
    </Modal>
    );
}

