import KeyCap from "@/container/Keyboard/components/Keycap";
import style from "./style.module.css";
import { useGameContext } from "@/context/game";
import { VALIDATION_CODE } from "@/HOC/GameContext/utils/validator";

const Keyboard = () => {
  const { characterValidationMap } = useGameContext();

  const QWERTY_LETTERS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const getValidationStatusByCharacter = (letter: string) => {
    return characterValidationMap.has(letter)
      ? characterValidationMap.get(letter)!.status
      : VALIDATION_CODE.NOT_VALIDATED;
  };
  return QWERTY_LETTERS.map((letters) => (
    <div className={style.row}>
      {letters.map((letter) => (
        <KeyCap
          character={letter}
          validationStatus={getValidationStatusByCharacter(letter)}
        />
      ))}
    </div>
  ));
};

export default Keyboard;
