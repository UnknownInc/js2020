import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import md5 from 'md5';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
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
}));

export default function Note({comment}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div className={classes.comment} elevation={3} 
        style={{
          backgroundImage:`url(/images/note${1+Math.trunc(Math.random()*9)}.png)`,
        }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
         {comment.comment.substr(0,64)+'...'}
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{maxWidth:450}}>
          <Typography>{comment.comment}</Typography>
          <br/>
          <div style={{float:'right', display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Avatar src={`https://www.gravatar.com/avatar/${md5(comment.email.toLowerCase())}?d=robohash`}></Avatar>
            <Typography variant="caption">
              &nbsp;&nbsp; {comment.email}
            </Typography>
          </div>
        </div>

      </Popover>
    </div>
  );
}