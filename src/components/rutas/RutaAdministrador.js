import React,{useContext} from 'react';
import {Redirect} from "react-router-dom";

import authContext from "../../context/autenticacion/authContext";

const RutaAdministrador = () => {
    const {usuario} = useContext(authContext);

    if (!usuario) return "Cargando...";
	if (usuario.rol !== "ADMIN") return <Redirect to="/" />;
    return null;
}

export default RutaAdministrador;