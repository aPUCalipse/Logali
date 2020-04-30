import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/Remove';
import axios from 'axios';
import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Modal from "react-bootstrap/Modal";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {InputLabel, MenuItem} from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditScheduling from './EditSchedulings';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import listEmpty from  '../../Images/listEmpty.svg';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Fab from '@material-ui/core/Fab';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

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
  listEmptyStyle:{
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
  tabTitle:{
    backgroundColor: '#009999'
  },
  text:{
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    //color: '#F9A826',
    color:'#62a298',
    fontSize: theme.spacing(0.8),
    width: theme.spacing(30),
    textAlign: 'center'
  },
  save:{
    color: 'white',
    backgroundColor:'#45B39D'
  },
  textAva:{
    fontSize: theme.spacing(2.5),
    padding: theme.spacing(1.5),
    textAlign: 'center'
  },
   avaliacao:{
    fontSize: theme.spacing(2),
    padding: theme.spacing(1),
    textAlign: 'center'
  },
  inputRate:{
    width: '100%'
  }
}));

function MyVerticallyCenteredModal(props) {
  const classes = useStyles();
  const {selected} = props;
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 40 }}/>,
      label: 'Muito Insatisfeito(a)',
    },
    2: {
      icon: <SentimentDissatisfiedIcon style={{ fontSize: 40 }}/>,
      label: 'Insatisfeito(a)',
    },
    3: {
      icon: <SentimentSatisfiedIcon style={{ fontSize: 40 }}/>,
      label: 'Neutro',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon style={{ fontSize: 40 }}/>,
      label: 'Satisfeito(a)',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon style={{ fontSize: 40 }}/>,
      label: 'Muito Satisfeito(a)',
    },
  };
  

  
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const [observation, setObservation] = React.useState('');

  async function handleRating() {
    const response = await axios.post('http://localhost:8000/logali/app/avaliar/rate', {
      "raterId": selected.idClient,
      "ratedId": selected.idWorker,
      "schedulingId": selected.schedulingId,
      "rate":value,
      "observation":observation,

    })
      .then(function (response) {
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
                Qual seu nível de satisfação com o serviço de {selected.nametypeSchedulig}?
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
            onClick={()=>handleRating()}>
              <SaveRoundedIcon className={classes.icon} />
                Salvar
          </Fab>
        </Grid>
      </Grid>
    </Modal.Footer>
  </Modal>
  );
}

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [validateType, setValidateType] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const userId={
    userId: '1'
  }

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

  async function getScheduling(){
    const response = await axios.post('http://localhost:8000/logali/app/scheduling/select', {
        "idUser" : userId.userId,
        "page": 1,
        "pageSize": 10,
        "idTypeScheduling": '',
        "idStatusScheduling": '',
    })
      .then(function(response) {
        console.log(response);
        setData(response.data.data)
      })
      .catch(function (error) {
        console.log(error.response);
      });
      console.log(response);
  }

  useEffect(() => {
      if(data == null || data.length == 0 ){
        getScheduling()
      }
    });

    function handleClickValidate(id) {
      if(userId == 0){
        if(userId == 0)
          setValidateType(true)
        else
          setValidateType(false)
      }else{
        handleDeleteScheduling(id);
        setValidateType(false);
      }
    };

    async function handleDeleteScheduling(id) {
      console.log(id)
      const response = await axios.delete('http://localhost:8000/logali/app/scheduling/delete',{
        data:{'id':id, 'userId':userId.userId},
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods" : "DELETE"
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  
        console.log(response);
        alert("Agendamento Deletado com Sucesso");
      };
  return (
   
    <div className={classes.root4}>
       <AppBar position="static" className={classes.tabTitle}>
        <Toolbar variant="dense">
          <Typography variant="h6" >
            Agendamentos
          </Typography>
        </Toolbar>
      </AppBar>

      {data == null || data.length == 0?
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
      </>:
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
                  <ScheduleIcon/>
              </Avatar>:
              <Avatar aria-label="recipe" className={classes.avatar2}>
                <TimelapseIcon/>
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
        </CardContent>
        <CardActions disableSpacing>
        <Tooltip title="Editar">
          <EditScheduling data={item} disabled={item.statusSchedulingId == '1'?false:true}/>
        </Tooltip>
        <Tooltip title="Deletar">
          <IconButton aria-label="share">
            <DeleteForeverIcon  onClick={() => handleClickValidate(item.id)}/>
          </IconButton>
          </Tooltip>
          <Tooltip title="Avaliação">
          <IconButton
              onClick={() => avaliacao(true, item)}
          >
          <StarBorderIcon/>
          </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      </Col>
      ))}
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
</div>
  );
}
