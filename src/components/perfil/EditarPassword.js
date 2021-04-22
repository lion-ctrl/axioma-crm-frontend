import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import authContext from "../../context/autenticacion/authContext";

import Layout from "../Layout/Layout";

const EditarPassword = ({ history }) => {
	const { editarPassword, mensaje } = useContext(authContext);

    useEffect(() => {
        if (mensaje) {
            if (mensaje.categoria === "success") {
                history.push("/perfil");
            }
        }
        // eslint-disable-next-line
    }, [mensaje])

	const formik = useFormik({
		initialValues: {
			passanterior: "",
			passnueva: "",
			passnuevarepetida: "",
		},
		validationSchema: Yup.object({
			passanterior: Yup.string().required(
				"La contraseña anterior es obligatoria"
			),
			passnueva: Yup.string()
				.required("Debes ingresar la nueva contraseña")
				.min(6, "Debe tener al menos 6 caracteres"),
			passnuevarepetida: Yup.string()
				.required("Debes repetir la nueva contraseña")
				.oneOf([Yup.ref("passnueva"), null], "No coinciden las contraseñas"),
		}),
		onSubmit: (datos) => {
			editarPassword(datos);
		},
	});
	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Editar Contraseña</h1>

			<div className="flex justify-center mt-5">
				<form
					onSubmit={formik.handleSubmit}
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="passanterior"
						>
							Contraseña Anterior
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							name="passanterior"
							id="passanterior"
							placeholder="Contraseña anterior"
							value={formik.values.passanterior}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.passanterior && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span>{" "}
								{formik.errors.passanterior}
							</p>
						</div>
					)}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="passnueva"
						>
							Nueva Contraseña
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							name="passnueva"
							id="passnueva"
							placeholder="Nueva contraseña"
							value={formik.values.passnueva}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.passnueva && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span>{" "}
								{formik.errors.passnueva}
							</p>
						</div>
					)}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="passnuevarepetida"
						>
							Confirma la contraseña
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							name="passnuevarepetida"
							id="passnuevarepetida"
							placeholder="Confirma la contraseña"
							value={formik.values.passnuevarepetida}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.passnuevarepetida && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span>{" "}
								{formik.errors.passnuevarepetida}
							</p>
						</div>
					)}
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Editar Contraseña"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default EditarPassword;
