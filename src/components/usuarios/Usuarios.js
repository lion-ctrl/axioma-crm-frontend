import React,{useContext,useEffect} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import usuariosContext from "../../context/usuarios/usuariosContext"

import Layout from "../Layout/Layout";
import Usuario from "./Usuario";

const Usuarios = () => {
	// context
	const {obtenerUsuarios,usuarios,eliminarUsuario,mensajeusuario} = useContext(usuariosContext);	

	useEffect(() => {
		obtenerUsuarios();
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (mensajeusuario) {
			if (mensajeusuario.categoria === "error") {
				Swal.fire("Error", mensajeusuario.msg, mensajeusuario.categoria);
			} else {
				Swal.fire("Correcto", mensajeusuario.msg, mensajeusuario.categoria);
			}
		}
	}, [mensajeusuario])
	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Usuarios</h1>

			<Link
				to={"/nuevo-usuario"}
				className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
			>
				Nuevo Usuario
			</Link>

			{usuarios.length ? (
				usuarios.map((usuario) => (
					<Usuario key={usuario._id} usuario={usuario} eliminarUsuario={eliminarUsuario} />
				))
			) : (
				<p className="mt-5 text-center text-2xl">Aún no hay empleados.</p>
			)}
		</Layout>
	);
};

export default Usuarios;
