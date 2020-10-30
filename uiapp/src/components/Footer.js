import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection: 'column',
    minHeight: 100,
    backgroundColor:theme.palette.primary.dark
  },
}));

const Footer = ()=>{
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      
    </Grid>
  );
};

export default Footer;