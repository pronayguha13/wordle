import { useContext } from "react";
import Box from "../Box/Box";
import style from "./Line.module.css";
import GameContext from "@/context/game";
import {
  VALIDATION_CODE,
  ValidationWordMap,
} from "@/HOC/GameContext/utils/validator";
/**
 * @description Component to return the each line of the Grid
 * consists of box components
 * Encapsualte logic to validate individual box and overall word
 */

type LineProps = {
  lineNumber: number;
  isSelected: boolean;
  validationMap: ValidationWordMap;
};
const Line = ({ isSelected, lineNumber, validationMap }: LineProps) => {
  const { getCharacter, selectedBox } = useContext(GameContext);
  const arr = new Array(5).fill("");

  const getCharacterForChildBox = (boxNumber: number): string => {
    const word = getCharacter(boxNumber, lineNumber, isSelected);
    return word;
  };

  return (
    <div className={style.line}>
      {arr.map((_, index) => (
        <Box
          key={index}
          isSelected={isSelected && index === selectedBox}
          validationStatus={
            validationMap?.[index]?.status ?? VALIDATION_CODE.NOT_VALIDATED
          }
          getCharacter={() => getCharacterForChildBox(index)}
        />
      ))}
    </div>
  );
};

export default Line;
