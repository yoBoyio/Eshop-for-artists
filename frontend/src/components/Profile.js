import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../util/MyButton';

//redux 
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userActions';
//mui
import Button from '@material-ui/core/Button';
import  Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const styles = (theme) =>({
    paper: {
        padding: 20,
        
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position:'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details':{
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: "#fff"
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
        
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    txt:{
        
        color: "#fff"
    }
});

class Profile extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        //todo add credentials
        const {classes,
             user:{
                credentials: {handle,createdAt},
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink  color='secondary' variant="h5">
                            {handle}
                        </MuiLink>
                        <hr/>
                        <CalendarTodayIcon color="secondary"/>{' '}
                        <span > Joined {dayjs(createdAt).format('MM/YYYY')}</span>
                    </div>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                        <KeyboardReturnIcon color="secondary"/>
                    </MyButton>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Typography>
            </Paper>
           )
        ) :(<p>loading...</p>);

        return profileMarkup;
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = { logoutUser };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile));
