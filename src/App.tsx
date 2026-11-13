import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Pokemoneslista from "./pages/Pokemoneslista";
import Pokemonsdetalle from "./pages/pokemonsdetalle";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemones" element={<Pokemoneslista />} />
        <Route path="/pokemon/:id" element={<Pokemonsdetalle />} />
      </Routes>
    </>
  );
}

export default App;
