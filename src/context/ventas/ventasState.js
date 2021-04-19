import React, { useReducer } from "react";
import Swal from "sweetalert2";

import ventasContext from "./ventasContext";
import ventasReducer from "./ventasReducer";

import tokenAuth from "../../config/tokenAuth";
import axios from "../../config/clienteAxios";

import {
	ASIGNAR_PRODUCTOS_VENTA,
	RESUMEN_PRODUCTO_VENTA,
	TOTAL_VENTA,
	NUEVA_VENTA_EXITO,
	LIMPIAR_MENSAJE,
    OBTENER_VENTAS_EXITO,
	ELIMINAR_VENTA_EXITO,
	OBTENER_VENTA_EXITO,
	OBTENER_VENTA_ERROR,
	EDITAR_VENTA_EXITO
} from "../../types";

const VentasState = ({ children }) => {
	const initialValues = {
		ventas: [],
		nuevaventaproductos: [],
		totalventa: 0,
		ventaseleccionada: null,
		mensajeventa: null,
	};

	const [state, dispatch] = useReducer(ventasReducer, initialValues);

	const agregarProductos = (productos) => {
		let nuevoState;
		if (state.nuevaventaproductos.length) {
			nuevoState = productos.map((producto) => {
				const nuevoObjeto = state.nuevaventaproductos.find(
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
			type: ASIGNAR_PRODUCTOS_VENTA,
			payload: nuevoState,
		});
	};

	const cantidadProductos = (producto) => {
		dispatch({
			type: RESUMEN_PRODUCTO_VENTA,
			payload: producto,
		});
	};

	const actualizarTotal = () => {
		dispatch({
			type: TOTAL_VENTA,
		});
	};

	const nuevaVenta = async (datos) => {
		if (!state.nuevaventaproductos.length) {
			Swal.fire("Error", "Debes indicar los productos de la venta", "error");
			return;
		}
		let res = state.nuevaventaproductos.every((producto) =>
			producto.hasOwnProperty("resumen")
		);
		if (!res) {
			return;
		}

		for (const producto of state.nuevaventaproductos) {
			if (producto.resumen.cantidad > producto.cantidad) {
				Swal.fire(
					"Error",
					`El Producto ${producto.nombre} excede la cantidad disponible`,
					"error"
				);
				return;
			}
		}
		datos.productos = state.nuevaventaproductos;
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.post("/api/ventas", datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: NUEVA_VENTA_EXITO,
				payload: { categoria: "success" },
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	};

    const obtenerVentas = async () => {
        try {
            const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.get("/api/ventas");
			dispatch({
				type: OBTENER_VENTAS_EXITO,
				payload: res.data,
			});
        } catch (error) {
            Swal.fire("Error", error.response.data.msg, "error");
        }
    }

	const eliminarVenta = async (_id) => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.delete(`/api/ventas/${_id}`);
			dispatch({
				type: ELIMINAR_VENTA_EXITO,
				payload: res.data,
			});
		} catch (error) {
            Swal.fire("Error", error.response.data.msg, "error");
		}
	}

	const obtenerVenta = async (_id) => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.get(`/api/ventas/${_id}`);
			dispatch({
				type: OBTENER_VENTA_EXITO,
				payload: res.data,
			});
		} catch (error) {
            Swal.fire("Error", error.response.data.msg, "error");
			dispatch({
				type: OBTENER_VENTA_ERROR,
				payload: {categoria: "error"},
			});

			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		}
	}

	const EditarVenta = async (_id, datos) => {
		if (!state.nuevaventaproductos.length) {
			Swal.fire("Error", "Debes indicar los productos de la venta", "error");
			return;
		}
		let res = state.nuevaventaproductos.every((producto) =>
			producto.hasOwnProperty("resumen")
		);
		if (!res) {
			return;
		}

		for (const producto of state.nuevaventaproductos) {
			if (producto.resumen.cantidad > producto.cantidad) {
				Swal.fire(
					"Error",
					`El Producto ${producto.nombre} excede la cantidad disponible`,
					"error"
				);
				return;
			}
		}
		datos.productos = state.nuevaventaproductos;
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.put(`/api/ventas/${_id}`, datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: EDITAR_VENTA_EXITO,
				payload: { categoria: "success" },
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	}

	const filtrarVentas = async (datos) => {
		const {fechai,fechaf} = datos;
		try {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			const res = await axios.get(`/api/ventas/fecha?fechai=${fechai}&fechaf=${fechaf}`);
			dispatch({
				type: OBTENER_VENTAS_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	return (
		<ventasContext.Provider
			value={{
				ventas: state.ventas,
				nuevaventaproductos: state.nuevaventaproductos,
				totalventa: state.totalventa,
				ventaseleccionada: state.ventaseleccionada,
				mensajeventa: state.mensajeventa,
				agregarProductos,
				cantidadProductos,
				actualizarTotal,
				nuevaVenta,
                obtenerVentas,
				eliminarVenta,
				obtenerVenta,
				EditarVenta,
				filtrarVentas
			}}
		>
			{children}
		</ventasContext.Provider>
	);
};

export default VentasState;
