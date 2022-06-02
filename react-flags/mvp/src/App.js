import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/* path * fonctionne si jamais l'url ne correspond à rien de déclaré */}
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
