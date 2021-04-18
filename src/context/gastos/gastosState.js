import React, { useReducer } from "react";
import Swal from "sweetalert2";

import gastosContext from "./gastosContext";
import gastosReducer from "./gastosReducer";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

import {
	ASIGNAR_PRODUCTOS_GASTO,
	RESUMEN_PRODUCTO,
	LIMPIAR_PRODUCTOS_GASTO,
	OBTENER_GASTOS_EXITO,
	ELIMINAR_GASTO_EXITO,
	LIMPIAR_MENSAJE,
	NUEVO_GASTO_EXITO,
	NUEVO_GASTO_TOTAL,
	OBTENER_GASTO_EXITO,
	OBTENER_GASTO_ERROR,
	EDITAR_GASTO_EXITO,
} from "../../types";

const GastosState = ({ children }) => {
	const initialState = {
		gastos: [],
		nuevogasto: null,
		nuevogastoproductos: [],
		totalgasto: 0,
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
				type: LIMPIAR_PRODUCTOS_GASTO,
			});
		}
	};

	const nuevoGasto = async (datos) => {
		if (datos.tipo === "PEDIDO") {
			if (!state.nuevogastoproductos.length) {
				Swal.fire("Error", "Debes indicar los productos del pedido", "error");
				return;
			}
		}
		if (state.nuevogastoproductos.length) {
			let res = state.nuevogastoproductos.every((producto) =>
				producto.hasOwnProperty("resumen")
			);
			if (!res) {
				return;
			}
			datos.productos = state.nuevogastoproductos;
		}
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.post("/api/gastos", datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: NUEVO_GASTO_EXITO,
				payload: { categoria: "success" },
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 3000);
	};

	const actualizarTotal = () => {
		dispatch({
			type: NUEVO_GASTO_TOTAL,
		});
	};

	const mostrarGastos = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.get("/api/gastos");
			dispatch({
				type: OBTENER_GASTOS_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg);
		}
	};

	const obtenerGasto = async (_id) => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.get(`/api/gastos/${_id}`);
			dispatch({
				type: OBTENER_GASTO_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
			dispatch({
				type: OBTENER_GASTO_ERROR,
				payload: { categoria: "error" },
			});
		}

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 3000);
	};

	const eliminarGasto = async (_id) => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.delete(`/api/gastos/${_id}`);
			Swal.fire("Correcto", "Gasto Eliminado", "success");
			dispatch({
				type: ELIMINAR_GASTO_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	const editarGasto = async (_id, datos) => {
		if (state.nuevogastoproductos.length) {
			datos.productos = state.nuevogastoproductos;
		}
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.put(`/api/gastos/${_id}`, datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: EDITAR_GASTO_EXITO,
				payload: { categoria: "success" },
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 3000);
	};

	const filtrarGastos = async (datos) => {
		const {fechai,fechaf} = datos;
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.get(`/api/gastos/fecha?fechai=${fechai}&fechaf=${fechaf}`);
			dispatch({
				type: OBTENER_GASTOS_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	return (
		<gastosContext.Provider
			value={{
				gastos: state.gastos,
				nuevogasto: state.nuevogasto,
				nuevogastoproductos: state.nuevogastoproductos,
				totalgasto: state.totalgasto,
				gastoseleccionado: state.gastoseleccionado,
				mensajegasto: state.mensajegasto,
				agregarProductos,
				cantidadProductos,
				limpiarNuevoGastosProductos,
				nuevoGasto,
				mostrarGastos,
				eliminarGasto,
				obtenerGasto,
				editarGasto,
				actualizarTotal,
				filtrarGastos
			}}
		>
			{children}
		</gastosContext.Provider>
	);
};

export default GastosState;
