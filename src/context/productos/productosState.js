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
	LIMPIAR_MENSAJE,
	ELIMINAR_PRODUCTO_EXITO,
	ACTUALIZAR_PRODUCTO_EXITO,
	PAGINA_SIGUIENTE,
	PAGINA_ANTERIOR,
	CREAR_CATEGORIA_EXITO,
	OBTENER_CATEGORIAS_EXITO
} from "../../types";

const ProductoState = ({ children }) => {
	const initialState = {
		productos: [],
		totalproductos: 0,
		productosporpagina: 5,
		cantidadpaginas: 0,
		paginaactual: 1,
		desde: 0,
		productosfiltrados: [],
		productoseleccionado: null,
		mensajeproducto: null,
		categorias: [],
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
			Swal.fire("Error", error.response.data.msg, "error");
			dispatch({
				type: OBTENER_PRODUCTO_ERROR,
				payload: { categoria: "error" },
			});
			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		}
	};

	const nuevoProducto = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}
		try {
			const res = await axios.post("/api/productos", datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: CREAR_PRODUCTO_EXITO,
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

	const eliminarProducto = async (_id) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}
		try {
			const res = await axios.delete(`/api/productos/${_id}`);
			Swal.fire("Correcto", "Producto Eliminado", "success");
			dispatch({
				type: ELIMINAR_PRODUCTO_EXITO,
				payload: { _id: res.data._id },
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

	const actualizarProducto = async (datos, _id) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}
		try {
			const res = await axios.put(`/api/productos/${_id}`, datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: ACTUALIZAR_PRODUCTO_EXITO,
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

	const filtrarProductosCategoria = async (categoria) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.get("/api/productos/categoria/" + categoria);
			dispatch({
				type: OBTENER_PRODUCTOS_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error",error.response.data.msg,"error");
		}
	};

	const paginaSiguiente = () => {
		const nuevaPaginaActual = state.paginaactual + 1;
		if (nuevaPaginaActual > state.cantidadpaginas) return;
		const desde = (nuevaPaginaActual - 1) * state.productosporpagina;

		dispatch({
			type: PAGINA_SIGUIENTE,
			payload: { nuevaPaginaActual, desde },
		});
	};

	const paginaAnterior = () => {
		const nuevaPaginaActual = state.paginaactual - 1;
		if (nuevaPaginaActual === 0) return;
		const desde = (nuevaPaginaActual - 1) * state.productosporpagina;

		dispatch({
			type: PAGINA_ANTERIOR,
			payload: { nuevaPaginaActual, desde },
		});
	};

	const nuevaCategoria = async (categoria) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}
		try {
			const res = await axios.post("/api/categorias",{nombre:categoria});
			Swal.fire("Correcto",res.data.msg,"success");
			dispatch({
				type: CREAR_CATEGORIA_EXITO,
				payload: {categoria:"success"},
			});
			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		} catch (error) {
			Swal.fire("Correcto",error.response.data.msg,"success");
		}
	}

	const obtenerCategorias = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}
		try {
			const res = await axios.get("/api/categorias");
			dispatch({
				type: OBTENER_CATEGORIAS_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Correcto",error.response.data.msg,"success");
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
				totalproductos: state.totalproductos,
				productosporpagina: state.productosporpagina,
				cantidadpaginas: state.cantidadpaginas,
				paginaactual: state.paginaactual,
				obtenerProductos,
				buscarProducto,
				nuevoProducto,
				eliminarProducto,
				actualizarProducto,
				filtrarProductosCategoria,
				paginaSiguiente,
				paginaAnterior,
				nuevaCategoria,
				obtenerCategorias
			}}
		>
			{children}
		</productosContext.Provider>
	);
};

export default ProductoState;
