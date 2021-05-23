import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Redux

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {


    const { classes, item } = this.props;

    const displayItem = (item ? <Card className={classes.card}>
      <CardMedia
        title="Status"
      />
      {item.title}
      <CardContent className={classes.content}>
        <Typography variant="body">
          <img src={item.imgPath} alt="poster" />
          <AudioPlayer
            src={item.path}
            controls
            style={{
              width: '300px'
            }}
          />
        </Typography>
      </CardContent>
    </Card>
      :
      <Card className={classes.card}>
        <CardMedia
          title="Status"
        />
        <CardContent className={classes.content}>
          <Typography variant="body">Items not found</Typography>
        </CardContent>
      </Card>
    )

    return (
      <div>
        {console.log(item)}
        { displayItem}
      </div>
    );
  }
}



export default withStyles(styles)(Items);