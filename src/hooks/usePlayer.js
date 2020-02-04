import { useState, useCallback } from "react";
import { TETROMINOS, randomTetro } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer(prevState => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided //collided:collided
    }));
  };
  //starti basanda bu funcu ele
  const resetPlayer = useCallback(() => {
    //bunu isletmesek infinite loopa girir
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 }, //yeni ortadan basla
      tetromino: randomTetro().shape,
      collided: false
    });
  }, []);

  //rotate function
  const rotate = (matrix, direction) => {
    //make the rows to become columns
    const rotatedTetro = matrix.map((
      _,
      index //yazanda basa dusmek
    ) => matrix.map(col => col[index]));
    if (direction > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)); //butun copy ele
    // console.log(clo nedPlayer);
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);
    setPlayer(clonedPlayer);

    let pos = clonedPlayer.pos.x; //axis;
    let offset = 1;
    //yoxlaki harasa deyirem?
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      //hereket elemir ve true donderirse
      clonedPlayer.pos.x += offset; //ne qeder hereket eliyir
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        //eger qiragindan cixintilar olarsa
        rotate(clonedPlayer.tetromino, -direction); //eksine firlat
        clonedPlayer.pos.x = pos;
        return;
      }
    }
  };

  return [player, resetPlayer, updatePlayerPosition, playerRotate];
};
