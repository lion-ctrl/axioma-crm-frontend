import React from "react";
import Layout from "../components/Layout/Layout";

const Login = () => {
	return (
		<Layout>
			{/* {mensaje && mostrarMensaje(mensaje)} */}
			<h1 className="text-center text-2xl text-white">Login</h1>
			<div className="flex justify-center mt-5">
				<form
					// onSubmit={formik.handleSubmit}
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bolc mb-2"
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
							// value={formik.values.email}
							// onChange={formik.handleChange}
							// onBlur={formik.handleBlur}
						/>
					</div>
					{/* {formik.errors.email && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.email}</p>
						</div>
					)} */}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bolc mb-2"
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
							// value={formik.values.password}
							// onChange={formik.handleChange}
							// onBlur={formik.handleBlur}
						/>
					</div>
					{/* {formik.errors.password && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.password}</p>
						</div>
					)} */}
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
