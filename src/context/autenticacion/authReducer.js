import {
	LOGIN_EXITO,
	LOGIN_ERROR,
	OBTENER_USUARIO,
	CERRAR_SESION,
	LIMPIAR_MENSAJE,
	EDITAR_USUARIO_EXITO,
	EDITAR_USUARIO_PASSWORD_EXITO
} from "../../types";

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
		case CERRAR_SESION:
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
				autenticado: true,
				cargando: false,
			};
		case LIMPIAR_MENSAJE:
			return {
				...state,
				mensaje: null,
			};
		case EDITAR_USUARIO_EXITO: {
			return {
				...state,
				usuario: action.payload.usuario,
				mensaje: { categoria: action.payload.categoria },
			};
		}
		case EDITAR_USUARIO_PASSWORD_EXITO:
			return {
				...state,
				mensaje: action.payload
			}
		default:
			return state;
	}
};

export default authReducer;
