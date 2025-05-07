import { createPortal } from "react-dom";
import style from "./Score.module.css";
import { useGameContext } from "@/context/game";
type ScoreComponentProps = {
  onClose: () => void;
};
const Score: React.FC<ScoreComponentProps> = ({ onClose }) => {
  const { targetWord, isMatchFound } = useGameContext();

  return createPortal(
    <div className={style.backdrop}>
      <div className={style.modal}>
        <div className={style.header}>
          <span className="material-symbols-outlined" onClick={onClose}>
            close
          </span>
        </div>
        <div className={style.content}>
          {/* <h1 className={style.heading}>Statistics</h1> */}
          <div className={style.finish_message}>
            {isMatchFound ? (
              <p>Congratulations !! You have found the match</p>
            ) : (
              <p> Oops! You could not guess the word</p>
            )}
          </div>
          <h3 className={style.word}>{targetWord}</h3>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Score;
