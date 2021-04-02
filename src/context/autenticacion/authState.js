import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";

import {
	LOGIN_EXITO,
	LOGIN_ERROR,
	OBTENER_USUARIO,
	CERRAR_SESION,
} from "../../types";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
	const initialState = {
		usuario: null,
		autenticado: null,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// funciones
	// login para el usuario
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

	// autenticar usuario
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const usuario = await axios.get("/api/auth");
			dispatch({
				type: OBTENER_USUARIO,
				payload: usuario.data,
			});
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR,
				payload: { msg: error.response.data.msg, categoria: "error" },
			});
		}
	};

	// cerrar sesion
	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
			payload: {
				msg: "Sesión Cerrada",categoria: "exito"
			}
		})
	};

	return (
		<authContext.Provider
			value={{
				usuario: state.usuario,
				autenticado: state.autenticado,
				mensaje: state.mensaje,
				cargando: state.cargando,
				loginUsuario,
				usuarioAutenticado,
				cerrarSesion
			}}
		>
			{children}
		</authContext.Provider>
	);
};

export default AuthState;
