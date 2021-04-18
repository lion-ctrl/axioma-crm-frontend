import React, { useReducer } from "react";
import Swal from "sweetalert2";

import usuariosContext from "./usuariosContext";
import usuariosReducer from "./usuariosReducer";

import {
	OBTENER_USUARIOS,
	REGISTRAR_USUARIO_EXITO,
	LIMPIAR_MENSAJE,
	ELIMINAR_USUARIO_EXITO,
	OBTENER_USUARIO_EXITO,
	OBTENER_USUARIO_ERROR,
} from "../../types";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

const UsuariosState = ({ children }) => {
	const initialState = {
		usuarios: [],
		usuarioseleccionado: null,
		mensajeusuario: null,
	};

	const [state, dispatch] = useReducer(usuariosReducer, initialState);

	// funciones
	// obtener empleados
	const obtenerUsuarios = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const empleados = await axios.get("/api/usuarios");
			dispatch({
				type: OBTENER_USUARIOS,
				payload: empleados.data,
			});
		} catch (error) {
			Swal.fire("Error",error.response.data.msg,"error");
		}
	};

	// registrar usuario
	const registrarUsuario = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.post("/api/auth/nuevo-usuario", datos);
			Swal.fire("Correcto", res.data.msg, "success");
			dispatch({
				type: REGISTRAR_USUARIO_EXITO,
				payload: {categoria: "success"},
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "error");
		}
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE,
			});
		}, 1000);
	};

	// Eliminar usuario
	const eliminarUsuario = async (_id) => {
		try {
			const res = await axios.delete(`/api/usuarios/${_id}`);
			Swal.fire("Correcto", "Usuario Eliminado", "success");
			dispatch({
				type: ELIMINAR_USUARIO_EXITO,
				payload: res.data,
			});
		} catch (error) {
			Swal.fire("Error", error.response.data.msg, "success");
		}
	};

	// Ver usuario
	const seleccionarUsuario = async (_id) => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					tokenAuth(token);
				}
				const usuario = await axios.get(`/api/usuarios/${_id}`);
				dispatch({
					type: OBTENER_USUARIO_EXITO,
					payload: usuario.data,
				});
			} catch (error) {
				Swal.fire("Error", error.response.data.msg, "error");
				dispatch({
					type: OBTENER_USUARIO_ERROR,
					payload: { categoria: "error" },
				});

				setTimeout(() => {
					dispatch({
						type: LIMPIAR_MENSAJE,
					});
				}, 1000);
			}
	};

	return (
		<usuariosContext.Provider
			value={{
				usuarios: state.usuarios,
				usuarioseleccionado: state.usuarioseleccionado,
				mensajeusuario: state.mensajeusuario,
				obtenerUsuarios,
				registrarUsuario,
				eliminarUsuario,
				seleccionarUsuario,
			}}
		>
			{children}
		</usuariosContext.Provider>
	);
};

export default UsuariosState;
