import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../util/MyButton';

//redux 
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
//mui
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
    paper: {
        padding: 20,

    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
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
        '& .profile-details': {
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
    txt: {

        color: "#fff"
    }
});

class Profile extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    render() {
        //todo add credentials
        const { classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <hr />
                        <div className="image-wrapper">
                            <img scr={imageUrl} alt="profile" className="profile-image" />
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                            <MyButton tip="Update Picture" onClick={this.handleEditPicture} className="button">
                                <EditIcon color="secondary" />
                            </MyButton>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink compoment={Link} to={`/users/${handle}`} style={{ color: 'black' }} variant="h5">
                                {handle}
                            </MuiLink>
                            <hr />
                            <CalendarTodayIcon color="secondary" />{' '}
                            <span > Member since {dayjs(createdAt).format('MM/YYYY')}</span>
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationCityIcon color="secondary" /> <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {bio && (
                                <Fragment>
                                    <FormatQuoteIcon color="secondary" />  <span>{bio}</span>
                                    <hr />
                                </Fragment>
                            )}

                        </div>
                        <hr /><hr />
                        <MyButton tip="Logout" onClick={this.handleLogout}>
                            <KeyboardReturnIcon color="secondary" />
                        </MyButton>
                        <MyButton tip="Update Info">
                            <SettingsIcon color="secondary" />
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
        ) : (<p>loading...</p>);

        return profileMarkup;
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
