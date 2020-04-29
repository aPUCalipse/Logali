import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import map from  '../../Images/maps.jpg';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import moment from 'moment';
import clsx from 'clsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

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
  accept:{
    backgroundColor: '#45B39D',
    color: 'white',
    margin: theme.spacing(1),
    float: 'right'
  },
  recuse:{
    backgroundColor: '#d50000',
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
 
  card:{
      marginBottom:theme.spacing(2),
      minHeight: theme.spacing(30)

  },
  tabTitle:{
    backgroundColor: '#009999'
  },
  tabs:{
      backgroundColor: 'white',
      color:'#009999'
  },
  rootCard:{
    backgroundColor: '#009999',
    color:"white",
    minHeight: theme.spacing(80)
  },
  slide:{
    backgroundColor: '#009999',
  },
  media: {
    height:theme.spacing(25) ,
    width: theme.spacing(45) 
  },
  
}));


function ListTable(props){
    const {item, week} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [end, setEnd] = useState('');
    const [userId] = useState('1');
    const objectData = {
        userId: userId
    }

    async function handleEndScheduling() {
        console.log("BATATA", userId)
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

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    function date(item){
        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        return dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0]
    }

    function splitDateTime(item){
  
        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        let dataCopy = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];

        let timeSplit = arrayData[1].split(':')
        let timeCopy = timeSplit[0] + ':' + timeSplit[1]
        
        return (<><b>Data: </b> {dataCopy}  <b>Hora:</b>  {timeCopy} </>);
        
  }
  
  useEffect(() => {
    if(end == null || end==''){
        handleEndScheduling();
    }
})
 
    return(
        <Card  className={classes.card}>
            <CardHeader
              title={item.nametypeSchedulig}
              subheader='Distância: 3 Km'
            />
            <CardContent>
                <CardMedia
                    className={classes.media}
                >
                    <img
                        alt="List Empty"
                        src={map}
                        className={classes.media} 
                    /> 
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
                <Button variant="contained" size="small" className={classes.recuse}>
                    Recusar
                </Button>
                <Button variant="contained" size="small" className={classes.accept}>
                    Aceitar
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph><b>Cliente:</b> {item.clientName}</Typography>
                    <Typography paragraph>
                        {splitDateTime(item)}
                    </Typography>
                    <Typography paragraph>
                        <b>Observação:</b> {item.observation}
                    </Typography>
                    <Typography paragraph>
                        <b>Endereço:</b> 
                        {'Rua '+ end.street + ', ' + end.number + ', bairro ' + end.neighborhood + '. ' + end.city + ' - ' + end.state}
                    </Typography>
                </CardContent>
            </Collapse>
      </Card>
   );
}

export default function Technical() {
  const classes = useStyles();
    const [week, setWeek] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    async function getScheduling(){
        const response = await axios.post('http://localhost:8000/logali/app/scheduling/view', {
            "page": 1,
            "pageSize": 10
        })
          .then(function(response) {
            console.log(response);
            if(response.data && response.data.data && response.data.data.length > 0){
              setData(response.data.data)
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
    return days;
  }


function dateSplit(item){
    let arrayData = item.dateTime.split(' ')
    let dateSplit = arrayData[0].split('-')
    return dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0]
}

useEffect(() => {
    if(week.length == 0)
        setWeek(getWeekDays());

    if(data == null || data.length == 0 )
        getScheduling()
    
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
        <AppBar position="static" className={classes.tabTitle}>
            <Toolbar variant="dense">
                <Typography variant="h6" >
                    Agenda
                </Typography>
            </Toolbar>
        </AppBar>
        <AppBar position="static" className={classes.tabs}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Tudo" {...a11yProps(0)} />
                <Tab label="Hoje" {...a11yProps(1)} />
                <Tab label="Semana" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
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
                        dateSplit(item) == (week[0].getDate() + '/0' + (week[0].getMonth() + 1)+ '/' + week[0].getFullYear())?
                            <Col>
                                <ListTable item={item} week={week} />
                            </Col>:''
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
                                                {date.getDate()} / 0{date.getMonth() + 1 } 
                                            </Typography>
                                            {data.map((item) => (
                                                dateSplit(item) == (date.getDate() + '/0' + (date.getMonth() + 1)+ '/' + date.getFullYear())?
                                                    <Col>
                                                        <ListTable item={item} week={week} />
                                                    </Col>:''
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
    </div>
  );
}
