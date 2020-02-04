import React from 'react';
import {StyledCell} from '../components/styles/StyledCell';
import {TETROMINOS} from "../tetrominos";

const Cell = ({type}) => {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color}>{/*  gonderilen type i axtaririq TETROMINUS da */}
   {/*  {console.log("object")}    */} </StyledCell>
    );
}

export default React.memo(Cell);//ancaq deyislinleri yazir
