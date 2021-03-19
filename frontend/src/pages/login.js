import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import AppIcon from '../images/score4.png';
import {Link} from 'react-router-dom';
//MUI 
import CircularProgress from '@material-ui/core/CircularProgress';
import Typogrphy from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//redux
import {connect } from 'react-redux';
import { loginUser} from '../redux/actions/userActions';
const styles = ({
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '10 auto 10 auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
})
//login page, post data to backend to auth user and store token

 class login extends Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          errors: {}
        };
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
     handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      handleSubmit = (event) => {

        event.preventDefault();

        const userData = {
        email: this.state.email,
        password: this.state.password};
        this.props.loginUser(userData, this.props.history);    
      
    };

    render() {
        const {classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
           <Grid container className={classes.form}>
               <Grid item sm/> 
               <Grid item sm>
                <img src={AppIcon} alt="" width="100px" className={classes.image}/>
                <Typogrphy variant="h2" color="custom" className={classes.pageTitle}>
                    Login
                </Typogrphy>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                    variant="outlined"
                     id="email"
                     name="email"
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     helperText={errors.email}
                     error={errors.email ? true : false}
                     value={this.state.email} 
                     onChange={this.handleChange} 
                     fullWidth/>
                    <TextField 
                    variant="outlined"
                    id="password" 
                    name="password" 
                    type="password" 
                    label="Password" 
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    fullWidth/>
                    {errors.general && (
                        <Typogrphy variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typogrphy>
                    )}
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    disabled={loading}> 
                    Login 
                    {loading && (
                        <CircularProgress size={30} className={classes.progress}/>
                    )}
                    </Button>
                    <br/>
                    <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
                </form>
               </Grid>
               <Grid item sm/>
           </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user:  PropTypes.object.isRequired,
    UI:  PropTypes.object.isRequired
};

const mapsStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapsStateToProps, mapActionsToProps)(withStyles(styles)(login));