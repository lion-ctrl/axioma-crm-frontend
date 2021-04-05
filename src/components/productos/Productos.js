import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";
import Producto from "./Producto"

const Productos = () => {
	// * context
	const { obtenerProductos,productos } = useContext(productosContext);

	useEffect(() => {
		obtenerProductos();
        // eslint-disable-next-line
	}, []);
	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Productos</h1>

			<Link
				to={"/nuevo-producto"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nuevo Producto
			</Link>

            {productos.length ? productos.map(producto => (
                <Producto key={producto._id} producto={producto}/>
            )) : (
                <p className="mt-5 text-center text-2xl">No hay Productos</p>
            )}
		</Layout>
	);
};

export default Productos;
