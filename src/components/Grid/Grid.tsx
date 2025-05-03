import { useContext } from "react";
import Line from "./components/Line/Line";
import style from "./Grid.module.css";
import GameContext from "@/context/game";

const arr = new Array(6).fill("");
const Grid = () => {
  const { selectedLine, validationWordMap } = useContext(GameContext);

  const getIsLineSelected = (lineNumber: number) => lineNumber === selectedLine;
  /**
   * if the word is in the correct position, and it is a word i nthe target word then append the class correct_word_position
   * else if the word is in the final word but not in the correct position, then append the class correct_word
   */
  return (
    <div className={style.container}>
      {arr.map((_, index) => (
        <Line
          key={index}
          lineNumber={index}
          isSelected={getIsLineSelected(index)}
          validationMap={validationWordMap[index] ?? null}
        />
      ))}
    </div>
  );
};

export default Grid;
