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
	CREAR_PRODUCTO_EXITO,
	CREAR_PRODUCTO_ERROR,
	LIMPIAR_MENSAJE,
	ELIMINAR_PRODUCTO_EXITO,
	ELIMINAR_PRODUCTO_ERROR,
	ACTUALIZAR_PRODUCTO_EXITO,
	ACTUALIZAR_PRODUCTO_ERROR,
	FILTRAR_CATEGORIA,
	ELIMINAR_FILTRO
} from "../../types";

const ProductoState = ({ children }) => {
	const initialState = {
		productos: [],
		productosfiltrados: [],
		productoseleccionado: null,
		mensajeproducto: null,
		categorias: ["HOGAR","GOLOSINAS","PERSONALES"]
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
					payload: { msg: error.response.data.msg, categoria: "error" },
				});
				setTimeout(() => {
					dispatch({
						type: LIMPIAR_MENSAJE,
					});
				}, 1000);
			}
		}
	};

	const nuevoProducto = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}
		try {
			const res = await axios.post("/api/productos", datos);
			dispatch({
				type: CREAR_PRODUCTO_EXITO,
				payload: { msg: res.data.msg, categoria: "success" },
			});
		} catch (error) {
			dispatch({
				type: CREAR_PRODUCTO_ERROR,
				payload: { msg: error.response.data.msg, categoria: "error" },
			});
		}

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	};

	const eliminarProducto = async (_id) => {
		try {
			const res = await axios.delete(`/api/productos/${_id}`);
			dispatch({
				type: ELIMINAR_PRODUCTO_EXITO,
				payload: { msg: res.data.msg, categoria: "success", _id },
			});
		} catch (error) {
			dispatch({
				type: ELIMINAR_PRODUCTO_ERROR,
				payload: { msg: error.response.data.msg, categoria: "error" },
			});
		}

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	}

	const actualizarProducto = async (datos,_id) => {
		try {
			const res = await axios.put(`/api/productos/${_id}`,datos);
			dispatch({
				type: ACTUALIZAR_PRODUCTO_EXITO,
				payload: {msg: res.data.msg, categoria: "success"}
			})
		} catch (error) {
			dispatch({
				type: ACTUALIZAR_PRODUCTO_ERROR,
				payload: {msg: error.response.data.msg, categoria: "error"}
			})
		}

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	}

	const filtrarProductosCategoria = (categoria) => {
		if (categoria === "") {
			dispatch({
				type: ELIMINAR_FILTRO
			})
		} else {
			dispatch({
				type: FILTRAR_CATEGORIA,
				payload: categoria
			})
		}
	}

	return (
		<productosContext.Provider
			value={{
				productos: state.productos,
				productosfiltrados: state.productosfiltrados,
				productoseleccionado: state.productoseleccionado,
				mensajeproducto: state.mensajeproducto,
				categorias: state.categorias,
				obtenerProductos,
				buscarProducto,
				nuevoProducto,
				eliminarProducto,
				actualizarProducto,
				filtrarProductosCategoria,
			}}
		>
			{children}
		</productosContext.Provider>
	);
};

export default ProductoState;
