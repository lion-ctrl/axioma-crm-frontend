import React,{useContext} from "react";

import ventasContext from "../../context/ventas/ventasContext";

import ProductoResumen from "./ProductoResumen";

const AsignarCantidades = () => {
	// * context
	const { nuevaventaproductos, cantidadProductos, actualizarTotal } = useContext(ventasContext);

    if (!nuevaventaproductos) return null;

	return (
		<>
			{nuevaventaproductos.length ? (
				nuevaventaproductos.map((producto) => (
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
