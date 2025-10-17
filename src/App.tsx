import { Route,Routes } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar";
import Homepage from './pages/homepage';
import Pokemoneslista from "./pages/Pokemoneslista";
import Pokemonsdetalle from "./pages/pokemonsdetalle";
/* import Favoritos from "./pages/Favoritos"; */
function App (){
    return(
        <>    
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/pokemones" element={<Pokemoneslista/>} />
            <Route path="/pokemon/:id" element={<Pokemonsdetalle/>} />
            {/* <Route path="/Favoritos" element={<Favoritos/>} /> */}
        </Routes>   
        </>
    )
}

export default App