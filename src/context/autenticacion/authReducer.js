import { LOGIN_EXITO, LOGIN_ERROR, OBTENER_USUARIO } from "../../types";

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_EXITO:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				mensaje: null,
				autenticado: true,
				cargando: false,
			};
		case LOGIN_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				usuario: null,
				mensaje: action.payload,
				autenticado: null,
				cargando: false,
			};
		case OBTENER_USUARIO:
			return {
				...state,
				usuario: action.payload,
				cargando: false,
			};
		default:
			return state;
	}
};

export default authReducer;
