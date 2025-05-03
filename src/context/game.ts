import { ValidationWordMap } from "@/HOC/GameContext/utils/validator";
import { createContext } from "react";

type GameContextType = {
  isMatchFound: boolean;
  isGameStarted: boolean;
  selectedLine: number;
  selectedBox: number;
  validationWordMap: Array<ValidationWordMap>;
  getValidationMapByLine: (lineNumber: number) => ValidationWordMap;
  getCharacter: (
    boxNumber: number,
    lineNumber: number,
    isSelectedLine: boolean
  ) => string;
  restart: () => void;
};
const GameContext = createContext<GameContextType>({
  isMatchFound: false,
  isGameStarted: false,
  selectedLine: 0,
  selectedBox: 0,
  validationWordMap: [],
  getValidationMapByLine: () => [],
  getCharacter: () => "",
  restart: () => {},
});

export default GameContext;
