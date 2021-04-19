import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";

import ventasContext from "../../context/ventas/ventasContext";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

const AsignarProductos = ({ productosAnteriores }) => {
	const [productos, setProductos] = useState([]);
	const [productosAnt, setProductosAnt] = useState([]);

	// * context
	const { agregarProductos } = useContext(ventasContext);

	useEffect(() => {
		const buscarProductos = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			try {
				const res = await axios.get("/api/productos?ventas=true");
				setProductos(res.data);
				if (productosAnteriores) {
					const productos = productosAnteriores.map((producto) => {
						const nuevoObjeto = res.data.find(
							(productoState) => productoState._id === producto._id
						);
						setProductosAnt([...productosAnt, nuevoObjeto]);
						return {...producto,...nuevoObjeto}
					});
					agregarProductos(productos);
				}
			} catch (error) {
				console.log(error);
			}
		};
		buscarProductos();

		// eslint-disable-next-line
	}, []);

	const seleccionarProductos = (productos) => {
		agregarProductos(productos);
	};

	if (productosAnteriores) {
		if (!productosAnt.length) {
			return "Cargando...";
		}
	}

	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold">
				Asigna los productos a la venta
			</label>
			<Select
				className="mt-2"
				options={productos}
				isMulti
				defaultValue={productosAnteriores && productosAnt}
				onChange={seleccionarProductos}
				getOptionValue={(opciones) => opciones._id}
				getOptionLabel={(opciones) =>
					`${opciones.nombre} - ${opciones.cantidad} Disp.`
				}
				placeholder="Busque o seleccione los productos"
				noOptionsMessage={() => "No hay resultados"}
			/>
		</div>
	);
};
export default AsignarProductos;
