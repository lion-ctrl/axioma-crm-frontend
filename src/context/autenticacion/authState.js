import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";

import { LOGIN_EXITO, LOGIN_ERROR } from "../../types";

import axios from "../../config/clienteAxios";

const AuthState = ({ children }) => {
	const initialState = {
		usuario: null,
        autenticado: null,
		mensaje: null,
		cargando: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// funciones
	const loginUsuario = async (datos) => {
		try {
			const res = await axios.post("/api/auth", datos);
			dispatch({
				type: LOGIN_EXITO,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR,
				payload: { msg: error.response.data.msg, categoria: "error" },
			});
		}
	};

	return (
		<authContext.Provider
			value={{
				usuario: state.usuario,
                autenticado: state.autenticado,
				mensaje: state.mensaje,
				cargando: state.cargando,
				loginUsuario,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

export default AuthState;
