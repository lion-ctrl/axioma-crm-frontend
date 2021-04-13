import React,{useContext} from "react";

import gastosContext from "../../context/gastos/gastosContext";

import ProductoResumen from "./ProductoResumen";

const AsignarCantidades = () => {
	// * context
	const { nuevogastoproductos, cantidadProductos } = useContext(gastosContext);

    if (!nuevogastoproductos) return null;

	return (
		<>
			{nuevogastoproductos.length ? (
				nuevogastoproductos.map((producto) => (
					<ProductoResumen
						producto={producto}
						key={producto._id}
						cantidadProductos={cantidadProductos}
					/>
				))
			) : (
				<p className="mt-5 text-sm text-center">No hay productos</p>
			)}
		</>
	);
};

export default AsignarCantidades;
