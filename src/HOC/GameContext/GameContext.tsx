import { useState, ReactNode, useEffect, useCallback, useRef } from "react";

import GameContext from "@/context/game";
import validate, { ValidationWordMap } from "@/HOC/GameContext/utils/validator";

type GameProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const targetWord = useRef<string>("");
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [selectedLine, setSelectedLine] = useState<number>(0);
  const [selectedBox, setSelectedBox] = useState<number>(0);
  const [guessedWords, setGuessedWords] = useState<string[]>(
    new Array(6).fill("")
  );
  const [currentLineCharacters, setCurrentLineCharacters] = useState<string[]>(
    new Array(5).fill("")
  );
  const [validationMap, setValidationMap] = useState<Array<ValidationWordMap>>(
    Array(6).fill(null)
  );

  // const validator = useGameValidator();

  const getCharacterByBoxNumber = (
    boxNumber: number,
    lineNumber: number,
    isSelectedLine: boolean
  ): string => {
    if (isSelectedLine) {
      return currentLineCharacters[boxNumber] ?? "";
    } else {
      if (selectedLine < lineNumber) return "";

      return guessedWords[lineNumber]?.[boxNumber];
    }
  };

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (!isGameStarted) {
        setIsGameStarted(true);
      }

      if (key === "Enter") {
        if (selectedBox === 5) {
          const newGuessedWords = [...guessedWords];
          newGuessedWords[selectedLine] = currentLineCharacters.join("");
          setGuessedWords(newGuessedWords);
          // Move to next line
          setSelectedLine((prev) => prev + 1);
          setSelectedBox(0);
          setCurrentLineCharacters(new Array(5).fill(""));
        }
        return;
      }

      if (key === "Backspace") {
        if (selectedBox === 0) return;

        const updatedCharacters = [...currentLineCharacters];
        updatedCharacters[selectedBox - 1] = "";
        setCurrentLineCharacters(updatedCharacters);
        setSelectedBox((prev) => prev - 1);
        return;
      }
      const alphabetRegEx = /^[a-z]*$/;

      if (alphabetRegEx.test(key)) {
        if (selectedBox < 5) {
          const updatedCharacters = [...currentLineCharacters];
          updatedCharacters[selectedBox] = key.toUpperCase();
          setCurrentLineCharacters(updatedCharacters);
          setSelectedBox((prev) => prev + 1);
        }
      }
    },
    [
      isGameStarted,
      currentLineCharacters,
      selectedBox,
      guessedWords,
      selectedLine,
    ]
  );

  const getValidationMapByLine = (lineNumber: number) => {
    return validationMap[lineNumber];
  };

  /*------restart functionality------*/
  const resetState = () => {
    setIsMatchFound(false);
    setIsGameStarted(false);
    setSelectedLine(0);
    setSelectedBox(0);
    setGuessedWords(new Array(6).fill(""));
    setCurrentLineCharacters(new Array(5).fill(""));
    setValidationMap([]);
  };

  const restart = () => {
    resetState();
  };
  /*------restart functionality------*/

  /*-------------Use effects---------------*/

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    // const currentLine = selectedLine;

    function handleValidation() {
      if (selectedLine > 0) {
        const tobeValidatedLine = selectedLine - 1;

        const result = validate({
          word: guessedWords[tobeValidatedLine],
          targetWord: targetWord.current,
        });

        const tempValidationMap = Array.from(validationMap);

        tempValidationMap[tobeValidatedLine] = result.validationMap;

        setValidationMap(tempValidationMap);
        if (result.isFound) {
          setIsMatchFound(result.isFound);
        }
      }
    }

    handleValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLine]);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=1&length=5&alphabetize=true"
      );

      if (response) {
        const word = await response.json();
        targetWord.current = word[0];
      }
    };
    if (isGameStarted) {
      fetchWord();
    }
  }, [isGameStarted]);

  /*-------------Use effects---------------*/

  return (
    <GameContext.Provider
      value={{
        isMatchFound: isMatchFound,
        isGameStarted: isGameStarted,
        selectedLine: selectedLine,
        selectedBox: selectedBox,
        validationWordMap: validationMap,
        getValidationMapByLine: getValidationMapByLine,
        getCharacter: getCharacterByBoxNumber,
        restart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
