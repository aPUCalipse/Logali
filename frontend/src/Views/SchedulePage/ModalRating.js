import axios from 'axios';
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Modal from "react-bootstrap/Modal";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { InputLabel, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Fab from '@material-ui/core/Fab';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        //color: '#F9A826',
        color: '#62a298',
        fontSize: theme.spacing(0.8),
        width: theme.spacing(30),
        textAlign: 'center'
    },
    save: {
        color: 'white',
        backgroundColor: '#45B39D'
    },
    textAva: {
        fontSize: theme.spacing(2.5),
        padding: theme.spacing(1.5),
        textAlign: 'center'
    },
    avaliacao: {
        fontSize: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    inputRate: {
        width: '100%'
    }
}));

export default function MyVerticallyCenteredModal(props) {
    const classes = useStyles();
    const { selected } = props;
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



    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const [observation, setObservation] = React.useState('');
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.idUser;

    async function handleRating() {
        let rated;
        if (selected.idClient !== userId)
            rated = selected.idClient
        else
            rated = selected.idWorker
        console.log(selected)
        const response = await axios.post(
            'http://localhost:8000/logali/app/rating/create',
            {
                "raterId": userId,
                "ratedId": rated,
                "schedulingId": selected.schedulingId,
                "rate": value,
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

    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Avaliação
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid
                    container
                    direction="column"
                    spacing={0}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item
                        alignItems="center"
                        justify="center"
                    >
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.textAva}>
                            Qual seu nível de satisfação com {selected.nametypeSchedulig}?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Rating
                            name="customized-icons"
                            defaultValue={2}
                            size="large"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            getLabelText={(value) => customIcons[value].label}
                            IconContainerComponent={IconContainer}
                        />
                        {value !== null && <Box className={classes.avaliacao} ml={2}>{customIcons[hover !== -1 ? hover : value].label}</Box>}
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing={0}
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={10}>
                            <InputLabel id="demo-simple-select-label" className={classes.inputRate} >Observa&ccedil;&atilde;o</InputLabel>
                            <TextareaAutosize
                                id="standard-basic"
                                name="observation"
                                onChange={e => setObservation(e.target.value)}
                                className={classes.inputRate}
                                label="Observação"
                                color="#45B39D" />
                        </Grid>
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="flex-end"
                >
                    <Grid
                        item
                        alignItems="center"
                        justify="flex-end"
                    >
                        <Fab
                            variant="extended"
                            size="medium"
                            color="#45B39"
                            aria-label="add"
                            type="submit"
                            className={classes.save}
                            onClick={() => handleRating()}>
                            <SaveRoundedIcon className={classes.icon} />
                Salvar
          </Fab>
                    </Grid>
                </Grid>
            </Modal.Footer>
        </Modal>
    );
}