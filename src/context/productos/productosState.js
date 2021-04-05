import React, { useReducer } from "react";
import Swal from "sweetalert2";

import productosContext from "./productosContext";
import productosReducer from "./productosReducer";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

import {
	OBTENER_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_ERROR,
	OBTENER_PRODUCTO_EXITO,
    LIMPIAR_MENSAJE
} from "../../types";

const ProductoState = ({ children }) => {
	const initialState = {
		productos: [],
		productoseleccionado: null,
		mensajeproducto: null,
	};

	const [state, dispatch] = useReducer(productosReducer, initialState);

	// ? funciones
	// obtener productos
	const obtenerProductos = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.get("/api/productos");
			dispatch({
				type: OBTENER_PRODUCTOS_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", "Error en el Servidor", "error");
		}
	};

	// buscarProducto
	const buscarProducto = async (slug) => {
		let producto = state.productos.find((producto) => producto.slug === slug);
		if (producto) {
			dispatch({
				type: OBTENER_PRODUCTO_EXITO,
				payload: producto,
			});
		} else {
			const token = localStorage.getItem("token");
			if (token) {
				tokenAuth(token);
			}
			try {
				const res = await axios.get(`/api/productos/${slug}`);
				dispatch({
					type: OBTENER_PRODUCTO_EXITO,
					payload: res.data,
				});
			} catch (error) {
				dispatch({
					type: OBTENER_PRODUCTO_ERROR,
					payload: error.response.data.msg,
				});
                setTimeout(() => {
                    dispatch({
                        type: LIMPIAR_MENSAJE
                    })
                }, 1000);
			}

		}
	};
	return (
		<productosContext.Provider
			value={{
				productos: state.productos,
				productoseleccionado: state.productoseleccionado,
				mensajeproducto: state.mensajeproducto,
				obtenerProductos,
				buscarProducto,
			}}
		>
			{children}
		</productosContext.Provider>
	);
};

export default ProductoState;
