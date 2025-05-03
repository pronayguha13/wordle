import styles from "./App.module.css";
/*--------Component Import ----------*/
import { HeaderContainer, GameContainer } from "@/container";
/*--------Component Import ----------*/
import GameProvider from "@/HOC/GameContext/GameContext";
function App() {
  return (
    <div className={styles.container}>
      <GameProvider>
        <HeaderContainer />
        <GameContainer />
      </GameProvider>
    </div>
  );
}

export default App;
