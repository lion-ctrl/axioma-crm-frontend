import {
	OBTENER_USUARIOS,
    REGISTRAR_USUARIO_EXITO,
    REGISTRAR_USUARIO_ERROR,
    LIMPIAR_MENSAJE
} from "../../types";

const usuariosReducer = (state,action) => {
    switch (action.type) {
        case OBTENER_USUARIOS:
            return {
                ...state,
                usuarios: action.payload
            }
        case REGISTRAR_USUARIO_EXITO:
		case REGISTRAR_USUARIO_ERROR:
			return {
				...state,
				mensajeusuario: action.payload
			}
        case LIMPIAR_MENSAJE:
            return {
                ...state,
                mensajeusuario: null
            }
        default:
            return state;
    }
}

export default usuariosReducer;