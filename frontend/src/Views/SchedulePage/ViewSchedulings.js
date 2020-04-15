import Edit from '@material-ui/icons/Edit';
import Remove from '@material-ui/icons/Remove';
import axios from 'axios';
import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 265,
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
  avatar: {
    backgroundColor: "#4caf50",
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
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState([]);
  const [time, setTime] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const userId={
    userId: '1'
  }
 
  function splitDateTime(item){
  
        let arrayData = item.dateTime.split(' ')
        let dateSplit = arrayData[0].split('-')
        let dataCopy = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];

        let timeSplit = arrayData[1].split(':')
        let timeCopy = timeSplit[0] + ':' + timeSplit[1]
        
        return dataCopy + ' ' + timeCopy
  }

  async function getScheduling(){
    const response = await axios.post('http://localhost:8000/logali/app/scheduling/selectSchedulesFromUser',
    userId)
      .then(function(response) {
        console.log(response);
        setData(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
      console.log(data)
      if(data == ''){
        getScheduling()
      }
    });

  return (
    <div className={classes.root4}>
    <GridList cellHeight={250} className={classes.gridList} cols={8}>
    {data.map((item) => (
    <GridListTile key={item.id} cols={4}>
    
     
    <Card className={classes.root}>
      <CardHeader
        avatar={
         item.statusSchedulingId == '1' ? 
         <Avatar aria-label="recipe" className={classes.avatar}>
            <EventAvailableIcon/>
          </Avatar>:
          <Avatar aria-label="recipe" className={classes.avatar2}>
            <EventBusyIcon/>
          </Avatar>}
        
        title={item.typeSchedulingId}
        
        subheader={splitDateTime(item)}
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
        <EditScheduling data={item} disabled={item.statusSchedulingId == '1'?false:true}/>
       
        <IconButton aria-label="share">
          <DeleteForeverIcon />
        </IconButton>
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
      </CardActions>
    </Card>
    </GridListTile>
     ))}
</GridList>

</div>
  );
}
