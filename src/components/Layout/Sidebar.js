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
						history.location.pathname === "/usuarios" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/usuarios"} className="text-white mb-2 block">
						Usuarios
					</Link>
				</li>
                <li
					className={
						history.location.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/productos"} className="text-white mb-2 block">
						Productos
					</Link>
				</li>
				<li
					className={
						history.location.pathname === "/pedidos" ? "bg-blue-800 p-2" : "p-2"
					}
				>
					<Link to={"/pedidos"} className="text-white mb-2 block">
						Pedidos
					</Link>
				</li>
			</nav>
		</aside>
	);
};

export default Sidebar;
