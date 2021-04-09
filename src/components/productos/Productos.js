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
		paginaactual,
		cantidadpaginas,
		paginaSiguiente,
		paginaAnterior
	} = useContext(productosContext);

	// * Filtro
	const { FiltroUI, categoria } = useCategoriaFiltro(categorias);

	useEffect(() => {
		if (categoria === "") {
			obtenerProductos();
		} else {
			filtrarProductosCategoria(categoria);
		}
		// eslint-disable-next-line
	}, [categoria]);
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

			{productosfiltrados.length ? (
				<div className="flex justify-center">
					{paginaactual !== 1 && (
						<button
							type="button"
							className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm  mb-3 uppercase font-bold mr-20"
							onClick={paginaAnterior}
						>
							&laquo; Anterior
						</button>
					)}
					{paginaactual !== cantidadpaginas && (
						<button
							type="button"
							className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm mb-3 uppercase font-bold"
							onClick={paginaSiguiente}
						>
							Siguiente &raquo;
						</button>
					)}
				</div>
			) : null}
		</Layout>
	);
};

export default Productos;
