

import { Route, Routes} from "react-router-dom";

import Administrator from './Administrator/App'
import Client from './Client/App'
import Index from './Login/App'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Cliente" element={<Client />} />
        <Route path="/Administrador" element={<Administrator />} />
      </Routes>
    </div>
  )
}

export default App
