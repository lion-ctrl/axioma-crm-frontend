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
	CREAR_CATEGORIA_EXITO,
	OBTENER_CATEGORIAS_EXITO,
	ELIMINAR_CATEGORIA_EXITO,
	SELECCIONAR_CATEGORIA,
	ACTUALIZAR_CATEGORIA_EXITO,
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
				productoseleccionado: null,
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
		case CREAR_CATEGORIA_EXITO:
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
				productos: state.productos.filter(
					(producto) => producto._id !== action.payload._id
				),
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
		case OBTENER_CATEGORIAS_EXITO:
			return {
				...state,
				categorias: action.payload,
			};
		case ELIMINAR_CATEGORIA_EXITO:
			return {
				...state,
				categorias: state.categorias.filter(
					(categoria) => categoria._id !== action.payload
				),
			};
		case SELECCIONAR_CATEGORIA:
			return {
				...state,
				categoriaseleccionada: action.payload,
			};
		case ACTUALIZAR_CATEGORIA_EXITO:
			return {
				...state,
				categorias: state.categorias.map((categoria) =>
					categoria._id === action.payload.categoriaActualizada._id
						? action.payload.categoriaActualizada
						: categoria
				),
				mensajeproducto: {categoria: action.payload.categoria},
			};
		default:
			return state;
	}
};

export default productosReducer;
