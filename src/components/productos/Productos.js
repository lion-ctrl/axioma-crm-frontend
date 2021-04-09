import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";
import Producto from "./Producto";

import useCategoriaFiltro from "../../hooks/useCategoriaFiltro";

const Productos = () => {
	// * context
	const {
		obtenerProductos,
		productos,
		productosfiltrados,
		categorias,
		filtrarProductosCategoria,
	} = useContext(productosContext);

	// * Filtro
	const { FiltroUI, categoria, nombre } = useCategoriaFiltro(categorias);

	useEffect(() => {
		if (!productos.length) {
			obtenerProductos();
		}
		if (categoria === "") {
			filtrarProductosCategoria("")
		} else {
			filtrarProductosCategoria(categoria)
		}
		// eslint-disable-next-line
	}, [categoria, nombre]);
	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Productos</h1>

			<div className="md:flex items-center md:justify-between">
				<Link
					to={"/nuevo-producto"}
					className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
				>
					Nuevo Producto
				</Link>

				{FiltroUI()}
			</div>

			{productosfiltrados.length ? (
				productosfiltrados.map((producto) => (
					<Producto key={producto._id} producto={producto} />
				))
			) : (
				<p className="mt-5 text-center text-2xl">No hay Productos</p>
			)}
		</Layout>
	);
};

export default Productos;
