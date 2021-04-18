import {
	LIMPIAR_MENSAJE,
	OBTENER_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_EXITO,
	OBTENER_PRODUCTO_ERROR,
	CREAR_PRODUCTO_EXITO,
	ELIMINAR_PRODUCTO_EXITO,
	ELIMINAR_PRODUCTO_ERROR,
	ACTUALIZAR_PRODUCTO_EXITO,
	PAGINA_SIGUIENTE,
	PAGINA_ANTERIOR,
} from "../../types";

const productosReducer = (state, action) => {
	switch (action.type) {
		case OBTENER_PRODUCTOS_EXITO:
			return {
				...state,
				productos: action.payload,
				productosfiltrados: action.payload.slice(
					state.desde,
					state.productosporpagina
				),
				totalproductos: action.payload.length,
				cantidadpaginas: Math.ceil(
					action.payload.length / state.productosporpagina
				),
				paginaactual: 1,
				productoseleccionado: null
			};
		case OBTENER_PRODUCTO_EXITO:
			return {
				...state,
				productoseleccionado: action.payload,
			};
		case OBTENER_PRODUCTO_ERROR:
		case CREAR_PRODUCTO_EXITO:
		case ELIMINAR_PRODUCTO_ERROR:
		case ACTUALIZAR_PRODUCTO_EXITO:
			return {
				...state,
				mensajeproducto: action.payload,
			};
		case ELIMINAR_PRODUCTO_EXITO:
			return {
				...state,
				productosfiltrados: state.productos.filter(
					(producto) => producto._id !== action.payload._id
				),
				mensajeproducto: {
					msg: action.payload.msg,
					categoria: action.payload.categoria,
				},
			};
		case LIMPIAR_MENSAJE:
			return {
				...state,
				mensajeproducto: null,
			};
		case PAGINA_SIGUIENTE:
		case PAGINA_ANTERIOR:
			return {
				...state,
				paginaactual: action.payload.nuevaPaginaActual,
				productosfiltrados: state.productos.slice(
					action.payload.desde,
					action.payload.desde + state.productosporpagina
				),
			};
		default:
			return state;
	}
};

export default productosReducer;
