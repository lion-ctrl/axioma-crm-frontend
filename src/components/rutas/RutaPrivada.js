import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
	const { autenticado, cargando, usuarioAutenticado, obtenerNegocio } = useContext(AuthContext);

	useEffect(() => {
			usuarioAutenticado();
			obtenerNegocio();
		// eslint-disable-next-line
	}, []);
	return (
		<Route
			{...props}
			render={(props) =>
				!autenticado && !cargando ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default RutaPrivada;
