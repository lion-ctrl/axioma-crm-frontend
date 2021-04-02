import { LOGIN_EXITO, LOGIN_ERROR } from "../../types";

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_EXITO:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				mensaje: null,
                autenticado: true
			};
		case LOGIN_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				usuario: null,
				mensaje: action.payload,
                autenticado: null
			};
		default:
			return state;
	}
};

export default authReducer;
