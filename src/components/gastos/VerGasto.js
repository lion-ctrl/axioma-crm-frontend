import React, { useEffect, useContext } from "react";

import gastoContext from "../../context/gastos/gastosContext";

import Layout from "../Layout/Layout";
import RutaAdministrador from "../rutas/RutaAdministrador";

const VerGasto = ({ match, history }) => {
	const { id } = match.params;

	// context
	const { obtenerGasto, gastoseleccionado, mensajegasto } = useContext(
		gastoContext
	);

	useEffect(() => {
		obtenerGasto(id);
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (mensajegasto) {
			if (mensajegasto.categoria === "error") {
				history.push("/gastos");
			}
		}
		// eslint-disable-next-line
	}, [mensajegasto]);

	if (!gastoseleccionado) return "Cargando...";

	const { nombre, creado, tipo, costo, metodo, productos } = gastoseleccionado;
	return (
		<Layout>
			<RutaAdministrador/>
			<button
				type="button"
				className="mt-4 bg-blue-800 px-5 py-2 block text-white rounded leading-tight uppercase text-xs font-bold text-center mb-10 w-full md:w-auto"
				onClick={() => history.goBack()}
			>
				Regresar
			</button>
			<h1 className="text-2xl text-gray-800 font-light">Gasto: {nombre}</h1>

			<div className="mt-4 bg-white rounded p-6 w-full max-w-lg mx-auto shadow-lg">
				<div>
					<p className="my-2">Fecha: {creado.split("T")[0].split("-").reverse().join("-")}</p>
					<p className="my-2">Tipo de Gasto: {tipo}</p>
					<p className="my-2">Método de pago: {metodo}</p>
					<p className="my-2">Total: ${costo}</p>
				</div>
			</div>
			{productos.length > 0 && (
				<table className="table-auto shadow-md mt-10 w-full">
					<thead className="bg-gray-800">
						<tr className="text-white">
							<th>Producto</th>
							<th>Cant.</th>
							<th>Precio U.</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{productos.map((producto) => (
							<tr key={producto._id} className="text-center">
								<td className="border px-4 py-2">{producto.nombre}</td>
								<td className="border px-4 py-2">
									{producto.resumen.cantidad}
								</td>
								<td className="border px-4 py-2">${producto.resumen.precio}</td>
								<td className="border px-4 py-2">
									${producto.resumen.precio * producto.resumen.cantidad}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</Layout>
	);
};

export default VerGasto;
