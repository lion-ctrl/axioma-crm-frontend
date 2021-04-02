import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// componentes
import Login from "./components/Login"

import Productos from "./components/productos/Productos"

import Usuarios from "./components/usuarios/Usuarios"

import Pedidos from "./components/pedidos/Pedidos"

// Context
import AuthState from "./context/autenticacion/authState";
import AlertaState from "./context/alertas/alertaState";

// Rutas
import RutaPrivada from "./components/rutas/RutaPrivada"

function App() {
  return (
    <AuthState>
      <AlertaState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            
            <RutaPrivada exact path="/usuarios" component={Usuarios} />
        
            <RutaPrivada exact path="/productos" component={Productos} />

            <RutaPrivada exact path="/pedidos" component={Pedidos} />
          </Switch>
        </Router>
      </AlertaState>
    </AuthState>
  );
}

export default App;
