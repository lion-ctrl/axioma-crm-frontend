import React,{useContext,useEffect} from "react";
import { Link } from "react-router-dom";

import usuariosContext from "../../context/usuarios/usuariosContext"

import Layout from "../Layout/Layout";

const Usuarios = () => {
	// context
	const {obtenerUsuarios,usuarios} = useContext(usuariosContext);

	useEffect(() => {
		obtenerUsuarios();
	}, [])
	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Usuarios</h1>

			<Link
				to={"/nuevo-usuario"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nuevo Usuario
			</Link>

			{}
		</Layout>
	);
};

export default Usuarios;
