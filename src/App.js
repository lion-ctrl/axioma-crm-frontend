import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login"

import Productos from "./components/productos/Productos"

import Usuarios from "./components/usuarios/Usuarios"

import Pedidos from "./components/pedidos/Pedidos"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        
        <Route exact path="/productos" component={Productos} />

        <Route exact path="/usuarios" component={Usuarios} />

        <Route exact path="/pedidos" component={Pedidos} />
      </Switch>
    </Router>
  );
}

export default App;
