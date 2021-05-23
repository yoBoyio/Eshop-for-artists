//React
import React from "react";
import { useEffect, useState } from "react";
import BeatsCard from "../components/BeatsCard";
import { connect } from "react-redux";

//Action
import { searchRelated } from "../redux/actions/dataActions";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import SearchIcon from "@material-ui/icons/Search";

//styles
const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "30px",
    marginRight: "30px",
    padding: "100px",
    width: "100",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "",
    clear: "both",
  },
  search: {
    display: "flex",
    margin: "15px 0",
  },
  centered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "180%",
  },
}));

//-----------------SPEECH RECOGNITION SETUP---------------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

function Search(props) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [submit, setSubmit] = useState(false);
  const [submittedtext, setSubmittedtext] = useState(null);
  const items = props.items;

  //Mic method
  const handleListen = () => {
    if (!recognition.listening) {
      recognition.start();
      recognition.onresult = (event) => {
        var finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + " ";
        }
        setSearchText(finalTranscript);
      };
    } else {
      recognition.end();
    }
  };

  //Submit Method
  onsubmit = () => {
    props.searchRelated(`?query=${searchText}`);
    setSubmittedtext(searchText);
    setSubmit(true);
  };

  useEffect(() => {
    if (submit) {
      setSubmit(false);
    }
  }, []);

  //map items
  let mapping =
    items && items.length > 0 ? (
      items.map((item) => <BeatsCard key={item.itemId} item={item} />)
    ) : (
      <BeatsCard items={false} />
    );

  return (
    <div>
      <div className={classes.search}>
        <TextField
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          style={{ flex: 1 }}
          label="Search..."
          variant="filled"
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onsubmit();
            }
          }}
        />
        <IconButton onClick={handleListen}>
          <MicIcon />
        </IconButton>
        <Button
          onClick={onsubmit}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <SearchIcon fontSize="large" />
        </Button>
      </div>
      <div className={classes.main}>
        <div>{mapping}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.data.search,
});
export default connect(mapStateToProps, { searchRelated })(Search);
