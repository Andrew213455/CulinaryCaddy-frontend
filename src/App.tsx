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

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<InfoCard />} />
          <Route path="/steps/:id" element={<StepByStep />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
