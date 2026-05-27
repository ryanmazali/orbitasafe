import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/style.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Sobre = lazy(() => import("./pages/Sobre/Sobre"));
const Integrantes = lazy(() => import("./pages/Integrantes/Integrantes"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;