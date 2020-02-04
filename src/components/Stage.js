import React from "react";
import Cell from "./Cell";
import {StyledStage} from '../components/styles/StyledStage';
 
const Stage = ({ stage }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}> 
    {/* {console.log(stage) } */}
      {stage.map(row => 
          row.map((cell, index) => 
            // console.log(cell,index);
          <Cell key={index} type={cell[0]} />
        )
      )}
    </StyledStage>
  );
};

export default Stage;
