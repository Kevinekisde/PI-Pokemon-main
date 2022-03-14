import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import Landing from './Views/Landing';
import Home from './Components/Home';
import PokemonCreate from './Components/PokemonCreate';
import Details from './Components/Details';

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/"element={<Landing></Landing>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/home/create" element={<PokemonCreate></PokemonCreate>}></Route>
        <Route path="/home/:id" element={<Details></Details>}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
