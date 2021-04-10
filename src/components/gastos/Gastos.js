import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout/Layout";

const Pedidos = () => {
	return (
		<Layout>
			<Link
				to={"/nuevo-gasto"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nuevo Gasto
			</Link>
		</Layout>
	);
};

export default Pedidos;
