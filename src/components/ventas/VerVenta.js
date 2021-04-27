import React, { useEffect, useContext } from "react";

import ventasContext from "../../context/ventas/ventasContext";

import Layout from "../Layout/Layout";

const VerVenta = ({ match, history }) => {
	const { id } = match.params;

	const { ventaseleccionada, obtenerVenta, mensajeventa } = useContext(
		ventasContext
	);

	useEffect(() => {
		if (id) {
			obtenerVenta(id);
		}
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (mensajeventa) {
			if (mensajeventa.categoria === "error") {
				history.push("/ventas");
			}
		}
		// eslint-disable-next-line
	}, [mensajeventa]);

	if (!ventaseleccionada) return "Cargando...";

	const {
		nombre,
		creado,
		metodo,
		total,
		productos,
		usuario,
	} = ventaseleccionada;

	return (
		<Layout>
			<button
				type="button"
				className="mt-4 bg-blue-800 px-5 py-2 block text-white rounded leading-tight uppercase text-xs font-bold text-center mb-10 w-full md:w-auto"
				onClick={() => history.goBack()}
			>
				Regresar
			</button>
			<h1 className="text-2xl text-gray-800 font-light">Venta: {nombre}</h1>

			<div className="mt-4 bg-white rounded p-6 w-full max-w-lg mx-auto shadow-lg">
				<div>
					<p className="my-2">
						Fecha: {creado.split("T")[0].split("-").reverse().join("-")}
					</p>
					<p className="my-2">Método de pago: {metodo}</p>
					<p className="my-2">Total: ${total}</p>
					{usuario && (
						<p className="my-2">
							Realizada por: {usuario.nombre} {usuario.apellido}
						</p>
					)}
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

export default VerVenta;
