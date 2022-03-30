import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import Landing from './Views/Landing';
import Home from './Components/Home';
import PokemonCreate from './Components/PokemonCreate';
import Details from './Components/Details';
import Error404 from './Views/404';

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/"element={<Landing></Landing>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/home/create" element={<PokemonCreate></PokemonCreate>}></Route>
        <Route path="/home/:id" element={<Details></Details>}></Route>
        <Route path="*" element={<Error404></Error404>}></Route>
        <Route path="/error" element={<Error404></Error404>}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
