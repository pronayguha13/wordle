import { ValidationWordMap } from "@/HOC/GameContext/utils/validator";
import { createContext, useContext } from "react";

type GameContextType = {
  targetWord: string;
  isMatchFound: boolean;
  isGameOver: boolean;
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
  targetWord: "",
  isMatchFound: false,
  isGameOver: false,
  isGameStarted: false,
  selectedLine: 0,
  selectedBox: 0,
  validationWordMap: [],
  getValidationMapByLine: () => [] as ValidationWordMap,
  getCharacter: () => "",
  restart: () => {},
});

export default GameContext;

export const useGameContext = () => useContext(GameContext);
