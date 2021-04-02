import React, { useReducer } from "react";

import alertaContext from "./alertaContext";
import alertaReducer from "./alertaReducer";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = ({ children }) => {
	const initialState = {
		alerta: null,
	};

	const [state, dispatch] = useReducer(alertaReducer, initialState);

	// funciones
	const mostrarAlerta = (msg, categoria) => {
        let clase;
        if (categoria === "error") {
            clase = "bg-red-100";
        } else {
            clase = "bg-green-100";
        }
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				clase,
			},
		});

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
            })
        }, 3000);
	};

	return (
		<alertaContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta,
			}}
		>
			{children}
		</alertaContext.Provider>
	);
};

export default AlertaState;
