import { useState, ReactNode, useEffect, useCallback, useRef } from "react";

import GameContext from "@/context/game";
import validate, {
  CharacterValidationMap,
  VALIDATION_CODE,
  ValidationWordMap,
} from "@/HOC/GameContext/utils/validator";

type GameProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const targetWord = useRef<string>("");
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
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
  const [characterMap, setCharacterMap] = useState<CharacterValidationMap>(
    new Map()
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
    setIsGameOver(false);
    setIsGameStarted(false);
    setSelectedLine(0);
    setSelectedBox(0);
    setGuessedWords(new Array(6).fill(""));
    setCurrentLineCharacters(new Array(5).fill(""));
    setValidationMap([]);
    setCharacterMap(new Map());
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
    function updateCharacterValidationMap(newValidationMap: ValidationWordMap) {
      const tempMap = new Map(characterMap);
      newValidationMap.forEach((character) => {
        if (tempMap.has(character.word)) {
          const currentValidationStatus = tempMap.get(character.word)?.status;

          if (currentValidationStatus === VALIDATION_CODE.IN_POSITION) return;

          tempMap.set(character.word, {
            character: character.word,
            status: character.status,
          });
        } else {
          tempMap.set(character.word, {
            character: character.word,
            status: character.status,
          });
        }
      });

      setCharacterMap(tempMap);
    }

    function handleValidation() {
      if (selectedLine > 0) {
        const tobeValidatedLine = selectedLine - 1;

        const result = validate({
          word: guessedWords[tobeValidatedLine],
          targetWord: targetWord.current,
        });

        const tempValidationMap = Array.from(validationMap);

        tempValidationMap[tobeValidatedLine] = result.validationMap;

        updateCharacterValidationMap(result.validationMap);

        setValidationMap(tempValidationMap);
        if (result.isFound) {
          setIsMatchFound(result.isFound);
          setIsGameOver(true);
        } else {
          if (selectedLine === 6) {
            setIsGameOver(true);
          }
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
        targetWord: targetWord.current,
        isMatchFound: isMatchFound,
        isGameOver: isGameOver,
        isGameStarted: isGameStarted,
        selectedLine: selectedLine,
        selectedBox: selectedBox,
        validationWordMap: validationMap,
        characterValidationMap: characterMap,
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
