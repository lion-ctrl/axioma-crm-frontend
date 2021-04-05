import {
	LIMPIAR_MENSAJE,
	OBTENER_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_EXITO,
	OBTENER_PRODUCTO_ERROR,
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
			return {
				...state,
				mensajeproducto: { msg: action.payload, categoria: "error" },
			};
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
