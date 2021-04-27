import {
	OBTENER_USUARIOS,
	REGISTRAR_USUARIO_EXITO,
	ELIMINAR_USUARIO_EXITO,
	LIMPIAR_MENSAJE,
    OBTENER_USUARIO_EXITO,
    OBTENER_USUARIO_ERROR,
	EDITAR_EMPLEADO_EXITO
} from "../../types";

const usuariosReducer = (state, action) => {
	switch (action.type) {
		case OBTENER_USUARIOS:
			return {
				...state,
				usuarios: action.payload,
				usuarioseleccionado: null
			};
		case REGISTRAR_USUARIO_EXITO:
        case OBTENER_USUARIO_ERROR:
		case EDITAR_EMPLEADO_EXITO:
			return {
				...state,
				mensajeusuario: action.payload,
			};
		case ELIMINAR_USUARIO_EXITO:
			return {
				...state,
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
