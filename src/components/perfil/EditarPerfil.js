import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import authContext from "../../context/autenticacion/authContext";

import Layout from "../Layout/Layout";

const EditarPerfil = ({ history }) => {
	const { usuario, editarPerfil, mensaje } = useContext(authContext);

	useEffect(() => {
		if (mensaje) {
			if (mensaje.categoria === "success") {
				history.push("/perfil");
			}
		}
		// eslint-disable-next-line
	}, [mensaje]);

	const validationSchema = Yup.object({
		nombre: Yup.string().required("El nombre es obligatorio"),
		apellido: Yup.string().required("El apellido es obligatorio"),
		email: Yup.string()
			.email("Debes ingresar un email valido")
			.required("El Email es obligatorio"),
		rol: Yup.string().required(
			"Debes ingresar un rol que identifique al usuario"
		),
	});

	const handleSubmit = (datos) => {
		editarPerfil(datos);
	};

	if (!usuario) return null;

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Editar Perfil</h1>

			<div className="flex justify-center mt-5">
				<Formik
					enableReinitialize
					initialValues={usuario}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => {
						return (
							<form
								onSubmit={props.handleSubmit}
								className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
							>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="nombre"
									>
										Nombre
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="nombre"
										id="nombre"
										placeholder="Nombre"
										value={props.values.nombre}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.errors.nombre && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.nombre}
										</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="apellido"
									>
										Apellido
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="apellido"
										id="apellido"
										placeholder="Apellido"
										value={props.values.apellido}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.errors.apellido && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.apellido}
										</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="email"
										name="email"
										id="email"
										placeholder="Email"
										value={props.values.email}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.errors.email && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.email}
										</p>
									</div>
								)}
								{usuario.rol === "ADMIN" && (
									<>
										<div className="mb-4">
											<label
												className="block text-gray-700 text-sm font-bold mb-2"
												htmlFor="rol"
											>
												Rol de Usuario
											</label>
											<select
												name="rol"
												id="rol"
												className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
												value={props.values.rol}
												onChange={props.handleChange}
												onBlur={props.handleBlur}
											>
												<option value="">-- SELECCIONE --</option>
												<option value="EMPLEADO">EMPLEADO</option>
												<option value="ADMIN">ADMINISTRADOR</option>
											</select>
										</div>
										{props.errors.rol && (
											<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
												<p>
													{" "}
													<span className="font-bold">Error:</span>{" "}
													{props.errors.rol}
												</p>
											</div>
										)}
									</>
								)}

								<input
									type="submit"
									className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
									value="Editar Perfil"
								/>
							</form>
						);
					}}
				</Formik>
			</div>
		</Layout>
	);
};

export default EditarPerfil;
