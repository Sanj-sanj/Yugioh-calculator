import "./styles/App.css";
import DuelGrid from "./components/DuelGrid";

const players = ["Player 1", "Player 2"];
function App() {
  return (
    <div className="App">
      <DuelGrid players={players} />
    </div>
  );
}

export default App;
