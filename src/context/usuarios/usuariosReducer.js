import {
	OBTENER_USUARIOS,
	REGISTRAR_USUARIO_EXITO,
	REGISTRAR_USUARIO_ERROR,
	ELIMINAR_USUARIO_EXITO,
    ELIMINAR_USUARIO_ERROR,
	LIMPIAR_MENSAJE,
    OBTENER_USUARIO_EXITO,
    OBTENER_USUARIO_ERROR
} from "../../types";

const usuariosReducer = (state, action) => {
	switch (action.type) {
		case OBTENER_USUARIOS:
			return {
				...state,
				usuarios: action.payload,
			};
		case REGISTRAR_USUARIO_EXITO:
		case REGISTRAR_USUARIO_ERROR:
        case ELIMINAR_USUARIO_ERROR:
        case OBTENER_USUARIO_ERROR:
			return {
				...state,
				mensajeusuario: action.payload,
			};
		case ELIMINAR_USUARIO_EXITO:
			return {
				...state,
				mensajeusuario: { msg: action.payload.msg, categoria: "success" },
				usuarios: state.usuarios.filter(
					(usuario) => usuario._id !== action.payload._id
				),
			};
        case OBTENER_USUARIO_EXITO:
            return {
                ...state,
                usuarioseleccionado: action.payload
            }
		case LIMPIAR_MENSAJE:
			return {
				...state,
				mensajeusuario: null,
			};
		default:
			return state;
	}
};

export default usuariosReducer;
