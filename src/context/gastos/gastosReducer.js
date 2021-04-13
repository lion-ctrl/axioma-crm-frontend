import {
	ASIGNAR_PRODUCTOS_GASTO,
	RESUMEN_PRODUCTO,
	LIMPIAR_PRODUCTOS_GASTO,
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
			};
		default:
			return state;
	}
};

export default gastosReducer;
