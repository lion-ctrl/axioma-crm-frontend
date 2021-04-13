import React, { useReducer } from "react";

import gastosContext from "./gastosContext";
import gastosReducer from "./gastosReducer";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

import { ASIGNAR_PRODUCTOS_GASTO, RESUMEN_PRODUCTO, LIMPIAR_PRODUCTOS_GASTO } from "../../types";

const GastosState = ({ children }) => {
	const initialState = {
		gastos: [],
		nuevogasto: null,
		nuevogastoproductos: [],
		gastoseleccionado: null,
		mensajegasto: null,
	};

	const [state, dispatch] = useReducer(gastosReducer, initialState);

	// Agregar productos al nuevo gasto
	const agregarProductos = (productos) => {
		let nuevoState;
		if (state.nuevogastoproductos.length) {
			nuevoState = productos.map((producto) => {
				const nuevoObjeto = state.nuevogastoproductos.find(
					(productoState) => productoState._id === producto._id
				);
				return {
					...producto,
					...nuevoObjeto,
				};
			});
		} else {
			nuevoState = productos;
		}

		dispatch({
			type: ASIGNAR_PRODUCTOS_GASTO,
			payload: nuevoState,
		});
	};

	// Agrega las cantidades y precio del producto al nuevo gasto
	const cantidadProductos = (resumenProducto) => {
		dispatch({
			type: RESUMEN_PRODUCTO,
			payload: resumenProducto,
		});
	};

	const limpiarNuevoGastosProductos = (tipo) => {
		if (tipo.trim() === "PAGO") {
			dispatch({
				type: LIMPIAR_PRODUCTOS_GASTO
			});
		}
	}

	const nuevoGasto = async (datos) => {
		if (state.nuevogastoproductos.length) {
			datos.productos = state.nuevogastoproductos;
		}
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.post("/api/gastos",datos);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<gastosContext.Provider
			value={{
				gastos: state.gastos,
				nuevogasto: state.nuevogasto,
				nuevogastoproductos: state.nuevogastoproductos,
				gastoseleccionado: state.gastoseleccionado,
				mensajegasto: state.mensajegasto,
				agregarProductos,
				cantidadProductos,
				limpiarNuevoGastosProductos,
				nuevoGasto
			}}
		>
			{children}
		</gastosContext.Provider>
	);
};

export default GastosState;
