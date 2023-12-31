import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import InfoCard from "./components/InfoCard";
import StepByStep from "./components/StepByStep";
import TimerList from "./components/TimerList";
import Rundown from "./components/Rundown";
import JokeTrivia from "./components/JokeTrivia";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<InfoCard />} />
          <Route path="/steps/:id" element={<StepByStep />} />
          <Route path="/steps/rundown/:id" element={<Rundown />} />
          <Route path="/search" element={<Main />} />
          <Route path="/steps/all/:id" element={<TimerList />} />
          <Route path="/joke" element={<JokeTrivia />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
