import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// componentes
import Login from "./components/Login";

import Principal from "./components/Principal";

import Productos from "./components/productos/Productos";
import VerProducto from "./components/productos/VerProducto";
import NuevoProducto from "./components/productos/NuevoProducto";

import Usuarios from "./components/usuarios/Usuarios";
import NuevoUsuario from "./components/usuarios/NuevoUsuario";
import VerUsuario from "./components/usuarios/VerUsuario";

import Pedidos from "./components/pedidos/Pedidos";

// Context
import AuthState from "./context/autenticacion/authState";
import AlertaState from "./context/alertas/alertaState";
import UsuarioState from "./context/usuarios/usuariosState";
import ProductoState from "./context/productos/productosState";

// Rutas
import RutaPrivada from "./components/rutas/RutaPrivada";

function App() {
	return (
		<AuthState>
			<AlertaState>
				<UsuarioState>
          <ProductoState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
            
                <RutaPrivada exact path="/principal" component={Principal} />
            
                <RutaPrivada exact path="/usuarios" component={Usuarios} />
                <RutaPrivada exact path="/nuevo-usuario" component={NuevoUsuario} />
                <RutaPrivada exact path="/ver-usuario/:id" component={VerUsuario} />
            
                <RutaPrivada exact path="/productos" component={Productos} />
                <RutaPrivada exact path="/producto/:slug" component={VerProducto} />
                <RutaPrivada exact path="/nuevo-producto" component={NuevoProducto} />
            
                <RutaPrivada exact path="/pedidos" component={Pedidos} />
              </Switch>
            </Router>
          </ProductoState>
        </UsuarioState>
			</AlertaState>
		</AuthState>
	);
}

export default App;
