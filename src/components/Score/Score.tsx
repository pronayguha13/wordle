import { createPortal } from "react-dom";
import style from "./Score.module.css";
type ScoreComponentProps = {
  onClose: () => void;
};
const Score: React.FC<ScoreComponentProps> = ({ onClose }) => {
  return createPortal(
    <div className={style.backdrop}>
      <div className={style.modal}>
        <div className={style.header}>
          <span className="material-symbols-outlined" onClick={onClose}>
            close
          </span>
        </div>
        <div className={style.content}>
          <h1 className={style.heading}>Statistics</h1>
          <div className="statistics"></div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Score;
