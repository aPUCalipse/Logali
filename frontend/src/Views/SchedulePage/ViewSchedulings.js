import axios from 'axios';
import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from "formik";
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import Tooltip from '@material-ui/core/Tooltip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditScheduling from './EditSchedulings';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import listEmpty from '../../Images/listEmpty.svg';
import MyVerticallyCenteredModal from '../SchedulePage/ModalRating';
import {getLocation} from "../../Functions/geolocation"
import Pagination from '@material-ui/lab/Pagination';
import style from './SchedulePage.module.css';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 265,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    listEmptyStyle: {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
    avatar: {
        backgroundColor: "#ffc107",
        color: 'white'
    },
    avatar2: {
        backgroundColor: "#d32f2f",
        color: 'white'
    },
    root4: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 500,
    },
    tabTitle: {
        backgroundColor: '#009999'
    },
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

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [hasCalled, setHasCalled] = React.useState(false);
    const [validateType, setValidateType] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    let [page, setPage] = React.useState(1);
    let [idTypeScheduling, setTypeScheduling] = React.useState(0);
    let [idStatusScheduling, setStatusScheduling] = React.useState(1);
    let [maxPages, setMaxPages] = React.useState(null);

    if (!hasCalled) {
        setHasCalled(true)
        getScheduling()
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  function avaliacao(show, item){
    setSelected(item);
    setModalShow(true)
  
  };
 
  function splitDateTime(item){
  
        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        let dataCopy = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];

        let timeSplit = arrayData[1].split(':')
        let timeCopy = timeSplit[0] + ':' + timeSplit[1]

        return dataCopy + ' ' + timeCopy

    }

    async function getScheduling(event, eventPage) {
        const user = JSON.parse(localStorage.getItem('userData'))
        page = (eventPage) ? eventPage : 1

        const response = await axios.post('http://localhost:8000/logali/app/scheduling/select', {
            "idUser": user.idUser,
            "page": page,
            "pageSize": 10,
            "idTypeScheduling": idTypeScheduling,
            "idStatusScheduling": idStatusScheduling,
        })
            .then(function (response) {
                setData(response.data.data)
                setMaxPages(response.data.pagination.maxPages)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    // useEffect(() => {
    //     if(data == null || data.length == 0 ){

    //     }
    //   });

    function handleClickValidate(id) {
        const user = JSON.parse(localStorage.getItem('userData'))
        const userId = user.idUser
        if (userId == 0) {
            if (userId == 0)
                setValidateType(true)
            else
                setValidateType(false)
        } else {
            handleDeleteScheduling(id);
            setValidateType(false);
        }
    };

    async function handleDeleteScheduling(id) {
        const response = await axios.delete(`http://localhost:8000/logali/app/scheduling/delete/${id}`)
            .then(function (response) {
                console.log(response);
                alert("Deletado com sucesso")
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(response);
    };
    return (

        <div className={classes.root4}>

            <Container>
                <Formik>
                    <Form>
                        <Grid container
                            spacing={0.5}
                            justify="left"
                            alignItems="left">
                            <Grid item xs={5} >
                                <FormControl className={style.input}>
                                    <InputLabel className={style.labell} id="demo-simple-select-label">Serviço</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className={classes.body}
                                        onChange={e => setTypeScheduling(e.target.value)}
                                        value={idTypeScheduling}
                                    >
                                        <MenuItem value={0}>Todos os serviços</MenuItem>
                                        <MenuItem value={2}>Instalação</MenuItem>
                                        <MenuItem value={1}>Manutenção em rede</MenuItem>
                                        <MenuItem value={3}>BUG</MenuItem>
                                        <MenuItem value={4}>Outros</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} >
                                <FormControl className={style.input}>
                                    <InputLabel className={style.labell} id="statusAgendamento">Status do Agendamento</InputLabel>
                                    <Select
                                        labelId="statusAgendamento"
                                        id="statusScheduling"
                                        className={classes.body}
                                        onChange={e => setStatusScheduling(e.target.value)}
                                        value={idStatusScheduling}
                                    >
                                        <MenuItem value={1}>Aguardando Aceite</MenuItem>
                                        <MenuItem value={2}>Aceitado</MenuItem>
                                        <MenuItem value={3}>À Caminho</MenuItem>
                                        <MenuItem value={4}>Cancelado</MenuItem>
                                        <MenuItem value={5}>Terminado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={1} className={style.but}>
                                <Fab variant="round" className={style.searchButton} size="small" onClick={getScheduling}>
                                    <SearchIcon className={classes.icon} />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Container>

            {data == null || data.length == 0 ?
                <>
                    <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justify="center"
                    >
                        <Grid
                            item
                            alignItems="center"
                            justify="center"
                            className={classes.text}
                        >
                            <h6>Não se encontra agendamentos cadastrados até o momento.</h6>
                        </Grid>
                        <Grid
                            item
                            alignItems="center"
                            justify="center"
                        >
                            <img
                                alt="List Empty"
                                src={listEmpty}
                                className={classes.listEmptyStyle} />
                        </Grid>
                    </Grid>
                </> :
                <>
                    <Container>
                        <Row xs={1} sm={2} md={3} lg={4}>
                            {data.map((item) => (
                                <Col>
                                    <Card className={classes.root}>
                                        <CardHeader
                                            avatar={
                                                item.statusSchedulingId == '1' ?
                                                    <Avatar aria-label="recipe" color='warning.main' className={classes.avatar}>
                                                        <ScheduleIcon />
                                                    </Avatar> :
                                                    <Avatar aria-label="recipe" className={classes.avatar2}>
                                                        <TimelapseIcon />
                                                    </Avatar>}

                                            title={item.nametypeSchedulig}

                                            subheader={<>{item.nameStatusScheduling}<p>{splitDateTime(item)}</p></>}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Observação
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.observation}
                                            </Typography>
                                            <Typography hidden={item.idWorker !== null ? false : true}> {item.workerName} - Nota: {item.rateAVG} </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <Tooltip title="Editar">
                                                <EditScheduling data={item} disabled={item.statusSchedulingId == '1' ? false : true} />
                                            </Tooltip>
                                            <Tooltip title="Deletar">
                                                <IconButton aria-label="share">
                                                    <DeleteForeverIcon onClick={() => handleClickValidate(item.schedulingId)} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Avaliar'>
                                                <IconButton title="Avaliar" id={"StarRating" + item.schedulingId} hidden={item.statusSchedulingId == 5 ? false : true }
                                                    onClick={() => avaliacao(true, item)}
                                                >
                                                    <StarBorderIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <div className={classes.root, style.paginatioin}>
                                <Pagination count={maxPages} page={page} onChange={getScheduling} />
                            </div>
                        </Row>
                    </Container>
                </>

            }
            <>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    selected={selected}
                />
            </>
        </div >
    );
}
