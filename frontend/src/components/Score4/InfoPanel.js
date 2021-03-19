import React from 'react';
import './styles/InfoPanel.css';

import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';


const InfoPanel = (props) => {
  const { data } = props;
  const inactive = data.ended;
  

  return (
    <Card className="info-card">
      <CardContent className="info-container">
        { inactive ? (
          <h1> A Player disconnected. </h1>
        ) : (
          <div className="active">
          <h2> Room id:  {data.room} </h2>

            {data.isTurn && data.active && data.start && !data.spectator
             && <p className="description"> Your turn </p>
            }
            {!data.isTurn && data.active && data.start && !data.spectator
             && <p className="description"> Other player&#39;s turn </p>
            }
            {data.win
              && <p> Player {data.colors[data.win].name} wins! </p>
            }
            {data.draw
              && <p> Draw! </p>
            }
              <h2> Score</h2> 
            {
               data.win ? (data.score+=1):(data.score) 
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoPanel;