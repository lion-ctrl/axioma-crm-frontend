import React,{ useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import ventasContext from "../../context/ventas/ventasContext";

import Layout from "../Layout/Layout";
import FiltroFechas from "../../hooks/FiltroFechas";
import Venta from "./Venta";

const Ventas = () => {
    // context
    const {obtenerVentas, ventas, filtrarVentas} = useContext(ventasContext);

    useEffect(() => {
        obtenerVentas();
        // eslint-disable-next-line
    }, []);


	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Ventas</h1>

			<Link
				to={"/nueva-venta"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nueva Venta
			</Link>

			<FiltroFechas fn={filtrarVentas} />

			{ventas.length ? (
				ventas.map((venta) => (
					<Venta key={venta._id} venta={venta} />
				))
			) : (
				<p className="my-5 text-center text-2xl">No hay Ventas</p>
			)}
		</Layout>
	);
};

export default Ventas;
