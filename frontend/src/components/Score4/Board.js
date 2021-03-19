import React from 'react';
import Score4Cell from './Cell';
import './styles/Board.css';

const Score4Board = (props) => {
    const cells = [];
    const {board,colors} = props;
    for (let row = 0; row < board.length; row += 1) {
        for (let col = 0; col < board[row].length; col += 1) {
          const { color } = colors[board[row][col] || 0];
          const cell = <Score4Cell color={color} i={`${row}-${col}`} key={`${row}-${col}`} />;
          cells.push(cell);
        }
      }
      const exists = cells ? (cells) : (<p>Waiting player to join...</p>)
      return (
        <div className="board">
          <div className="grid">
            {exists}
          </div>
        </div>
      );
};

export default Score4Board;
