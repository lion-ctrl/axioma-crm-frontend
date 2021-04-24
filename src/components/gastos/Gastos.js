import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import gastosContext from "../../context/gastos/gastosContext";

import Layout from "../Layout/Layout";
import Gasto from "./Gasto"
import FiltroFechas from "../../hooks/FiltroFechas";
import RutaAdministrador from "../rutas/RutaAdministrador";

const Pedidos = () => {
	// context
	const { mostrarGastos, gastos, filtrarGastos } = useContext(gastosContext);

	useEffect(() => {
		mostrarGastos();
		// eslint-disable-next-line
	}, []);
	return (
		<Layout>
			<RutaAdministrador />
			<h1 className="text-2xl text-gray-800 font-light">Gastos</h1>

			<Link
				to={"/nuevo-gasto"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nuevo Gasto
			</Link>

			<FiltroFechas fn={filtrarGastos} />

			{gastos.length ? (
				gastos.map((gasto) => (
					<Gasto key={gasto._id} gasto={gasto} />
				))
			) : (
				<p className="my-5 text-center text-2xl">No hay Gastos</p>
			)}
		</Layout>
	);
};

export default Pedidos;
