import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "@material-ui/core/Slider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";

// Redux stuff
import { connect } from "react-redux";
import { clearErrors, uploadItem } from "../redux/actions/dataActions";
import "../styles/Upload.css";
const styles = {
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: "2px",
    margin: "1px",
  },
  chip: {
    marginTop: "10px",
    marginLeft: "5px",
  },
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      title: "",
      body: "",
      errors: "",
      checked: [0],
      tags: [],
      BPM: 0,
      switchChecked: false,
      mp3file: "",
      photoFile: "",
      filenamemp3: "Choose File",
      filenamePhoto: "Choose File",
      selectedGenres: [],
      genres: [
        { id: 1, text: "Pop" },
        { id: 2, text: "Rap" },
        { id: 3, text: "Rock" },
        { id: 4, text: "Trap" },
        { id: 5, text: "Metal" },
        { id: 6, text: "Electronic" },
        { id: 7, text: "Jazz" },
      ],
    };
    this.handleDeleteTags = this.handleDeleteTags.bind(this);
    this.handleAdditionTags = this.handleAdditionTags.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", errors: {} });
    }
  }
  //===========GENRES=================//
  handleToggle(value) {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];
    console.log(value);
    if (currentIndex === -1) {
      newChecked.push(value);
      this.setState({
        selectedGenres: [
          ...this.state.selectedGenres,
          this.state.genres[value - 1],
        ],
      });
    } else {
      newChecked.splice(currentIndex, 1);
      const array = [...this.state.selectedGenres];
      const deleted = this.state.selectedGenres.indexOf(value - 1);
      array.splice(deleted, 1);
      this.setState({ selectedGenres: array });
    }
    this.setState({ checked: newChecked });
  }
  //===========TAGS=================//
  handleDeleteTags(removedTag) {
    const { tags } = this.state;

    this.setState({
      tags: tags.filter((tag, index) => tag !== removedTag),
    });
  }
  handleAdditionTags(e) {
    if (e.key === "Enter") {
      this.setState((state) => ({
        tags: [...state.tags, e.target.value],
      }));
    }
  }

  //======================TEXTFIELDS=================//

  handleChange = (event) => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };
  // ======================SUBMIT=====================//

  handleSubmit = (event) => {
    event.preventDefault();
    //if no selected genres
    //Todo validate files input

    if (this.state.selectedGenres.length === 0) {
      this.setState({ errors: "! Select at least one genre" });
      return;
    }

    //request body params for item upload
    const formData = new FormData();
    formData.append("music", this.state.mp3file);
    formData.append("img", this.state.photoFile);
    formData.append("handle", this.props.user.credentials.handle);
    formData.append("BPM", this.state.BPM);
    // formData.append('genre', this.state.selectedGenres);
    formData.append("price", this.state.price);
    // formData.append('tags', this.state.tags);
    formData.append("title", this.state.title);
    formData.append("freeDownload", this.state.switchChecked);
    // this.state.selectedGenres.forEach((item) => {
    //   formData.append("genre", item);
    // });
    formData.append("genre", JSON.stringify(this.state.selectedGenres));

    // this.state.tags.forEach((item) => {
    //   formData.append("tags", item);
    // });
    formData.append("tags", JSON.stringify(eval(this.state.tags)));
    //axios post request
    this.props.uploadItem(formData);
    // console.log(JSON.stringify(eval(this.state.tags)));
  };

  handleSlider = (event, newValue) => {
    this.setState({ BPM: newValue });
  };

  //===========FREE DOWNLOAD=================//

  switchChange = (event) => {
    this.setState({ switchChecked: !this.state.switchChecked });
  };

  //===========MP3 FILE =================//

  onChangeMp3 = (e) => {
    this.setState({ mp3file: e.target.files[0] });
    this.setState({ filenamemp3: e.target.files[0].name });
  };
  onChangePhoto = (e) => {
    this.setState({ photoFile: e.target.files[0] });
    this.setState({ filenamePhoto: e.target.files[0].name });
  };
  render() {
    const {
      title,
      price,
      errors,
      tags,
      genres,
      checked,
      BPM,
      switchChecked,
      filenamemp3,
      filenamePhoto,
    } = this.state;
    const {
      classes,

      UI: { loading },
    } = this.props;

    return (
      <div>
        <MyButton onClick={this.handleOpen} tip="Add">
          <AddIcon />
        </MyButton>
        <MyButton
          tip="Close"
          onClick={this.handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <h1>Upload your track</h1>

        <form onSubmit={this.handleSubmit}>
          {/* ==========TITLE========= */}
          <TextField
            value={title}
            id="title"
            name="title"
            type="text"
            label="Title"
            required
            error={errors.body ? true : false}
            helperText={errors.body}
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
          />
          {/* ==========PRICE========= */}
          <TextField
            id="price"
            value={price}
            required
            name="price"
            type="number"
            label="Price"
            error={errors.body ? true : false}
            helperText={errors.body}
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
          />
          {/*========= BPM======== */}
          BPM
          <Slider
            value={BPM}
            onChange={this.handleSlider}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={400}
          />
          {/* TAGS */}
          <div className="tag-container">
            <TextField
              name="TAGS"
              type="text"
              label="Tags"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onKeyDown={this.handleAdditionTags}
            />

            {tags.map((tag, id) => (
              <li key={id}>
                <Chip
                  className={classes.chip}
                  label={tag}
                  onDelete={() => this.handleDeleteTags(tag)}
                ></Chip>
              </li>
            ))}
          </div>
          {/* GENRES */}
          <List className={classes.root}>
            <FormHelperText error={true}>{errors}</FormHelperText>
            {genres.map((genre) => (
              <ListItem
                key={genre.id}
                role={undefined}
                dense
                button
                onClick={() => this.handleToggle(genre.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(genre.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": genre.id }}
                  />
                </ListItemIcon>
                <ListItemText id={genre.id} primary={genre.text} />
              </ListItem>
            ))}
          </List>
          {/*========= MP3 UPLOADER======== */}
          Mp3 file:
          <div className="custom-file mb-4">
            <input
              required
              type="file"
              accept=".mp3,.wav"
              className="custom-file-input"
              id="customFile"
              onChange={this.onChangeMp3}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filenamemp3}
            </label>
          </div>
          {/*========= PHOTO UPLOADER======== */}
          <br />
          Photo:
          <div className="custom-file mb-4">
            <input
              required
              type="file"
              accept=".jpg,.png,.jpeg"
              className="custom-file-input"
              id="customFile"
              onChange={this.onChangePhoto}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filenamePhoto}
            </label>
          </div>
          {/*=====FREE DOWNLOAD=====*/}
          Free Download
          <Switch
            checked={switchChecked}
            onChange={this.switchChange}
            color="primary"
            name="switchChecked"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading}
          >
            Submit
            {loading && (
              <CircularProgress size={30} className={classes.progressSpinner} />
            )}
          </Button>
        </form>
      </div>
    );
  }
}

Upload.propTypes = {
  uploadItem: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { clearErrors, uploadItem })(
  withStyles(styles)(Upload)
);
