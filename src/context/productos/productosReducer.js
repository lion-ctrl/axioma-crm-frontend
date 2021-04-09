import {
	LIMPIAR_MENSAJE,
	OBTENER_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_EXITO,
	OBTENER_PRODUCTO_ERROR,
	CREAR_PRODUCTO_EXITO,
	CREAR_PRODUCTO_ERROR,
	ELIMINAR_PRODUCTO_EXITO,
	ELIMINAR_PRODUCTO_ERROR,
	ACTUALIZAR_PRODUCTO_EXITO,
	ACTUALIZAR_PRODUCTO_ERROR
} from "../../types";

const productosReducer = (state, action) => {
	switch (action.type) {
		case OBTENER_PRODUCTOS_EXITO:
			return {
				...state,
				productos: action.payload,
			};
		case OBTENER_PRODUCTO_EXITO:
			return {
				...state,
				productoseleccionado: action.payload,
			};
		case OBTENER_PRODUCTO_ERROR:
		case CREAR_PRODUCTO_EXITO:
		case CREAR_PRODUCTO_ERROR:
		case ELIMINAR_PRODUCTO_ERROR:
		case ACTUALIZAR_PRODUCTO_EXITO:
		case ACTUALIZAR_PRODUCTO_ERROR:
			return {
				...state,
				mensajeproducto: action.payload,
			};
		case ELIMINAR_PRODUCTO_EXITO:
			return {
				...state,
				productos: state.productos.filter(producto => producto._id !== action.payload._id),
				mensajeproducto: {msg: action.payload.msg, categoria: action.payload.categoria}
			}
		case LIMPIAR_MENSAJE:
			return {
				...state,
				mensajeproducto: null,
			};
		default:
			return state;
	}
};

export default productosReducer;
