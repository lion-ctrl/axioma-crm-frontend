import React, { useReducer } from "react";

import usuariosContext from "./usuariosContext";
import usuariosReducer from "./usuariosReducer";

import {
	OBTENER_USUARIOS,
    REGISTRAR_USUARIO_EXITO,
    REGISTRAR_USUARIO_ERROR,
    LIMPIAR_MENSAJE
} from "../../types";

import axios from "../../config/clienteAxios";
import tokenAuth from "../../config/tokenAuth";

const UsuariosState = ({children}) => {
    const initialState = {
        usuarios: [],
        usuarioseleccionado: null,
        mensajeusuario: null
    }

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
                payload: empleados.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    	// registrar usuario
	const registrarUsuario = async (datos) => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axios.post("/api/auth/nuevo-usuario", datos);
			dispatch({
				type: REGISTRAR_USUARIO_EXITO,
				payload: { msg: res.data.msg, categoria: "success" },
			});
		} catch (error) {
			dispatch({
				type: REGISTRAR_USUARIO_ERROR,
				payload: { msg: error.response.data.msg, categoria: "error" },
			});
		}
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_MENSAJE
			})
		}, 1000);
	};

    return ( 
        <usuariosContext.Provider
        value={{
            usuarios: state.usuarios,
            usuarioseleccionado: state.usuarioseleccionado,
            mensajeusuario: state.mensajeusuario,
            obtenerUsuarios,
            registrarUsuario
        }}
        >
            {children}
        </usuariosContext.Provider>
    );
}

export default UsuariosState;