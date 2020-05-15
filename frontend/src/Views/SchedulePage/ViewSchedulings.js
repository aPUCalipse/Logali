import axios from 'axios';
import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import listEmpty from  '../../Images/listEmpty.svg';
import MyVerticallyCenteredModal from '../SchedulePage/ModalRating';


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

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [hasCalled, setHasCalled] = React.useState(false);
  const [validateType, setValidateType] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  if(!hasCalled){
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

    async function getScheduling() {
        const user = JSON.parse(localStorage.getItem('userData'))
        
    const response = await axios.post('http://localhost:8000/logali/app/scheduling/select', {
        "idUser" : user.idUser,
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

  // useEffect(() => {
  //     if(data == null || data.length == 0 ){
        
  //     }
  //   });

    function handleClickValidate(id) {
        const user = JSON.parse(localStorage.getItem('userData'))
        const userId = user.idUser
      if(userId == 0){
        if(userId == 0)
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
       {/* <AppBar position="static" className={classes.tabTitle}>
        <Toolbar variant="dense">
          <Typography variant="h6" >
            Agendamentos
          </Typography>
        </Toolbar>
      </AppBar> */}

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
            <DeleteForeverIcon  onClick={() => handleClickValidate(item.schedulingId)}/>
          </IconButton>
          </Tooltip>
          <Tooltip title="Avaliação">
          <IconButton disabled={item.statusSchedulingId == 5 ? false : true}
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
