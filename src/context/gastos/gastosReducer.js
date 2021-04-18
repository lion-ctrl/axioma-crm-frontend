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

const gastosReducer = (state, action) => {
	switch (action.type) {
		case ASIGNAR_PRODUCTOS_GASTO:
			return {
				...state,
				nuevogastoproductos: action.payload,
			};
		case RESUMEN_PRODUCTO:
			return {
				...state,
				nuevogastoproductos: state.nuevogastoproductos.map((producto) =>
					producto._id === action.payload._id ? action.payload : producto
				),
			};
		case LIMPIAR_PRODUCTOS_GASTO:
			return {
				...state,
				nuevogastoproductos: [],
				totalgasto: 0
			};
		case OBTENER_GASTOS_EXITO:
			return {
				...state,
				gastos: action.payload,
				gastoseleccionado: null,
				nuevogastoproductos: [],
				totalgasto: 0
			};
		case OBTENER_GASTO_EXITO:
			return {
				...state,
				gastoseleccionado: action.payload,
			};
		case NUEVO_GASTO_EXITO:
		case OBTENER_GASTO_ERROR:
		case EDITAR_GASTO_EXITO:
			return {
				...state,
				mensajegasto: action.payload,
			};
		case NUEVO_GASTO_TOTAL:
			return {
				...state,
				totalgasto: state.nuevogastoproductos
					.filter((producto) => producto.resumen !== undefined)
					.reduce(
						(acc, producto) =>
							(acc += producto.resumen.precio * producto.resumen.cantidad),
						0
					).toFixed(2),
			};
		case LIMPIAR_MENSAJE:
			return {
				...state,
				mensajegasto: null,
			};
		case ELIMINAR_GASTO_EXITO:
			return {
				...state,
				gastos: state.gastos.filter(
					(gasto) => gasto._id !== action.payload._id
				),
			};
		default:
			return state;
	}
};

export default gastosReducer;
