import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import map from '../../Images/maps.jpg';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Slider from "react-slick";
import { Grid } from '@material-ui/core';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { FcNext, FcPrevious, FcOk, FcCancel, FcInspection } from "react-icons/fc";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import PropTypes, { func } from 'prop-types';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import moment from 'moment';
import clsx from 'clsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyVerticallyCenteredModal from '../SchedulePage/ModalRating';
import {getLocation} from "../../Functions/geolocation"
import Tooltip from '@material-ui/core/Tooltip';
import style from './SchedulePageTec.module.css'
import GoogleMapReact from 'google-map-react';
import MainLayout from '../MainLayout/MainLayout'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    accept: {
        backgroundColor: '#45B39D',
        color: 'white',
        margin: theme.spacing(1),
        float: 'right'
    },
    recuse: {
        backgroundColor: '#FF6347',
        color: 'white'
    },
    finish:
    {
        backgroundColor: '#97FFFF',
        color: 'white'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginRight: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    card: {
        marginBottom: theme.spacing(2),
        minHeight: theme.spacing(30)

    },
    tabTitle: {
        backgroundColor: '#009999'
    },
    tabs: {
        backgroundColor: 'white',
        color: '#009999'
    },
    rootCard: {
        backgroundColor: '#009999',
        color: "white",
        minHeight: theme.spacing(80)
    },
    slide: {
        backgroundColor: '#009999',
    },
    media: {
        height: theme.spacing(25),
        width: theme.spacing(45)
    },
    navButton: {
        border: 'solid',
        width: theme.spacing(3),
        height: theme.spacing(4),
        margin: theme.spacing(1)
    },
    inputPage: {
        width: theme.spacing(10),
        height: theme.spacing(4),
        marginTop: theme.spacing(1),
        borderRadius: '5px',
        borderColor: 'black',
        textAlign: 'center'
    },
    divPage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

}));

