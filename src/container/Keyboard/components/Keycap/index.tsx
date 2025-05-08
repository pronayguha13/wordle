import { VALIDATION_CODE } from "@/HOC/GameContext/utils/validator";
import style from "./style.module.css";

type KeyCapProps = {
  character: string;
  validationStatus: VALIDATION_CODE;
};

const KeyCap = ({ character, validationStatus }: KeyCapProps) => {
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
    <div className={style.keycap} style={getValidationColorCode()}>
      {character}
    </div>
  );
};

export default KeyCap;
