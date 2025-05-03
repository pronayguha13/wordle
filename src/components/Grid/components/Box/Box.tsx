import { VALIDATION_CODE } from "@/HOC/GameContext/utils/validator";
import style from "./Box.module.css";
type BoxProps = {
  isSelected: boolean;
  validationStatus: VALIDATION_CODE;
  getCharacter: () => string;
};
const Box = ({
  isSelected = false,
  validationStatus = VALIDATION_CODE.NOT_VALIDATED,
  getCharacter,
}: BoxProps) => {
  const getValidationColorCode = () => {
    switch (validationStatus) {
      case VALIDATION_CODE.NOT_IN_TARGET:
        return { backgroundColor: "#484b52" };
        break;
      case VALIDATION_CODE.NOT_IN_POSITION:
        return { backgroundColor: "#b59f3b" };
        break;
      case VALIDATION_CODE.IN_POSITION:
        return { backgroundColor: "#538d4e" };
        break;
    }
  };
  return (
    <div
      className={`${style.box} ${isSelected ? style.selected : ""}`}
      style={getValidationColorCode()}
    >
      {getCharacter()}
    </div>
  );
};

export default Box;
