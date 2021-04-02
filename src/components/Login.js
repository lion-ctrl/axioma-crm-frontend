import React, {useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";

import AuthContext from "../context/autenticacion/authContext";
import AlertaContext from "../context/alertas/alertaContext";

import Layout from "../components/Layout/Layout";

const Login = () => {
	// Context
	const { loginUsuario, mensaje, autenticado } = useContext(AuthContext);
	const { mostrarAlerta, alerta } = useContext(AlertaContext);

	// Routing
	const history = useHistory();

	useEffect(() => {
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
		if (autenticado) {
			history.push("/productos");
		}
		// eslint-disable-next-line
	}, [mensaje,autenticado]);

	// validacion
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Debes ingresar un email valido")
				.required("El Email es obligatorio"),
			password: Yup.string().required("La contraseña es obligatoria"),
		}),
		onSubmit: async (datos) => {
				loginUsuario(datos);
				mostrarAlerta("Autenticando...", "exito");
		}
	});

	return (
		<Layout>
			{alerta && (
				<div className={`${alerta.clase} py-2 px-3 w-full my-3 max-w-sm mx-auto`}>
					<p className="text-center">{alerta.msg}</p>
				</div>
			)}
			<h1 className="text-center text-2xl text-white">Login</h1>
			<div className="flex justify-center mt-5">
				<form
					onSubmit={formik.handleSubmit}
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
				>
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
							placeholder="Ingresa tu Email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.email && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.email}</p>
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
							placeholder="Ingresa tu Contraseña"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.password && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.password}</p>
						</div>
					)}
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Iniciar Sesión"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
