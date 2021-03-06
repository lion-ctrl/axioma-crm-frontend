import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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
import EditarUsuario from "./components/usuarios/EditarUsuario";

import Gastos from "./components/gastos/Gastos";
import NuevoGasto from "./components/gastos/NuevoGasto";
import VerGasto from "./components/gastos/VerGasto";
import EditarGasto from "./components/gastos/EditarGasto";

import Ventas from "./components/ventas/Ventas";
import NuevaVenta from "./components/ventas/NuevaVenta";
import VerVenta from "./components/ventas/VerVenta";
import EditarVenta from "./components/ventas/EditarVenta";

import Perfil from "./components/perfil/Perfil";
import EditarPerfil from "./components/perfil/EditarPerfil";
import EditarPassword from "./components/perfil/EditarPassword";

import Categorias from "./components/categorias/Categorias";
import NuevaCategoria from "./components/categorias/NuevaCategoria";
import EditarCategoria from "./components/categorias/EditarCategoria";

import Negocio from "./components/negocio/Negocio";
import EditarNegocio from "./components/negocio/EditarNegocio";

// Context
import AuthState from "./context/autenticacion/authState";
import AlertaState from "./context/alertas/alertaState";
import UsuarioState from "./context/usuarios/usuariosState";
import ProductoState from "./context/productos/productosState";
import GastosState from "./context/gastos/gastosState";
import VentasState from "./context/ventas/ventasState";

// Rutas
import RutaPrivada from "./components/rutas/RutaPrivada";

function App() {
	return (
		<AuthState>
			<AlertaState>
				<UsuarioState>
          <ProductoState>
            <GastosState>
              <VentasState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login} />
                
                    <RutaPrivada exact path="/principal" component={Principal} />
                
                    <RutaPrivada exact path="/usuarios" component={Usuarios} />
                    <RutaPrivada exact path="/nuevo-usuario" component={NuevoUsuario} />
                    <RutaPrivada exact path="/ver-usuario/:id" component={VerUsuario} />
                    <RutaPrivada exact path="/usuario/editar/:id" component={EditarUsuario} />
                
                    <RutaPrivada exact path="/productos" component={Productos} />
                    <RutaPrivada exact path="/producto/:slug" component={VerProducto} />
                    <RutaPrivada exact path="/nuevo-producto" component={NuevoProducto} />
                    <RutaPrivada exact path="/producto/editar/:slug" component={EditarProducto} />
                
                    <RutaPrivada exact path="/gastos" component={Gastos} />
                    <RutaPrivada exact path="/nuevo-gasto" component={NuevoGasto} />
                    <RutaPrivada exact path="/gasto/:id" component={VerGasto} />
                    <RutaPrivada exact path="/gasto/editar/:id" component={EditarGasto} />
                
                    <RutaPrivada exact path="/ventas" component={Ventas} />
                    <RutaPrivada exact path="/nueva-venta" component={NuevaVenta} />
                    <RutaPrivada exact path="/venta/:id" component={VerVenta} />
                    <RutaPrivada exact path="/venta/editar/:id" component={EditarVenta} />

                    <RutaPrivada exact path="/perfil" component={Perfil} />
                    <RutaPrivada exact path="/perfil/editar" component={EditarPerfil} />
                    <RutaPrivada exact path="/perfil/password" component={EditarPassword} />

                    <RutaPrivada exact path="/negocio" component={Negocio} />
                    <RutaPrivada exact path="/negocio/editar" component={EditarNegocio} />

                    <RutaPrivada exact path="/categorias" component={Categorias} />
                    <RutaPrivada exact path="/nueva-categoria" component={NuevaCategoria} />
                    <RutaPrivada exact path="/categoria/editar/:id" component={EditarCategoria} />

                    <Redirect to="/principal" />
                  </Switch>
                </Router>
              </VentasState>
            </GastosState>
          </ProductoState>
        </UsuarioState>
			</AlertaState>
		</AuthState>
	);
}

export default App;
