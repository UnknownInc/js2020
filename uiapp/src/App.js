import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";

import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStores from './stores/useStores';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const App = observer(( )=>{
  const classes = useStyles();
  const {uiState} = useStores();
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Backdrop className={classes.backdrop} open={!uiState.appIsInSync}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </Router>
  );
});

export default App;
