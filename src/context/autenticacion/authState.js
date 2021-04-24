import React, { useReducer } from "react";
import Swal from "sweetalert2";

import authContext from "./authContext";
import authReducer from "./authReducer";

import {
	LOGIN_EXITO,
	LOGIN_ERROR,
	OBTENER_USUARIO,
	CERRAR_SESION,
	LIMPIAR_MENSAJE,
	EDITAR_USUARIO_EXITO,
	EDITAR_USUARIO_PASSWORD_EXITO,
	OBTENER_NEGOCIO_EXITO,
	EDITAR_NEGOCIO_EXITO
} from "../../types";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
	const initialState = {
		usuario: null,
		autenticado: null,
		mensaje: null,
		cargando: true,
		negocio: null,
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

			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
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

			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		}
	};

	// cerrar sesion
	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
			payload: {
				msg: "Sesión Cerrada",
				categoria: "success",
			},
		});

		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	};

	const editarPerfil = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const usuario = await axios.put(`/api/auth/${datos._id}`, datos);
			Swal.fire("Correcto", usuario.data.msg, "success");
			dispatch({
				type: EDITAR_USUARIO_EXITO,
				payload: {
					usuario: usuario.data.usuarioActualizado,
					categoria: "success",
				},
			});
			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	const editarPassword = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.put(`/api/auth/password/${datos._id}`, {
				...datos,
				...state.usuario,
			});
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: EDITAR_USUARIO_PASSWORD_EXITO,
				payload: { categoria: "success" },
			});
			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	const obtenerNegocio = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.get("/api/negocio");
			dispatch({
				type: OBTENER_NEGOCIO_EXITO,
				payload: res.data[0],
			});
		} catch (error) {
			console.log(error);
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	const editarNegocio = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.put("/api/negocio", datos);
			Swal.fire("Correcto", "Negocio Actualizado", "success");
			dispatch({
				type: EDITAR_NEGOCIO_EXITO,
				payload: { negocio: res.data, categoria: "success" },
			});
			setTimeout(() => {
				dispatch({
					type: LIMPIAR_MENSAJE,
				});
			}, 1000);
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
	};

	return (
		<authContext.Provider
			value={{
				usuario: state.usuario,
				autenticado: state.autenticado,
				mensaje: state.mensaje,
				cargando: state.cargando,
				negocio: state.negocio,
				loginUsuario,
				usuarioAutenticado,
				cerrarSesion,
				editarPerfil,
				editarPassword,
				obtenerNegocio,
				editarNegocio,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

export default AuthState;
