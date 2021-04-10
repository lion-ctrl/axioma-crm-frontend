import React, { useEffect, useContext } from "react";
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

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";

const VerProducto = ({ match, history }) => {
	const { slug } = match.params;

	const { buscarProducto, mensajeproducto, productoseleccionado } = useContext(
		productosContext
	);

	useEffect(() => {
		if (slug) {
			buscarProducto(slug);
		}
		// eslint-disable-next-line
	}, [slug]);

	useEffect(() => {
		if (mensajeproducto) {
			Swal.fire("Error", mensajeproducto.msg, mensajeproducto.categoria);
			history.push("/productos");
		}
	}, [mensajeproducto, history]);

	if (!productoseleccionado) return "cargando...";

	const {
		nombre,
		ganancias,
		precioVenta,
		cantidad,
		costoTotal,
		precioCosto,
		imagen,
	} = productoseleccionado;

	const data = [{ nombre: "Ganancias", ganancias, inversion: costoTotal }];

	return (
		<Layout>
			<button
				type="button"
				className="mt-4 bg-blue-800 px-5 py-2 block text-white rounded leading-tight uppercase text-xs font-bold text-center mb-10 w-full md:w-auto"
				onClick={() => history.goBack()}
			>
				Regresar
			</button>
			<h1 className="text-2xl text-gray-800 font-light">Producto: {nombre}</h1>

			<div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
				<div className="mb-20">
					<p className="my-2">Costo: ${precioCosto}</p>
					<p className="my-2">Precio de Venta: ${precioVenta}</p>
					<p className="my-2">Disponibles: {cantidad}</p>
					{imagen && (
						<img
							src={`http://localhost:4000/uploads/productos/${imagen}`}
							alt="producto imagen"
							className="w-full h-80 object-cover"
						/>
					)}
				</div>
				<div>
					<ResponsiveContainer width={"99%"} height={550}>
						<BarChart
							width={500}
							height={300}
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="nombre" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="ganancias" fill="#064e3b" />
							<Bar dataKey="inversion" fill="#7f1d1d" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</Layout>
	);
};

export default VerProducto;
