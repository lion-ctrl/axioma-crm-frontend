import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";

import gastosContext from "../../context/gastos/gastosContext";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

const AsignarProductos = ({tipo}) => {
    const [productos,setProductos] = useState([]);

    // * context
    const {agregarProductos} = useContext(gastosContext);

	useEffect(() => {
		const buscarProductos = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			try {
				const res = await axios.get("/api/productos?gastos=true");
				setProductos(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		buscarProductos();
	}, []);

    const seleccionarProductos = (productos) => {
        agregarProductos(productos);
    }

	if (tipo !== "PEDIDO") return null;

	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold">
				Asigna los productos al pedido
			</label>
			<Select
				className="mt-2"
				options={productos}
				isMulti
				onChange={seleccionarProductos}
				getOptionValue={(opciones) => opciones._id}
				getOptionLabel={(opciones) =>
					`${opciones.nombre} - ${opciones.cantidad} Disponibles`
				}
				placeholder="Busque o seleccione los productos"
				noOptionsMessage={() => "No hay resultados"}
			/>
		</div>
	);
};
export default AsignarProductos;
