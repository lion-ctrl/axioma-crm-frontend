import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// componentes
import Login from "./components/Login";

import Principal from "./components/Principal";

import Productos from "./components/productos/Productos";
import VerProducto from "./components/productos/VerProducto";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

import Usuarios from "./components/usuarios/Usuarios";
import NuevoUsuario from "./components/usuarios/NuevoUsuario";
import VerUsuario from "./components/usuarios/VerUsuario";

import Gastos from "./components/gastos/Gastos";
import NuevoGasto from "./components/gastos/NuevoGasto";
import VerGasto from "./components/gastos/VerGasto";
import EditarGasto from "./components/gastos/EditarGasto";

// Context
import AuthState from "./context/autenticacion/authState";
import AlertaState from "./context/alertas/alertaState";
import UsuarioState from "./context/usuarios/usuariosState";
import ProductoState from "./context/productos/productosState";
import GastosState from "./context/gastos/gastosState";

// Rutas
import RutaPrivada from "./components/rutas/RutaPrivada";

function App() {
	return (
		<AuthState>
			<AlertaState>
				<UsuarioState>
          <ProductoState>
            <GastosState>
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
                  <RutaPrivada exact path="/producto/editar/:slug" component={EditarProducto} />
              
                  <RutaPrivada exact path="/gastos" component={Gastos} />
                  <RutaPrivada exact path="/nuevo-gasto" component={NuevoGasto} />
                  <RutaPrivada exact path="/gasto/:id" component={VerGasto} />
                  <RutaPrivada exact path="/gasto/editar/:id" component={EditarGasto} />
                </Switch>
              </Router>
            </GastosState>
          </ProductoState>
        </UsuarioState>
			</AlertaState>
		</AuthState>
	);
}

export default App;
