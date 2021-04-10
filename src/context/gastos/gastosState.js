import React, { useReducer } from "react";

import gastosContext from "./gastosContext";
import gastosReducer from "./gastosReducer";

const GastosState = ({ children }) => {
	const initialState = {
		gastos: [],
		nuevogasto: null,
		gastoseleccionado: null,
		mensajegasto: null,
	};

	const [state, dispatch] = useReducer(gastosReducer, initialState);

	return (
		<gastosContext.Provider
			value={{
				gastos: state.gastos,
				nuevogasto: state.nuevogasto,
				gastoseleccionado: state.gastoseleccionado,
				mensajegasto: state.mensajegasto,
			}}
		>
			{children}
		</gastosContext.Provider>
	);
};

export default GastosState;
