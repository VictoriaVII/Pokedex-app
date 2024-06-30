import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/view/Navbar/Navbar";
import "./styles.scss";
import { HomePage } from "./view/Pages/HomePage/HomePage";
import { CaughtPage } from "./view/Pages/CaughtPage/CaughtPage";
import NotFoundPage from "./view/Pages/NotFoundPage/NotFoundPage";
import { PokemonPage } from "./view/Pages/PokemonPage/PokemonPage";
import Select from "./view/Pages/Select/Select";

function App() {
  return (
    <BrowserRouter basename="/Pokedex-app">
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index={true} element={<HomePage />} />
            <Route path="caught" element={<CaughtPage />} />
            <Route path="select" element={<Select />} />
            <Route path="pokemon/:id" element={<PokemonPage />} />
            <Route path="caught/pokemon/:id" element={<PokemonPage />} />
            <Route path="select/pokemon/:id" element={<PokemonPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
