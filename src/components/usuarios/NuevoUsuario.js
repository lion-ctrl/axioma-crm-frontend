import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import usuariosContext from "../../context/usuarios/usuariosContext";

import Layout from "../Layout/Layout";

const NuevoUsuario = () => {
	// context
	const { registrarUsuario, mensajeusuario } = useContext(usuariosContext);

	// routing
	const history = useHistory();

	useEffect(() => {
		if (mensajeusuario) {
			if (mensajeusuario.categoria === "success") {
				history.push("/usuarios");
			}
		}
		// eslint-disable-next-line
	}, [mensajeusuario]);

	// validacion
	const formik = useFormik({
		initialValues: {
			nombre: "",
			apellido: "",
			email: "",
			password: "",
			rol: "",
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required("El nombre es obligatorio"),
			apellido: Yup.string().required("El apellido es obligatorio"),
			email: Yup.string()
				.email("Debes ingresar un email valido")
				.required("El Email es obligatorio"),
			password: Yup.string()
				.required("La contraseña es obligatoria")
				.min(6, "Debe contener al menos 6 caracteres"),
			rol: Yup.string().required(
				"Debes ingresar un rol que identifique al usuario"
			),
		}),
		onSubmit: (datos) => {
			registrarUsuario(datos);
		},
	});
	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Usuario</h1>
			<div className="flex justify-center mt-5">
				<form
					onSubmit={formik.handleSubmit}
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
							value={formik.values.nombre}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.nombre && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.nombre}
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
							value={formik.values.apellido}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.apellido && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span>{" "}
								{formik.errors.apellido}
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
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.email && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.email}
							</p>
						</div>
					)}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Contraseña
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							name="password"
							id="password"
							placeholder="Contraseña"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.password && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span>{" "}
								{formik.errors.password}
							</p>
						</div>
					)}
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
							value={formik.values.rol}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value="">-- SELECCIONE --</option>
							<option value="EMPLEADO">EMPLEADO</option>
							<option value="ADMIN">ADMINISTRADOR</option>
						</select>
					</div>
					{formik.errors.rol && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.rol}
							</p>
						</div>
					)}
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Registrar Usuario"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default NuevoUsuario;
