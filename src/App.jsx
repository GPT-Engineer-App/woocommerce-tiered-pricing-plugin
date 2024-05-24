import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import BackendSettings from "./pages/BackendSettings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/backend-settings" element={<BackendSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
