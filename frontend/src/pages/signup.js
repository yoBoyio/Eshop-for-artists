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

//Redux stuff
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

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
  });


//signup page, auth user 
 class signup extends Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          confirmPassword:'',
          handle: '',
          errors: {}
        };
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    };

     handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const newUserData = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        handle: this.state.handle
    };
              
       this.props.signupUser(newUserData, this.props.history); 
    }
    render() {
        const {classes, UI:{loading}} = this.props;
        const { errors } = this.state;

        return (
           <Grid container className={classes.form}>
               <Grid item sm/> 
               <Grid item sm>
                <img src={AppIcon} alt="" width="100px" className={classes.image}/>
                <Typogrphy variant="h2" className={classes.pageTitle}>
                    Signup
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
                    <TextField 
                    variant="outlined"
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    label="Confirm Password" 
                    className={classes.textField}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword} 
                    onChange={this.handleChange} 
                    fullWidth/>
                    <TextField 
                    variant="outlined"
                    id="handle" 
                    name="handle" 
                    type="text" 
                    label="Username" 
                    className={classes.textField}
                    helperText={errors.handle}
                    error={errors.handle ? true : false}
                    value={this.state.handle} 
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
                    Signup 
                    {loading && (
                        <CircularProgress size={30} className={classes.progress}/>
                    )}
                    </Button>
                    <br/>
                    <small>Already have an account ? login <Link to="/login">here</Link></small>
                </form>
               </Grid>
               <Grid item sm/>
           </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
export default connect(mapStateToProps,{signupUser}) (withStyles(styles)(signup));