function ListTable(props) {
    const { item, week } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [end, setEnd] = useState('');
    const userData = JSON.parse(localStorage.getItem("userData"));
    // const { selected } = props;

    const userId = userData.idUser;
    const [modalShow, setModalShow] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

    function avaliacao(show, item) {
        setSelected(item);
        setModalShow(true)
    };
    const objectData = {
        userId: userId
    }
    const [openDlg, setDlgOpen] = React.useState(false);

    const handleCloseCancelS = () => {
        setDlgOpen(false)
        handleCancel()

    };

    const handleCloseCancelN = () => {
        setDlgOpen(false);
    };


    const handleOpenAcceptS = () => {
        setDlgOpen(false)
        handleAcceptance()
    }

    const handleCloseAcceptN = () => {
        setDlgOpen(false)
    }

    // async function handleEndScheduling() {
    //     console.log("BATATA", userId)
    //     const response = await axios.post('http://localhost:8000/logali/app/scheduling/searchEnd', objectData)
    //         .then(function (response) {
    //             setEnd(response.data.data)
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });

    //     console.log(response);
    //     return response
    // };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function handleCancel() {
        const tec = JSON.parse(localStorage.getItem('userData'))
        if (tec.isLogged === true) {
            const response = await axios.post(
                'http://localhost:8000/logali/app/scheduling/cancelAcept',
                {
                    idScheduling: item.schedulingId,
                    idWorker: tec.idUser,
                });
            if (response.status != 200) {
                throw Error(response.body.message);
            }
            else {
                console.log("Cancelado com sucesso");
                window.location.reload()
            }
        }
        else {
            alert('Você não está logado, entre no sistema para executar esta ação');
        }
    }

    async function handleAcceptance() {
        const tec = JSON.parse(localStorage.getItem('userData'))
        if (tec.isLogged === true) {

            const response = await axios.post(
                'http://localhost:8000/logali/app/scheduling/acept',
                {
                    idScheduling: item.schedulingId,
                    idWorker: tec.idUser,
                });
            if (response.status != 200) {
                throw Error(response.body.message);
            }
            else {
                console.log("Aceite realizado com sucesso");
                window.location.reload()
            }
        }
        else {
            alert('Não foi possível aceitar o agendamento');
        }
    }

    async function handleFinish() {
        const tec = JSON.parse(localStorage.getItem('userData'))
        if (tec.isLogged === true) {
            const response = await axios.post(
                'http://localhost:8000/logali/app/scheduling/closeScheduling',
                {
                    idScheduling: item.schedulingId,
                    idWorker: tec.idUser,
                });
            if (response.status != 200) {
                throw Error(response.body.message);
            }
            else {
                console.log("Finalizado com sucesso");
                window.location.reload()
            }
        }
        else {
            alert('Você não está logado, entre no sistema para executar esta ação');
        }
    }

    function date(item) {
        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        return dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0]
    }

    function splitDateTime(item) {

        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        let dataCopy = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];

        let timeSplit = arrayData[1].split(':')
        let timeCopy = timeSplit[0] + ':' + timeSplit[1]

        return (<><b>Data: </b> {dataCopy}  <b>Hora:</b>  {timeCopy} </>);

    }

    function getDistance(distance) {
        if (distance < 1000) {
            return `${distance} M`
        } else {
            return `${(distance / 1000).toFixed(0)} KM`
        }
    }

    useEffect(() => {
        // if (end == null || end == '') {
        //     handleEndScheduling();
        // }
        if (item.statusSchedulingId == 1) {
            document.getElementById("btnCancel" + item.schedulingId).setAttribute('style', 'display: none')
            document.getElementById("btnAccept" + item.schedulingId).removeAttribute('style', 'display: none')
            document.getElementById("btnFinish" + item.schedulingId).setAttribute('style', 'display: none')
            // document.getElementById("btnRecuse" + item.schedulingId).removeAttribute('style', 'display: none')
        }
        else {
            document.getElementById("btnAccept" + item.schedulingId).setAttribute('style', 'display: none')
            if (item.statusSchedulingId !== 4 && item.statusSchedulingId !== 5) {
                document.getElementById("btnCancel" + item.schedulingId).removeAttribute('style', 'display: none')
                document.getElementById("btnFinish" + item.schedulingId).removeAttribute('style', 'display: none')
            }
            else if (item.statusSchedulingId == 5)
                document.getElementById("StarRating" + item.schedulingId).removeAttribute('style', 'display: none')
            // document.getElementById("btnRecuse" + item.schedulingId).setAttribute('style', 'display: none')
        }
    })

    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    title={item.nametypeSchedulig + ' - ' + item.clientName + ' - ' + item.rateAVG}
                    subheader={`Distância: ${getDistance(item.distance)}`}
                />
                <CardContent>
                    <CardMedia className={classes.media}>
                        <Row>
                            <Col>
                                <div className={style.map}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyCkIMj_uHe2IZkO0jtrx-tYGPbcJyvr2jo" }}
                                        defaultCenter={{
                                            lat: item.geoLocX,
                                            lng: item.geoLocY
                                        }}
                                        defaultZoom={18}
                                        yesIWantToUseGoogleMapApiInternals={true}
                                    >
                                    </GoogleMapReact>
                                </div>
                            </Col>
                        </Row>
                    </CardMedia>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    {/* <Button variant="contained" size="small" id={"btnRecuse" + item.schedulingId} className={classes.recuse} onClick={handleCloseAcceptN}>
                Recusar
                </Button> */}
                    <Button title='Aceitar' variant="contained" size="lg" id={"btnAccept" + item.schedulingId} className={classes.accept} onClick={handleOpenAcceptS}>
                        <FcOk />
                    </Button>
                    <Button title="Cancelar Aceite" variant="contained" size="large" id={"btnCancel" + item.schedulingId} className={classes.recuse} style={{ display: "none" }} onClick={() => setDlgOpen(true)}>
                        <FcCancel />
                    </Button>
                    <Button title="Finalizar Atendimento" variant="contained" size="large" id={"btnFinish" + item.schedulingId} className={classes.finish} style={{ display: "none" }} onClick={handleFinish} >
                        <FcInspection />
                    </Button>
                    <IconButton title="Avaliar" id={"StarRating" + item.schedulingId} style={{ display: "none" }}
                        onClick={() => avaliacao(true, item)}
                    >
                        <StarBorderIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph><b>Cliente:</b> {item.clientName}</Typography>
                        <Typography paragraph><b>Nota:</b> {item.rateAVG}</Typography>
                        <Typography paragraph>
                            {splitDateTime(item)}
                        </Typography>
                        <Typography paragraph>
                            <b>Observação:</b> {item.observation}
                        </Typography>
                        <Typography paragraph>
                            <b>Endereço:</b>
                            {'Rua ' + item.street + ', ' + item.number + ', bairro ' + item.neighborhood + '. ' + item.city + ' - ' + item.state}
                        </Typography>
                    </CardContent>
                </Collapse>
                <Dialog
                    open={openDlg}
                    onClose={handleCloseCancelN}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{"Deseja cancelar este aceite?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseCancelS} color="primary">
                            Sim
                    </Button>
                        <Button onClick={handleCloseCancelN} color="secondary" autoFocus>
                            Não
                    </Button>
                    </DialogActions>
                </Dialog>
            </Card>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                selected={selected}
            />
        </>
    );
}

