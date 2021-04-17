import React,{useContext} from "react";

import gastosContext from "../../context/gastos/gastosContext";

import ProductoResumen from "./ProductoResumen";

const AsignarCantidades = ({tipo}) => {
	// * context
	const { nuevogastoproductos, cantidadProductos, actualizarTotal } = useContext(gastosContext);

	if (tipo !== "PEDIDO") return null;
    if (!nuevogastoproductos) return null;

	return (
		<>
			{nuevogastoproductos.length ? (
				nuevogastoproductos.map((producto) => (
					<ProductoResumen
						producto={producto}
						key={producto._id}
						cantidadProductos={cantidadProductos}
						actualizarTotal={actualizarTotal}
					/>
				))
			) : (
				<p className="mt-5 text-sm text-center">No hay productos</p>
			)}
		</>
	);
};

export default AsignarCantidades;
