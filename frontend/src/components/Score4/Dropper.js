import React, { Component } from 'react';
import Score4Piece from './Piece';
import './styles/Dropper.css';

class Score4Dopper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  movePiece = () => {
    const mouse = this.props.position.x;
    const offset = Math.min(mouse, 6 * 50);
    const x = Math.floor(offset / ((6 * 50) / 6)) * 50;
    this.setState({ x });
  }

  dropPiece = () => {
    const col = this.state.x / 50;
    this.props.action( "play",{ command: 'play', col });
  }

  render() {
    const { x, y } = { ...this.state };
    
    return (
      <div className="dropper" onMouseMove={this.movePiece} onClick={this.dropPiece}>
        { this.props.turn
          && <Score4Piece x={x} y={y} color={this.props.pieceColor} />
        }
      </div>
    );
  }
}

export default Score4Dopper;