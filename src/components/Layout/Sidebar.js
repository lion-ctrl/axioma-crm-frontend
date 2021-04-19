import React from "react";
import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
	const history = useHistory();
	return (
		<aside className="bg-gray-800 md:w-1/5 p-5 md:min-h-screen">
			<div>
				<p className="text-white text-xl font-black">Boom Import</p>
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
				<li
					className={
						history.location.pathname === "/usuarios" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/usuarios"} className="text-white block">
						Usuarios
					</Link>
				</li>
                <li
					className={
						history.location.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/productos"} className="text-white block">
						Productos
					</Link>
				</li>
				<li
					className={
						history.location.pathname === "/gastos" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/gastos"} className="text-white block">
						Gastos
					</Link>
				</li>
				<li
					className={
						history.location.pathname === "/ventas" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/ventas"} className="text-white block">
						Ventas
					</Link>
				</li>
			</nav>
		</aside>
	);
};

export default Sidebar;
