import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";

const Categorias = () => {
	const { obtenerCategorias } = useContext(productosContext);
	useEffect(() => {
		obtenerCategorias();
        // eslint-disable-next-line
	}, []);

	return (
		<Layout>
			<Link
				to={"/nueva-categoria"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nueva categoria
			</Link>
		</Layout>
	);
};

export default Categorias;