export default function Technical() {
    const classes = useStyles();
    const [week, setWeek] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [dataTec, setDataTec] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [tam, setTam] = React.useState(0);
    const [filterType, setFilterType] = React.useState(0);
    const [filterStatus, setFilterStatus] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const nextPage = () => {
        setPage(page + 1);
        setData([]);
        if (page == 2) {
            document.getElementById('btnPreviousPage').removeAttribute('style', 'readOnly');
            document.getElementById('btnPreviousPage').removeAttribute('style', 'borderColor: gray');
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            setData([]);
        }
    };

    const goToPage = (value) => {
        setPage(value);
        setData([]);
    };

    const changeFilterType = () => {
        for (let i = 0; i < document.getElementsByName('filterSchedulingType').length; i++) {
            if (document.getElementsByName('filterSchedulingType')[i].selected) {
                setFilterType(document.getElementsByName('filterSchedulingType')[i].value);
                break
            }
        }
        setData([]);
    };

    const changeFilterStatus = () => {
        for (let i = 0; i < document.getElementsByName('filterSchedulingStatus').length; i++) {
            if (document.getElementsByName('filterSchedulingStatus')[i].selected) {
                setFilterStatus(document.getElementsByName('filterSchedulingStatus')[i].value);
                break
            }
        }
        setData([]);
    };

    async function getScheduling() {
        const tec = JSON.parse(localStorage.getItem('userData'))
        const response = await axios.post('http://localhost:8000/logali/app/scheduling/view', {
            "page": page,
            "pageSize": 10,
            "idWorker": tec.idUser,
            "filterType": filterType,
            "filterStatus": filterStatus,
        })
            .then(function (response) {
                console.log(response);
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setData(response.data.data)
                }
                setTam(response.data.data.length > 0);
            })
            .catch(function (error) {
                console.log(error.response);
            });
        console.log(response);
    }

    async function getGeoLocXY() {
        const tecId = JSON.parse(localStorage.getItem('userData'))
        const response = await axios.post('http://localhost:8000/logali/app/scheduling/takeloc', {
            "idWorker": tecId.idUser,
        })
            .then(function (response) {
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setDataTec(response.data.data)
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
        console.log(response);
    }


    function getWeekDays() {
        const today = new Date()
        const days = [today];
        for (let i = 1; i < 7; i += 1) {
            days.push(
                moment(today)
                    .add(i, 'days')
                    .toDate()
            );
        }
    }



    function getWeekDays() {
        const today = new Date()
        const days = [today];
        for (let i = 1; i < 7; i += 1) {
            days.push(
                moment(today)
                    .add(i, 'days')
                    .toDate()
            );
        }
        return days;
    }


    function dateSplit(item) {
        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        return dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0]
    }

    useEffect(() => {
        if (week.length == 0)
            setWeek(getWeekDays());

        if (data == null || data.length == 0)
            getScheduling();

        if (tam == 0 && page !== 1) {
            setPage(1);
            setData([])
        }

        if (dataTec == null || dataTec.length == 0)
            getGeoLocXY()
    })

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={classes.root}>
            <MainLayout>
                {/* <AppBar position="static" className={classes.tabTitle}>
                    <Toolbar variant="dense">
                        <Typography variant="h6" >
                            Agenda
                    </Typography>
                    </Toolbar>
                </AppBar> */}
                <Card className={classes.root}>
                    <AppBar position="static" className={classes.tabs}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Tudo" {...a11yProps(0)} />
                            <Tab label="Hoje" {...a11yProps(1)} />
                            <Tab label="Semana" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <Grid container
                        spacing={0.5}
                        justify="left"
                        alignItems="left">
                        <Form.Group as={Col} md={4} name="typeScheduling">
                            <Form.Label>Tipo de agendamento</Form.Label>
                            <Form.Control as="select" custom onChange={() => changeFilterType()}>
                                <option name="filterSchedulingType" value="0">Todos</option>
                                <option name="filterSchedulingType" value="3" >Bug</option>
                                <option name="filterSchedulingType" value="2">Instalação</option>
                                <option name="filterSchedulingType" value="1">Manutenção</option>
                                <option name="filterSchedulingType" value="4">Outros</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md={4} name="statusScheduling">
                            <Form.Label>Status do agendamento</Form.Label>
                            <Form.Control as="select" custom onChange={() => changeFilterStatus()}>
                                <option name="filterSchedulingStatus" value="0">Todos</option>
                                <option name="filterSchedulingStatus" value="1">Aguardando Aceite</option>
                                <option name="filterSchedulingStatus" value="2">Aceitado</option>
                                <option name="filterSchedulingStatus" value="3">À Caminho</option>
                                <option name="filterSchedulingStatus" value="4">Cancelado</option>
                                <option name="filterSchedulingStatus" value="5">Finalizado</option>
                            </Form.Control>
                        </Form.Group>
                    </Grid>
                    <TabPanel value={value} index={0}>
                        <Container>
                            <Row xs={1} sm={2} md={3} lg={3}>
                                {data.map((item) => (
                                    <Col>
                                        <ListTable item={item} week={week} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Container>
                            <Row xs={1} sm={2} md={3} lg={3}>
                                {data.map((item) => (
                                    dateSplit(item) == (week[0].getDate() + '/0' + (week[0].getMonth() + 1) + '/' + week[0].getFullYear()) ?
                                        <Col>
                                            <ListTable item={item} week={week} />
                                        </Col> : ''
                                ))}
                            </Row>
                        </Container>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Slider {...settings} >
                            {week.map((date) => (
                                <Container>
                                    <Row xs={12} lg={12}>
                                        <Col>
                                            <Card className={classes.rootCard}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {date.getDate()} / 0{date.getMonth() + 1}
                                                        </Typography>
                                                        {data.map((item) => (
                                                            dateSplit(item) == (date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear()) ?
                                                                <Col>
                                                                    <ListTable item={item} week={week} />
                                                                </Col> : ''
                                                        ))}
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            ))}
                        </Slider>
                    </TabPanel>
                    <div className={classes.divPage}>
                        <Button onClick={previousPage} className={classes.navButton} id='btnPreviousPage' title="Voltar">
                            <FcPrevious />
                        </Button>
                        <input type='number' value={page} onExit={() => goToPage(value)} className={classes.inputPage} style={{ readOnly: false }} />
                        <Button onClick={nextPage} id='btnNextPage' className={classes.navButton} title="Avançar">
                            <FcNext />
                        </Button>
                    </div>
                </Card>
            </MainLayout>
        </div>
    );
}