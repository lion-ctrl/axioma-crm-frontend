import React, { useEffect, useContext } from "react";

import usuariosContext from "../../context/usuarios/usuariosContext";

import Layout from "../Layout/Layout";
import RutaAdministrador from "../rutas/RutaAdministrador";

const VerUsuario = ({ match, history }) => {
	// _id
	const { id } = match.params;
	// Context
	const {
		seleccionarUsuario,
		mensajeusuario,
		usuarioseleccionado,
	} = useContext(usuariosContext);

	useEffect(() => {
		if (id) {
			seleccionarUsuario(id);
		}
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (mensajeusuario) {
			if (mensajeusuario.categoria === "error") {
				history.push("/usuarios");
			}
		}
		// eslint-disable-next-line
	}, [mensajeusuario]);

	if (!usuarioseleccionado) return null;
	const { usuario, ventas } = usuarioseleccionado;
	const total = ventas.reduce((total, venta) => (total += venta.total), 0);
	return (
		<Layout>
			<RutaAdministrador />
			<h1 className="text-2xl text-gray-800 font-light">
				Emplead@: {usuario.nombre} {usuario.apellido}
			</h1>

			<div className="mt-4 bg-white rounded p-6 shadow-lg w-full">
				<div>
					<p className="text-gray-800 text-xl">Datos del Empleado:</p>
					<p className="flex items-center my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						{usuario.email}
					</p>
					<p>Ganancias Totales: ${total}</p>
				</div>
			</div>
			<div>
				<p className="text-gray-800 text-xl my-4">Ventas realizadas:</p>
				{ventas.length ? (
					<table className="table-auto shadow-md w-full">
						<thead className="bg-gray-800">
							<tr className="text-white">
								<th>Nombre</th>
								<th>Metodo</th>
								<th>Fecha</th>
								<th>Productos</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{ventas.map((venta) => (
								<tr key={venta._id} className="text-center">
									<td className="border px-4 py-2">{venta.nombre}</td>
									<td className="border px-4 py-2">{venta.metodo}</td>
									<td className="border px-4 py-2">
										{venta.creado.split("T")[0].split("-").reverse().join("-")}
									</td>
									<td className="border px-4 py-2">
										{venta.productos.map((producto) => (
											<div key={producto._id}>
												<p>{producto.nombre}</p>
											</div>
										))}
									</td>
									<td className="border px-4 py-2">${venta.total}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>Aún no ha realizado ninguna venta.</p>
				)}
			</div>
		</Layout>
	);
};

export default VerUsuario;
