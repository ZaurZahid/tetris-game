import React, { useState } from "react";
import {
  StyledTetrisWrapper,
  StyledTetris
} from "../components/styles/StyledTetris";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { createStage, checkCollision } from "../gameHelpers";

//custom hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, resetPlayer, updatePlayerPosition, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer); //playeri gonderiremki arrayi qebul elesin rahatliqla
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const movePlayer = direction => {
    //saga sola X ile gedirik
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      //eger false-dusa demeli problem yoxdu ise davam
      updatePlayerPosition({ x: direction, y: 0 });
    }
  };

  const startGame = () => {
    //reset everything
    setStage(createStage); //0 la
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);

    setLevel(0);
    setScore(0);
    setRows(0)
  };
  const drop = () => {
    //increase level 10 defe udanda
    if (rows > level * 10) {
      setLevel(prev => prev + 1);
      //also increase speed
      setDropTime(1000/(level+1)+200)
    }

    //asagi Y ile gedirik
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({
        x: 0,
        y: 1,
        collided: false
      });
    } else {
      if (player.pos.y < 1) {
        //eger 0 olarsa day getmeye yer yoxdu gameover ele
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
      console.log("qurtardi dostum)");
    }
  };
  const dropPlayer = () => {
    console.log("dayandi");

    setDropTime(null);
    drop();
  };
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        //left isaresi 37 didir ASCII
        movePlayer(-1);
        // console.log("zibil sol");
      } else if (keyCode === 39) {
        //right isaresi 39 didir ASCII
        movePlayer(1);
        // console.log("zibil sag");
      } else if (keyCode === 40) {
        //down isaresi 40 didir ASCII
        dropPlayer();
      } else if (keyCode === 38) {
        //yuxaridisa firlat
        playerRotate(stage, 1);
      }
    }
  };
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("gedir");
        setDropTime(1000/(level+1)+200);
      }
    }
  };
  useInterval(() => {
    //droptime erzinde asagi gotur
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => {
        // console.log(e);
        move(e);
      }}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score:${score}`} />
              <Display text={`Rows:${rows}`} />
              <Display text={`Level:${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
