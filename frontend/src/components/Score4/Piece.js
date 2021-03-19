import React from 'react';

const Score4Piece = (props) => {
  const { color, x } = props;
  const style = {
    marginTop:30,
    backgroundColor: color,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    position: 'absolute',
    left: x,
  };
  return (
    <div style={style} />
  );
};

export default Score4Piece;