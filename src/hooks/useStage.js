import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  const [rowsCleared, setRowsCleared] = useState(0); //dolanda 1 columu bosalt

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage =>  
      newStage.reduce((acc, row) => {
        //   console.log(row);
          if (row.findIndex(cell => cell[0] === 0) === -1) {//sil
          //eger 0-a beraber bir sey tapmazsa (bos yer tapmazsa)
          setRowsCleared(prev => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, "clear"])); //sildiyimiz qeder arrayin evveline column ekle
          return acc;
        }
        acc.push(row);//davam ele
        return acc;
      },[]);//reduce ucun initial valu
    

    const updateStage = prevState => {
      //array verir mene boyuk stegi
      //first flush the stage
      const newStage = prevState.map(
        row => row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell)) //burda menim sehvim var idi 4 saata hell eledim [cell] yazmisdim)))))
      );

      //then draw the tetramano
      //mes bunu goturur
      // [0, "I", 0, 0],
      // [0, "I", 0, 0],
      // [0, "I", 0, 0],
      // [0, "I", 0, 0]
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`
            ]; //newStage[3][4]===I
          }
        });
      });
      // console.log(newStage)

      //then check  if we collided
      if (player.collided) {
        //eger deydise reset ele
        resetPlayer();
        return sweepRows(newStage)
      } 
      return newStage;
    };
    setStage(prev => updateStage(prev)); //deyis   funca uygun  YENI newstage ile deyissin
  }, [player, resetPlayer]); //bos array olanda yeni seh yuklenenede

  return [stage, setStage,rowsCleared];
};
