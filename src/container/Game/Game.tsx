import { Fragment, useContext } from "react";
import style from "./Game.module.css";

import Grid from "@/components/Grid/Grid";
import Score from "@/components/Score/Score";

import GameContext from "@/context/game";

const Game = () => {
  const { isMatchFound, isGameStarted, restart } = useContext(GameContext);

  return (
    <Fragment>
      <div className={style.container}>
        <Grid />
        <button className={style.restart_btn} onClick={restart}>
          {isGameStarted ? "Restart" : "Start"}
        </button>
      </div>
      {isMatchFound ? <Score onClose={restart} /> : null}
    </Fragment>
  );
};

export default Game;
