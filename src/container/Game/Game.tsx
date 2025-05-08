import { Fragment } from "react";
import style from "./Game.module.css";

import Grid from "@/components/Grid/Grid";
import Score from "@/components/Score/Score";

import { useGameContext } from "@/context/game";
import Keyboard from "@/container/Keyboard";

const Game = () => {
  const { isGameOver, restart } = useGameContext();

  return (
    <Fragment>
      <div className={style.container}>
        <Grid />
        <Keyboard />
      </div>
      {isGameOver ? <Score onClose={restart} /> : null}
    </Fragment>
  );
};

export default Game;
