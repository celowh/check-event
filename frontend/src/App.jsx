import { Routes, Route } from 'react-router-dom'
import { CheckIn } from './pages/CheckIn'
import { History } from './pages/History'
import { CheckOut } from './pages/CheckOut'

export default function App() {
  //lógica do componente vem SEMPRE entre o export e o return

  //PÁGINA DE CONFIGURAÇÃO DAS ROTAS

  return ( //Routes é o que vai configurar as rotas, como se fosse uma lista de rotas, e o Route é cada rota em separado
    <Routes> 
      {/* path é o caminho da página, a URL que vai ser acessada, e element é a renderização que vai ser feita nessa página em si, desenvolvida dentro de PAGES no SRC */}
      <Route path="/checkin" element={<CheckIn/>}/> 
      <Route path="/history" element={<History/>}/> 
      <Route path="/checkout/:id" element={<CheckOut/>}/> 

    </Routes>
  );
}
