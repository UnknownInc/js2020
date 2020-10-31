import React from 'react';
import { observer } from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useStores from '../stores/useStores';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:'flex',
    alignItems:'stretch',
    justifyContent:'center',
    backgroundImage: 'url(/images/ps-logo.png), url(/images/jsringsc.png), url(/images/dotsbg.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left, right top, center',
    backgroundSize: '90px, contain, contain',
    backgroundAttachment: 'fixed',
  },
  intro:{
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10),
    textAlign:'center'
  },
  logo:{
    width:'40vmin'
  },
  gridList: {
    width:'100%',
    maxHeight: 450,
    transform: 'translateZ(0)',
  },
  comment:{
    position:'absolute', 
    top:0, left:0, bottom:0, right:0, background:'#fff',
    padding: '32px',
    backgroundSize:'contain',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive'
  },
  titleBar: {
    // color:'black',
    // background:
    //   'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, ' +
    //   'rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.5) 100%)',
  },
  icon: {
    color: 'white',
  },
  fab:{
    position:'absolute',
    bottom:theme.spacing(2),
    right: theme.spacing(2),
    margin: theme.spacing(1)
  },
  title:{
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textAlign:'center'
  },
  accordian:{
    backgroundColor:'#ffffff80'
  }
}));

const AddCommentDialog = observer(()=>{
  const classes = useStyles();
  const {session} = useStores();
  const [open, setOpen] = React.useState(false);
  const [sessionId, setSessionId] = React.useState(null);
  const [comment, setComment] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSessionId(event.target.value);
    console.log(event.target.value);
  };

  const handleAdd = () => {
    session.addComment({sessionId,comment})
    setOpen(false);
  }

  return <div className={classes.fab}>
    <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
      <AddIcon />
    </Fab>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <TextField
          select fullWidth
          variant='outlined'
          label="Select"
          value={sessionId}
          onChange={handleChange}
          helperText="Please select the session"
        >
          {session.items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoFocus
          variant='outlined'
          label="Comment"
          value={comment}
          onChange={e=>setComment(e.target.value)}
          rowsMax={4}
          multiline
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" variant='contained'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  </div>
})

const HomePage = observer(()=>{
  const classes = useStyles();
  const {session} = useStores();
  const history = useHistory();

  React.useEffect(()=>{
    if (session.user) {
      session.refreshComments();
    }
    const tid = setInterval(()=>{
      if (session.user) {
        session.refreshComments();
      }
    }, 10000);
    return ()=>{
      clearInterval(tid);
    }
  }, [session, session.user]);

  const handleLoginClick = ()=>{
    history.push('/login');
  }

  if (session.user) {
    return (
      <React.Fragment>
        <Grid container className={classes.root}>
          <Container maxWidth="sm">
            <div style={{textAlign:'center', padding:16}}><img src={'/images/jslogo_red.png'} width={200} alt="note bg"/></div>
            {session.items.map(item=>(
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={item.img}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.speaker}
                  />  
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <GridList cellHeight={150} spacing={3} cols={3} className={classes.gridList}>
                  {session.comments.filter(c=>c.sessionId===item.id).map(c=>(
                  <GridListTile key={c.id} cols={1} rows={1}>
                    <div className={classes.comment} elevation={3} style={{backgroundImage:`url(/images/note${1+Math.trunc(Math.random()*9)}.png)`}}>
                      {c.comment.substr(0,64)+'...'}
                    </div>
                    {/* <GridListTileBar
                      title={c.email}
                      titlePosition="bottom"
                      actionIcon={
                        <Avatar src={c.avatar} size='small'>{c.email[0].toUpperCase()}</Avatar>
                      }
                      actionPosition="left"
                      className={classes.titleBar}
                    />*/}
                  </GridListTile> 
                  ))}
                </GridList>
              </AccordionDetails>
            </Accordion>
            ))}
          </Container>
        </Grid>
        <AddCommentDialog/>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <div className={classes.intro}>
          <Typography variant="h2">Welcome<br/>
          to<br/>
          </Typography>
          <div style={{textAlign:'center'}}><img src={'/images/jslogo_red.png'} alt="jumpstart 2020 logo" width={300}/></div>
          <br/>
          <Button variant='contained' color='primary' onClick={handleLoginClick}>Login</Button>
        </div>
      </Grid>
    </React.Fragment>
  );
})

export default HomePage;