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

const ventasReducer = (state, action) => {
	switch (action.type) {
		case ASIGNAR_PRODUCTOS_VENTA:
			return {
				...state,
				nuevaventaproductos: action.payload,
			};
		case RESUMEN_PRODUCTO_VENTA:
			return {
				...state,
				nuevaventaproductos: state.nuevaventaproductos.map((producto) =>
					producto._id === action.payload._id ? action.payload : producto
				),
			};
		case TOTAL_VENTA:
			return {
				...state,
				totalventa: state.nuevaventaproductos
					.filter((producto) => producto.resumen !== undefined)
					.reduce(
						(acc, producto) =>
							(acc += producto.resumen.precio * producto.resumen.cantidad),
						0
					)
					.toFixed(2),
			};
		case NUEVA_VENTA_EXITO:
		case OBTENER_VENTA_ERROR:
		case EDITAR_VENTA_EXITO:
			return {
				...state,
				mensajeventa: action.payload,
			};
		case LIMPIAR_MENSAJE:
			return {
				...state,
				mensajeventa: null,
			};
		case OBTENER_VENTAS_EXITO:
			return {
				...state,
				ventas: action.payload,
				ventaseleccionada: null
			};
		case ELIMINAR_VENTA_EXITO:
			return {
				...state,
				ventas: state.ventas.filter(
					(venta) => venta._id !== action.payload._id
				),
			};
		case OBTENER_VENTA_EXITO:
			return {
				...state,
				ventaseleccionada: action.payload
			}
		default:
			return state;
	}
};

export default ventasReducer;
