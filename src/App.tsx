import "./styles/App.css";
import DuelApp from "./components/DuelApp";

const players = ["Player 1", "Player 2"];
function App() {
  return (
    <div className="App">
      <DuelApp players={players} />
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
