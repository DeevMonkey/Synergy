import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useParams } from "react-router-dom";
import { apiImg, apiURL } from '../../config';
import { useFetch } from '../../hooks/useFetch';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MonkyDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
}));


export const Puntaje = () => {

  const classes = useStyles();
  let { ci } = useParams();

  const [personal, setPersonal] = useState({});

  const { loading, data } = useFetch(`${apiURL}contruccion-registros/${ci}`);
  const { loading:loadingMadera, data:madera } = useFetch(`${apiURL}madera-registros/${ci}`);

  
  useEffect(() => {
    if(!loading || !loadingMadera){
      setPersonal(handleApi(data, madera));
    }

  }, [loading, data, loadingMadera, madera])

  const handleApi = (data, data2)=> {
    console.log(data, data2);
      if(data) {
        return data;
      }
      return data2;
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
          <b>Puntos {personal.puntos}</b>
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12}>
            <div className={classes.paper}>
              <img style={{ width: 300, height: 250 }} src={personal.foto? apiImg+personal.foto.url:'https://source.unsplash.com/random'} alt="foto" />
            </div>
            <Typography component="h4" variant="h5" align="center" color="textPrimary" gutterBottom>
              {personal.nombres} {personal.apellidos}
            </Typography>
            <Typography component="h6" variant="h6" align="center" color="textSecondary" gutterBottom>
              {new Date().getFullYear()}
            </Typography>

          </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}