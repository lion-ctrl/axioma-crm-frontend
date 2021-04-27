import React, { useContext } from "react";
import { Link } from "react-router-dom";

import authContext from "../../context/autenticacion/authContext";

import Layout from "../Layout/Layout";
import RutaAdminstrador from "../rutas/RutaAdministrador";

const Negocio = () => {
	const { negocio } = useContext(authContext);

	if (!negocio) return null;

	return (
		<Layout>
			<RutaAdminstrador/>
			<h1 className="text-2xl text-gray-800 font-light">
				Negocio: {!negocio.nombre ? "Sin Nombre" : negocio.nombre}
			</h1>

			<div className="mt-5 bg-white rounded p-6 shadow-lg max-w-md mx-auto">
				<div>
					<p className="font-bold text-gray-800 my-2">
						Dirección: {!negocio.direccion ? "" : negocio.direccion}
					</p>
					<p className="font-bold text-gray-800">
						Ciudad: {!negocio.ciudad ? "" : negocio.ciudad}
					</p>
					<p className="flex items-center my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						{!negocio.email ? "sin email" : negocio.email}
					</p>
					<p className="flex items-center my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						{!negocio.telefono ? "sin número" : negocio.telefono}
					</p>
				</div>
				<div>
					<Link
						to={`/negocio/editar`}
						className="flex items-center justify-center mt-4 bg-blue-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold w-full"
					>
						Editar Negocio{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="w-4 h-4 ml-2"
						>
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path
								fillRule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clipRule="evenodd"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Negocio;
