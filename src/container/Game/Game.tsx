import { Fragment } from "react";
import style from "./Game.module.css";

import Grid from "@/components/Grid/Grid";
import Score from "@/components/Score/Score";

import { useGameContext } from "@/context/game";

const Game = () => {
  const { isGameOver, isGameStarted, restart } = useGameContext();

  return (
    <Fragment>
      <div className={style.container}>
        <Grid />
        <button className={style.restart_btn} onClick={restart}>
          {isGameStarted ? "Restart" : "Start"}
        </button>
      </div>
      {isGameOver ? <Score onClose={restart} /> : null}
    </Fragment>
  );
};

export default Game;
