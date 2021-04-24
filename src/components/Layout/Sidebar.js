import React,{useContext} from "react";
import { Link, useHistory } from "react-router-dom";

import authContext from "../../context/autenticacion/authContext"

const Sidebar = () => {
	const history = useHistory();
	const {negocio,usuario} = useContext(authContext);

	if (!negocio) return null;
	if (!usuario) return null;
	
	return (
		<aside className="bg-gray-800 md:w-1/5 p-5 md:min-h-screen">
			<div>
				<p className="text-white text-xl font-black">{negocio.nombre}</p>
			</div>
			<nav className="mt-5 list-none">
				<li
					className={
						history.location.pathname === "/principal" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/principal"} className="text-white block">
						Panel Principal
					</Link>
				</li>
				{usuario.rol === "ADMIN" &&
					<li
						className={
							history.location.pathname === "/usuarios" ? "bg-blue-800 p-2" : "p-2"
						}
					>
						<Link to={"/usuarios"} className="text-white block">
							Usuarios
						</Link>
					</li>
				}
				
                <li
					className={
						history.location.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/productos"} className="text-white block">
						Inventario
					</Link>
				</li>
				{usuario.rol === "ADMIN" &&
					<li
						className={
							history.location.pathname === "/gastos" ? "bg-blue-800 p-2" : "p-2"
						}
					>
						<Link to={"/gastos"} className="text-white block">
							Gastos
						</Link>
					</li>
				}
				<li
					className={
						history.location.pathname === "/ventas" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/ventas"} className="text-white block">
						Ventas
					</Link>
				</li>
				<li
					className={
						history.location.pathname === "/perfil" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/perfil"} className="text-white block">
						Perfil
					</Link>
				</li>
				{usuario.rol === "ADMIN" &&
					<li
						className={
							history.location.pathname === "/negocio" ? "bg-blue-800 p-2" : "p-2"
						}
					>
						<Link to={"/negocio"} className="text-white block">
							Negocio
						</Link>
					</li>
				}
			</nav>
		</aside>
	);
};

export default Sidebar;
