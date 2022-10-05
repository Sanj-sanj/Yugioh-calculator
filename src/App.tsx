import './App.css'
import DuelDisplay from './components/DuelDisplay'

function App() {

  return (
    <div className="App">
      <DuelDisplay currentLP={8000} duelistName="Doug Dimmadome" id={987} />
    </div>
  )
}

export default App
