import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

import axios from "../config/clienteAxios";
import tokenAuth from "../config/tokenAuth";

import Layout from "./Layout/Layout";

const Principal = () => {
	const [ventas, setVentas] = useState([]);
	const [productos, setProductos] = useState([]);

	useEffect(() => {
		const consultarApi = async () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					tokenAuth(token);
				}
				const res = await axios.get(`/api/ventas/semana`);
				// eslint-disable-next-line
				let ventasDias = res.data.ventas.map((venta) => {
					if (venta._id === "0") {
						venta.dia = "Dom";
						return venta;
					} else if (venta._id === "1") {
						venta.dia = "Lun";
						return venta;
					} else if (venta._id === "2") {
						venta.dia = "Mar";
						return venta;
					} else if (venta._id === "3") {
						venta.dia = "Mié";
						return venta;
					} else if (venta._id === "4") {
						venta.dia = "Jue";
						return venta;
					} else if (venta._id === "5") {
						venta.dia = "Vie";
						return venta;
					} else if (venta._id === "6") {
						venta.dia = "Sáb";
						return venta;
					}
				});
				ventasDias = ventasDias.sort((a, b) => a._id - b._id);
				setVentas(ventasDias);
				setProductos(res.data.productos);
			} catch (error) {
				Swal.fire("Error", "Error en el Servidor", "error");
			}
		};
		consultarApi();
	}, []);

	if (!ventas.length) return "Cargando...";

	return (
		<Layout>
			<h2 className="text-2xl text-gray-800 font-light mb-4">Ventas Totales</h2>
			<ResponsiveContainer width={"100%"} height={550}>
				<BarChart
					width={500}
					height={300}
					data={ventas}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="dia" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="total" fill="#064e3b" />
				</BarChart>
			</ResponsiveContainer>
			<h2 className="text-2xl text-gray-800 font-light mt-4">Productos con más Ventas</h2>
			{productos.length > 0 && (
				<table className="table-auto shadow-md mt-4 w-full">
					<thead className="bg-gray-800">
						<tr className="text-white">
							<th>Nombre</th>
							<th>Cant.</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{productos.map((producto) => (
							<tr key={producto._id} className="text-center">
								<td className="border px-4 py-2">{producto.nombre}</td>
								<td className="border px-4 py-2">
									{producto.vendidos}
								</td>
								<td className="border px-4 py-2">
									${producto.total}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</Layout>
	);
};

export default Principal;
