import './App.css';
import Header from './components/Header';
import { PokemonStore } from './components/PokemonStore';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import AppRoutes from './App.routes';

const App = observer(() => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes pokemonStore={PokemonStore} />
    </BrowserRouter>
  );
});

export default App;